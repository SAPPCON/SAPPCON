import express from 'express'
import {
  NewBudget,
  NewBudgetLine,
  GetBudgetsHeaders,
  GetBudget,
  UpdateBudget,
  UpdateBudgetLine,
  DeleteBudget,
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
router.put("/:id", auth, UpdateBudget);
// Update Budget Line
router.put("/line/:id", auth, UpdateBudgetLine);



// -- DELETE
router.delete("/:id", auth, DeleteBudget);




export default router;