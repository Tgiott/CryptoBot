import axios from "axios";
// Importaria API_URL de config/environment
import { API_URL, SECRET_KEY, API_KEY } from '../config/environment';
import crypto from "crypto"; // Necessário para assinar as requisições

const instance = axios.create({
    baseURL: API_URL,
});

async function getKlines(symbol: string, interval: string, limit: string) {
    const params = new URLSearchParams({ limit, interval, symbol });
    const response = await instance.get("/api/v3/klines", { params });
    return response.data;
}

async function newOrder(symbol: string, quantity: number, side: "BUY" | "SELL") {
    const type = "MARKET";
    const timestamp = Date.now();
    const queryString = `symbol=${symbol}&side=${side}&type=${type}&quantity=${quantity}&timestamp=${timestamp}`;
    const signature = crypto
        .createHmac("sha256", SECRET_KEY)
        .update(queryString)
        .digest("hex");

    const { data } = await instance.post(
        "/api/v3/order",
        `${queryString}&signature=${signature}`,
        {
            headers: {
                "X-MBX-APIKEY": API_KEY,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    return data;
}

export { getKlines, newOrder, instance }; // Exportaria a instância se necessário para interceptors