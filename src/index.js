import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });



connectDB()
    .then(() => {
        app.on('error', () => {
            console.log(connectionError);
        })
        app.listen(process.env.PORT || 8080, () => {
            console.log('Server is listening on port ', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log('Unable to connect with DB:', error);
    })