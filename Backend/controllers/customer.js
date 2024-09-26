import Customer from '../models/customer.js';

export const NewCustomer = async (req, res) => {
    const { name, surname, alias, address, phone, email } = req.body;

    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(400).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario."
            });
        }
        var user_id = req.user.id;

        // New Customer
        const newCustomer = new Customer({ user_id, name, surname, alias, address, phone, email });
        const savedCustomer = await newCustomer.save();

        // Response OK
        res.status(201).json(
            {
                message: "Cliente creado.",
                messageinfo: savedCustomer
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

export const UpdateCustomer = async (req, res) => {
    const { name, surname, alias, address, phone, email } = req.body;

    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(400).json({
                message: "Usuario no autorizado.",
                messageinfo: "No se ha proporcionado un token válido para un usuario."
            });
        }

        //Find and update customer
        const userId = req.user.id;
        const customer = await Customer.findOneAndUpdate(
            {
                user_id: userId,
                _id: req.params.id,
            },
            { name, surname, alias, address, phone, email },
            { new: false }
        ).catch((error) => {
            return res.status(404).json({
                message: "Cliente no encontrado.",
                messageinfo: error.message,
            });
        });

        // Response OK
        res.json({ message: "Cliente actualizado.", messageinfo: customer });
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

export const DeleteCustomer = async (req, res) => {
    try {
        // User exists
        if (!req.user || !req.user.id) {
            return res.status(400).json({
            message: "Usuario no autorizado.",
            messageinfo:
                "No se ha proporcionado un token válido para un usuario.",
            });
        }

        //Find and delete customer
        const userId = req.user.id;
        const customer = await Customer.findOneAndDelete({
            user_id: userId,
            _id: req.params.id,
        }).catch((error) => {
            return res.status(404).json({
                message: "Cliente no encontrado.",
                messageinfo: error.message,
            });
        });

        // Response OK
        res.json({ message: "Cliente eliminado.", messageinfo: customer });
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

export const GetCustomers = async (req, res) => {
  try {
    // User exists
    if (!req.user || !req.user.id) {
      return res.status(400).json({
        message: "Usuario no autorizado.",
        messageinfo: "No se ha proporcionado un token válido para un usuario.",
      });
    }

    const userId = req.user.id;
    const customers = await Customer.find({ user_id: userId });
    res.json(customers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: "Error en el servidor.",
      errorinfo: error.message,
    });
  }
};
