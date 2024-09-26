import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { newUser, login } from "../controllers/user.js";
const router = express.Router();

// New User
router.post("/register", newUser);
// Login 
router.post("/login", login);

export default router;
