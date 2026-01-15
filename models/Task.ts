import mongoose, { Schema, model, models } from "mongoose";

export interface ITask {
    _id?: mongoose.Types.ObjectId;
    nodeId: mongoose.Types.ObjectId;

    title: string;
    description: string;
    expectedOutput: string;

    type: "practice" | "mini_project" | "capstone";
    difficulty: "easy" | "medium" | "hard";

    isCompleted: boolean;

    startDate?: Date;
    endDate?: Date;
}

const taskSchema = new Schema<ITask>({
    nodeId: {
        type: Schema.Types.ObjectId,
        ref: "Node",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    expectedOutput: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["practice", "mini_project", "capstone"],
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
}, { timestamps: true });

const Task = models.Task || model<ITask>("Task", taskSchema);

export default Task;
