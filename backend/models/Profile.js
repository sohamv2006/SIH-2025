// backend/models/Profile.js
import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true }, // from Clerk
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    gender: { type: String, default: "" },
    location: { type: String, default: "" },
    currentClass: { type: String, default: "" },
    stream: { type: String, default: "" },
    interests: { type: [String], default: [] },
    college: { type: String, default: "" }, // can store college id or name
    // Additional fields from onboarding can be added here
  },
  { timestamps: true }
);

const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
export default Profile;
