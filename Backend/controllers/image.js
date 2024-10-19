import Image from '../models/image.js';

// Método para subir una imagen
export const UploadImage = async (req, res) => {
    const { type, objectId, base64 } = req.body;

    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo:
                "No se ha proporcionado un token válido para un usuario.",
            });
        }
        var user_id = req.user.id;
        let image = await Image.findOne({ user, type, objectId });

        if (image) {
            // Si la imagen ya existe, actualiza el base64
            image.base64 = base64;
            await image.save();
        } else {
            // Si la imagen no existe, crea un nuevo registro
            image = new Image({ user, type, objectId, base64 });
            await image.save();
        }

        res
          .status(200)
          .json({ message: "OK", messageinfo: "Imagen subida exitosamente." });
    } catch (error) {
        console.error(error.message);
        res.status(500).json(
            {
                message: "Error en el servidor.",
                messageinfo: error.message,
            }
        );
    }
};

// Método para descargar una imagen
export const DownloadImage = async (req, res) => {
    const { type, objectId } = req.body;

    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo:
                "No se ha proporcionado un token válido para un usuario.",
            });
        }
        var user_id = req.user.id;

        const image = await Image.findOne({ user, type, objectId });

        if (image) {
            res.status(200).json(
                { 
                    base64: image.base64 
                });
        } else {
            res.status(404).json(
                { 
                    message: "Imagen no encontrada" 
                }
            );
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json(
            {
                message: "Error en el servidor.",
                messageinfo: error.message,
            }
        );
    }
};