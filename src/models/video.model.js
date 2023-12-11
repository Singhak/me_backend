import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    videoFile: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        max: 100
    },
    description: {
        type: String,
        max: 5000
    },
    thumbnail: {
        type: String
    },
    views: {
        tyep: Number,
        default: 0
    },
    isPublised: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Video = mongoose.model("Video", videoSchema);