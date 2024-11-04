import { DataTypes } from "sequelize";
import { voucherDB } from "../utils/dbConfig.js";

export const PaymentConfirmation = voucherDB.define(
  "PaymentConfirmation",
  {
    Id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    NMID: {
      type: DataTypes.STRING(20),
    },
    StoreCode: {
      type: DataTypes.STRING(20),
    },
    TransactionNo: {
      type: DataTypes.STRING(50),
    },
    ReferenceNo: {
      type: DataTypes.STRING(50),
    },
    Amount: {
      type: DataTypes.STRING(50),
    },
    PaymentStatus: {
      type: DataTypes.STRING(50),
    },
    PaymentReferenceNo: {
      type: DataTypes.STRING(50),
    },
    PaymentDate: {
      type: DataTypes.STRING(50),
    },
    PartnerID: {
      type: DataTypes.STRING(50),
    },
    RetrievalReferenceNo: {
      type: DataTypes.STRING(50),
    },
    ApprovalCode: {
      type: DataTypes.STRING(50),
    },
    ReferenceTransactionNo: {
      type: DataTypes.STRING(50),
    },
    DataReceived: {
      type: DataTypes.TEXT,
    },
    DataSend: {
      type: DataTypes.TEXT,
    },
    DataResponse: {
      type: DataTypes.TEXT,
    },
    DataDetailResponse: {
      type: DataTypes.TEXT,
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
  },
  { timestamps: false, tableName: "PaymentConfirmation" }
);
