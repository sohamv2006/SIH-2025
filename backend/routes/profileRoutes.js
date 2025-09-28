// backend/routes/profileRoutes.js
import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// GET profile by userId
// GET /api/profile/:userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// PUT update or create (upsert) profile
// PUT /api/profile/:userId
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const payload = req.body || {};
    // ensure userId in payload is set
    payload.userId = userId;

    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const updated = await Profile.findOneAndUpdate({ userId }, payload, options);
    res.json(updated);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

export default router;
