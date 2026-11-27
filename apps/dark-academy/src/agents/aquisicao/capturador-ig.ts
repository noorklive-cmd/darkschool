import { z } from 'zod';
import { eventSchema, type FunnelEvent } from '../../lib/ig/simulator.ts';
import type { AgentContext } from '../contracts.ts';
export const id = 'capturador-ig';
export const squad = 'aquisicao';
export const inputSchema = eventSchema;
export const outputSchema = z.object({status:z.literal('completed'), receipt:z.enum(['created','existing'])});
export class EventConflict extends Error {}
export async function run(ctx: AgentContext<FunnelEvent>) {
  const receipt = await ctx.whatsapp.receive(ctx.input);
  if (receipt === 'conflict') throw new EventConflict('Evento reutilizado com outros dados');
  return {status:'completed' as const, receipt};
}
