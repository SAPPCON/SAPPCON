const mongoose = require("mongoose");

const BudgetLineSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    budget_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget",
        required: true
    },
    line_no: { type: Number, required: true },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    service_name: { 
        type: String, 
        required: true },
    quantity: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
});

module.exports = mongoose.model("BudgetLine", BudgetLineSchema);
