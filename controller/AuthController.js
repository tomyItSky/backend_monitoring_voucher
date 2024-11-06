import { Users } from "../model/Users.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { SetupRole } from "../model/SetupRole.js";
import bcrypt from "bcryptjs";
import generateUserCode from "../utils/GenerateCode.js";

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

export const CreateUsers = async (req, res) => {
  try {
    const userById = await Users.findByPk(req.userId);
    const { SetupRoleId, Name, Gender, Username, Email, Phone } = req.body;
    const password = "sky123";
    let IpAddress = req.headers["x-forwarded-for"] || req.ip || "0.0.0.0";

    if (IpAddress.includes("::ffff:")) {
      IpAddress = IpAddress.split("::ffff:")[1];
    }
    console.log(IpAddress);
    // Hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const currentDate = new Date();
    const oneYearLater = new Date(
      currentDate.getFullYear() + 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const lastUsers = await Users.findOne({
      order: [["Id", "DESC"]],
    });

    const lastId = lastUsers ? lastUsers.Id : 0;
    const userCode = await generateUserCode(lastId);

    // Create new user
    const newUser = await Users.create({
      SetupRoleId,
      IpAddress: IpAddress,
      UserCode: userCode,
      Name,
      Gender,
      Username,
      Email,
      Phone,
      Password: hashPassword,
      PasswordExpired: oneYearLater,
      MerchantId: 0,
      IsFirstpassword: 1,
      FlagAllLocation: 1,
      CreatedOn: new Date(),
      CreatedBy: userById.Name,
      UpdatedOn: new Date(),
      UserStatus: 1,
    });

    return res.status(201).json({
      status: "success",
      message: "User successfully created",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Error creating user",
      error: error.message,
    });
  }
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
    const { page = 1, limit = 10, search = "", from = "", to = "" } = req.query;

    const parsedFrom = from ? new Date(`${from}T00:00:00`) : null;
    const parsedTo = to ? new Date(`${to}T23:59:59`) : null;

    const searchCondition = search
      ? {
          [Op.or]: [
            { Name: { [Op.like]: `%${search}%` } },
            { Email: { [Op.like]: `%${search}%` } },
            { UserCode: { [Op.like]: `%${search}%` } },
            { Phone: { [Op.like]: `%${search}%` } },
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

    const roleCondition = { SetupRoleId: { [Op.ne]: null } };

    const conditions = {
      ...(search ? searchCondition : {}),
      ...dateCondition,
      ...roleCondition,
    };

    const { rows: UsersData, count: totalItems } = await Users.findAndCountAll({
      where: conditions,
      include: [
        {
          model: SetupRole,
          attributes: ["Name"],
        },
      ],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [["LastActivity", "DESC"]],
      include: [{ model: SetupRole, as: "Role" }],
    });

    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      status: "success",
      totalItems,
      totalPages,
      currentPage: parseInt(page),
      UsersData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const activeRoles = await SetupRole.findAll({
      where: {
        RecordStatus: 1,
      },
      order: [["UpdatedOn", "ASC"]],
    });

    if (activeRoles.length === 0) {
      return res.status(404).json({ message: "No roles found." });
    }

    return res.json({
      status: "success",
      data: activeRoles,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
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
