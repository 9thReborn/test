"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountController_1 = require("../controllers/accountController");
const router = express_1.default.Router();
router.post("/create", accountController_1.CreateAccount);
router.post("/get", accountController_1.GetAccount);
router.get("/getAll", accountController_1.GetAllAccounts);
exports.default = router;
