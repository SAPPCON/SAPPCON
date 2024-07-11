import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected!');
    } catch (error) {
        console.error('Database connection failed: ', error);
        process.exit(1);
    }
};

export default connectDB;
