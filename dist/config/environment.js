"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY = exports.SECRET_KEY = exports.API_URL = exports.QUANTITY = exports.BTCUSDT = exports.INTERVAL_15 = exports.LIMIT = void 0;
// Variáveis de ambiente
const LIMIT = process.env.LIMIT || "100";
exports.LIMIT = LIMIT;
const INTERVAL_15 = process.env.INTERVAL_15 || "15m";
exports.INTERVAL_15 = INTERVAL_15;
const BTCUSDT = process.env.BTCUSDT || "BTCUSDT";
exports.BTCUSDT = BTCUSDT;
const QUANTITY = process.env.QUANTITY || "2";
exports.QUANTITY = QUANTITY;
const API_URL = process.env.API_URL;
exports.API_URL = API_URL;
const SECRET_KEY = process.env.SECRET_KEY || "teste";
exports.SECRET_KEY = SECRET_KEY;
const API_KEY = process.env.API_KEY;
exports.API_KEY = API_KEY;
// Validação inicial das variáveis de ambiente críticas
if (!API_URL || !SECRET_KEY || !API_KEY || !QUANTITY) {
    console.error("Erro: As variáveis de ambiente API_URL, SECRET_KEY, API_KEY e QUANTITY devem ser definidas.");
    process.exit(1);
}
