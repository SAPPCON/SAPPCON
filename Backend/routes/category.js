import express from 'express'
import { NewCategory, GetCategories, DeleteCategory, GetCategory, UpdateCategory } from '../controllers/category.js'
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New Category
router.post("/new", auth, NewCategory);

// -- GET
// Get Categories
router.get("/", auth, GetCategories);
// Get Category by ID
router.get("/:id", auth, GetCategory);

// -- PUT
// Update Category
router.put("/modify/:id", auth, UpdateCategory);

// -- DELETE
// Delete Category
router.delete("/delete/:id", auth, DeleteCategory);

export default router;