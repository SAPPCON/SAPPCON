import MeasureUnit from '../models/measureUnit.js';

export const NewMeasureUnit = async (req, res) => {
    try{
        const { name } = req.body;

        // User exists
        if (!req.user || !req.user.id) {
          return res.status(401).json({
            message: "Usuario no autorizado.",
            messageinfo:
              "No se ha proporcionado un token válido para un usuario.",
          });
        }
        var user_id = req.user.id;
        // const UserRec = User.findById(userId);
        
        // New MeasureUnit
        const newMeasureUnit = new MeasureUnit({ user_id, name });
        const savedMeasureUnit = await newMeasureUnit.save();

        // Response OK
        res.status(201).json(
            {
                message: "Unidad de medida creada.",
                messageinfo: savedMeasureUnit
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

export const GetMeasureUnits = async (req, res) => {  
    try {
        if (!req.user || !req.user.id) {
          return res.status(401).json({ 
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario."
           });
        }
        const userId = req.user.id; 
        const measureUnits = await MeasureUnit.find({ user_id: userId });
        res.json(measureUnits);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(
            {
                error: "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }
}

export const GetMeasureUnit = async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          message: "Usuario no autorizado.",
          messageinfo:
            "No se ha proporcionado un token válido para un usuario.",
        });
      }
      const userId = req.user.id;
      const measureUnit = await MeasureUnit.findOne({
        user_id: userId,
        _id: req.params.id,
      })

      if (!measureUnit) {
        return res.status(404).json({
          message: "Unidad de medida no encontrada.",
          messageinfo: "No se ha encontrado la unidad de medida con el id proporcionado.",
        });
      }

      res.status(200).json(measureUnit);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(
            {
                error: "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }
}

export const UpdateMeasureUnit = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario.",
            });
        }
        const userId = req.user.id;
        const updatedMeasureUnit = await MeasureUnit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMeasureUnit) {
            return res.status(404).json({
                message: "Unidad de medida no encontrada.",
                messageinfo: "No se ha encontrado la unidad de medida con el id proporcionado.",
            });
        }
        res.status(200).json(
            {
                message: "Unidad de medida actualizada.",
                messageinfo: updatedMeasureUnit
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Error en el servidor.",
            messageinfo: error.message,
        });
    }
}

export const DeleteMeasureUnit = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario.",
            });
        }
        const userId = req.user.id;
        const measureUnit = await MeasureUnit.findByIdAndDelete(req.params.id);
        if (!measureUnit) {
            return res.status(404).json({
                message: "Unidad de medida no encontrada.",
                messageinfo: "No se ha encontrado la unidad de medida con el id proporcionado.",
            });
        }
        res.status(200).json(
            {
                message: "Unidad de medida eliminada.",
                messageinfo: measureUnit
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