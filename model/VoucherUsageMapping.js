import { DataTypes } from "sequelize";
import { voucherDB } from "../utils/dbConfig.js";

export const VoucherUsageMapping = voucherDB.define(
  "VoucherUsageMapping",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CompanyName: {
      type: DataTypes.STRING(200),
    },
    MerchantID: {
      type: DataTypes.STRING(20),
    },
    LocationCode: {
      type: DataTypes.STRING(20),
    },
    Login: {
      type: DataTypes.STRING(50),
    },
    Password: {
      type: DataTypes.STRING(50),
    },
    SecretKey: {
      type: DataTypes.STRING(50),
    },
    PartnerKey: {
      type: DataTypes.STRING(50),
    },
    ApiUrl: {
      type: DataTypes.STRING(200),
    },
    POST: {
      type: DataTypes.STRING(50),
    },
    RecordStatus: {
      type: DataTypes.INTEGER,
    },
    CreatedBy: {
      type: DataTypes.STRING(150),
    },
    CreatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    UpdatedBy: {
      type: DataTypes.STRING(150),
    },
    UpdatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false, tableName: "VoucherUsageMapping" }
);
