import { DataTypes } from "sequelize";
import { voucherLogDB } from "../utils/dbConfig.js";

export const LogUnikasIntegration = voucherLogDB.define(
  "log_unikasintegration",
  {
    Id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    RequestedUrl: {
      type: DataTypes.STRING(100),
    },
    ProjectCategoryId: {
      type: DataTypes.INTEGER,
    },
    ProjectCategoryName: {
      type: DataTypes.STRING(50),
    },
    RequestedParameter: {
      type: DataTypes.TEXT,
    },
    RequestedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    Status: {
      type: DataTypes.STRING(50),
    },
    ResponseData: {
      type: DataTypes.TEXT,
    },
    ExecuteTimeInMiliseconds: {
      type: DataTypes.INTEGER,
    },
    ResponseOn: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: false }
);
