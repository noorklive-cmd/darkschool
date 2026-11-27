import { z } from 'zod';
import { eventSchema, type FunnelEvent } from '../../lib/ig/simulator.ts';
import type { AgentContext } from '../contracts.ts';
export const id = 'sdr';
export const squad = 'aquisicao';
export const inputSchema = eventSchema;
export const outputSchema = z.object({status:z.literal('completed'), reply:z.string().trim().min(1)});
export async function run(ctx: AgentContext<FunnelEvent>) {
  return {status:'completed' as const, reply:await ctx.ai.reply(ctx.input)};
}
