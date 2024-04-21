import mongoose from 'mongoose';

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE}`);
        console.log(`connected to DATABASE Successfully \n${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Mongoose error is: ${error}`);
    }
};

export default connectToMongoDb;
