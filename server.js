import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import users from "./route/Users/users.js";
import InquiryTicket from "./route/Voucher/InquiryTicket.js";
import InquiryTransaction from "./route/Transaction/Transactions.js";
import Summary from "./route/Summary/Summary.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: [
      "*",
      "http://localhost:3000",
      "https://devmonitoring.skyparking.online",
    ],
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/v01/monitoring-voucher/api", users);
app.use("/v01/monitoring-voucher/api", InquiryTicket);
app.use("/v01/transaction-parking/api", InquiryTransaction);
app.use("/v01/summary/api", Summary);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
