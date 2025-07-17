import { executeTradingStrategy } from "./strategies/smaTradingStrategy";

async function start() {
  console.clear();
    executeTradingStrategy();

}

// Inicia o bot imediatamente e depois a cada 3 segundos
setInterval(start, 3000);

start();