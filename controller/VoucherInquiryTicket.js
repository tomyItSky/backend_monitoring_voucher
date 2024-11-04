import { Op } from "sequelize";
import { VoucherInquiryTicket } from "../model/VoucherInquiryTicket.js";
import { VoucherInquiryMapping } from "../model/VoucherInquiryTicketMapping.js";
import { VoucherRedemption } from "../model/VoucherRedemption.js";
import { VoucherUsage } from "../model/VoucherUsage.js";
import { VoucherUsageMapping } from "../model/VoucherUsageMapping.js";

export const getVouchers = async (req, res) => {
  const { page = 1, limit = 10, search = "", from = "", to = "" } = req.query;

  const parsedFrom = from ? new Date(`${from}T00:00:00`) : null;
  const parsedTo = to ? new Date(`${to}T23:59:59`) : null;

  const searchCondition = search
    ? {
        [Op.or]: [
          { CompanyName: { [Op.like]: `%${searchQuery}%` } },
          { MerchantID: { [Op.like]: `%${searchQuery}%` } },
          { TransactionNo: { [Op.like]: `%${searchQuery}%` } },
          { LocationCode: { [Op.like]: `%${searchQuery}%` } },
        ],
      }
    : {};

  const dateCondition = {};
  if (parsedFrom && parsedTo) {
    dateCondition.CreatedOn = {
      [Op.between]: [parsedFrom, parsedTo],
    };
  } else if (parsedFrom) {
    dateCondition.CreatedOn = {
      [Op.gte]: parsedFrom,
    };
  } else if (parsedTo) {
    dateCondition.CreatedOn = {
      [Op.lte]: parsedTo,
    };
  }

  const conditions = {
    ...(search ? searchCondition : {}),
    ...dateCondition,
  };

  const { rows: voucherList, count: totalItems } =
    await VoucherInquiryTicket.findAndCountAll({
      where: conditions,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [["CreatedOn", "DESC"]],
    });

  const totalPages = Math.ceil(totalItems / limit);

  return res.json({
    status: "success",
    totalItems,
    totalPages,
    currentPage: parseInt(page),
    voucherList,
  });
};

