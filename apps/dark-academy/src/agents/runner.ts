import type { Agent, Services } from './contracts.ts';
import type { Status, Store } from '../lib/supabase/store.ts';

export async function execute<I,O extends {status: 'completed'|'awaiting_approval'}>(
  agent: Agent<I,O>, input: unknown, eventId: string, services: Services, store: Store,
  clock: () => number = Date.now
): Promise<O> {
  const started = clock();
  let status: Status = 'failed';
  try {
    const parsed = agent.inputSchema.parse(input);
    const result = agent.outputSchema.parse(await agent.run({...services, input:parsed, correlationId:eventId}));
    status = result.status;
    return result;
  } finally {
    await store.log({eventId, agent:agent.id, status, durationMs:Math.max(0,clock()-started), costEstimate:0});
  }
}
