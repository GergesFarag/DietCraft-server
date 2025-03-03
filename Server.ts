import {app as server} from "./app";
import { db } from "./utils/db";
import dotenv from "dotenv";
dotenv.config();
db.connect().then(() => {
    console.log("DB Connected!");
    server.listen(process.env.PORT , () => {
        console.log(`Server Is Running On Port ${process.env.PORT}`);
    })
}).catch((err) => console.log("Error While DB connection" , err));