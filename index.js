const axios = require("axios")
const crypto = require("crypto")

require("dotenv").config();

let isOpened = false;

const LIMIT = process.env.LIMIT;
const INTERVAL_15 = process.env.INTERVAL_15 
const BTCUSDT = process.env.BTCUSDT;

const QUANTITY= process.env.QUANTITY;
const SELL_PRICE = process.env.SELL_PRICE;
const BUY_PRICE = process.env.BUY_PRICE;


const API_URL = process.env.API_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const API_KEY = process.env.API_KEY;


const params = new URLSearchParams( {
    limit: LIMIT,
    interval:INTERVAL_15,
    symbol: BTCUSDT
});

function calcSMA(data) {

    const closes = data.map( (candle) => parseFloat(candle[4]));
    const sum = closes.reduce((anterior,atual)=> anterior + atual);

    return sum / data.length;
}

const instance = axios.create({
    baseURL: API_URL,
    // headers: {
    //     'Authorization' : `Bearer ${process.env.AUTH_TOKEN}` 
    // }
    });

async function start() {

   console.clear();
   
    await instance.get('/api/v3/klines',{params}).then( function (response) {
        const data = response.data;
        const [,,,,others,candle] = data;
        
        const price = parseFloat(candle[4]);
        const sma = calcSMA(data);
       // CONCEITO DE CANDLE  (PESQUISAR)  
       // const sma21 = calcSMA(data.slice(8));
        
        console.log(`${BTCUSDT} | Price: ${price}`);
        console.log(`SMA: ${sma}`)
     //   console.log(`SMA {21} ${sma21}`)
        console.log('Is Opened? ' + isOpened);

        if(price <= (sma * 0.9) && isOpened === false) {
            isOpened = true;
            newOrder(BTCUSDT, QUANTITY,"buy");
        } 
        else if (price >= (sma * 1.1 ) && isOpened === true) {
            isOpened = false;
            newOrder(BTCUSDT, QUANTITY,"sell");
        } 
        else {
            console.log("WAIT...") 
        }    
    }).catch(error => {
        console.error(error);
      });
}


async function newOrder(symbol, quantity, side) {


    
    const order = {symbol, quantity,side}    
    order.type = 'MARKET';
    order.timestamp = Date.now();

    const signature = crypto.createHmac('sha256',SECRET_KEY)
                    .update(new URLSearchParams(order).toString())
                    .digest('hex');


    order.signature = signature;
    try {
        const {data} = await instance.post('/api/v3/order',
                                         new URLSearchParams(order).toString(),
                                        {headers: {'X-MBX-APIKEY': API_KEY}})

        console.log(data);
         
    } catch (error) {
        
    }

}

setInterval(start, 3000);


start();