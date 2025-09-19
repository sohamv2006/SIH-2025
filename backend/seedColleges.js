// seedColleges.js
import mongoose from "mongoose"
import dotenv from "dotenv"
import College from "./models/College.js"

dotenv.config()

const colleges = [
  {
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    type: "Government",
    fees: 250000,
    description: "Top engineering institute offering B.Tech, M.Tech, and PhD programs."
  },
  {
    name: "Delhi University",
    location: "New Delhi",
    type: "Government",
    fees: 50000,
    description: "Premier central university with diverse UG and PG programs."
  },
  {
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    type: "Private",
    fees: 400000,
    description: "Renowned private university specializing in engineering and sciences."
  },
  {
    name: "Symbiosis International University",
    location: "Pune, Maharashtra",
    type: "Private",
    fees: 300000,
    description: "Private university well-known for management and law courses."
  },
  {
    name: "AIIMS Delhi",
    location: "New Delhi",
    type: "Government",
    fees: 10000,
    description: "India's top medical institute offering MBBS, MD, and super-specialty programs."
  }
]

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    await College.deleteMany() // Clear old data
    await College.insertMany(colleges)
    console.log("✅ Colleges seeded successfully!")
    process.exit()
  } catch (error) {
    console.error("❌ Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
