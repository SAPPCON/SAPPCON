import express from 'express'
import { NewCategory, GetCategories } from '../controllers/category.js'
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New Category
router.post("/new", auth, NewCategory);

// -- GET
// Get Categories
router.get("/", auth, GetCategories);

export default router;