const test = require("node:test");
const assert = require("node:assert");
const { somar, saudacao } = require("../app");

test("somar", () => assert.strictEqual(somar(2, 3), 5));
test("saudacao", () => assert.strictEqual(saudacao("Ana"), "Olá, Ana!"));
