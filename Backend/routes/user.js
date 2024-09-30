import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { newUser, login, logout } from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

// New User
router.post("/register", newUser);
// Login 
router.post("/login", login);
// Logout
router.post("/logout", auth, logout);

export default router;
