import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema({
    susbcriber: { //to get to whome we subscribed
        type: Schema.ObjectId,
        ref: "User"
    },
    channel: { // to get who subscribe us
        type: Schema.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Subscription = mongoose.model('subscription', SubscriptionSchema);
export { Subscription };