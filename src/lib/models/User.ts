import { Schema, type InferSchemaType, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
    },
    login: {
        type: String,
        required: true,
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
});

export type IUser = InferSchemaType<typeof schema>;

const User = model("User", schema);

export default User;
