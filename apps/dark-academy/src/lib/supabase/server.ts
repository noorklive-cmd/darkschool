import { z } from 'zod';
import type { Store } from './store.ts';

// API PostgREST do Supabase. A chave fica exclusivamente no servidor.
export function supabaseStore(url: string, key: string): Store {
  async function request(path: string, args?: object): Promise<unknown> {
    const res = await fetch(new URL('/rest/v1/' + path, url), {
      method: args ? 'POST' : 'GET',
      headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: args ? JSON.stringify(args) : undefined, cache: 'no-store'
    });
    if (!res.ok) throw new Error('Falha no armazenamento local: HTTP ' + res.status);
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }
  return {
    async receive(e) {
      return z.enum(['created','existing','conflict']).parse(await request('rpc/receive_trigger', {
        p_event: e.eventId, p_contact: e.contactId, p_trigger: e.trigger
      }));
    },
    async hasReply(id) {
      const query = new URLSearchParams({event_id: 'eq.' + id, direction: 'eq.outbound', select: 'id', limit: '1'});
      return z.array(z.object({id: z.string().uuid()})).parse(await request('messages?' + query)).length > 0;
    },
    async reply(id, body) {
      return z.boolean().parse(await request('rpc/mock_reply', {p_event:id, p_body:body}));
    },
    async log(a) {
      await request('rpc/log_attempt', {p_event:a.eventId, p_agent:a.agent, p_status:a.status, p_ms:a.durationMs});
    }
  };
}
