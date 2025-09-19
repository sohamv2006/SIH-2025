import express from "express"
import College from "../models/College.js"

const router = express.Router()

// GET all colleges
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find()
    res.json(colleges)
  } catch (error) {
    res.status(500).json({ message: "Error fetching colleges" })
  }
})

// POST add a new college
router.post("/", async (req, res) => {
  try {
    const college = new College(req.body)
    await college.save()
    res.status(201).json(college)
  } catch (error) {
    res.status(400).json({ message: "Error adding college" })
  }
})

export default router
