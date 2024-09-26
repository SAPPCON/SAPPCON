import express from 'express'
import { NewMeasureUnit, GetMeasureUnits } from '../controllers/measureUnit.js'
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New MeasureUnit
router.post("/new", auth, NewMeasureUnit);

// -- GET
// Get MeasureUnits
router.get("/", auth, GetMeasureUnits);

export default router;