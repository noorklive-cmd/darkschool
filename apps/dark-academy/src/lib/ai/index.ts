import type { FunnelEvent } from '../ig/simulator.ts';

export interface AIProvider { reply(event: FunnelEvent): Promise<string> }

// Identificador sintético do teste; nunca usado como copy comercial.
export const geminiFixture: AIProvider = {
  async reply(event) { return '[fixture:sdr:' + event.trigger + ']'; }
};
