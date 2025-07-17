import { getKlines, newOrder } from '../api/binanceClient';
import { calcSMA } from '../utils/financialCalculations';
import { BTCUSDT, INTERVAL_15, LIMIT, QUANTITY } from '../config/environment';

let isOpened = false; // Estado específico da estratégia

async function executeTradingStrategy() {
    try {
        const data = await getKlines(BTCUSDT, INTERVAL_15, LIMIT);

        if (!data || data.length === 0) {
            console.log("Nenhum dado de klines recebido. Aguardando...");
            return;
        }

        const price = parseFloat(data[data.length - 1][4]);
        const sma = calcSMA(data);

        console.log(`${BTCUSDT} | Price: ${price}`);
        console.log(`SMA: ${sma}`);
        console.log("Is Opened? " + isOpened);

        const buyThreshold = sma * 0.99;
        const sellThreshold = sma * 1.01;

        if (price <= buyThreshold && isOpened === false) {
            console.log("Condição de COMPRA atingida!");
            isOpened = true;
            await newOrder(BTCUSDT, parseFloat(QUANTITY), "BUY");
        } else if (price >= sellThreshold && isOpened === true) {
            console.log("Condição de VENDA atingida!");
            isOpened = false;
            await newOrder(BTCUSDT, parseFloat(QUANTITY), "SELL");
        } else {
            console.log("AGUARDANDO...");
        }
    } catch (error: any) {
    
        console.error("Erro na execução da estratégia de trading:", error.message);
     
    }
}

export { executeTradingStrategy };