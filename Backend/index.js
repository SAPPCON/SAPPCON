import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./database/mongodb.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import measureUnitRoutes from "./routes/measureUnit.js";
import customerRoutes from "./routes/customer.js";
import serviceRoutes from "./routes/service.js";
import buildingRoutes from "./routes/building.js";
import budgetRoutes from "./routes/budget.js";
import reporterRoutes from "./routes/reporter.js";
import statsRoutes from "./routes/stats.js";
import imageRoutes from "./routes/image.js";
import helmet from "helmet";
import cors from "cors";
import fs from "fs";
import https from "https";

/* ---- CONFIGURATION ---- */
dotenv.config();
const app = express();
mongoose.set("strictQuery", true);
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:3000",
  "https://sappcon.site",
  "http://localhost:3001",
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    exposedHeaders: ["Content-Disposition"], //Permite al front acceder a Content Disposition en la respuesta
  })
);

/* ---- ROUTES ---- */
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/measureUnit", measureUnitRoutes);
app.use("/customer", customerRoutes);
app.use("/service", serviceRoutes);
app.use("/building", buildingRoutes);
app.use("/budget", budgetRoutes);
app.use("/reporter", reporterRoutes);
app.use("/stats", statsRoutes);
app.use("/image", imageRoutes);

/* ---- INITIALIZATION ---- */
const isProduction = process.env.ENV === "production";
console.log("Production?: ", isProduction);

const dbHost = isProduction
  ? process.env.PROD_DB_HOST
  : process.env.DEV_DB_HOST;
const dbPort = isProduction
  ? process.env.PROD_DB_PORT
  : process.env.DEV_DB_PORT;
const dbName = isProduction
  ? process.env.PROD_DB_NAME
  : process.env.DEV_DB_NAME;
const dbUser = isProduction ? process.env.PROD_DB_USER : "null";
const dbPass = isProduction ? process.env.PROD_DB_PASS : "null";

init(process.env.APP_PORT, dbHost, dbPort, dbName, dbUser, dbPass);

async function init(port, dbHost, dbPort, dbName, dbUser, dbPass) {
  try {
    connectDB({
      host: dbHost,
      port: dbPort,
      dbName: dbName,
      user: dbUser,
      pass: dbPass,
    });
    if (isProduction) {
      const options = {
        key: fs.readFileSync("/etc/letsencrypt/live/sappcon.site/privkey.pem"), // Ruta clave privada
        cert: fs.readFileSync(
          "/etc/letsencrypt/live/sappcon.site/fullchain.pem"
        ), // Ruta certificado
      };
      https.createServer(options, app).listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } else {
      app.listen(port, () => console.log(`Server is running on port ${port}`));
    }
  } catch (error) {
    console.error("Error starting server.", error);
    process.exit(0);
  }
}
