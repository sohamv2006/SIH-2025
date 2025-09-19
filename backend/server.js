import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import collegeRoutes from "./routes/collegeRoutes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors()) // allow frontend requests

// Use college routes only (no duplicate routes here)
app.use("/api/colleges", collegeRoutes)

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err))

// Default route
app.get("/", (req, res) => {
  res.send("🎓 Career Advisor API is running...")
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
