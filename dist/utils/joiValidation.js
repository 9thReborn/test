"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.accountCreationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.accountCreationSchema = joi_1.default.object().keys({
    accountHolderName: joi_1.default.string()
        .required()
        .trim()
        .pattern(/^[a-zA-Z\s'-]+$/)
        .min(5)
        .max(50)
        .label("Account Holder Name").messages({
        "string.pattern.base": "{{#label}} contains invalid characters",
        "string.min": "{{#label}} should contain at least {{#limit}} characters",
        "string.max": "{{#label}} should contain at most {{#limit}} characters"
    }),
    accountHolderDoB: joi_1.default.string().required().label("Account Holder Name"),
    accountType: joi_1.default.string().required(),
    initialBalance: joi_1.default.number()
        .required()
        .min(0)
        .label("Initial Balance")
        .messages({ "number.min": "{{#label}} cannot be a negative value" }),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
