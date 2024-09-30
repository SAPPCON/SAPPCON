import express from 'express'
import { NewService, GetServices, GetService, UpdateService, DeleteService } from '../controllers/service.js'
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New Service
router.post("/new", auth, NewService);

// -- GET
// Get Services
router.get("/", auth, GetServices);
// Get Service by ID
router.get("/:id", auth, GetService);

// -- PUT
// Update Service
router.put("/modify/:id", auth, UpdateService);

// -- DELETE
// Delete Service
router.delete("/delete/:id", auth, DeleteService);

export default router;