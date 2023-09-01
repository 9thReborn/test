import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

export interface AccountAttributes {
  id: string;
  accountHolderName: string;
  accountType: string;
  initialBalance: number;
  accountNumber: number;
}

export class Account extends Model<AccountAttributes> {}

Account.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    accountHolderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initialBalance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: "account",
  }
);
