import express from "express";
import {
  getInquiryTransactions,
  getPaymentTransactions,
} from "../../controller/Transaction.js";

const router = express.Router();

router.get("/transactions/getInquiry", getInquiryTransactions);
router.get("/transactions/paymentConfirmation", getPaymentTransactions);

export default router;
