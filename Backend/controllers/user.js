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


export const getUser = async (req, res) => {
    // Obtener el token del header Authorization
    const token = req.header("Authorization")?.split(" ")[1];
  
    // Verificar si no hay token
    if (!token) {
      return res.status(401).json({ error: "No hay token." });
    }
  
    try {
      // Verificar si el token es válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Buscar el usuario cuyo id está codificado en el token
      const user = await User.findById(decoded.user.id);
  
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado." });
      }
  
      // Retornar el usuario encontrado
      return res.status(200).json({ 
        message: "Usuario obtenido exitosamente.",
        user
      });
  
    } catch (error) {
      return res.status(500).json({
        error: "Error en el servidor.",
        errorinfo: error.message,
      });
    }
  };


  export const updateUser = async (req, res) => {
    const { name, email, password: plainPassword, alias, address } = req.body;
  
    try {
      // Verifica si el usuario está autorizado
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          message: "Usuario no autorizado.",
          messageinfo: "No se ha proporcionado un token válido para un usuario.",
        });
      }
  
      const userId = req.user.id;
  
      // Si hay un email en el body, verificar si ya está en uso por otro usuario
      if (email) {
        const existingUser = await User.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
          return res.status(400).json({
            message: "El email ya está en uso.",
            messageinfo: "Por favor, utiliza otro email.",
          });
        }
      }
  
      let updatedFields = { name, email, alias, address };
  
      // Si se proporciona una nueva contraseña, la encripta
      if (plainPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);
        updatedFields.password = hashedPassword;
      }
  
      // Busca y actualiza el usuario
      const user = await User.findByIdAndUpdate(
        userId,
        updatedFields,
        { new: true }
      ).catch((error) => {
        return res.status(404).json({
          message: "Usuario no encontrado.",
          messageinfo: error.message,
        });
      });
  
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado.",
          messageinfo: "No se ha encontrado el usuario con el id proporcionado.",
        });
      }
  
      res.status(200).json({
        message: "Usuario actualizado.",
        messageinfo: user
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        error: "Error en el servidor.",
        errorinfo: error.message
      });
    }
  };

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
