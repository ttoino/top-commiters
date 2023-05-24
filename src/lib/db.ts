import { env } from "$env/dynamic/private";
import mongoose from "mongoose";

export const connect = async () => {
    await mongoose.connect(env.DB_URL);
};
