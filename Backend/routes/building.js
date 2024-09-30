import express from 'express'
import { NewBuilding, UpdateBuilding, DeleteBuilding, GetBuildings, GetBuilding } from '../controllers/building.js'
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New Building
router.post("/new", auth, NewBuilding);

// -- GET
// Get Buildings
router.get("/", auth, GetBuildings);
router.get("/:id", auth, GetBuilding);

// -- UPDATE
// Update Building
router.put("/modify/:id", auth, UpdateBuilding);

// -- DELETE
// Delete Building
router.delete("/delete/:id", auth, DeleteBuilding);

export default router;