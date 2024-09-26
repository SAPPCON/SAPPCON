import Category from "../models/category.js";
import User from "../models/user.js";

export const NewCategory = async (req, res) => {
    try{
        const { name } = req.body;

        // User exists
        if (!req.user || !req.user.id) {
          return res.status(400).json({
            message: "Usuario no autorizado.",
            messageinfo:
              "No se ha proporcionado un token válido para un usuario.",
          });
        }
        var user_id = req.user.id;
        // const UserRec = User.findById(userId);
        
        // New Category
        const newCategory = new Category({ user_id, name });
        const savedCategory = await newCategory.save();

        // Response OK
        res.status(201).json(
            {
                message: "Categoría creada.",
                messageinfo: savedCategory
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

export const GetCategories = async (req, res) => {  
    try {
        if (!req.user || !req.user.id) {
          return res.status(400).json({ 
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario."
           });
        }
        const userId = req.user.id; 
        const categories = await Category.find({ user_id: userId });
        res.json(categories);
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