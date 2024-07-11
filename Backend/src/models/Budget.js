const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Building",
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    amount: { 
        type: Number, 
        required: true 
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: true
    }
});

module.exports = mongoose.model("Budget", BudgetSchema);
