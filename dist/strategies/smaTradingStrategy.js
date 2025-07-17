"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTradingStrategy = executeTradingStrategy;
const binanceClient_1 = require("../api/binanceClient");
const financialCalculations_1 = require("../utils/financialCalculations");
const environment_1 = require("../config/environment");
let isOpened = false; // Estado específico da estratégia
function executeTradingStrategy() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, binanceClient_1.getKlines)(environment_1.BTCUSDT, environment_1.INTERVAL_15, environment_1.LIMIT);
            if (!data || data.length === 0) {
                console.log("Nenhum dado de klines recebido. Aguardando...");
                return;
            }
            const price = parseFloat(data[data.length - 1][4]);
            const sma = (0, financialCalculations_1.calcSMA)(data);
            console.log(`${environment_1.BTCUSDT} | Price: ${price}`);
            console.log(`SMA: ${sma}`);
            console.log("Is Opened? " + isOpened);
            const buyThreshold = sma * 0.99;
            const sellThreshold = sma * 1.01;
            if (price <= buyThreshold && isOpened === false) {
                console.log("Condição de COMPRA atingida!");
                isOpened = true;
                yield (0, binanceClient_1.newOrder)(environment_1.BTCUSDT, parseFloat(environment_1.QUANTITY), "BUY");
            }
            else if (price >= sellThreshold && isOpened === true) {
                console.log("Condição de VENDA atingida!");
                isOpened = false;
                yield (0, binanceClient_1.newOrder)(environment_1.BTCUSDT, parseFloat(environment_1.QUANTITY), "SELL");
            }
            else {
                console.log("AGUARDANDO...");
            }
        }
        catch (error) {
            console.error("Erro na execução da estratégia de trading:", error.message);
        }
    });
}
