import mongoose from "mongoose";

const { Schema } = mongoose;

const budgetSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Building",
        required: true,
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    customer_name: {
        type: String,
        maxlength: 500,
    },
    status: {
        type: String,
        required: true,
        enum: ["Pendiente", "Aprobado", "Rechazado", "En Construcción", "Finalizado"],
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
},
{
    timestamps: true,
});

export default mongoose.model("Budget", budgetSchema);