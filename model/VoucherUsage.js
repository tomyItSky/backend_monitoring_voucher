import { DataTypes } from "sequelize";
import { voucherDB } from "../utils/dbConfig.js";

export const VoucherUsage = voucherDB.define(
  "VoucherUsage",
  {
    Id: {
      type: DataTypes.BIGINT,
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
    TransactionNo: {
      type: DataTypes.STRING(25),
    },
    LicensePlateNo: {
      type: DataTypes.STRING(25),
    },
    InTime: {
      type: DataTypes.DATE,
    },
    GateInCode: {
      type: DataTypes.STRING(20),
    },
    VehicleType: {
      type: DataTypes.STRING(20),
    },
    TotalTariff: {
      type: DataTypes.DECIMAL(18, 2),
    },
    OutTime: {
      type: DataTypes.DATE,
    },
    GateOutCode: {
      type: DataTypes.STRING(20),
    },
    MerchantDataRequest: {
      type: DataTypes.TEXT,
    },
    MerchantDataResponse: {
      type: DataTypes.TEXT,
    },
    POSTDataRequest: {
      type: DataTypes.TEXT,
    },
    POSTDataResponse: {
      type: DataTypes.TEXT,
    },
    CreatedBy: {
      type: DataTypes.STRING(50),
    },
    CreatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    UpdatedBy: {
      type: DataTypes.STRING(50),
    },
    UpdatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false, tableName: "VoucherUsage" }
);
