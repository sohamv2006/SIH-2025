"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizResults, setQuizResults] = useState(null)

  // Roadmap state
  const [selectedDegree, setSelectedDegree] = useState("btech-cse")
  const [selectedPathway, setSelectedPathway] = useState("private")

  const router = useRouter()

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }
}
