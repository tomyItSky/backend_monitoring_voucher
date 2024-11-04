import { DataTypes } from "sequelize";
import { voucherDB } from "../utils/dbConfig.js";

export const InquiryTransaction = voucherDB.define(
  "InquiryTransaction",
  {
    Id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    CompanyName: {
      type: DataTypes.STRING(200),
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
    ProjectCategoryId: {
      type: DataTypes.INTEGER,
    },
    ProjectCategoryName: {
      type: DataTypes.STRING(20),
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
    UpdatedBy: {
      type: DataTypes.STRING(50),
    },
    UpdatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false, tableName: "InquiryTransaction" }
);
