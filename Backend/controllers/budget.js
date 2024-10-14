import Budget from '../models/budget.js';
import BudgetLine from '../models/budgetLine.js';
import Building from '../models/building.js';
import Customer from '../models/customer.js';
import MeasureUnit from "../models/measureUnit.js";
import Service from '../models/service.js';

export const NewBudget = async (req, res) => {
    const { building_id, status, date } = req.body;
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
        const building = await Building.findById(building_id);
        const customer_id = building.customer_id;
        const customer = await Customer.findById(customer_id);
        var customer_name = customer.name + " " + customer.surname;
        const newBudget = new Budget({ user_id, building_id, customer_id, customer_name, amount:0, status, date });
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
    const { budget_id, line_no, service_id, quantity } = req.body;
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

        // Get related
        const service = await Service.findById(service_id);
        if (!service) {
            return res.status(404).json(
                {
                    message: "Servicio no encontrado.",
                    messageinfo: "El servicio con el ID proporcionado no existe."
                }
            );
        }
        const budget = await Budget.findById(budget_id); 
        if (!budget) {
            return res.status(404).json(
                {
                    message: "Presupuesto no encontrado.",
                    messageinfo: "El presupuesto con el ID proporcionado no existe."
                }
            );
        }
        const measure_unit_id = service.measure_unit_id;
        const measure_unit = await MeasureUnit.findById(measure_unit_id);
        if (!measure_unit) {
            return res.status(404).json(
                {
                    message: "Unidad de medida no encontrada.",
                    messageinfo: "La unidad de medida con el ID proporcionado no existe."
                }
            );
        }
        
        // New BudgetLine
        const price = service.price;
        var amount = quantity * price;
        amount = amount.toFixed(2);
        const service_name = service.name;
        const measure_unit_name = measure_unit.name;

        const newBudgetLine = new BudgetLine({ user_id, budget_id, line_no, service_id, service_name, measure_unit_id, measure_unit_name, quantity, price, amount });
        const savedBudgetLine = await newBudgetLine.save();

        // Update Amount in Budget
        budget.amount += amount;
        budget.amount = budget.amount.toFixed(2);
        budget.save();

        // Response OK
        res.status(201).json(
            {
                message: "Linea de presupuesto creada.",
                messageinfo: savedBudgetLine
            }
        );

    } catch(error) {
        console.error(error.message);
        res.status(500).json(
            {
                error: "Error en el servidor.",
                errorinfo: error.message,
                extra: error.line_no
            }
        );
    }
}

