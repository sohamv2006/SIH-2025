// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import collegeRoutes from "./routes/collegeRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"; // added

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // allow frontend requests

// Use college routes
app.use("/api/colleges", collegeRoutes);

// Use profile routes
app.use("/api/profile", profileRoutes);

// ✅ MongoDB connection (keeps your existing options)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("🎓 Career Advisor API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
