import express from "express";
import {
  CreateAccount,
  GetAccount,
  GetAllAccounts,
} from "../controllers/accountController";

const router = express.Router();

router.post("/create", CreateAccount);
router.post("/get", GetAccount);
router.get("/getAll", GetAllAccounts);

export default router;
