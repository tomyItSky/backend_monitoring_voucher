import { Op } from "sequelize";
import { InquiryTransaction } from "../model/InquiryTransaction.js";
import { PaymentConfirmation } from "../model/PaymentConfirmation.js";

export const getInquiryTransactions = async (req, res) => {
  const { page = 1, limit = 10, search = "", from = "", to = "" } = req.query;

  const parsedFrom = from ? new Date(`${from}T00:00:00`) : null;
  const parsedTo = to ? new Date(`${to}T23:59:59`) : null;

  const searchCondition = search
    ? {
        [Op.or]: [
          { CompanyName: { [Op.like]: `%${searchQuery}%` } },
          { NMID: { [Op.like]: `%${searchQuery}%` } },
          { TransactionNo: { [Op.like]: `%${searchQuery}%` } },
          { StoreCode: { [Op.like]: `%${searchQuery}%` } },
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

  const { rows: InquiryTransactionList, count: totalItems } =
    await InquiryTransaction.findAndCountAll({
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
    InquiryTransactionList,
  });
};

export const getPaymentTransactions = async (req, res) => {
  const { page = 1, limit = 10, search = "", from = "", to = "" } = req.query;

  const parsedFrom = from ? new Date(`${from}T00:00:00`) : null;
  const parsedTo = to ? new Date(`${to}T23:59:59`) : null;

  const searchCondition = search
    ? {
        [Op.or]: [
          { CompanyName: { [Op.like]: `%${searchQuery}%` } },
          { NMID: { [Op.like]: `%${searchQuery}%` } },
          { TransactionNo: { [Op.like]: `%${searchQuery}%` } },
          { StoreCode: { [Op.like]: `%${searchQuery}%` } },
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

  const { rows: PaymentTransactionList, count: totalItems } =
    await PaymentConfirmation.findAndCountAll({
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
    PaymentTransactionList,
  });
};
