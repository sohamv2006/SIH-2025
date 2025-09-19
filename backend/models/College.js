import mongoose from "mongoose"

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ["Government", "Private"], default: "Government" },
  fees: { type: Number, required: true },
  description: { type: String },
}, { timestamps: true })

export default mongoose.models.College || mongoose.model("College", collegeSchema)

