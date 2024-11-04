// models/UserActivityLogs.js
import { DataTypes } from "sequelize";
import { skybillingDBLogs } from "../configDb.js";

const UserActivityLogs = skybillingDBLogs.define(
  "UserActivityLogs",
  {
    Id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ActivityType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    CurrentUrl: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    UTCActivityTime: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    RequestFromIP: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    SessionData: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ParamData: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "UserActivityLogs",
    timestamps: false,
  }
);

export default UserActivityLogs;
