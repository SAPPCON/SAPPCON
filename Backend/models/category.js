import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const categorySchema = new Schema({
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
},
{
    timestamps: true,
},
{   collection:'Category',
    versionKey: false,
});


export default mongoose.model("Category", categorySchema);
