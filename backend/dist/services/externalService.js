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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSurpriseData = exports.getMeme = exports.getTrumpQoute = exports.getChuckNorris = void 0;
var axios_1 = __importDefault(require("axios"));
var cachedApi_1 = __importDefault(require("./cachedApi"));
// API URL's
var chuckNorrisUrl = 'https://api.chucknorris.io/jokes/random';
var trumpQouteUrl = 'https://api.whatdoestrumpthink.com/api/v1/quotes/personalized';
var trumpBackgroundUrl = 'http://www.splashbase.co/api/v1/images';
var memesUrl = 'https://api.imgflip.com/get_memes';
// Caching special for memes list, cause it's huge
var memesCachedApi = cachedApi_1.default(memesUrl);
// Get Chuck Norris
exports.getChuckNorris = function () {
    return axios_1.default.get(chuckNorrisUrl).then(function (_a) {
        var data = _a.data;
        return ({
            surprise_type: 'ChuckNorris',
            image_url: data.icon_url,
            message: data.value,
        });
    });
};
// Get Trump Motivation Qoute and Background for this qoute
exports.getTrumpQoute = function (_a) {
    var name = _a.name, birthDate = _a.birthDate;
    var qouteRequest = function () { return axios_1.default.get(trumpQouteUrl + "?q=" + name); };
    var backgroundRequest = function () { return axios_1.default.get(trumpBackgroundUrl + "/" + birthDate.getDate()); };
    return Promise.all([qouteRequest(), backgroundRequest()]).then(function (_a) {
        var qouteResponse = _a[0], backgroundResponse = _a[1];
        var qoute = qouteResponse.data;
        var background = backgroundResponse.data;
        return {
            surprise_type: 'TrumpQoute',
            message: qoute.message,
            image_url: background.url,
        };
    });
};
// Get Meme
exports.getMeme = function (_a) {
    var name = _a.name;
    return memesCachedApi.get(memesUrl).then(function (_a) {
        var data = _a.data;
        var n = name.replace(/\s/g, '').length;
        var memesList = data.data.memes;
        var memeByNameLength = memesList[n];
        return {
            surprise_type: 'Meme',
            image_url: memeByNameLength.url,
            message: memeByNameLength.name,
        };
    });
};
exports.getSurpriseData = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var availableSurprises;
    return __generator(this, function (_a) {
        availableSurprises = [];
        if (userData.birthDate.getFullYear() <= 2000) {
            availableSurprises.push(exports.getChuckNorris);
        }
        else if (!['a', 'z'].includes(userData.name[0].toLowerCase())) {
            availableSurprises.push(exports.getTrumpQoute);
        }
        if (userData.name[0].toLowerCase() !== 'q') {
            availableSurprises.push(exports.getMeme);
        }
        return [2 /*return*/, (availableSurprises.length > 1
                ? availableSurprises[Math.floor(Math.random() * availableSurprises.length)]
                : availableSurprises[0])(userData)];
    });
}); };
