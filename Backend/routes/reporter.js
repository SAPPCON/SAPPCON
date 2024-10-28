import express from "express";
import {BudgetReport} from "../controllers/reporter.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

// -- GET
// Generate Report
router.get("/:id", auth, BudgetReport);

export default router;