import { Schema, type InferSchemaType, model } from "mongoose";

const schema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        numberOfUsers: {
            type: Number,
            required: true,
        },
        minFollowers: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

export type IMetadata = InferSchemaType<typeof schema>;

const Metadata = model("Metadata", schema);

export default Metadata;
