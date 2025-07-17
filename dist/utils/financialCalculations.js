"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcSMA = calcSMA;
function calcSMA(data) {
    const closes = data.map((candle) => parseFloat(candle[4]));
    const sum = closes.reduce((anterior, atual) => anterior + atual, 0);
    return sum / data.length;
}
