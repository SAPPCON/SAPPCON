import User from '../models/user.js';
import TokenBlacklist from '../models/tokenBlacklist.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const newUser = async (req, res) => {
    const { email, password, name, surname, alias, address } = req.body;

    try {
    // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(418).json({ msg: "El usuario ya existe" });
        }

        user = new User({ email, password, name, surname, alias, address });

        // Guardar el nuevo usuario
        await user.save();

        // Crear las categorias predefinidas
        await User.createDefaultCategories(user.id);

        // Crear las unidades de medida predefinidas
        await User.createDefaultMeasureUnits(user.id);

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
            return res.status(404).json(
                { 
                    error: "El usuario no existe.",
                    errorinfo: "El email proporcionado no está registrado."}
                );
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json(
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

export const logout = async (req, res) => {
    const token = req.header("Authorization").split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No hay token." });
    }

    try{
      // Verificar si el token es válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const blacklistedToken = new TokenBlacklist({
        token,
        user: decoded.user.id,
        expiresAt: new Date(decoded.exp * 1000),
      });

      await blacklistedToken
        .save()
        .then(() =>
          res.status(200).json({
            message: "Logout exitoso.",
            messageinfo: "Token añadido a la lista negra.",
          })
        )
        .catch((err) =>
          res.status(500).json({
            error: "Error en el logout.",
            errorinfo: err.message,
          })
        );
        
    }catch (error) {
        console.error(error.message);
        res.status(500).json(
            {
                error: "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }   
}