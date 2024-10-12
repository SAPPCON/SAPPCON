import Building from '../models/building.js';

export const NewBuilding = async (req, res) => {
    const { customer_id, name, alias, address, description } = req.body;

    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario."
            });
        }
        var user_id = req.user.id;

        // New Building
        const newBuilding = new Building(
            { 
                user_id,
                customer_id,
                name,
                alias,
                address,
                description
            });
        const savedBuilding = await newBuilding.save();

        // Response OK
        res.status(201).json(
            {
                message: "Construcción creada.",
                messageinfo: savedBuilding
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

export const GetBuildings = async (req, res) => {
    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario.",
            });
        }
    
        const userId = req.user.id;
        const buildings = await Building.find({ user_id: userId });
        res.status(200).json(buildings);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
        error: "Error en el servidor.",
        errorinfo: error.message,
        });
    }
}

export const GetBuilding = async (req, res) => {
    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario.",
            });
        }
        const userId = req.user.id;
        const building = await Building.findById(req.params.id);

        if (!building) {
            return res.status(404).json({
                message: "Construcción no encontrada.",
                messageinfo: "No se ha encontrado la construcción solicitada."
            });
        }

        res.status(200).json(building);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            error: "Error en el servidor.",
            errorinfo: error.message,
        });
    }
}

export const UpdateBuilding = async (req, res) => {
    const { customer_id, name, alias, address, description } = req.body;

    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario."
            });
        }
        var user_id = req.user.id;

        // Update Building
        const building = await Building.findByIdAndUpdate(req.params.id, 
            { 
                user_id,
                customer_id,
                name,
                alias,
                address,
                description
            }, 
            { new: true });

        if (!building) {
            return res.status(404).json({
                message: "Construcción no encontrada.",
                messageinfo: "No se ha encontrado la construcción solicitada."
            });
        }

        // Response OK
        res.status(200).json(
            {
                message: "Construcción actualizada.",
                messageinfo: building
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

export const DeleteBuilding = async (req, res) => {
    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario."
            });
        }

        // Delete Building
        const userId = req.user.id;
        const building = await Building.findOneAndDelete({
            _id:req.params.id,
            user_id: userId,
        })

        if (!building) {
            return res.status(404).json({
                message: "Construcción no encontrada.",
                messageinfo: "No se ha encontrado la construcción solicitada."
            });
        }

        // Response OK
        res.status(200).json(
            {
                message: "Construcción eliminada.",
                messageinfo: building
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
