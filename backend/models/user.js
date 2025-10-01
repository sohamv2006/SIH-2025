import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    smsSent: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
