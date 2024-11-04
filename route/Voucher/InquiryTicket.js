import express from "express";
import {
  getVouchers,
  getVoucherById,
  getInquiryMapping,
  getInquiryMappingById,
  getAllRedemptions,
  getRedemptionById,
  getAllRedemptionMappings,
  getRedemptionMappingById,
  getAllVoucherUsages,
  getVoucherUsageById,
  getAllUsageMappings,
  getUsageMappingById,
} from "../../controller/VoucherInquiryTicket.js";

const router = express.Router();

router.get("/vouchers/inquiry", getVouchers);
router.get("/vouchers/inquiry:id", getVoucherById);

router.get("/vouchers/inquiry/mapping", getInquiryMapping);
router.get("/vouchers/inquiry/mapping/:id", getInquiryMappingById);

router.get("/vouchers/redemption", getAllRedemptions);
router.get("/vouchers/redemption/:id", getRedemptionById);

router.get("/vouchers/redemption-mapping", getAllRedemptionMappings);
router.get("/vouchers/redemption-mapping/:id", getRedemptionMappingById);

router.get("/vouchers/usage", getAllVoucherUsages);
router.get("/vouchers/usage/:id", getVoucherUsageById);

router.get("/vouchers/usage-mapping", getAllUsageMappings);
router.get("/vouchers/usage-mapping/:id", getUsageMappingById);

export default router;