export const GetBudgetsHeaders = async (req, res) => {
    try {
        // User exists
        if (!req.user || !req.user.id) {
          return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo:
              "No se ha proporcionado un token válido para un usuario.",
          });
        }
        const userId = req.user.id;

        // Find the budgets
        const budgets = await Budget.find({ user_id: userId }).select('building_id customer_id status amount date');

        // Response OK
        res.status(200).json(budgets);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(
            {
                error: "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }
}

export const GetBudget = async (req, res) => {
    try {
        // User exists
        if (!req.user || !req.user.id) {
          return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo:
              "No se ha proporcionado un token válido para un usuario.",
          });
        }

        const userId = req.user.id;
        const budgetId = req.params.id;
        const budget = await Budget.findOne({ user_id: userId, _id: budgetId });
        if (!budget) {
            return res.status(404).json(
                {
                    message: "Presupuesto no encontrado.",
                    messageinfo: "El presupuesto con el ID proporcionado no existe."
                }
            );
        }
        const budgetLines = await BudgetLine.find({ user_id: userId, budget_id: budgetId });
        res.json(
            {
                budget: budget,
                budgetLines: budgetLines
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send(
            {
                error: "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }
}

export const UpdateBudget = async (req, res) => {
    const { building_id, status, date } = req.body;
    try {
        // User exists
        if (!req.user || !req.user.id) {
          return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo:
              "No se ha proporcionado un token válido para un usuario.",
          });
        }

        const userId = req.user.id;
        const budgetId = req.params.id;

        // Update budget
        const budget = await Budget.findByIdAndUpdate(budgetId, 
            { 
                building_id,
                status, 
                date 
            }, 
            { new: true });

        if (!budget) {
            return res.status(404).json(
                {
                    message: "Presupuesto no encontrado.",
                    messageinfo: "El presupuesto con el ID proporcionado no existe."
                }
            );
        }

        const building = await Building.findById(building_id);
        const customer_id = building.customer_id;
        const customer = await Customer.findById(customer_id);
        var customer_name = customer.name + " " + customer.surname;
        budget.customer_id = customer_id;
        budget.customer_name = customer_name;
        budget.save();

        // Response OK
        res.status(200).json(
            {
                message: "Presupuesto actualizado.",
                messageinfo: budget
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

export const UpdateBudgetLine = async (req, res) => {
    const { budget_id, budgetLine_id, service_id, quantity } = req.body;

    try {
        // User exists
        if (!req.user || !req.user.id) {
          return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo:
              "No se ha proporcionado un token válido para un usuario.",
          });
        }
        const userId = req.user.id;
        
        const budget = await Budget.findOne({ user_id: userId, _id: budget_id });
        if (!budget) {
            return res.status(404).json(
                {
                    message: "Presupuesto no encontrado.",
                    messageinfo: "El presupuesto con el ID proporcionado no existe."
                }
            );
        }

        const budgetLine = await BudgetLine.findOne({ user_id: userId, _id: budgetLine_id, budget_id: budget_id });
        if (!budgetLine) {
            return res.status(404).json(
                {
                    message: "Linea de presupuesto no encontrada.",
                    messageinfo: "La linea de presupuesto con el ID proporcionado no existe."
                }
            );
        }

        // Get related
        const service = await Service.findById(service_id);
        if (!service) {
            return res.status(404).json(
                {
                    message: "Servicio no encontrado.",
                    messageinfo: "El servicio con el ID proporcionado no existe."
                }
            );
        }
        const measure_unit_id = service.measure_unit_id;
        const measure_unit = await MeasureUnit.findById(measure_unit_id);
        if (!measure_unit) {
            return res.status(404).json(
                {
                    message: "Unidad de medida no encontrada.",
                    messageinfo: "La unidad de medida con el ID proporcionado no existe."
                }
            );
        }

        // Update BudgetLine
        const price = service.price;
        var amount = quantity * price;
        amount = amount.toFixed(2);
        const service_name = service.name;
        const measure_unit_name = measure_unit.name;
        
        budgetLine.service_id = service_id;
        budgetLine.service_name = service_name;
        budgetLine.measure_unit_id = measure_unit_id;
        budgetLine.measure_unit_name = measure_unit_name;
        budgetLine.quantity = quantity;
        budgetLine.price = price;
        budgetLine.amount = amount;
        budgetLine.save();
        
        res.status(200).json(
            {
                message: "Presupuesto actualizado.",
                messageinfo: budget
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

export const DeleteBudget = async (req, res) => {
    try {
        // User exists
        if (!req.user || !req.user.id) {
          return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo:
              "No se ha proporcionado un token válido para un usuario.",
          });
        }
        const userId = req.user.id;
        const budgetId = req.params.id;
        const budget = await Budget.findOne({ user_id: userId, _id: budgetId });
        if (!budget) {
            return res.status(404).json(
                {
                    message: "Presupuesto no encontrado.",
                    messageinfo: "El presupuesto con el ID proporcionado no existe."
                }
            );
        }

        // Delete BudgetLines
        await BudgetLine.deleteMany({ budget_id: budgetId });

        // Delete Budget
        await Budget.findByIdAndDelete(budgetId);

        res.json(
            {
                message: "Presupuesto eliminado.",
                messageinfo: budget
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