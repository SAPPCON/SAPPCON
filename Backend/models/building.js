import mongoose from "mongoose";

const { Schema } = mongoose;

const buildingSchema = new Schema({
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
        required: true,
        maxlength: 250,
    },
    address: {
        type: String,
        required: true,
        maxlength: 250,
    },
    description: {
        type: String,
        required: true,
        maxlength: 1024,
    },
});

export default mongoose.model("Building", buildingSchema);