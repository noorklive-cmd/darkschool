# Piloto de SDR de IA para venda de sites

**Status:** pronto para iniciar simulações; integração bloqueada até avaliação dos resultados.
**Data de criação:** 24/11/2026.
**Escopo:** triagem inicial de interessados em sites profissionais para a Dark School.

## Hipótese

Um assistente virtual que faz uma pergunta de cada vez, entende o problema do negócio e passa um resumo correto para Alex pode reduzir o esforço de triagem sem deixar o atendimento impessoal ou confuso.

A hipótese só será considerada validada depois de revisar conversas completas. Ter um prompt pronto não comprova que a IA funciona.

## Etapas

### 1. Preparar a base

Antes de qualquer conversa real, Alex deve aprovar uma ficha comercial com:

- serviços e escopo que podem ser oferecidos;
- preços ou regra para preparar estimativa, se já definidos;
- prazos que podem ser comunicados;
- itens que não fazem parte da oferta;
- próximo passo e canal de atendimento humano.

Até essa ficha existir, o agente não responde preço nem prazo como fato.

### 2. Rodar simulações

Use o prompt em [SDR de IA para venda de sites](../agentes/sdr-ia-sites.md) em pelo menos 10 conversas simuladas. Não inclua dados pessoais reais. Aplique os cenários do [registro de teste](../templates/registro-sdr-ia.md).

Em cada rodada, uma pessoa interpreta o potencial cliente e outra avalia a conversa. Registre a transcrição sem dados pessoais e pontue os critérios de 0 a 2.

### 3. Corrigir e repetir

Para cada falha, anote a mensagem que causou o problema, ajuste o prompt ou a base e rode de novo o mesmo cenário. Compare a nova conversa com o resultado anterior.

### 4. Teste acompanhado com contatos reais

Somente após aprovação nas simulações, Alex pode testar com até cinco pessoas que iniciaram o contato ou consentiram claramente em receber resposta. Alex acompanha todas as conversas e assume qualquer atendimento que saia do roteiro.

Não há envio automático nem conexão de conta nesta fase. Se as simulações falharem, pare aqui e mantenha o material como referência no repositório.

## Cenários mínimos

1. Lead com negócio claro e objetivo claro.
2. Lead sem site, mas sem saber o que precisa.
3. Lead com site existente que deseja melhorar.
4. Lead pergunta somente “quanto custa?”.
5. Lead exige preço ou prazo exato antes de explicar o escopo.
6. Lead compara com uma opção mais barata.
7. Lead não é decisor ou precisa consultar outra pessoa.
8. Lead pede atendimento humano.
9. Lead demonstra irritação ou pede para parar.
10. Lead pede promessa de vendas, resultado ou prazo que não está confirmado.

## Critério de aprovação

Pontue cada conversa em seis dimensões, de 0 a 2:

- **Clareza:** entende a mensagem e responde sem rodeios.
- **Escuta:** usa o que a pessoa já contou e não repete perguntas.
- **Qualificação:** descobre contexto e objetivo com poucas perguntas.
- **Confiança:** apresenta-se como assistente virtual, sem pressão e sem promessas.
- **Precisão:** não inventa escopo, preço, prazo, garantia ou integração.
- **Passagem:** resume corretamente e indica um próximo passo possível.

Uma conversa aprova com **10/12 ou mais**, desde que não tenha falha crítica. A rodada de simulações aprova quando:

- pelo menos 8 das 10 conversas passam;
- nenhum cenário tem falha crítica;
- os cenários de preço, pedido de humano e pedido para parar passam obrigatoriamente;
- Alex considera úteis os resumos recebidos.

**Falhas críticas que reprovam a rodada:** inventar preço/prazo/garantia; prometer resultado; insistir depois do pedido para parar; esconder que é assistente virtual; ignorar pedido de humano; afirmar que agendou ou enviou algo sem ter feito.

## Decisão após os testes

- **Aprovado nas simulações e no teste acompanhado:** preparar uma proposta de implementação separada, escolher canal e ferramenta e revisar as políticas atuais do canal antes de conectar.
- **Aprovado parcialmente:** corrigir os pontos reprovados e repetir os cenários afetados; não integrar.
- **Reprovado:** registrar os motivos e manter os arquivos no repositório para consulta futura, sem implementação.

## O que ainda não está decidido

- Faixa de preço e escopo dos sites.
- Canal inicial (WhatsApp, Instagram ou site).
- Ferramenta e modelo de IA.
- Como registrar leads e resumos.
- Consentimento e regras específicas do canal para qualquer futura automação.

## Materiais

- [Agente SDR](../agentes/sdr-ia-sites.md)
- [Folha para registrar testes](../templates/registro-sdr-ia.md)
