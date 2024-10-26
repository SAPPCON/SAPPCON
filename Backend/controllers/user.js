import User from "../models/user.js";
import TokenBlacklist from "../models/tokenBlacklist.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { transporter } from "../utils/transporter.js";
import dotenv from "dotenv";
dotenv.config();

export const newUser = async (req, res) => {
  const { email, password, name, surname, alias, address } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(418).json({
        message: "Error al crear el usuario.",
        messageinfo: "Ya existe un usuario con el email proporcionado.",
      });
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
    res.status(500).json({
      message: "Error en el servidor.",
      messageinfo: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // User exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "El usuario no existe.",
        messageinfo: "El email proporcionado no está registrado.",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        message: "Contraseña incorrecta.",
        messageinfo: "La contraseña proporcionada no es correcta.",
      });
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
    res.status(500).json({
      message: "Error en el servidor.",
      messageinfo: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  // Obtener el token del header Authorization
  const token = req.header("Authorization")?.split(" ")[1];

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({
      message: "No Autorizado.",
      messageinfo: "No se ha proporcionado token.",
    });
  }

  try {
    // Verificar si el token es válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario cuyo id está codificado en el token
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Retornar el usuario encontrado
    return res.status(200).json({
      message: "Usuario obtenido exitosamente.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor.",
      messageinfo: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const {
    name,
    email,
    password: plainPassword,
    alias,
    address,
    surname,
  } = req.body;

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

    let updatedFields = { name, email, alias, address, surname };

    // Si se proporciona una nueva contraseña, la encripta
    if (plainPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);
      updatedFields.password = hashedPassword;
    }

    // Busca y actualiza el usuario
    const user = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    }).catch((error) => {
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
      messageinfo: user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "Error en el servidor.",
      messageinfo: error.message,
    });
  }
};

export const logout = async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No hay token." });
  }

  try {
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
          message: "Error en el logout.",
          messageinfo: err.message,
        })
      );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Error en el servidor.",
      messageinfo: error.message,
    });
  }
};

const isProduction = process.env.ENV === "production";
const domain = isProduction ? "https://sappcon.site" : "http://localhost:3001";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Verifica que el usuario exista
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "El usuario no existe.",
        messageinfo: "El email proporcionado no está registrado.",
      });
    }

    // Crea el token con 1 hora de expiración
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const verificationLink = `${domain}/new-password/${token}`;

    await transporter.sendMail({
      from: "SAPPCON <sappcon24@gmail.com>",
      to: email,
      subject: "Restablecimiento de contraseña",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Solicitud de Restablecimiento de Contraseña</h2>
          <p>Hola,</p>
          <p>Hemos recibido una solicitud para restablecer tu contraseña en SAPPCON. Si no realizaste esta solicitud, por favor ignora este correo.</p>
          <p>Para restablecer tu contraseña, haz clic en el enlace de abajo:</p>
          <p>
            <a href="${verificationLink}" style="color: #007bff; text-decoration: none;">
              Restablecer mi contraseña
            </a>
          </p>
          <p>Este enlace expirará en 1 hora por razones de seguridad.</p>
          <p>Si tienes problemas para acceder, copia y pega el siguiente enlace en tu navegador:</p>
          <p>${verificationLink}</p>
          <br />
          <p>Gracias,</p>
          <p>El equipo de SAPPCON</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <small style="color: #777;">
            Este es un mensaje generado automáticamente, por favor no respondas a este correo.
          </small>
        </div>
      `,
    });
    res.status(200).json({
      message: "Correo enviado.",
      messageinfo:
        "Correo de restablecimiento de contraseña enviado con éxito.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor.",
      messageinfo: error.message,
    });
  }
};
