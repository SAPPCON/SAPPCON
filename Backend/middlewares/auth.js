import jwt from 'jsonwebtoken'
import TokenBlacklist from "../models/tokenBlacklist.js";

export const auth = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json(
        { 
            message: 'Acceso denegado', 
            messageinfo: 'Token no proporcionado'  
        })

    try {
        const tokenValue = token.split(" ")[1];
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        const userId = decoded.user.id;

        // Verificar si el token está revocado
        const revokedToken = await TokenBlacklist.findOne({
            token: tokenValue,
            user: userId,
        });
        if (revokedToken) {
            return res.status(401).json({
            message: "Acceso denegado",
            messageinfo: "Token expirado.",
            });
        }

        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Error en el servidor.",
            errorinfo: error.message,
        });
    }
} 
