import { DataTypes } from "sequelize";
import { skybillingDB } from "../utils/dbConfig.js";

export const SetupRole = skybillingDB.define(
  "SetupRole",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Description: {
      type: DataTypes.STRING(150),
    },
    CreatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
    },
    UpdatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    UpdatedBy: {
      type: DataTypes.INTEGER,
    },
    RecordStatus: {
      type: DataTypes.TINYINT,
    },
  },
  { timestamps: false, tableName: "SetupRole" }
);
