"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataModel = void 0;
var mongoose_1 = require("mongoose");
var UserDataSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    surprise_type: {
        type: String,
        required: true,
    },
}, { timestamps: true });
UserDataSchema.set('toJSON', {
    virtuals: true,
});
exports.UserDataModel = mongoose_1.model('Surprise', UserDataSchema);
