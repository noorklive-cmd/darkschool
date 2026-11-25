# Pesquisa inicial — DarkAds e Project Six

**Data:** 24/11/2026  
**Status:** consulta de referência visual e descrição do Code Makers; não é auditoria técnica nem validação de resultado comercial.

## Project Six

Fonte consultada: https://p6.chat/

A página atual apresenta navegação por etapas, explica a oferta em seções sequenciadas, usa uma demonstração visual de produto, separa comunidade de preço e termina com dúvidas frequentes. Para DarkAds, esses são somente princípios gerais de hierarquia, ritmo, clareza de oferta e experiência mobile. A direção editorial e os componentes foram desenvolvidos para a identidade DarkAds.

Não reutilizar nome, marca, copy, layout distintivo, código, imagens, vídeos, depoimentos ou provas sociais do Project Six.

## Vídeo enviado pelo responsável

https://youtu.be/Ucp2NjKdtEk?is=qEdF-j_8zSdNNCrU

A ferramenta de consulta não conseguiu buscar o vídeo e retornou `DisabledError`. O vídeo e as legendas não foram analisados. Revisão do conteúdo permanece pendente.

## Code Makers

Fonte oficial: https://www.codemakers.com.br/

A página oficial indexada descreve uma plataforma para encontrar clientes, conduzir a venda, organizar a execução e acompanhar o resultado de cada projeto. A página DarkAds apresenta o Code Makers como ferramenta independente prevista para apoiar o fluxo de criação. Não há confirmação de parceria, desconto, bônus ou acesso incluso; o texto deixa claro que o Code Makers não integra a compra do DarkAds e não é requisito para ela.

## Direito de arrependimento

Fonte legal: Código de Defesa do Consumidor, art. 49: https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm

A contratação fora do estabelecimento comercial pode ser desfeita no prazo de 7 dias contado da assinatura ou do recebimento do produto/serviço, conforme o caso. Os valores eventualmente pagos devem ser devolvidos nos termos da legislação aplicável. Não atribuir essa regra à política do Project Six nem prometer condição comercial adicional sem confirmação.

## Decisões comerciais confirmadas

- Oferta principal: R$ 33,30 em pagamento único.
- Acesso vitalício ao material adquirido, conforme checkout.
- Discord gratuito para conexão mútua.
- Sessão individual separada, duração mínima de uma hora; preço e contratação pendentes.
- Materiais planejados em categorias de vídeos, automações e templates; composição e quantidades ainda não definidas.
- InfinitePay será usado para os pagamentos; o checkout oficial está sendo criado. URL e meios ativos permanecem pendentes.
- Nenhuma renda, vendas, comissão, aprovação de anúncios ou prazo de resultado pode ser prometido.

## Estado da prévia

- Fonte: [sites/darkads/index.html](../sites/darkads/index.html).
- A página está registrada no repositório Dark School em `sites/darkads/`.
- CTA de compra desativado até concluir o checkout oficial da InfinitePay e conectar a URL real.
- Sem anúncio de formas de pagamento.
- Ação do Discord oculta até confirmar que o link de convite está ativo. Existe um URL em registros anteriores, porém sua atividade não foi validada nesta sessão.
- Sessão individual escondida.
- O produto ainda não foi publicado nem implantado em produção.
- A verificação visual em navegador desktop/mobile ficou bloqueada: o navegador remoto não conseguiu acessar o preview local (`ERR_CONNECTION_REFUSED`) e bloqueou navegação `file://`. Não declarar revisão visual como concluída.

## Próximos passos

1. Concluir checkout oficial na InfinitePay ao finalizar a página de vendas/destino; inserir URL e validar os meios de pagamento e o destino pós-compra.
2. Confirmar o inventário e a organização do produto.
3. Abrir uma prévia acessível ao navegador para a revisão visual de desktop e mobile.
4. Revisar os dados legais, suporte e condições comerciais antes da aprovação de publicação.

## Limitações da execução

O ambiente não expõe integração ou sessão autenticada do Code Makers. A fonte pública oficial foi consultada para conferir a descrição; a ferramenta não foi operada na criação. A revisão de desktop/mobile não foi concluída porque o navegador remoto não conseguiu acessar o servidor local. A página está versionada no repositório e permanece sem deploy de produção.


## Registro da demo — 25/11/2026

- O nome “Night15k” foi interpretado como referência ao fundador associado publicamente ao Project Six; a página oficial apresenta hierarquia, etapas, comunidade, oferta e FAQ. Usamos apenas padrões gerais, sem copiar provas, resultados, marca, copy ou componentes específicos. Fonte: https://p6.chat/
- Demo DarkAds implantada com sucesso como Site privado: https://darkads-v1.muddybride16.chatgpt.site
- A landing page é responsiva e mantém o CTA inativo até o checkout InfinitePay ser conectado. A página de membros é protótipo visual e não possui autenticação nem conteúdo final.
- A inspeção visual no navegador remoto ficou pendente porque a URL privada exigiu login da conta proprietária, indisponível nessa sessão de QA.
- Ver inventário final, checkout, autenticação/entrega, convite Discord e suporte em [produtos/darkads.md](../produtos/darkads.md) e [sites/darkads/README.md](../sites/darkads/README.md).
