import * as mongoose from "mongoose";

const url = process.env.DB_MONGO;

export const connectDb = async () => {
    try {
        await mongoose.connect(url, {});
        console.log("connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

