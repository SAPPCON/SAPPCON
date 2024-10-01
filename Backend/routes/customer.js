import express from 'express'
import { NewCustomer, UpdateCustomer, DeleteCustomer, GetCustomers, GetCustomer } from '../controllers/customer.js'
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New Customer
router.post("/new", auth, NewCustomer);

// -- GET
// Get Customers
router.get("/", auth, GetCustomers);
router.get("/:id", auth, GetCustomer);

// -- UPDATE
// Update Customer
router.put("/modify/:id", auth, UpdateCustomer);

// -- DELETE
// Delete Customer
router.delete("/delete/:id", auth, DeleteCustomer);

export default router;