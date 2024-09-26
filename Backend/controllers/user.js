import User from '../models/user.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const newUser = async (req, res) => {
    const { name, surname, email, username, password } = req.body;

    try {
    // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "El usuario ya existe" });
        }

        user = new User({ name, email, password, surname, username });

        // Guardar el nuevo usuario
        await user.save();

        // Crear las categorias predefinidas
        await User.createDefaultCategories(user.id);

        // Crear y firmar el token JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
            if (err) throw err;
            res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(
            {
            error: "Error en el servidor.",
            errorinfo: err.message
            }
        );
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        // User exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(
                { 
                    error: "El usuario no existe.",
                    errorinfo: "El email proporcionado no está registrado."}
                );
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(
                { 
                    error: "Contraseña incorrecta.",
                    errorinfo: "La contraseña proporcionada no es correcta."}
                );
        }

        // Create and sign JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json(
            {
                error: "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }
}