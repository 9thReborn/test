"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAccounts = exports.GetAccount = exports.CreateAccount = void 0;
const uuid_1 = require("uuid");
const accountModel_1 = require("../models/accountModel");
const joiValidation_1 = require("../utils/joiValidation");
const generateAccNum_1 = require("../utils/generateAccNum");
/************ CreateAccount *************/
const CreateAccount = async (req, res) => {
    try {
        const idGenerator = (0, uuid_1.v4)();
        const { accountHolderName, accountHolderDoB, accountType, initialBalance } = req.body;
        const validationResult = await joiValidation_1.accountCreationSchema.validate(req.body, joiValidation_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        const { accountNumber } = (0, generateAccNum_1.GenerateAccountNumber)();
        const account = await accountModel_1.Account.findOne({
            where: { accountNumber },
        });
        if (!account) {
            const createAccount = await accountModel_1.Account.create({
                id: idGenerator,
                accountNumber: accountNumber,
                accountHolderName,
                accountType,
                initialBalance,
            });
            return res.status(201).json({
                createAccount,
                msg: "Account created successfully",
            });
        }
        else {
            return res.status(400).json({
                Error: "Account already exists",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/account/create",
        });
    }
};
exports.CreateAccount = CreateAccount;
/************* GetAccount *******************/
const GetAccount = async (req, res) => {
    try {
        const { accountNumber } = req.body;
        const accountDetails = await accountModel_1.Account.findOne({
            where: { accountNumber: accountNumber }
        });
        if (!accountDetails) {
            return res.status(404).json({ Error: "Account not found" });
        }
        return res.status(200).json(accountDetails);
    }
    catch (error) {
        return res.status(500).json({
            Error: "Server error ",
            route: "/account/get",
        });
    }
};
exports.GetAccount = GetAccount;
/************* GetAllAccount *******************/
const GetAllAccounts = async (req, res) => {
    try {
        const allAccounts = await accountModel_1.Account.findAndCountAll();
        return res.status(200).json({
            count: allAccounts.count,
            data: allAccounts.rows
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server error ",
            route: "/account/getAll",
        });
    }
};
exports.GetAllAccounts = GetAllAccounts;
