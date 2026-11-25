# Prompt master — Neneka / Dark School

Você é o time completo de direção, pesquisa, design, conteúdo, engenharia, acessibilidade e QA da Dark School. Construa um site de apresentação artística de alto valor para a artista Neneka, usando este repositório como fonte de verdade.

## Objetivo

Criar uma experiência web brutalista moderna, autoral e responsiva que apresente Neneka como uma artista de rap/trap underground em movimento, destaque música e lançamentos, encaminhe ouvintes para o Spotify e ofereça uma porta profissional para booking, imprensa e colaborações.

## Fontes confirmadas

- Instagram: https://www.instagram.com/nenekagoat/
- Spotify: https://open.spotify.com/artist/4wiuq3MtKk8hrUpDz6JrQW
- YouTube: https://www.youtube.com/watch?v=L1y1sk8HLfo

Dados observados no Spotify em 25/11/2026:

- 13.338 ouvintes mensais.
- Último lançamento exibido: Tempo Relativo.
- EP exibido: NEBREK, Vol. 2 (2026).
- Pré-lançamento exibido: BAGULHO É LOKO E NÃO DA BRISA.
- Faixas populares: Berço, bleff e trampando quieto.
- Conceito textual exibido no perfil: TEM QUE SER ENGRENAGEM ⚙️.
- Colaborações recorrentes: Engrenaboyz, hashi tzz, Nebrugg, Young monk, Dom Spike e outros.

## Direção criativa

Use TEM QUE SER ENGRENAGEM como eixo conceitual. A página deve parecer uma máquina editorial underground em funcionamento: pressão, atrito, repetição, ruído, deslocamento e energia.

Paleta inicial: preto profundo, branco sujo, vermelho de choque, azul petróleo opcional quando aparecer nos assets e metal/cinza para bordas e microtextos.

Use tipografia display condensada, pesada e expansiva para NENEKA e títulos; mono ou grotesca para metadados, créditos e labels; corpo mínimo de 16px e contraste alto.

Linguagem visual: grid quebrado, blocos deslocados, bordas grossas, textura de xerox, ruído, impressão falha, carimbo, imagem grande, crop agressivo e sobreposição de texto. Movimento curto e funcional, com fallback para prefers-reduced-motion. Nunca transformar a interface em paródia ou excesso ilegível.

## Assets

Os assets públicos observados no Spotify estão em neneka/assets/spotify/ no workspace local e possuem manifest.json com URLs de origem. São referência de pesquisa/prototipagem. Antes da publicação, verificar direito de uso e substituir por versões autorizadas quando necessário.

Assets relevantes observados:

- 42b6a38c72ec69d8: ilustração de rosto em preto e branco com detalhes vermelhos;
- 13a32071764bb832: capa fotográfica escura com arma e luz azul;
- 80e859d20f60db95: ilustração noturna/cartunesca em ambiente urbano;
- 1717685830dbcdff: fotografia crua de quarto/ambiente doméstico;
- da65b319d0a76977: arte da playlist This Is neneka;
- imagens ab67616... em baixa e alta resolução para capas e miniaturas.

## Arquitetura obrigatória

1. Hero: NENEKA em escala extrema, conceito ENGRENAGEM, CTA para ouvir no Spotify.
2. Lançamento em destaque: Tempo Relativo ou lançamento mais atual confirmado.
3. Música: faixas populares, discografia selecionada e links externos reais.
4. Vídeo: BECK PODEROSO e outros vídeos confirmados.
5. Sistema/manifesto: texto curto construído apenas com fatos e linguagem aprovada.
6. Colaborações: artistas e coletivos confirmados nas fontes.
7. Booking/imprensa: placeholder explícito até o cliente fornecer contato.
8. Rodapé: Spotify, Instagram, YouTube e créditos.

## Regras

- Não inventar cidade, idade, biografia, prêmios, agenda ou números não observados.
- Marcar textos provisórios com TODO — VALIDAR COM ARTISTA.
- Não usar letras de músicas protegidas; usar apenas títulos, créditos e links.
- Não publicar imagens coletadas sem validação de direitos.
- Implementar mobile-first, acessibilidade, foco visível, alt text, reduced motion, lazy loading e links testados.
- Registrar arquivos modificados, decisões e limitações em neneka/README.md.

Comece lendo neneka/pesquisa-posicionamento.md, este prompt e o manifest.json dos assets. Depois proponha a estrutura de arquivos, implemente a primeira versão completa e revise visualmente antes de considerar o trabalho concluído.