import express from "express";
import reporter from "../utils/reporter.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

// -- GET
// Generate Report
router.get("/:id", auth, (req, res) => {
    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=budget.pdf",
    })
    reporter.generateReport(req.params.id, res);
});

export default router;