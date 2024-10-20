import express from "express";
import {UploadImage, DownloadImage} from '../controllers/image.js';
import { auth } from "../middlewares/auth.js";
const router = express.Router();

// -- POST
// Upload Image
router.post("/upload", auth, UploadImage);

// Download Image   
router.get("/download", auth, DownloadImage);

export default router;