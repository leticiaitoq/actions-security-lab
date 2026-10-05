// Aplicação simples: funções utilitárias + servidor HTTP mínimo.
function somar(a, b) {
  return a + b;
}

function saudacao(nome) {
  return `Olá, ${nome}!`;
}

module.exports = { somar, saudacao };

if (require.main === module) {
  const http = require("http");
  http
    .createServer((req, res) => res.end(saudacao("mundo")))
    .listen(3000, () => console.log("Rodando em http://localhost:3000"));
}
