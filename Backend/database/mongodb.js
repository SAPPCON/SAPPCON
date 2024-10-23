import mongoose from 'mongoose'

async function connectDB({ host, port, dbName, user, pass }) {
    const isProduction = process.env.ENV === "production";
    const uri = isProduction
      ? `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin`
      : `mongodb://${host}:${port}/${dbName}?directConnection=true`;
    try {
        mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

export default connectDB;