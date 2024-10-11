import express from 'express'
import { NewBudget, NewBudgetLine } from '../controllers/budget.js'
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New Budget
router.post("/new", auth, NewBudget);
// New Budget Line
router.post("/newline", auth, NewBudgetLine);


export default router;