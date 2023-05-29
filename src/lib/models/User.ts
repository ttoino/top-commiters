import { Schema, type InferSchemaType, model } from "mongoose";
import countries from "$lib/countries.json";

const schema = new Schema({
    name: {
        type: String,
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    commits: {
        type: Number,
        required: true,
    },
    pullRequests: {
        type: Number,
        required: true,
    },
    issues: {
        type: Number,
        required: true,
    },
    reviews: {
        type: Number,
        required: true,
    },
    contributions: {
        type: Number,
        required: true,
    },
    privateContributions: {
        type: Number,
        required: true,
    },
    followers: {
        type: Number,
        required: true,
    },
});

export type IUser = InferSchemaType<typeof schema>;

const User = model("User", schema);

export const countryModels: Record<keyof typeof countries, typeof User> =
    Object.keys(countries).reduce((acc, country) => {
        acc[country as keyof typeof countries] = model(country, schema);
        return acc;
    }, {} as Record<keyof typeof countries, typeof User>);

export default User;
