import { Users } from "../model/Users.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { SetupRole } from "../model/SetupRole.js";

const signToken = (user, rememberMe) => {
  const expiresIn = rememberMe ? "30d" : "1d";

  const payload = {
    Id: user.Id,
    email: user.Email,
    role: user.SetupRoleId,
    sub: user.Username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

const createSendToken = (user, statusCode, res, rememberMe) => {
  const token = signToken(user, rememberMe);

  res.cookie("refreshToken", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + (rememberMe ? 30 : 1) * 24 * 60 * 60 * 1000),
  });

  res.status(statusCode).json({
    status: "success",
    token,
    message: "Login Successful",
  });
};

export const login = async (req, res) => {
  const { identifier, password, rememberMe } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({
      status: "fail",
      message:
        "Please provide an identifier (username, email, or phone number) and password!",
    });
  }

  // Find user by username, email, or phone number
  const user = await Users.findOne({
    where: {
      [Op.or]: [
        { Username: identifier },
        { Email: identifier },
        { HandPhone: identifier }, // Fixed field name
      ],
    },
  });

  if (!user || !(await user.correctPassword(password, user.Password))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect identifier or password",
    });
  }

  // Update the last login time
  user.LastActivity = new Date(); // Save last activity
  await user.save({ validate: false });

  // Pass rememberMe flag to createSendToken function
  createSendToken(user, 200, res, rememberMe);
};

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query; // Default values for pagination and search

    // Construct the search condition
    const searchCondition = {
      [Op.or]: [
        { Name: { [Op.like]: `%${search}%` } },
        { Email: { [Op.like]: `%${search}%` } },
        { Username: { [Op.like]: `%${search}%` } },
      ],
    };

    // Pagination logic
    const offset = (page - 1) * limit;

    // Query the database for users with pagination and search
    const { rows: users, count: totalItems } = await Users.findAndCountAll({
      where: search ? searchCondition : {}, // Apply search if provided
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: SetupRole, as: "Role" }], // Include the Role details
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      status: "success",
      totalItems,
      totalPages,
      currentPage: parseInt(page),
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userById = await Users.findByPk(req.userId);

    if (!userById) {
      return res.status(404).json({
        statusCode: 404,
        message: "No users found with that ID",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Users retrieved successfully",
      data: userById,
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: err.message,
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("refreshToken", "", {
    expires: new Date(0),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",  // Hanya secure di production (HTTPS)
    // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // SameSite none untuk secure
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
