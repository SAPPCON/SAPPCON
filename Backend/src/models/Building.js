const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    name: { 
        type: String, 
        required: true 
    },
    alias: { 
        type: String 
    },
    address: { 
        type: String 
    },
    description: { 
        type: String 
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: true,
    }
});

module.exports = mongoose.model("Building", BuildingSchema);
