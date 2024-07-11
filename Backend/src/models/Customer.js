const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: { 
        type: String, 
        required: true 
    },
    surname: { 
        type: String, 
        required: true 
    },
    alias: { 
        type: String 
    },
    address: { 
        type: String 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    }
});

module.exports = mongoose.model("Customer", CustomerSchema);
