import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("MongoDB is already connected");
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_promp",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true

        console.log('Mongo DB Connected');
    } catch (error) {
        console.log(error);
    }
}