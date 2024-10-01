import express from 'express'
import {
    NewMeasureUnit,
    GetMeasureUnits,
    GetMeasureUnit,
    UpdateMeasureUnit,
    DeleteMeasureUnit,
} from "../controllers/measureUnit.js";
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New MeasureUnit
router.post("/new", auth, NewMeasureUnit);

// -- GET
// Get MeasureUnits
router.get("/", auth, GetMeasureUnits);
// Get MeasureUnit by ID
router.get("/:id", auth, GetMeasureUnit);

// -- PUT
// Update MeasureUnit
router.put("/modify/:id", auth, UpdateMeasureUnit);

// -- DELETE
// Delete MeasureUnit
router.delete("/delete/:id", auth, DeleteMeasureUnit);

export default router;