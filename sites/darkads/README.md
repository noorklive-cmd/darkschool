# DarkAds — demo privada v5

**Status:** Site privado publicado para revisão; não aberto ao público.  
**Responsável:** Alex Santos / Alex Designer.

## Arquivos
- `index.html`: landing responsiva, hero animada, fluxo visual, oferta, FAQ e CTA persistente de navegação.
- `membros.html`: protótipo de área de membros, sem autenticação ou conteúdo final.
- `assets/darkads-owl.webp`: arte 3D original da coruja DarkAds.
- URL privada: https://darkads-v1.muddybride16.chatgpt.site

## Auditoria de referência e autoria
A análise visual de Project Six observou navegação fixa, hero com promessa objetiva, explicação em etapas, trilhas selecionáveis com um fluxo ilustrado e aviso de compra sobreposto, cards de relatos, bloco de comunidade, oferta, CTA fixo e FAQ expansível. DarkAds traduz esses princípios com identidade, texto, arte e composição próprios: coruja geométrica, preto/grafite com vermelho de ação, rota Instagram → página → checkout e notificações explicitamente simuladas. Nenhum mascote, asset, código, depoimento ou texto da referência foi reutilizado. A descrição da animação de partículas foi observada na acessibilidade do site; não houve captura de cada quadro em vídeo nem inspeção de código/ferramentas internas.

## O que está funcional na demo
- Navegação por seções, layout responsivo, FAQ, revelação progressiva e animação compatível com `prefers-reduced-motion`.
- Mascote original com movimento suave e interação com cursor/toque.
- Toasts identificados como DEMO/TESTE; sem valores ou transações reais.
- CTA leva ao bloco de oferta; botão de compra desativado até existir checkout oficial InfinitePay.
- Comunidade gratuita com convite fornecido pelo responsável; validar a expiração antes da divulgação.
- Code Makers aparece como plataforma externa, não inclusa e não obrigatória.
- Sem depoimentos ou resultados de alunos inventados.

## Dados e pendências comerciais
- Preço principal: R$ 33,30, pagamento único; acesso vitalício ao material adquirido conforme condições do checkout.
- Quantidade e composição de vídeos, automações e templates não definidas.
- Indicador de mais de R$ 3 milhões foi informado pelo responsável; documentação, período e contexto ainda precisam de validação antes da divulgação pública.
- Sessão individual separada, com mínimo de uma hora; preço e agenda pendentes.
- O protótipo de membros não protege materiais. Ainda não existe autenticação, checkout conectado, confirmação de compra, entrega ou recuperação de acesso.

## Revisão visual
A captura desktop da versão 5 foi revisada depois do deploy e levou a um segundo ajuste de hierarquia da headline e da posição da coruja. A revisão mobile e o percurso interativo completo continuam pendentes.

## Rascunhos para revisão de Alex

- [Auditoria visual complementar Project Six](../../pesquisas/2026-11-25-auditoria-visual-darkads-project-six.md): observações diretas, limites da inspeção e comparação; não é análise quadro a quadro.
- [Pesquisa das skills e repositórios Base44](../../pesquisas/2026-11-25-base44-skills-darkads.md).
- [Agentes DarkAds](../../agentes/darkads/README.md) e skills de apoio em `.agents/skills/`.
- [Demo mobile](mobile-demo.html): envolve a página atual em viewport de telefone, sem mudar `index.html`. O preview local não abriu no Chromium (`ERR_CONNECTION_REFUSED`), portanto a validação visual mobile permanece pendente.

Estes arquivos estão numa branch de revisão. Não alteram a página publicada. A implementação, merge e publicação aguardam aprovação de Alex.
