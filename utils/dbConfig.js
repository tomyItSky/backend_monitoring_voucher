import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// Konfigurasi untuk database skybillingDB
const skybillingDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    timezone: "+07:00",
  }
);

// const skybillingDBLogs = new Sequelize(
//   process.env.DB_NAME_LOGS,
//   process.env.DB_USER_LOGS,
//   process.env.DB_PASSWORD_LOGS,
//   {
//     host: process.env.DB_HOST_LOGS,
//     dialect: "mysql",
//     logging: false,
//     timezone: "+07:00",
//   }
// );

// Konfigurasi untuk database voucher
const voucherDB = new Sequelize(
  process.env.DB_NAME_VOUCHER,
  process.env.DB_USER_VOUCHER,
  process.env.DB_PASSWORD_VOUCHER,
  {
    host: process.env.DB_HOST_VOUCHER,
    dialect: "mysql",
    logging: false,
    timezone: "+07:00",
  }
);

// Konfigurasi untuk database voucher_log
const voucherLogDB = new Sequelize(
  process.env.DB_NAME_VOUCHER_LOG,
  process.env.DB_USER_VOUCHER_LOG,
  process.env.DB_PASSWORD_VOUCHER_LOG,
  {
    host: process.env.DB_HOST_VOUCHER_LOG,
    dialect: "mysql",
    logging: false,
    timezone: "+07:00",
  }
);

export { skybillingDB, voucherDB, voucherLogDB };
