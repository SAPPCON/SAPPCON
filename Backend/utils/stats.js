import Budget from '../models/budget.js';
import BudgetLine from "../models/budgetLine.js";
import Service from "../models/service.js";
import Category from "../models/category.js";

export async function getBudgetStatusStats(req) {
    // User exists
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo: "No se ha proporcionado un token válido para un usuario.",
        });
    }
    const userId = req.user.id;
    // Fetch all budgets from the database
    const budgets = await Budget.find({user_id: userId});

    // Define all possible statuses
    const allStatuses = [
        "Pendiente",
        "Aprobado",
        "Rechazado",
        "En Construcción",
        "Finalizado",
    ];

    // Initialize a dictionary to count budgets by status
    const statusCounts = {};
    allStatuses.forEach((status) => {
        statusCounts[status] = 0;
    });

    // Count budgets by status
    budgets.forEach((budget) => {
        const status = budget.status;
        if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
        }
    });

    // Calculate total number of budgets
    const totalBudgets = budgets.length;

    // Calculate percentages
    const statusPercentages = {};
    allStatuses.forEach((status) => {
        statusPercentages[status] =
        totalBudgets > 0 ? (statusCounts[status] / totalBudgets) * 100 : 0;
    });

    // Prepare the result list
    const statusList = allStatuses.map((status) => ({
        status,
        count: statusCounts[status],
        percentage: statusPercentages[status],
    }));

    // Return the results
    return {
        statusList,
    };
}

export async function getBudgetAmountStats(req) {
    // User exists
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo: "No se ha proporcionado un token válido para un usuario.",
        });
    }
    const userId = req.user.id;
    // Fetch all budgets from the database
    const budgets = await Budget.find({user_id: userId});

    if (budgets.length === 0) {
        return {
        minAmount: 0,
        maxAmount: 0,
        avgAmount: 0,
        medianAmount: 0,
        };
    }

    // Extract all amounts
    const amounts = budgets.map((budget) => budget.amount);

    // Calculate min, max, and average amounts
    const minAmount = Math.min(...amounts);
    const maxAmount = Math.max(...amounts);
    const avgAmount =
        amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;

    // Calculate median amount
    amounts.sort((a, b) => a - b);
    let medianAmount;
    const mid = Math.floor(amounts.length / 2);
    if (amounts.length % 2 === 0) {
        medianAmount = (amounts[mid - 1] + amounts[mid]) * 0.5;
    } else {
        medianAmount = amounts[mid];
    }

    // Return the results
    return {
        minAmount,
        maxAmount,
        avgAmount,
        medianAmount,
    };
}

export async function getTopServices(req) {
    // User exists
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo: "No se ha proporcionado un token válido para un usuario.",
        });
    }
    const userId = req.user.id;
    // Fetch all budget lines from the database
    const budgetLines = await BudgetLine.find({user_id: userId});

    // Initialize a dictionary to sum quantities of services
    const serviceQuantities = {};
    budgetLines.forEach((line) => {
        const serviceId = line.service_id;
        if (!serviceQuantities[serviceId]) {
        serviceQuantities[serviceId] = 0;
        }
        serviceQuantities[serviceId] += line.quantity;
    });

    // Calculate total quantity of services used
    const totalQuantity = Object.values(serviceQuantities).reduce(
        (sum, quantity) => sum + quantity,
        0
    );

    // Convert the serviceQuantities object to an array and sort by quantity
    const sortedServices = Object.entries(serviceQuantities)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);

    // Calculate percentages and prepare the result list
    const topServices = await Promise.all(
        sortedServices.map(async ([serviceId, quantity], index) => {
        const service = await Service.findById(serviceId);
        return {
            rank: index + 1,
            serviceName: service.name,
            quantity,
            percentage: (quantity / totalQuantity) * 100,
        };
        })
    );

    // Return the results
    return topServices;
}

export async function getServiceCountByCategory(req) {
    // User exists
    if (!req.user || !req.user.id) {
        return res.status(401).json({
        message: "Usuario no autorizado.",
        messageinfo: "No se ha proporcionado un token válido para un usuario.",
        });
    }
    const userId = req.user.id;
    // Fetch all services from the database
    const services = await Service.find({user_id: userId});

    // Initialize a dictionary to count services by category ID
    const categoryCounts = {};
    services.forEach((service) => {
        const categoryId = service.category_id;
        if (!categoryCounts[categoryId]) {
        categoryCounts[categoryId] = 0;
        }
        categoryCounts[categoryId]++;
    });

    // Fetch category names based on category IDs
    const categoryList = await Promise.all(
        Object.keys(categoryCounts).map(async (categoryId) => {
        const category = await Category.findById(categoryId);
        if (category && category.name != null) {
            return {
            categoryName: category.name,
            count: categoryCounts[categoryId],
            };
        } else {
            return {
            categoryName: "Unknown",
            count: categoryCounts[categoryId],
            };
        }
        })
    );

    // Filter out any null values (in case of missing categories)
    const filteredCategoryList = categoryList.filter((item) => item !== null);

    // Return the results
    return filteredCategoryList;
}

export default {
    getBudgetStatusStats,
    getBudgetAmountStats,
    getTopServices,
    getServiceCountByCategory,
};