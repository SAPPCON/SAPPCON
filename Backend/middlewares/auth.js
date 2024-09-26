import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json(
        { message: 'Acceso denegado', 
        messageinfo: 'Token no proporcionado'  
        })

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
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
