# Actions Security Lab

Aplicação Node.js simples (`app.js` + testes) cujos **workflows do GitHub Actions têm falhas de segurança propositais**, para praticar o teste de vulnerabilidades descrito na pesquisa. Uso educacional; não use em produção.

## Estrutura
- `.github/workflows/` – workflows **vulneráveis** (alvo da análise)
  - `ci.yml`, `pr-title.yml`, `pr-target.yml`
- `corrigido/workflows/` – versões corrigidas, para o "depois"
- `RELATORIO.md` – relatório preenchido (gabarito) no modelo da pesquisa

## Como fazer o teste
1. Crie um repositório no GitHub e envie todo o conteúdo (mantenha `.github/workflows/`).
2. Abra `.github/workflows` e tire print da pasta.
3. Para cada workflow, procure: `permissions`, `run:` com `github.event.*`, `secrets.*`, `uses:` e `pull_request_target`.
4. Registre cada achado na tabela do relatório (arquivo, linha, risco, evidência, correção).
5. Copie os arquivos de `corrigido/workflows/` sobre `.github/workflows/`, troque `<SHA-COMPLETO>` pelo SHA real de cada ação (página da ação > Releases/Tags > commit) e repita a verificação, com prints do antes e depois.

> Os `<SHA-COMPLETO>` dos arquivos corrigidos são marcadores: o workflow só roda depois de você trocá-los.
> O token em `ci.yml` é falso. Nunca coloque segredos reais no repositório ou em prints.
