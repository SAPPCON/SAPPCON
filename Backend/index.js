import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import connectDB from './database/mongodb.js'
import userRoutes from './routes/user.js'
import categoryRoutes from './routes/category.js'
import measureUnitRoutes from './routes/measureUnit.js'
import customerRoutes from './routes/customer.js'
import serviceRoutes from './routes/service.js'
import buildingRoutes from './routes/building.js';
import budgetRoutes from './routes/budget.js';
import reporterRoutes from './routes/reporter.js';
import helmet from 'helmet';
import cors from 'cors'


/* ---- CONFIGURATION ---- */
dotenv.config()
const app = express();
mongoose.set("strictQuery", true);
app.use(express.json())
app.use(bodyParser.json())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

/* ---- ROUTES ---- */
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/measureUnit', measureUnitRoutes)
app.use('/customer', customerRoutes)
app.use('/service', serviceRoutes)
app.use('/building', buildingRoutes)
app.use('/budget', budgetRoutes)
app.use("/reporter", reporterRoutes);


/* ---- INITIALIZATION ---- */
init(process.env.APP_PORT, process.env.DEV_DB_HOST, process.env.DEV_DB_PORT, process.env.DEV_DB_NAME)

async function init(port, dbHost, dbPort, dbName) {
    try {
        connectDB({host: dbHost,port: dbPort,dbName: dbName});
        app.listen(port, () => console.log(`Server is running on port ${port}`))
    }
    catch (error) {
        console.error("Error starting server.", error)
        process.exit(0)
    }
}
