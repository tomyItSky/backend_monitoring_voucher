import express from "express";
import {
  login,
  getAllUsers,
  logout,
  getUserById,
} from "../../controller/AuthController.js";
import { protectAuth } from "../../middleware/authMidOcc.js";

const router = express.Router();

router.post("/login", login);
router.get("/get-all", getAllUsers);
router.get("/getuserbyId", protectAuth, getUserById);
router.get("/logout", logout);

router.get("/protected", protectAuth, (req, res) => {
  const token = req.cookies.refreshToken;
  res.status(200).json({
    statusCode: 200,
    status: "success",
    message: "You have access to this route",
    token: token,
  });
});

export default router;
