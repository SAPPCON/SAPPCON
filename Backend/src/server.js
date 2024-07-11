const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//Load environment variables
dotenv.config({ path: './config/config.env' });

//Configure CORS
const corsOptions = {
    origin: "http://localhost:3000", // Permitir solo este origen
    methods: ["GET", "POST"], // Permitir solo estos métodos
    allowedHeaders: ["Content-Type", "Authorization"], // Permitir solo estas cabeceras
}; 

//Connect to database
connectDatabase();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// app.use

