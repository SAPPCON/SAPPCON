import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { newUser, login, logout, getUser, updateUser } from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

// -- POST
// New User
router.post("/register", newUser);
// Login 
router.post("/login", login);
// Logout
router.post("/logout", auth, logout);

// -- GET
// GetUser
router.get("/info", auth, getUser);

// -- UPDATE
// EditUser
router.put("/modify", auth, updateUser);

export default router;
