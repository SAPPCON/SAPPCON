import mongoose from "mongoose"

const { Schema } = mongoose

const measureUnitSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 250,
    }
});

export default mongoose.model("MeasureUnit", measureUnitSchema);