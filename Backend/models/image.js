import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    object_type: {
        type: String,
        required: true,
        enum: ["Customer", "User"],
    }, 
    object_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    image_b64: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Image", imageSchema);