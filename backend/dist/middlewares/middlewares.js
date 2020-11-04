"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("../routes"));
var surpriseRoutes_1 = __importDefault(require("../routes/surpriseRoutes"));
var middleware = express_1.default();
var routes = [routes_1.default, surpriseRoutes_1.default];
exports.middlewares = [
    middleware.use(cors_1.default({
        origin: 'http://localhost:3000',
    })),
    middleware.use(routes),
    middleware.use(express_1.default.json({ type: '*/*' })),
];
