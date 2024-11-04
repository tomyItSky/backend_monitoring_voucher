import { DataTypes } from "sequelize";
import { voucherDB } from "../utils/dbConfig.js";

export const VoucherRedemption = voucherDB.define(
  "VoucherRedemption",
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
    TenantID: {
      type: DataTypes.STRING(20),
    },
    LocationCode: {
      type: DataTypes.STRING(20),
    },
    TransactionNo: {
      type: DataTypes.STRING(25),
    },
    TransactionReferenceNo: {
      type: DataTypes.STRING(25),
    },
    TransactionReceiptNo: {
      type: DataTypes.STRING(100),
    },
    TransactionReceiptAmount: {
      type: DataTypes.DECIMAL(18, 2),
    },
    VoucherType: {
      type: DataTypes.STRING(50),
    },
    VoucherValue: {
      type: DataTypes.INTEGER,
    },
    VoucherExpiryDate: {
      type: DataTypes.DATE,
    },
    CustomerVehicleType: {
      type: DataTypes.STRING(20),
    },
    CustomerVehiclePlateNo: {
      type: DataTypes.STRING(20),
    },
    CustomerMobileNo: {
      type: DataTypes.STRING(100),
    },
    CustomerEmail: {
      type: DataTypes.STRING(100),
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
  { timestamps: false, tableName: "VoucherRedemption" }
);
