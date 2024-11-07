const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
    try {
        const URI = process.env.MONGO_URI;

        if(!URI){
            console.log("MongoURI is not defined");
        }

        await mongoose.connect(URI);
        console.log("Database Connected");

    } catch (error)
     {
        console.error(error);
        process.exit(1);
    }
}



module.exports = connectDB;

