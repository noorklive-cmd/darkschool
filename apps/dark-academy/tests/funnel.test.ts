import test from 'node:test';
import assert from 'node:assert/strict';
import { agents } from '../src/agents/registry.ts';
import { execute } from '../src/agents/runner.ts';
import * as sdr from '../src/agents/aquisicao/sdr.ts';
import { makeHandler } from '../src/lib/funnel/handler.ts';
import { makeRuntime } from '../src/lib/funnel/runtime.ts';
import { MemoryStore } from '../src/lib/supabase/store.ts';
import { memoryCache } from '../src/lib/redis/index.ts';
import { mockWhatsApp } from '../src/lib/whatsapp/index.ts';

const event = {eventId:'00000000-0000-4000-8000-000000000001', contactId:'sim-001', trigger:'AGENTE'};
function setup() {
  const runtime = makeRuntime({});
  const store = new MemoryStore();
  const lines: string[] = [];
  Object.assign(runtime,{store, whatsapp:mockWhatsApp(store, msg => lines.push(msg))});
  const handle = makeHandler('test',() => runtime);
  const post = (input: unknown = event) => handle(new Request('http://localhost/api/dev/simulate-funnel',{
    method:'POST',body:JSON.stringify(input)
  }));
  return {runtime, store, post, lines};
}

for (const trigger of ['AGENTE','PADRAO','DARK']) {
  test('funil completo para ' + trigger, async () => {
    const {post,store,lines,runtime} = setup();
    const res = await post({...event,trigger});
    assert.equal(res.status,200);
    assert.deepEqual(await res.json(),{status:'completed',eventId:event.eventId});
    assert.equal(store.inbound.get(event.eventId)?.trigger,trigger);
    assert.equal(store.leads.size,1);
    assert.equal(store.outbound.get(event.eventId),'[fixture:sdr:' + trigger + ']');
    assert.deepEqual(store.logs.map(a => a.agent),['capturador-ig','sdr']);
    assert.ok(store.logs.every(a => a.costEstimate === 0 && a.durationMs >= 0 && a.status === 'completed'));
    assert.equal(lines.length,2);
    assert.equal(await runtime.cache.get('academy:sim:session:sim-001'),event.eventId);
  });
}
test('replay, conflito de payload e próximo evento do mesmo lead',async () => {
  const {post,store} = setup();
  await post();
  assert.equal((await (await post()).json()).status,'duplicate');
  assert.equal((await post({...event,trigger:'DARK'})).status,409);
  assert.equal(store.logs.at(-1)?.status,'failed');
  assert.equal(store.outbound.size,1);
  await post({...event,eventId:'00000000-0000-4000-8000-000000000002'});
  assert.equal(store.leads.size,1);
  assert.equal(store.outbound.size,2);
});
test('concorrência do mesmo evento entrega uma resposta',async () => {
  const {post,store} = setup();
  const replies = await Promise.all([post(),post()]);
  assert.deepEqual(replies.map(r => r.status).sort(),[200,202]);
  assert.equal(store.outbound.size,1);
});
test('retoma após erro de saída do SDR',async () => {
  const {post,runtime,store} = setup();
  const fixture = runtime.ai;
  runtime.ai = {async reply() { return ''; }};
  assert.equal((await post()).status,500);
  assert.equal(store.logs.at(-1)?.status,'failed');
  assert.equal(store.outbound.size,0);
  runtime.ai = fixture;
  assert.equal((await post()).status,200);
  assert.equal(store.inbound.size,1);
  assert.equal(store.outbound.size,1);
});
test('rejeita payload inválido antes de persistir',async () => {
  const {post,store} = setup();
  for (const input of [{}, {...event,trigger:'X'}, {...event,contactId:'real'}, {...event,unexpected:true}]) {
    assert.equal((await post(input)).status,400);
  }
  assert.equal(store.logs.length,0);
});
test('rota inativa em produção antes de criar providers',async () => {
  const handle = makeHandler('production',() => assert.fail('não inicializar'));
  assert.equal((await handle(new Request('http://localhost'))).status,404);
});
test('15 contratos, quatro squads e 13 handoffs pendentes',async () => {
  const {runtime,store} = setup();
  assert.equal(new Set(agents.map(a => a.id)).size,15);
  assert.deepEqual(['aquisicao','conteudo','engenharia','ops'].map(s => agents.filter(a=>a.squad===s).length),[5,5,3,2]);
  for (const agent of agents) {
    if (agent.id === 'capturador-ig' || agent.id === 'sdr') continue;
    await execute(agent,{brief:'fixture'},event.eventId,runtime,store,() => 100);
  }
  assert.equal(store.approvals.length,13);
  assert.ok(store.logs.every(a => a.durationMs===0 && a.status==='awaiting_approval'));
});
test('runner registra erro de validação de entrada',async () => {
  const {runtime,store} = setup();
  await assert.rejects(execute(sdr,{},event.eventId,runtime,store));
  assert.equal(store.logs[0].status,'failed');
});
test('TTL e liberação por proprietário',async () => {
  let time=0;
  const cache=memoryCache(()=>time);
  assert.ok(await cache.claim('event','a',1));
  time=1000;
  assert.ok(await cache.claim('event','b',1));
  await cache.release('event','a');
  assert.equal(await cache.get('event'),'b');
  await cache.set('session','v',1);
  time=2000;
  assert.equal(await cache.get('session'),null);
});
test('defaults offline e rejeição de configurações externas indevidas',() => {
  assert.ok(makeRuntime({}).store instanceof MemoryStore);
  assert.throws(()=>makeRuntime({AI_PROVIDER:'openai'}));
  assert.throws(()=>makeRuntime({STORE_DRIVER:'supabase',SUPABASE_URL:'https://example.com',SUPABASE_SERVICE_ROLE_KEY:'fixture'}));
});
