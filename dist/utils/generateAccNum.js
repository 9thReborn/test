"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAccountNumber = void 0;
const GenerateAccountNumber = () => {
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return { accountNumber };
};
exports.GenerateAccountNumber = GenerateAccountNumber;
