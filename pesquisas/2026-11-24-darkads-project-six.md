# Auditoria visual e adaptação — DarkAds / Project Six

**Data:** 25/11/2026  
**Escopo:** leitura visual da página pública https://p6.chat/ em navegador, com capturas em pontos de rolagem e interação com uma trilha. Não é auditoria de código-fonte nem validação de resultados comerciais. O vídeo do YouTube enviado não foi inspecionado nesta etapa.

## O que observei no Project Six

### Navegação e ritmo
- Cabeçalho em formato de cápsula, fixo durante a rolagem, com âncoras para funcionamento, trilhas, resultados, comunidade, preço e dúvidas.
- CTA vermelho “Criar conta” no topo e uma barra flutuante persistente com a oferta e “Tornar membro”.
- A rolagem apresenta uma narrativa: promessa da hero → explicação por etapas → trilhas → relatos → comunidade → oferta → dúvidas.

### Hero e elemento visual
- Promessa curta e específica sobre vender na Amazon sem gastar com anúncios, apoiada por texto introdutório e indicadores.
- O mascote de bode é descrito pela acessibilidade da página como uma composição em partículas com movimento de corrida, investida e reação ao cursor/toque. Nas capturas, vi a forma de partículas vermelhas e claras reaparecendo na parte inferior junto da CTA final/FAQ.
- A descrição acessível informa a intenção do movimento; não capturei cada quadro de uma animação em vídeo nem medi tempos de animação.

### Explicação e trilhas
- Uma sequência “Como funciona” organiza a entrada em quatro passos.
- A seção “Trilhas” troca de rota por abas. Na aba Infoproduto, a captura mostrou um percurso visual anúncio → página da oferta → checkout, com linha pontilhada vermelha e aviso sobreposto de compra aprovada. Na aba Amazon, vi cards de catálogo e avisos de pedido.
- Essa cena comunica o processo em uma olhada e depois sustenta o entendimento com texto.

### Resultados e comunidade
- Relatos aparecem em cards horizontais com nomes/canais e trechos curtos; a própria página ressalva que os resultados são individuais e não constituem promessa.
- A comunidade usa composição em duas colunas: chamada e citação do fundador à esquerda; prévia visual de conversa em canal à direita; CTA para o Discord.
- A imagem do produto é misturada a elementos que parecem interface, sem depender de grandes fotografias de stock.

### Oferta e dúvidas
- O bloco de preço une valor, condições e lista de itens, acompanhado por CTA de adesão; a barra persistente mantém o acesso à oferta enquanto o visitante navega.
- FAQ em duas colunas, com perguntas em linhas separadas e expansão individual; a primeira resposta já aparece aberta na captura.
- Fundo preto, superfícies grafite, tipografia branca, vermelho para foco e ação, bordas discretas, bastante espaço negativo e poucos ornamentos.

## Modelo de sistema visual inferido
A página aparenta usar um sistema editorial escuro: contraste alto, títulos grandes e compactos, cinza para explicação, vermelho reservado a CTA e estados ativos, cartões arredondados discretos, navegação fixa e blocos de interface como mockups. Isso é uma leitura visual. Não validei bibliotecas, tokens CSS, framework, motor de animação ou medidas exatas do site.

Padrões de movimento visíveis/descritos: cabeçalho e barra de oferta persistentes; conteúdo apresentado progressivamente durante a rolagem; troca de trilha por abas; FAQ expansível; mascote de partículas reativo; toast visual sobre uma rota. A página observada não exige que DarkAds copie os mesmos tempos, formas, textos ou personagem.

## Tradução autoral aplicada ao DarkAds
- **Mascote:** coruja 3D original, associada a visão no escuro, observação e estratégia. Silhueta angular própria, preto/grafite com brilho frio e pequeno ponto rubi. A cabra e sua execução em partículas não foram reproduzidas.
- **Composição:** headline e contexto à esquerda; uma peça visual própria liga conteúdo, página de destino e checkout à direita. A coruja agora aparece acima e ao redor do painel para não desaparecer atrás do mockup.
- **Movimento:** deriva suave da coruja, reação leve ao cursor/toque, toast temporário marcado DEMO/TESTE, entrada progressiva dos blocos e barra de oferta que surge após a hero. Respeita preferência por movimento reduzido.
- **Identidade:** #080808 / #111111 / #F5F5F5 / #A1A1AA, vermelho #E11D2E como sinal de ação. A composição de linhas, painel e marca é própria do DarkAds.
- **Copy:** “Venda no Instagram sem gastar um real em anúncios” é enquadrada como aprendizado sobre conteúdo orgânico; não se afirma resultado garantido. O indicador de R$ 3 milhões, informado pelo responsável, permanece marcado como pendente de documentação antes da divulgação pública.
- **Transparência:** notificações não mostram valores, nomes de compradores nem datas; indicam que o evento é simulado. Não há depoimentos de alunos inventados.

## Estado da implementação em 25/11/2026
- Site privado DarkAds, versão 5, publicada com sucesso para revisão: https://darkads-v1.muddybride16.chatgpt.site
- Preço principal: R$ 33,30 em pagamento único; o botão de compra permanece desativado até concluir o checkout oficial InfinitePay.
- Acesso vitalício ao material comprado, segundo condições do checkout.
- Comunidade Discord gratuita, com foco em conexão mútua; link fornecido pelo responsável está na página.
- Formato e quantidade de vídeos, automações e templates ainda não definidos; a página usa categorias sem inventar inventário.
- Atendimento individual é separado, duração mínima de uma hora; preço e agenda pendentes.
- A área de membros continua sendo somente protótipo sem autenticação, pagamento, entrega protegida ou backend.
- Code Makers está como plataforma independente, não inclusa nem obrigatória.
- Revisão visual da captura desktop da hero feita após o deploy. A inspeção visual interativa completa e o mobile continuam pendentes.

## Pendências antes de vender ou abrir ao público
1. Finalizar e validar o checkout InfinitePay e entrega pós-compra.
2. Fechar inventário e formato reais do produto.
3. Implementar controle de acesso, autenticação, hospedagem e suporte da área de membros.
4. Validar documentação e contexto do indicador de R$ 3 milhões; retirar o dado da página se ele não puder ser substanciado.
5. Definir termos, dados do responsável, suporte e condições comerciais.
6. Definir preço e contratação da sessão individual, se for oferecida.
7. Confirmar funcionamento do convite do Discord antes da divulgação.
8. Analisar o vídeo de referência separadamente, se ainda for necessário.

## Referências
- Página pública Project Six: https://p6.chat/
- Vídeo enviado: https://youtu.be/Ucp2NjKdtEk?is=qEdF-j_8zSdNNCrU — não analisado nesta etapa.
- Código de Defesa do Consumidor, art. 49: https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm
