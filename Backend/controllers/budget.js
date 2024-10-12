import Budget from '../models/budget.js';
import BudgetLine from '../models/budgetLine.js';

export const NewBudget = async (req, res) => {
    const { building_id, customer_id, status, amount, date } = req.body;
    try{
        // User exists
        if (!req.user || !req.user.id) {
          return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo:
              "No se ha proporcionado un token válido para un usuario.",
          });
        }
        var user_id = req.user.id;

        // New Budget
        const newBudget = new Budget({ user_id, building_id, customer_id, status, amount, date });
        const savedBudget = await newBudget.save();
        // Response OK
        res.status(201).json(
            {
                message: "Presupuesto creado.",
                messageinfo: savedBudget
            }
        );
    } catch(error) {
        console.error(error.message);
        res.status(500).json(
            {
                error: "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }
}

export const NewBudgetLine = async (req, res) => {
    const { budget_id, line_no, service_id, quantity, price } = req.body;
    try {
        // User exists
        if (!req.user || !req.user.id) {
          return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo:
              "No se ha proporcionado un token válido para un usuario.",
          });
        }
        var user_id = req.user.id;

        // New BudgetLine
        const newBudgetLine = new BudgetLine({ user_id, budget_id, line_no, service_id, quantity, price });
        const savedBudgetLine = await newBudgetLine.save();

        const postBudgetLine = await BudgetLine.findById(savedBudgetLine._id).populate('service_name');
        // Response OK
        res.status(201).json(
            {
                message: "Linea de presupuesto creada.",
                messageinfo: postBudgetLine
            }
        );

    } catch(error) {
        console.error(error.message);
        res.status(500).json(
            {
                error: "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }


}