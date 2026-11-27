import { randomUUID } from 'node:crypto';
import * as capture from '../../agents/aquisicao/capturador-ig.ts';
import * as sdr from '../../agents/aquisicao/sdr.ts';
import { execute } from '../../agents/runner.ts';
import type { Services } from '../../agents/contracts.ts';
import type { SessionCache } from '../redis/index.ts';
import type { Store } from '../supabase/store.ts';
import type { FunnelEvent } from '../ig/simulator.ts';

export interface Runtime extends Services {cache: SessionCache; store: Store}
export async function simulate(event: FunnelEvent, ctx: Runtime) {
  const {eventId, contactId} = event;
  const key = 'academy:sim:event:' + eventId;
  const owner = randomUUID();
  if (!await ctx.cache.claim(key,owner,30)) return {status:'in_progress',eventId} as const;
  try {
    await execute(capture,event,eventId,ctx,ctx.store);
    let status: 'duplicate'|'completed' = 'duplicate';
    if (!await ctx.store.hasReply(eventId)) {
      const result = await execute(sdr,event,eventId,ctx,ctx.store);
      if (await ctx.whatsapp.send(eventId,result.reply)) status = 'completed';
    }
    await ctx.cache.set('academy:sim:session:' + contactId,eventId,1800);
    return {status,eventId};
  } finally {
    await ctx.cache.release(key,owner);
  }
}
