# Revisão visual complementar — DarkAds e Project Six

**Data:** 25/11/2026  
**Escopo:** observação da página pública do Project Six em navegador; sem acesso ao código-fonte interno.  
**Estado:** observações registradas; revisão mobile e aprovação de mudanças pendentes.

## Evidências observadas

A página do Project Six usa navegação fixa com links para início, criação de conta e menu compacto. A hero apresenta uma promessa direta sobre vender na Amazon sem investir em anúncios, CTA principal e acesso ao Discord. Logo abaixo, há três indicadores de membros, investimento em anúncios e duração do acesso, além de um mascote de bode em partículas. A descrição de acessibilidade declara movimentos de entrada, acompanhamento do cursor e interação ao toque.

O restante da página organiza o percurso em etapas expansíveis; apresenta trilhas em cartões (Amazon, infoproduto, nicho hot e Mercado Livre como extra); mostra relatos em faixa contínua com aviso de que são resultados individuais; destaca a comunidade com uma representação de conversa do Discord; apresenta preço e acesso gratuito; e encerra com FAQ expansível, CTAs e rodapé com links legais e de navegação. Na captura de estado consultada, a etapa 02 e a primeira pergunta do FAQ estavam abertas.

A captura permite confirmar os textos, a ordem geral e os componentes semânticos da página. Não permite verificar com precisão o tempo, os easing curves, a sequência de cada partícula ou o código usado para produzir as animações. A inspeção de ferramentas do navegador foi recusada pelo ambiente; nenhum arquivo interno do Project Six foi acessado.

## Comparação com a versão atual do DarkAds

A página DarkAds atual já traduz parte da arquitetura com marca e conteúdo próprios: mascote-coruja original, paleta escura com vermelho de ação, fluxo Instagram → página → checkout, módulos visuais de percurso, avisos de demonstração e CTA de oferta. A documentação da demo v5 registra que o botão de compra está desativado enquanto o checkout oficial não estiver ligado e que os relatos de alunos/resultados não foram inventados.

| Project Six observado | DarkAds atual / status | Avaliação para revisão |
| --- | --- | --- |
| Navegação fixa e acesso rápido às seções | A página DarkAds tem navegação por seções e CTA persistente documentados | Conferir dimensões, respiro e comportamento em viewport real antes de qualquer ajuste |
| Hero com promessa, CTA e métricas | DarkAds apresenta promessa, preço e elementos próprios | Manter a copy aprovada; avaliar hierarquia e proporções visualmente |
| Mascote de partículas interativo | DarkAds usa a coruja original | Inspiração no papel narrativo e no movimento; não reutilizar bode, arte ou animação proprietária |
| Etapas expansíveis e trilhas | DarkAds documenta fluxo visual e conteúdo próprio | Comparar estados abertos/fechados e clareza do percurso |
| Relatos em faixa contínua | DarkAds não deve exibir prova não verificada | Preservar apenas evidência autorizada e identificada; simulações devem continuar rotuladas como demonstração |
| Comunidade com visualização do Discord | DarkAds tem comunidade Discord gratuita | Usar a própria identidade e convite confirmado; avaliar densidade e legibilidade |
| Bloco de oferta, CTA e FAQ | DarkAds já contém oferta e FAQ | Conferir ordem, repetição de CTA, leitura e interação sem mudar condições comerciais |

## Limites desta revisão

- Não é uma inspeção quadro a quadro; a ferramenta de desenvolvimento do navegador foi bloqueada e não foi possível obter a timeline das animações.
- O navegador forneceu estrutura e texto acessíveis da página, mas esta anotação não substitui capturas anotadas de cada estado visual.
- A validação mobile ainda não foi concluída. A demo `sites/darkads/mobile-demo.html` prepara uma moldura de telefone com o `index.html` atual, mas o preview local retornou `ERR_CONNECTION_REFUSED` no Chromium do ambiente. Não afirmar que o layout foi visualmente aprovado em mobile até abrir a demo num ambiente servido e conferir o viewport.
- A captura anterior com zoom não conta como emulação de dispositivo.

## Mudanças propostas para aprovação

1. Capturar a demo DarkAds e a referência em viewport real de aproximadamente 390 × 844 CSS px.
2. Registrar capturas da hero, fluxo, trilhas, prova/comunidade, oferta, FAQ e CTA fixo nos estados fechado e aberto.
3. Montar comparação visual com observação → elemento DarkAds correspondente → diferença → decisão de Alex.
4. Após aprovação item a item, alterar apenas os elementos especificados por Alex. Até lá, esta revisão não altera a página publicada, copy, animação, arte ou oferta.
