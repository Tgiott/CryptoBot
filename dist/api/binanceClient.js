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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
exports.getKlines = getKlines;
exports.newOrder = newOrder;
const axios_1 = __importDefault(require("axios"));
// Importaria API_URL de config/environment
const environment_1 = require("../config/environment");
const crypto_1 = __importDefault(require("crypto")); // Necessário para assinar as requisições
const instance = axios_1.default.create({
    baseURL: environment_1.API_URL,
});
exports.instance = instance;
function getKlines(symbol, interval, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = new URLSearchParams({ limit, interval, symbol });
        const response = yield instance.get("/api/v3/klines", { params });
        return response.data;
    });
}
function newOrder(symbol, quantity, side) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = "MARKET";
        const timestamp = Date.now();
        const queryString = `symbol=${symbol}&side=${side}&type=${type}&quantity=${quantity}&timestamp=${timestamp}`;
        const signature = crypto_1.default
            .createHmac("sha256", environment_1.SECRET_KEY)
            .update(queryString)
            .digest("hex");
        const { data } = yield instance.post("/api/v3/order", `${queryString}&signature=${signature}`, {
            headers: {
                "X-MBX-APIKEY": environment_1.API_KEY,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return data;
    });
}
