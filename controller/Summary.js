import { Op } from "sequelize";
import { VoucherInquiryTicket } from "../model/VoucherInquiryTicket.js";
import { VoucherRedemption } from "../model/VoucherRedemption.js";
import { InquiryTransaction } from "../model/InquiryTransaction.js";
import { PaymentConfirmation } from "../model/PaymentConfirmation.js";

export const getSummary = async (req, res) => {
  try {
    // Ambil parameter tanggal dari query string
    const { startDate, endDate } = req.query;

    // Jika parameter tanggal ada, pastikan formatnya valid
    let dateFilter = {};
    if (startDate && endDate) {
      const start = new Date(`${startDate}T00:00:00`);
      const end = new Date(`${endDate}T23:59:59`);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
          message: "Format tanggal tidak valid. Gunakan format YYYY-MM-DD.",
        });
      }

      dateFilter = {
        CreatedOn: {
          [Op.between]: [start, end],
        },
      };
    }

    // Ambil data dengan filter tanggal jika ada
    const voucherInquiryTickets = await VoucherInquiryTicket.count({
      where: dateFilter,
      attributes: ["Id", "CreatedOn"],
    });
    const voucherRedemptions = await VoucherRedemption.count({
      where: dateFilter,
      attributes: ["Id", "CreatedOn"],
    });
    const inquiryTransactions = await InquiryTransaction.count({
      where: dateFilter,
      attributes: ["Id", "CreatedOn"],
    });
    const paymentConfirmations = await PaymentConfirmation.count({
      where: dateFilter,
      attributes: ["Id", "CreatedOn"],
    });

    const totalVoucherInquiryTickets = voucherInquiryTickets;
    const totalVoucherRedemptions = voucherRedemptions;
    const totalInquiryTransactions = inquiryTransactions;
    const totalPaymentConfirmations = paymentConfirmations;

    res.status(200).json({
      totalVoucherInquiryTickets,
      totalVoucherRedemptions,
      totalInquiryTransactions,
      totalPaymentConfirmations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
