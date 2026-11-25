# Base44: repositórios e skills para DarkAds

**Data:** 25/11/2026  
**Estado:** pesquisa concluída; arquivos de integração são rascunhos e aguardam aprovação.

## O que existe oficialmente

A organização oficial [base44](https://github.com/base44) mantém vários repositórios, não um único repositório com o nome “frontend” ou “backend”:

| Repositório | Uso |
| --- | --- |
| [base44/skills](https://github.com/base44/skills) | Skills mantidas para agentes de código; contém referências `base44-platform-frontend`, `base44-platform-backend-functions` e `base44-platform-agents`, entre outras. |
| [base44/cli](https://github.com/base44/cli) | Inicialização, gerenciamento de recursos e deploy de projetos Base44. |
| [base44/javascript-sdk](https://github.com/base44/javascript-sdk) | SDK JavaScript para acessar recursos Base44 em aplicações existentes. |
| [base44/apps-examples](https://github.com/base44/apps-examples) | Aplicações de exemplo. |

Portanto, o item que Alex lembrava como “frontend/backend” está dentro de `base44/skills` como skills de plataforma, e não como dois repositórios separados. A skill frontend cobre convenções de app, rotas, componentes e responsividade; as referências de backend/functions cobrem lógica privilegiada, autenticação, segredos e webhooks. A skill de agentes trata agentes construídos dentro de um app Base44.

## Aplicação ao DarkAds

A landing atual é uma página estática no Sites e não contém `base44/config.jsonc`. Assim, as skills Base44 podem orientar uma futura implementação ou migração, mas não justificam adicionar dependências, backend, login, banco de dados ou checkout à página atual sem aprovação.

Skills recomendadas para selecionar conforme escopo:
1. `base44-platform-frontend` para uma futura landing/app web ou mobile em Base44.
2. `base44-platform-backend-functions` somente quando o escopo exigir backend seguro.
3. `base44-platform-agents` somente se Alex solicitar um agente conversacional dentro da área de membros.
4. `base44-cli` e `base44-sdk` conforme seja projeto novo ou app Base44 já existente.

A instalação deve seguir o README oficial e incluir somente as skills necessárias. As definições geradas no upstream não devem ser copiadas para cá; este repositório mantém wrappers próprios que apontam para a fonte oficial.

## Arquivos preparados em rascunho

- `.agents/skills/darkads-reference-audit/SKILL.md`
- `.agents/skills/base44-darkads-landing/SKILL.md`
- `agentes/darkads/auditor-visual.md`
- `agentes/darkads/base44-builder.md`
- `agentes/darkads/README.md`
- `sites/darkads/mobile-demo.html`

A demo mobile enquadra o `index.html` existente em um viewport de telefone; não altera a copy nem a página de vendas. Os agentes só sugerem melhorias e aguardam autorização para implementá-las.

## Aprovação pendente

Esta proposta está em uma branch de revisão. Não altera `main`, não publica uma nova versão do Site e não cria um app Base44. Mesclar ou aplicar alterações à página requer aprovação do Alex.
