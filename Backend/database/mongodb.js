import mongoose from 'mongoose'

async function connectDB({ host, port, dbName }) {
  const uri = `mongodb://${host}:${port}/${dbName}`;
  try {
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

export default connectDB;