import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        const connctionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Connection String: `, connctionInstance.connection.host);
    } catch (error) {
        console.log('Error while connecting with db: ', error);
        process.exit(1);
    }
}

// export default connectDB;
export { connectDB };