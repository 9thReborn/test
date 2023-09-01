import express from "express";
import {
  CreateAccount,
  GetAccount,
  GetAllAccounts,
} from "../controllers/accountController";

const router = express.Router();

router.post("/create", CreateAccount);
router.get("/get", GetAccount);
router.get("/getAll", GetAllAccounts);

export default router;
