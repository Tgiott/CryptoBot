function calcSMA(data: any[]): number {
    const closes = data.map((candle) => parseFloat(candle[4]));
    const sum = closes.reduce((anterior, atual) => anterior + atual, 0);
    return sum / data.length;
}

export { calcSMA };