export const getVoucherById = async (req, res) => {
  try {
    const { id: voucherId } = req.params;

    const voucher = await VoucherInquiryTicket.findOne({
      where: { id: voucherId },
    });

    if (!voucher) {
      return res
        .status(404)
        .json({ status: "fail", message: "Voucher not found" });
    }

    return res.json({ status: "success", voucher });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getInquiryMapping = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query; // Default values for pagination and search

    // Construct the search condition
    const searchCondition = {
      [Op.or]: [
        { CompanyName: { [Op.like]: `%${search}%` } },
        { MerchantID: { [Op.like]: `%${search}%` } },
        { LocationCode: { [Op.like]: `%${search}%` } },
        { Login: { [Op.like]: `%${search}%` } },
      ],
    };

    // Pagination logic
    const offset = (page - 1) * limit;

    // Query the database for voucher inquiry mappings with pagination and search
    const { rows: vouchers, count: totalItems } =
      await VoucherInquiryMapping.findAndCountAll({
        where: search ? searchCondition : {}, // Apply search if provided
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["CreatedOn", "DESC"]], // Order by created date, descending
      });

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      status: "success",
      totalItems,
      totalPages,
      currentPage: parseInt(page),
      vouchers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getInquiryMappingById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameter

    // Find the voucher inquiry mapping by ID
    const voucher = await VoucherInquiryMapping.findOne({
      where: { Id: id },
    });

    // If no voucher found, return an error
    if (!voucher) {
      return res
        .status(404)
        .json({ status: "fail", message: "Voucher not found" });
    }

    return res.json({
      status: "success",
      voucher,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getAllRedemptions = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", from = "", to = "" } = req.query;

    const parsedFrom = from ? new Date(`${from}T00:00:00`) : null;
    const parsedTo = to ? new Date(`${to}T23:59:59`) : null;

    const searchCondition = {
      [Op.or]: [
        { CompanyName: { [Op.like]: `%${search}%` } },
        { MerchantID: { [Op.like]: `%${search}%` } },
        { LocationCode: { [Op.like]: `%${search}%` } },
        { TransactionNo: { [Op.like]: `%${search}%` } },
        { CustomerVehiclePlateNo: { [Op.like]: `%${search}%` } },
        { CustomerMobileNo: { [Op.like]: `%${search}%` } },
      ],
    };

    const dateCondition = {};
    if (parsedFrom && parsedTo) {
      dateCondition.CreatedOn = {
        [Op.between]: [parsedFrom, parsedTo],
      };
    } else if (parsedFrom) {
      dateCondition.CreatedOn = {
        [Op.gte]: parsedFrom,
      };
    } else if (parsedTo) {
      dateCondition.CreatedOn = {
        [Op.lte]: parsedTo,
      };
    }

    // Pagination logic
    const offset = (page - 1) * limit;

    const conditions = {
      ...(search ? searchCondition : {}),
      ...dateCondition,
    };

    // Query the database for voucher redemptions with pagination and search
    const { rows: redemptions, count: totalItems } =
      await VoucherRedemption.findAndCountAll({
        where: conditions,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["CreatedOn", "DESC"]],
      });

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      status: "success",
      totalItems,
      totalPages,
      currentPage: parseInt(page),
      redemptions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getRedemptionById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameter

    // Find the voucher redemption by ID
    const redemption = await VoucherRedemption.findOne({
      where: { Id: id },
    });

    // If no redemption found, return an error
    if (!redemption) {
      return res
        .status(404)
        .json({ status: "fail", message: "Voucher redemption not found" });
    }

    return res.json({
      status: "success",
      redemption,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getAllRedemptionMappings = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query; // Default values for pagination and search

    // Construct the search condition
    const searchCondition = {
      [Op.or]: [
        { CompanyName: { [Op.like]: `%${search}%` } },
        { MerchantID: { [Op.like]: `%${search}%` } },
        { LocationCode: { [Op.like]: `%${search}%` } },
        { Login: { [Op.like]: `%${search}%` } },
      ],
    };

    // Pagination logic
    const offset = (page - 1) * limit;

    // Query the database for voucher inquiry mappings with pagination and search
    const { rows: mappings, count: totalItems } =
      await VoucherInquiryMapping.findAndCountAll({
        where: search ? searchCondition : {}, // Apply search if provided
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["CreatedOn", "DESC"]], // Order by created date, descending
      });

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      status: "success",
      totalItems,
      totalPages,
      currentPage: parseInt(page),
      mappings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getRedemptionMappingById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameter

    // Find the voucher inquiry mapping by ID
    const mapping = await VoucherInquiryMapping.findOne({
      where: { Id: id },
    });

    // If no mapping found, return an error
    if (!mapping) {
      return res
        .status(404)
        .json({ status: "fail", message: "Mapping not found" });
    }

    return res.json({
      status: "success",
      mapping,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getAllVoucherUsages = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", from = "", to = "" } = req.query;

    const parsedFrom = from ? new Date(`${from}T00:00:00`) : null;
    const parsedTo = to ? new Date(`${to}T23:59:59`) : null;

    // Construct the search condition
    const searchCondition = {
      [Op.or]: [
        { CompanyName: { [Op.like]: `%${search}%` } },
        { MerchantID: { [Op.like]: `%${search}%` } },
        { LocationCode: { [Op.like]: `%${search}%` } },
        { TransactionNo: { [Op.like]: `%${search}%` } },
        { LicensePlateNo: { [Op.like]: `%${search}%` } },
      ],
    };

    // Pagination logic
    const offset = (page - 1) * limit;

    const dateCondition = {};
    if (parsedFrom && parsedTo) {
      dateCondition.CreatedOn = {
        [Op.between]: [parsedFrom, parsedTo],
      };
    } else if (parsedFrom) {
      dateCondition.CreatedOn = {
        [Op.gte]: parsedFrom,
      };
    } else if (parsedTo) {
      dateCondition.CreatedOn = {
        [Op.lte]: parsedTo,
      };
    }

    const conditions = {
      ...(search ? searchCondition : {}),
      ...dateCondition,
    };

    const { rows: usages, count: totalItems } =
      await VoucherUsage.findAndCountAll({
        where: conditions,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["CreatedOn", "DESC"]],
      });

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      status: "success",
      totalItems,
      totalPages,
      currentPage: parseInt(page),
      usages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getVoucherUsageById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameter

    // Find the voucher usage by ID
    const usage = await VoucherUsage.findOne({
      where: { Id: id },
    });

    // If no usage found, return an error
    if (!usage) {
      return res
        .status(404)
        .json({ status: "fail", message: "Voucher usage not found" });
    }

    return res.json({
      status: "success",
      usage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getAllUsageMappings = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query; // Default values for pagination and search

    // Construct the search condition
    const searchCondition = {
      [Op.or]: [
        { CompanyName: { [Op.like]: `%${search}%` } },
        { MerchantID: { [Op.like]: `%${search}%` } },
        { LocationCode: { [Op.like]: `%${search}%` } },
        { Login: { [Op.like]: `%${search}%` } },
      ],
    };

    // Pagination logic
    const offset = (page - 1) * limit;

    // Query the database for voucher usage mappings with pagination and search
    const { rows: mappings, count: totalItems } =
      await VoucherUsageMapping.findAndCountAll({
        where: search ? searchCondition : {}, // Apply search if provided
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["CreatedOn", "DESC"]], // Order by created date, descending
      });

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      status: "success",
      totalItems,
      totalPages,
      currentPage: parseInt(page),
      mappings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getUsageMappingById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameter

    // Find the voucher usage mapping by ID
    const mapping = await VoucherUsageMapping.findOne({
      where: { Id: id },
    });

    // If no mapping found, return an error
    if (!mapping) {
      return res
        .status(404)
        .json({ status: "fail", message: "Mapping not found" });
    }

    return res.json({
      status: "success",
      mapping,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};
