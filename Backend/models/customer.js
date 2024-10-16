import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 250,
    },
    surname: {
        type: String,
        required: true,
        maxlength: 250,
    },
    alias: {
        type: String,
        required: true,
        maxlength: 250,
    },
    address: {
        type: String,
        required: true,
        maxlength: 250,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
        validator: function (v) {
            return /^\S+@\S+\.\S+$/.test(v); // Validación de email con regex
        },
        message: (props) => `${props.value} no es un email válido.`,
        },
    }
},
{
    timestamps: true,
});

export default mongoose.model("Customer", customerSchema);