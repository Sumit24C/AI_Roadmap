import mongoose, { Schema, model, models } from "mongoose";

export interface INode {
    _id?: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;

    label: string;
    type: "concept" | "tool" | "optional" | "alternative";
    isRoot: boolean;

    parents: string[];
    children: string[];

    totalTasks: number;
}

const nodeSchema = new Schema<INode>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["concept", "tool", "optional", "alternative"],
        required: true,
    },
    isRoot: {
        type: Boolean,
        default: false,
    },
    parents: {
        type: [String],
        default: [],
    },
    children: {
        type: [String],
        default: [],
    },
    totalTasks: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Node = models.Node || model<INode>("Node", nodeSchema);

export default Node;
