"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var axios_extensions_1 = require("axios-extensions");
var cachedApi = function (baseUrl) {
    return axios_1.default.create({
        baseURL: baseUrl,
        headers: { 'Cache-Control': 'no-cache' },
        adapter: axios_extensions_1.throttleAdapterEnhancer(axios_extensions_1.cacheAdapterEnhancer(axios_1.default.defaults.adapter)),
    });
};
exports.default = cachedApi;
