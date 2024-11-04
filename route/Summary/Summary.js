import express from "express";
import { getSummary } from "../../controller/Summary.js";

const router = express.Router();

router.get("/getSummary", getSummary);

export default router;
