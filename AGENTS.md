# Instruções para agentes

Ao receber “Ativar Mega Brain”, execute esta rotina de retomada documentada:

1. Leia o [índice](README.md), o [contexto da marca](contexto/marca.md) e o arquivo da frente solicitada.
2. Consulte o registro datado e as fontes relevantes. Use a decisão mais recente aprovada pelo Alex quando houver conflito. Identifique lacunas como pendências e propostas como hipóteses.
3. Execute a tarefa e valide a entrega no caminho normal de uso. Registre o que foi decidido, a fonte, os arquivos afetados e o próximo teste quando houver.
4. Mantenha referências cruzadas atualizadas. Credenciais, tokens, dados de clientes e arquivos sem autorização de compartilhamento ficam fora do Git.

Use pt-BR por padrão, com escrita direta e específica. Preserve a assinatura aprovada em inglês. Use cases e números verificáveis. Confirme a aprovação do preview antes de publicar em produção. Veja os [prompts](agentes/prompts.md) para pesquisa, design e implementação.

## Dark Academy — contrato de engenharia

Alex Santos é o fundador e aprovador final. Gemini atua como Assistente de Produção e entrega PRDs e protótipos HTML/CSS em `prototypes/` na raiz da aplicação. Codex responde pela arquitetura, implementação e testes. Submeta o setup à aprovação de Alex antes de implementar. A aprovação de protótipo, código e publicação são decisões distintas.

- Versione a implementação e os contratos no repositório. Use Next.js App Router, TypeScript, Zod, Supabase Postgres/Auth com migrations SQL e um adaptador Redis para debounce e memória de sessão. Implemente a orquestração em código, sem n8n ou Make.com.
- Trate HTML/CSS aprovado em `prototypes/` como contrato visual. Preserve #050507, #0d0d0d, #8B5CF6, #E11D48, Space Grotesk, Inter e JetBrains Mono. Use apenas copy, métricas e URLs com origem confirmada.
- Toda integração passa por interface. Defaults em `.env.example`: `AI_PROVIDER=gemini_free`, `WHATSAPP_PROVIDER=mock`, `IG_TRIGGER_MODE=simulator`. Testes usam IA determinística e cache em memória local. A chamada remota ao Gemini exige opt-in explícito. Nunca faça fallback automático para um provedor pago. Reserve interfaces para groq_free, openai, claude, evolution, cloud_api, manychat e Upstash Redis.
- O WhatsApp mock grava entrada e saída no banco e no console local usando dados sintéticos nos testes. Não envie mensagens reais no simulador. Proteja credenciais e minimize o conteúdo dos logs.
- Cada módulo em `src/agents/` exporta `id`, `squad`, `inputSchema`, `outputSchema` e `run(ctx)`. O executor compartilhado valida entrada e saída com Zod e registra cada tentativa em `agent_logs` com identificador de correlação, status final (`completed`, `awaiting_approval` ou `failed`), `duration_ms` e `cost_estimate`. Simulações têm custo zero. Ações pendentes dependem de decisão explícita de Alex, registrada em `approvals`.
- Aquisição (1–5): Capturador IG/DM, Triagem Multimodal, SDR Orquestrador, Closer Academy, Onboarding Membro.
- Conteúdo (6–10): Minerador de Hooks, Copywriter Blessed4K20, Diretor de Tokens, Montador de Criativos, Agendador de Lote.
- Engenharia (11–13): Assistente de Produção (Gemini), Dev Sênior (Codex), QA e Simulador.
- Números & Ops (14–15): Analista de Funil, Secretário Executivo 07:00 (resumo diário consolidado).
- O teste de aceite local usa `POST /api/dev/simulate-funnel` com AGENTE, PADRAO ou DARK. Exercite IG simulado, SDR, WhatsApp mock, persistência Supabase e log. Valide repetição de eventos, erros e custo zero. A rota de desenvolvimento deve estar indisponível em produção.
