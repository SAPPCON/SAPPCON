import mongoose from "mongoose";
import bcrypt from "bcrypt"; 

const { Schema } = mongoose; 

const userSchema = new Schema({
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
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        default: null,
    } 
});

// Encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Crear las categorias predefinidas
userSchema.statics.createDefaultCategories = async function (userId) {
    const Category = mongoose.model("Category");
    const categories = [
      { name: "Diseño", user_id: userId }, 
      { name: "Tareas de preparación", user_id: userId }, 
      { name: "General", user_id: userId }, 
      { name: "Instalaciones eléctricas", user_id: userId }, 
      { name: "Instalaciones pluviales", user_id: userId }, 
      { name: "Instalaciones de gas", user_id: userId }, 
      { name: "Acabados", user_id: userId }, 
    ];
    await Category.insertMany(categories);
};

// Crear las unidades de medida predefinidas
userSchema.statics.createDefaultMeasureUnits = async function (userId) {
    const MeasureUnit = mongoose.model("MeasureUnit");
    const measureUnits = [
      { name: "Unidad", user_id: userId }, 
      { name: "Metro", user_id: userId }, 
      { name: "Metro Cuadrados", user_id: userId }, 
      { name: "Metro Cúbicos", user_id: userId }, 
      { name: "Kilogramo", user_id: userId }, 
      { name: "Litro", user_id: userId }, 
      { name: "Hora", user_id: userId }, 
      { name: "Día", user_id: userId }, 
      { name: "Mes", user_id: userId }, 
    ];
    await MeasureUnit.insertMany(measureUnits);
};

export default mongoose.model("User", userSchema);
