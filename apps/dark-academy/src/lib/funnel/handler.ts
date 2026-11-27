import { ZodError } from 'zod';
import { simulator } from '../ig/simulator.ts';
import { simulate, type Runtime } from './simulate.ts';
import { EventConflict } from '../../agents/aquisicao/capturador-ig.ts';

export function makeHandler(mode: string | undefined, runtime: () => Runtime) {
  return async function handle(req: Request) {
    if (mode !== 'development' && mode !== 'test') return new Response(null,{status:404});
    let event;
    try {
      event = simulator.parse(await req.json());
    } catch (e) {
      if (e instanceof SyntaxError || e instanceof ZodError) return Response.json({error:'Evento inválido'},{status:400});
      throw e;
    }
    try {
      const result = await simulate(event,runtime());
      return Response.json(result,{status:result.status === 'in_progress' ? 202 : 200});
    } catch (e) {
      if (e instanceof EventConflict) return Response.json({error:e.message},{status:409});
      return Response.json({error:'Falha na simulação. Repita com o mesmo eventId.'},{status:500});
    }
  };
}
