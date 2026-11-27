# Dark Academy · Etapa 1

Base de agentes em Next.js App Router e TypeScript. Alex Santos aprova o trabalho. Gemini entrega PRDs e HTML/CSS em `prototypes/`. O diretório `prototypes/03-approval-dashboard/` está reservado para o primeiro HTML aprovado do Painel 07:00. [sites/darkads/](../../sites/darkads/) é a referência visual. Consulte as regras da equipe no [AGENTS.md](../../AGENTS.md).

## Testar com um comando

Use Node 24 e npm. Na primeira instalação, execute `cd apps/dark-academy` e `npm ci`. Na pasta da aplicação:

```sh
npm test
```

Os testes instanciam os drivers com configuração explícita, usam contatos sintéticos e rodam offline, inclusive quando o desenvolvedor tem chaves no ambiente. Para verificar os tipos e compilar, execute `npm run typecheck` e `npm run build`.

## Simular o funil

Execute `npm run dev`. O servidor de desenvolvimento escuta em loopback. Em outro terminal:

```sh
curl -sS http://127.0.0.1:3000/api/dev/simulate-funnel \
  -H 'Content-Type: application/json' \
  -d '{"eventId":"00000000-0000-4000-8000-000000000001","contactId":"sim-001","trigger":"AGENTE"}'
```

Na primeira chamada, espere HTTP 200 com `status=completed`. Repita o mesmo corpo para obter `duplicate`. Para um novo evento use um novo UUID. Os gatilhos aceitos são AGENTE, PADRAO e DARK. Contatos de teste usam o prefixo `sim-`. Um evento em processamento retorna 202; repita depois com o mesmo UUID. Reutilizar um UUID com outro contato ou gatilho retorna 409. Payload inválido retorna 400. Em produção a rota responde 404.

O Capturador registra a entrada do simulador e o lead. O SDR produz uma resposta fixture e o WhatsApp mock registra a saída. O console local mostra entrada e saída sintéticas. Cada tentativa de agente registra correlação, status, duração em ms e custo zero. As mensagens são únicas por evento e direção; uma nova tentativa após falha do SDR reutiliza a entrada. O cache controla concorrência por evento por até 30 segundos e guarda o último evento de cada sessão por 30 minutos.

## Validar com Supabase local

Pré-requisitos: Docker em execução e Supabase CLI compatível com configuração TOML (v2). Rode na pasta da aplicação, com as portas locais 54321–54323 disponíveis.

1. Execute `supabase start` e depois `supabase migration up --local`. Confira `0001` em `supabase migration list --local`.
2. Copie `.env.example` para `.env.local`. Defina `STORE_DRIVER=supabase` e `SUPABASE_URL=http://127.0.0.1:54321`. Consulte `supabase status -o env` no terminal local e copie a chave JWT `SERVICE_ROLE_KEY` para `SUPABASE_SERVICE_ROLE_KEY` no arquivo. A chave é de uso exclusivo do servidor.
3. Inicie ou reinicie `npm run dev` e execute o curl acima duas vezes. Use um UUID novo para cada rodada de aceite.
4. Abra o SQL Editor do Studio no endereço indicado por `supabase status` e consulte:

```sql
select l.external_id, m.direction, m.channel, m.body
from public.messages m join public.leads l on l.id = m.lead_id
where m.event_id = '00000000-0000-4000-8000-000000000001'
order by m.created_at;

select agent_id, status, duration_ms, cost_estimate
from public.agent_logs
where correlation_id = '00000000-0000-4000-8000-000000000001'
order by created_at;
```

Espere uma entrada e uma saída vinculadas ao mesmo lead. A primeira chamada registra Capturador e SDR. O replay sequencial registra outra verificação do Capturador. Para encerrar, execute `supabase stop`. [Guia de desenvolvimento local do Supabase](https://supabase.com/docs/guides/local-development/cli/getting-started)

## Contratos e drivers

| Componente | Implementação desta etapa |
| --- | --- |
| `src/agents/` | 15 módulos em quatro squads. Capturador e SDR executam o fluxo. Os outros 13 validam um briefing, retornam `awaiting_approval` e geram aprovação pendente quando chamados via runner. Suas operações de negócio e o agendamento das 07:00 ficam para as próximas etapas. |
| `src/lib/ai/` | `AIProvider` com `AI_PROVIDER=gemini_free` e `AI_MODE=fixture`. O simulador aceita exclusivamente a fixture. Gemini remoto, Groq, OpenAI e Claude são extensões futuras. |
| `src/lib/whatsapp/`, `src/lib/ig/` | WhatsApp mock e parser Zod do IG simulator. As interfaces são os pontos de integração futuros de Evolution, Cloud API e ManyChat. |
| `src/lib/redis/` | Cache com TTL em memória por padrão; Upstash REST opcional com `REDIS_DRIVER=upstash`, `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`. O debounce em memória vale por processo. |
| `src/lib/supabase/` | Store em memória para testes; adapter PostgREST para o Supabase local. No modo memória o histórico dura até reiniciar o processo. |
| `supabase/migrations/0001_initial.sql` | Leads, mensagens, logs, aprovações e métricas diárias. RLS e permissões reservam o acesso ao servidor. A decisão de aprovação referencia um usuário de Supabase Auth. A gravação de log e aprovação é atômica. |
