"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class Account extends sequelize_1.Model {
}
exports.Account = Account;
Account.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    accountHolderName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    accountType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    initialBalance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    accountNumber: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db_config_1.default,
    tableName: "account",
});
