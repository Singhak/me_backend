import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema({
    susbcriber: {
        type: Schema.ObjectId,
        ref: "User"
    },
    channel: {
        type: Schema.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Subscription = mongoose.model('subscription', SubscriptionSchema);
export { Subscription };