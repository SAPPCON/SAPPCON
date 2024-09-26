import express from 'express'
import { NewCustomer, UpdateCustomer, DeleteCustomer, GetCustomers } from '../controllers/customer.js'
import { auth } from '../middlewares/auth.js';
const router = express.Router();

// -- POST
// New Customer
router.post("/new", auth, NewCustomer);

// -- GET
// Get Customers
router.get("/", auth, GetCustomers);

// -- UPDATE
// Update Customer
router.put("/modify/:id", auth, UpdateCustomer);

// -- DELETE
// Delete Customer
router.delete("/delete/:id", auth, DeleteCustomer);

export default router;