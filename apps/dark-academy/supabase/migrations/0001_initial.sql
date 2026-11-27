create table public.leads (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  created_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads,
  event_id uuid not null,
  direction text not null check (direction in ('inbound','outbound')),
  channel text not null check (channel in ('ig_simulator','whatsapp_mock')),
  body text not null,
  created_at timestamptz not null default now(),
  unique (event_id, direction)
);
create index messages_lead_time on public.messages(lead_id, created_at);

create table public.agent_logs (
  id uuid primary key default gen_random_uuid(),
  correlation_id uuid not null,
  agent_id text not null,
  status text not null check (status in ('completed','awaiting_approval','failed')),
  duration_ms integer not null check (duration_ms >= 0),
  cost_estimate numeric not null check (cost_estimate >= 0),
  created_at timestamptz not null default now()
);
create index agent_logs_correlation on public.agent_logs(correlation_id);
create table public.approvals (
  id uuid primary key default gen_random_uuid(),
  log_id uuid not null unique references public.agent_logs,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  decided_by uuid references auth.users,
  decided_at timestamptz,
  check ((status='pending' and decided_by is null and decided_at is null)
    or (status<>'pending' and decided_by is not null and decided_at is not null))
);
create table public.daily_metrics (
  day date primary key,
  leads_count integer not null check (leads_count >= 0),
  messages_count integer not null check (messages_count >= 0),
  executions_count integer not null check (executions_count >= 0)
);

-- A row and its pending approval must be durable together.
create function public.log_attempt(p_event uuid, p_agent text, p_status text, p_ms integer)
returns void language plpgsql security invoker set search_path = '' as $$
declare log_id uuid;
begin
  insert into public.agent_logs(correlation_id,agent_id,status,duration_ms,cost_estimate)
  values(p_event,p_agent,p_status,p_ms,0) returning id into log_id;
  if p_status = 'awaiting_approval' then
    insert into public.approvals(log_id) values(log_id);
  end if;
end $$;

-- Serialize ingestion for each event, including requests from different processes.
create function public.receive_trigger(p_event uuid, p_contact text, p_trigger text)
returns text language plpgsql security invoker set search_path = '' as $$
declare previous record; lead uuid;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_event::text,0));
  select l.external_id,m.body into previous from public.messages m join public.leads l on l.id=m.lead_id
    where m.event_id=p_event and m.direction='inbound';
  if found then
    if previous.external_id<>p_contact or previous.body<>p_trigger then return 'conflict'; end if;
    return 'existing';
  end if;
  insert into public.leads(external_id) values(p_contact)
    on conflict(external_id) do update set external_id=excluded.external_id returning id into lead;
  insert into public.messages(lead_id,event_id,direction,channel,body)
    values(lead,p_event,'inbound','ig_simulator',p_trigger);
  return 'created';
end $$;

create function public.mock_reply(p_event uuid, p_body text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare lead uuid;
begin
  select lead_id into strict lead from public.messages where event_id=p_event and direction='inbound';
  insert into public.messages(lead_id,event_id,direction,channel,body)
    values(lead,p_event,'outbound','whatsapp_mock',p_body) on conflict(event_id,direction) do nothing;
  return found;
end $$;

do $$ declare tbl text; fn regprocedure;
begin
  foreach tbl in array array['leads','messages','agent_logs','approvals','daily_metrics'] loop
    execute format('alter table public.%I enable row level security',tbl);
    execute format('revoke all on public.%I from public, anon, authenticated',tbl);
    execute format('grant select, insert, update on public.%I to service_role',tbl);
  end loop;
  foreach fn in array array['public.log_attempt(uuid,text,text,integer)'::regprocedure,
    'public.receive_trigger(uuid,text,text)'::regprocedure,'public.mock_reply(uuid,text)'::regprocedure] loop
    execute format('revoke all on function %s from public, anon, authenticated',fn);
    execute format('grant execute on function %s to service_role',fn);
  end loop;
end $$;
