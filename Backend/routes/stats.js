import express from "express";
import stats from '../utils/stats.js';
import { auth } from "../middlewares/auth.js";
const router = express.Router();

// -- GET
// Get Budget Status Stats
router.get("/budgetStatus", auth, (req, res) => {
    stats.getBudgetStatusStats()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error en el servidor.",
                messageinfo: error.message,
            });
        });
});
// Get Budget Amount Stats
router.get("/budgetAmount", auth, (req, res) => {
    stats.getBudgetAmountStats()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error en el servidor.",
                messageinfo: error.message,
            });
        });
});
// Get Top Services
router.get("/topServices", auth, (req, res) => {
    stats.getTopServices()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error en el servidor.",
                messageinfo: error.message,
            });
        });
});
// Get Services per Category
router.get("/servicesPerCategory", auth, (req, res) => {
    stats.getServiceCountByCategory()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error en el servidor.",
          messageinfo: error.message,
        });
      });
});

export default router;