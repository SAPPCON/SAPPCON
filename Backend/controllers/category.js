import Category from "../models/category.js";
import User from "../models/user.js";

export const NewCategory = async (req, res) => {
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
          return res.status(401).json({ 
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

export const GetCategory = async (req, res) => {
  try {
    // User exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Usuario no autorizado.",
        messageinfo: "No se ha proporcionado un token válido para un usuario.",
      });
    }

    //Find and get category
    const userId = req.user.id;
    const category = await Category.findOne({user_id: userId,_id: req.params.id,})
    
    if (!category) {
        return res.status(404).json({
            message: "Categoría no encontrada.",
            messageinfo: "No se ha encontrado la categoría con el id proporcionado.",
        });
    };

    // Response OK
    res.status(200).json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Error en el servidor.",
      errorinfo: error.message,
    });
  }
};

export const UpdateCategory = async (req, res) => {
    try {
      // User exists
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          message: "Usuario no autorizado.",
          messageinfo:
            "No se ha proporcionado un token válido para un usuario.",
        });
      }

      //Find and update category
      const userId = req.user.id;
      const category = await Category.findOneAndUpdate(
        { user_id: userId, _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!category) {
        return res.status(404).json({
          message: "Categoría no encontrada.",
          messageinfo:
            "No se ha encontrado la categoría con el id proporcionado.",
        });
      }

      // Response OK
      res.status(200).json({
        message: "Categoría actualizada.",
        messageinfo: category,
      });
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

export const DeleteCategory = async (req, res) => {
    try {
      // User exists
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          message: "Usuario no autorizado.",
          messageinfo:
            "No se ha proporcionado un token válido para un usuario.",
        });
      }

      //Find and delete category
      const userId = req.user.id;
      const category = await Category.findOneAndDelete({
        user_id: userId,
        _id: req.params.id,
      });

      if (!category) {
        return res.status(404).json({
          message: "Categoría no encontrada.",
          messageinfo:
            "No se ha encontrado la categoría con el id proporcionado.",
        });
      }

      // Response OK
      res.status(200).json({
        message: "Categoría eliminada.",
        messageinfo: "Category id: " + req.params.id,
      });
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

