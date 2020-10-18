import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.bold)
    } catch (e) {
        console.log(`Something wrong with Error: ${e.message}`.red.bold)
        process.exit(1)
    }
}

export default connectDB