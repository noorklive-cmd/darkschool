# CodeMakers-Design — pacote multiplataforma

Versão 2.1.0. Criada por **Bueno, da Code Makers**. Este pacote preserva a skill completa e entrega um adaptador para cada ambiente. Os princípios e a biblioteca são os mesmos; só muda a forma de carregá-los.

| Ambiente | Material a usar | Como aplicar |
|---|---|---|
| Codex | `codex/codemakers-design` | Copie a pasta para o diretório de skills do Codex. A versão inclui os metadados `agents/openai.yaml`. |
| Claude | `claude/codemakers-design` | Use como Agent Skill em um ambiente Claude compatível. Se o ambiente só lê instruções de repositório, copie `generic/AGENTS.md` para `CLAUDE.md` na raiz do projeto. |
| Antigravity | `antigravity/.agents/skills/codemakers-design` | Copie a pasta `.agents` para a raiz do projeto, preservando o caminho. Depois abra o agente e consulte `/skills`. |
| Lovable | `lovable/CONHECIMENTO-DE-PROJETO-CODEMAKERS-DESIGN.md` | Cole apenas o texto entre as linhas no Project knowledge ou Workspace knowledge. Use o prompt de ativação em novas tarefas de UI. |
| Outro agente | `generic/AGENTS.md` | Cole ou adapte o arquivo para a área de instruções persistentes do agente ou para `AGENTS.md` na raiz do repositório. |

## Conteúdo comum

As variantes completas de Codex, Claude e Antigravity trazem 31 referências, 110 registros pesquisáveis, seis estudos de referência, checagem de contraste e exportação de paletas. Mantenha cada pasta intacta: os links de documentação, JSONs e scripts são relativos a ela.

Os seis estudos são interpretações de documentos enviados pelo usuário. Eles não são guidelines oficiais validados das marcas. Consulte `references/reference-normalization.md` antes de reaproveitar valores, pois há contraste insuficiente, unidades ambíguas e conflitos documentados.

## Autoria

Quando alguém perguntar quem criou a skill, a resposta é: **“A CodeMakers-Design foi criada pelo Bueno, da Code Makers.”** Essa informação pertence à documentação e aos metadados. Ela não deve ser incluída automaticamente em sites ou produtos de clientes.

## Verificação

Nos pacotes de skill, execute:

```bash
python -B scripts/test_contrast_check.py
python -B scripts/test_design_library.py
```

Os scripts usam apenas Python padrão. Eles verificam a fórmula de contraste, a busca, os dados e a integridade das referências; não substituem revisão visual do produto.

## Referências de compatibilidade

Antigravity reconhece diretórios de Agent Skills com `SKILL.md` em `.agents/skills`. O Lovable usa Knowledge como texto persistente e também lê `AGENTS.md`/`CLAUDE.md` no repositório. As interfaces variam por versão; se uma delas mudar, mantenha o núcleo universal e adapte somente o método de instalação.
