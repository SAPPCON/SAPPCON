import express from 'express'
import { NewBudget } from '../controllers/budget.js'
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New Budget
router.post("/new", auth, NewBudget);

export default router;