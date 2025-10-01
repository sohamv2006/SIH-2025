
import Alert from "../models/alert.js";
import express from "express";
import User from "../models/user.js";
import { sendSMS } from "../smsservice.js";

const router = express.Router();

// Register phone number
router.post("/register-phone", async (req, res) => {
    const { phoneNumber } = req.body;
    console.log("📩 Incoming request with phone:", phoneNumber);

    if (!phoneNumber) {
        return res.status(400).json({ error: "Phone number required" });
    }

    try {
        let user = await User.findOne({ phoneNumber });
        console.log("🔍 Found user:", user);

        // If user does not exist, create new user
        if (!user) {
            user = new User({ phoneNumber, smsSent: false });
            await user.save();
            console.log("✅ New user saved:", user);
        }

        // 1️⃣ Send welcome SMS only once
        if (!user.smsSent) {
            try {
                const welcomeMessage = "Welcome! You'll get alerts for admissions, scholarships, and exams.";
                await sendSMS(phoneNumber, welcomeMessage);
                user.smsSent = true;
                await user.save();
                console.log("📤 Welcome SMS sent");
            } catch (welcomeErr) {
                console.error("❌ Welcome SMS sending failed:", welcomeErr.message);
            }
        }

        // 2️⃣ Send dynamic JEE Main deadline SMS every time
        try {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const yyyy = tomorrow.getFullYear();
            const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
            const dd = String(tomorrow.getDate()).padStart(2, "0");
            const jeeDeadline = `${yyyy}-${mm}-${dd}`;

            const smsMessage = `Reminder: JEE Main Registration deadline is on ${jeeDeadline}. Don't miss it!`;
            await sendSMS(phoneNumber, smsMessage);
            console.log("📤 Deadline SMS sent");
        } catch (deadlineErr) {
            console.error("❌ Deadline SMS sending failed:", deadlineErr.message);
        }

        res.json({ success: true, message: "Phone registered and SMS sent" });
    } catch (err) {
        console.error("❌ Error in register-phone:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Get all alerts
router.get("/alerts", async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ date: 1 });
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch alerts" });
    }
});

export default router;
