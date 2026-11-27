import test from 'node:test';
import assert from 'node:assert/strict';
import { supabaseStore } from '../src/lib/supabase/server.ts';

test('adapter PostgREST usa as RPCs e transmite a correlação da migration', async t => {
  const id = '00000000-0000-4000-8000-000000000001';
  const contactId = 'sim-adapter';
  const calls: {path:string; args:unknown}[] = [];
  const results = ['created', [], true, null];
  t.mock.method(globalThis,'fetch',async (url: URL, init: RequestInit) => {
    calls.push({path: url.pathname, args:init.body ? JSON.parse(String(init.body)) : null});
    assert.equal(new Headers(init.headers).get('apikey'),'fixture');
    if (init.method === 'GET') assert.equal(url.searchParams.get('event_id'),'eq.' + id);
    return Response.json(results.shift());
  });
  const db = supabaseStore('http://127.0.0.1:54321','fixture');
  assert.equal(await db.receive({eventId:id,contactId,trigger:'DARK'}),'created');
  assert.equal(await db.hasReply(id),false);
  assert.equal(await db.reply(id,'fixture'),true);
  await db.log({eventId:id,agent:'sdr',durationMs:0,status:'completed',costEstimate:0});
  assert.deepEqual(calls,[
    {path:'/rest/v1/rpc/receive_trigger',args:{p_event:id,p_contact:contactId,p_trigger:'DARK'}},
    {path:'/rest/v1/messages',args:null},
    {path:'/rest/v1/rpc/mock_reply',args:{p_event:id,p_body:'fixture'}},
    {path:'/rest/v1/rpc/log_attempt',args:{p_event:id,p_agent:'sdr',p_status:'completed',p_ms:0}}
  ]);
});
