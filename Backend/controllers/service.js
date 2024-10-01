import Service from '../models/service.js';

// Crear un nuevo servicio
export const NewService = async (req, res) => {
    const {measure_unit_id, category_id, name, description, cost, price} = req.body;
    try {
        var user_id = req.user.id;
        const newService = new Service({user_id, measure_unit_id, category_id, name, description, cost, price});
        const savedService = await newService.save();
        res.status(201).json(
            {
                message: "Servicio creado.",
                messageinfo: savedService
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json(
            { 
                error : "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }
};

export const GetServices = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario."
            });
        }
        const userId = req.user.id;
        const services = await Service.find({ user_id: userId });
        res.json(services);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(
            {
                error: "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }
};

export const GetService = async (req, res) => {
    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario."
            });
        }

        const userId = req.user.id;
        const service = await Service.findOne({ user_id: userId, _id: req.params.id });

        if (!service) {
            return res.status(404).json({
                message: "Servicio no encontrado.",
                messageinfo: "No se ha encontrado el servicio con el id proporcionado."
            });
        }

        res.json(service);
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

export const UpdateService = async (req, res) => {
    try {
      // User exists
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          message: "Usuario no autorizado.",
          messageinfo:
            "No se ha proporcionado un token válido para un usuario.",
        });
      }

      //Find and update service
      const userId = req.user.id;
      const service = await Service.findOneAndUpdate(
        {
          user_id: userId,
          _id: req.params.id,
        },
        { measure_unit_id, category_id, name, description, cost, price },
        { new: true }
      ).catch((error) => {
        return res.status(404).json({
          message: "Servicio no encontrado.",
          messageinfo: error.message,
        });
      });

        if (!service) {
            return res.status(404).json({
                message: "Servicio no encontrado.",
                messageinfo: "No se ha encontrado el servicio con el id proporcionado."
            });
        }

        res.status(200).json({
            message: "Servicio actualizado.",
            messageinfo: service
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(
            {
                error: "Error en el servidor.",
                errorinfo: error.message
            }
        );
    }
};

export const DeleteService = async (req, res) => {
    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario."
            });
        }

        //Find and delete service
        const userId = req.user.id;
        const service = await Service.findOneAndDelete({ user_id: userId, _id: req.params.id });

        if (!service) {
            return res.status(404).json({
                message: "Servicio no encontrado.",
                messageinfo: "No se ha encontrado el servicio con el id proporcionado."
            });
        }

        res.status(200).json({
            message: "Servicio eliminado.",
            messageinfo: service
        });
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