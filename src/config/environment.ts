// Variáveis de ambiente
const LIMIT = process.env.LIMIT || "100";
const INTERVAL_15 = process.env.INTERVAL_15 || "15m";
const BTCUSDT = process.env.BTCUSDT || "BTCUSDT";
const QUANTITY = process.env.QUANTITY ||"2";
const API_URL = process.env.API_URL;
const SECRET_KEY = process.env.SECRET_KEY ||"teste";
const API_KEY = process.env.API_KEY;

// Validação inicial das variáveis de ambiente críticas
if (!API_URL || !SECRET_KEY || !API_KEY || !QUANTITY) {
    console.error(
        "Erro: As variáveis de ambiente API_URL, SECRET_KEY, API_KEY e QUANTITY devem ser definidas."
    );
    process.exit(1);
}

// Exportaria todas as variáveis já validadas
export { LIMIT, INTERVAL_15, BTCUSDT, QUANTITY, API_URL, SECRET_KEY, API_KEY };