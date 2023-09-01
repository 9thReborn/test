import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Account } from "../models/accountModel";
import { accountCreationSchema, options } from "../utils/joiValidation";
import { GenerateAccountNumber } from "../utils/generateAccNum";


/************ CreateAccount *************/
export const CreateAccount = async (req: Request, res: Response) => {
  try {
    const idGenerator = uuidv4();
    const { accountHolderName, accountHolderDoB, accountType, initialBalance } =
      req.body;

    const validationResult = await accountCreationSchema.validate(
      req.body,
      options
    );

    if (validationResult.error) {
      return res
        .status(400)
        .json({ Error: validationResult.error.details[0].message });
    }
    const { accountNumber } = GenerateAccountNumber();

    const account = await Account.findOne({
      where: { accountNumber },
    });

    if (!account) {
      const createAccount = await Account.create({
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
    } else {
      return res.status(400).json({
        Error: "Account already exists",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "/account/create",
    });
  }
};

/************* GetAccount *******************/

export const GetAccount = async (req: Request, res: Response) => {
  try {
    const { accountNumber } = req.body;

    const accountDetails = await Account.findOne({
      where: {accountNumber: accountNumber}
    });
    if (!accountDetails) {
      return res.status(404).json({ Error: "Account not found" });
    }
    return res.status(200).json(accountDetails);
  } catch (error) {
    return res.status(500).json({
      Error: "Server error ",
      route: "/account/get",
    });
  }
};


/************* GetAllAccount *******************/

export const GetAllAccounts = async (req: Request, res: Response) => {
  try {
    const allAccounts = await Account.findAndCountAll();

    return res.status(200).json({
      count: allAccounts.count,
      data: allAccounts.rows
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server error ",
      route: "/account/getAll",
    });
  }
};
