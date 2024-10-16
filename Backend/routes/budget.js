import express from 'express'
import {
  NewBudget,
  NewBudgetLine,
  GetBudgetsHeaders,
  GetBudget,
  UpdateBudget,
  UpdateBudgetLine,
  DeleteBudget,
  DeleteBudgetLine,
} from "../controllers/budget.js";
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New Budget
router.post("/new", auth, NewBudget);
// New Budget Line
router.post("/newLine", auth, NewBudgetLine);

// -- GET
// Get Budgets Headers
router.get("/headers", auth, GetBudgetsHeaders);
// Get Budget by ID, with lines
router.get("/:id", auth, GetBudget);

// -- PUT
// Update Budget Header
router.put("/modify/:id", auth, UpdateBudget);
// Update Budget Line
router.put("/modify/:budgetId/:lineId", auth, UpdateBudgetLine);



// -- DELETE
// Delete Budget
router.delete("/delete/:id", auth, DeleteBudget);
// Delete only a Budget Line
router.delete("/delete/:budgetId/:lineId", auth, DeleteBudgetLine);

export default router;