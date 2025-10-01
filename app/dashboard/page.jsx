"use client"
import Timeline from "./TimelineSMS"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  GraduationCap,
  Brain,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  Bell,
  MessageCircle,
  ArrowRight,
  Target,
  Clock,
  School,
  Briefcase,
  AlertCircle,
  CheckCircle,
  User,
  LogOut,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Building2,
  BookOpen,
  Star,
  ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"

const mockStats = {
  completedAssessments: 2,
  savedColleges: 8,
  scholarshipApplications: 3,
  upcomingDeadlines: 5,
}

// Get tomorrow's date in YYYY-MM-DD format
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1); // add 1 day
const yyyy = tomorrow.getFullYear();
const mm = String(tomorrow.getMonth() + 1).padStart(2, "0"); // months are 0-based
const dd = String(tomorrow.getDate()).padStart(2, "0");
const tomorrowStr = `${yyyy}-${mm}-${dd}`;

// Dynamic upcomingDeadlines array
const upcomingDeadlines = [
  { title: "JEE Main Registration", date: tomorrowStr, type: "exam", priority: "high" },
  { title: "NEET Application", date: "2024-12-20", type: "exam", priority: "high" },
  { title: "Merit Scholarship", date: "2024-12-25", type: "scholarship", priority: "medium" },
  { title: "DU Admission", date: "2025-01-10", type: "admission", priority: "high" },
  { title: "State Counseling", date: "2025-01-15", type: "counseling", priority: "medium" },
];

/*
const upcomingDeadlines = [
  { title: "JEE Main Registration", date: "2024-12-15", type: "exam", priority: "high" },
  { title: "NEET Application", date: "2024-12-20", type: "exam", priority: "high" },
  { title: "Merit Scholarship", date: "2024-12-25", type: "scholarship", priority: "medium" },
  { title: "DU Admission", date: "2025-01-10", type: "admission", priority: "high" },
  { title: "State Counseling", date: "2025-01-15", type: "counseling", priority: "medium" },
]
*/
const recommendedActions = [
  {
    title: "Complete Career Assessment",
    description: "Take our comprehensive aptitude test to discover your ideal career path",
    icon: Brain,
    action: "assessment",
    progress: 0,
  },
  {
    title: "Explore Nearby Colleges",
    description: "Find government colleges in your area with detailed information",
    icon: MapPin,
    action: "colleges",
    progress: 25,
  },
  {
    title: "View Career Roadmaps",
    description: "See detailed pathways from courses to career opportunities",
    icon: TrendingUp,
    action: "roadmaps",
    progress: 0,
  },
  {
    title: "Set Up Alerts",
    description: "Never miss important deadlines and opportunities",
    icon: Bell,
    action: "alerts",
    progress: 60,
  },
]

const recentActivity = [
  { action: "Saved IIT Delhi to favorites", time: "2 hours ago", icon: School },
  { action: "Completed Interest Assessment", time: "1 day ago", icon: CheckCircle },
  { action: "Applied for Merit Scholarship", time: "3 days ago", icon: Award },
  { action: "Viewed Software Engineer roadmap", time: "5 days ago", icon: Briefcase },
]

const quizQuestions = [
  {
    id: 1,
    category: "interests",
    question: "Which activity do you find most engaging?",
    options: [
      { value: "solving-math", label: "Solving complex mathematical problems", weight: { science: 3, commerce: 1 } },
      { value: "reading-literature", label: "Reading literature and writing essays", weight: { arts: 3, commerce: 1 } },
      {
        value: "business-analysis",
        label: "Analyzing business trends and markets",
        weight: { commerce: 3, science: 1 },
      },
      {
        value: "hands-on-projects",
        label: "Working on hands-on technical projects",
        weight: { vocational: 3, science: 2 },
      },
    ],
  },
  {
    id: 2,
    category: "personality",
    question: "How do you prefer to work?",
    options: [
      { value: "team-collaboration", label: "In teams with lots of collaboration", weight: { commerce: 2, arts: 2 } },
      { value: "independent-research", label: "Independently on research projects", weight: { science: 3, arts: 1 } },
      { value: "creative-expression", label: "On creative and artistic projects", weight: { arts: 3, vocational: 2 } },
      {
        value: "practical-application",
        label: "On practical, real-world applications",
        weight: { vocational: 3, commerce: 2 },
      },
    ],
  },
  {
    id: 3,
    category: "skills",
    question: "Which subject do you excel at most?",
    options: [
      { value: "mathematics", label: "Mathematics and logical reasoning", weight: { science: 3, commerce: 2 } },
      { value: "languages", label: "Languages and communication", weight: { arts: 3, commerce: 1 } },
      { value: "science-lab", label: "Science and laboratory work", weight: { science: 3, vocational: 1 } },
      { value: "economics", label: "Economics and business studies", weight: { commerce: 3, arts: 1 } },
    ],
  },
  {
    id: 4,
    category: "preferences",
    question: "What type of career environment appeals to you?",
    options: [
      { value: "corporate", label: "Corporate offices and business settings", weight: { commerce: 3, science: 1 } },
      {
        value: "laboratory",
        label: "Research labs and scientific institutions",
        weight: { science: 3, vocational: 1 },
      },
      {
        value: "creative-studio",
        label: "Creative studios and cultural institutions",
        weight: { arts: 3, vocational: 2 },
      },
      { value: "workshop", label: "Workshops and hands-on environments", weight: { vocational: 3, science: 1 } },
    ],
  },
  {
    id: 5,
    category: "interests",
    question: "Which topic would you choose for a project?",
    options: [
      { value: "climate-change", label: "Climate change and environmental solutions", weight: { science: 3, arts: 1 } },
      { value: "social-issues", label: "Social issues and human behavior", weight: { arts: 3, commerce: 1 } },
      { value: "market-trends", label: "Market trends and economic analysis", weight: { commerce: 3, science: 1 } },
      {
        value: "technology-innovation",
        label: "Technology innovation and development",
        weight: { science: 2, vocational: 3 },
      },
    ],
  },
  {
    id: 6,
    category: "skills",
    question: "What is your strongest skill?",
    options: [
      { value: "analytical-thinking", label: "Analytical and critical thinking", weight: { science: 3, commerce: 2 } },
      {
        value: "creative-expression",
        label: "Creative expression and imagination",
        weight: { arts: 3, vocational: 2 },
      },
      { value: "leadership", label: "Leadership and team management", weight: { commerce: 3, arts: 1 } },
      { value: "technical-skills", label: "Technical and practical skills", weight: { vocational: 3, science: 2 } },
    ],
  },
  {
    id: 7,
    category: "preferences",
    question: "How do you like to spend your free time?",
    options: [
      { value: "reading-research", label: "Reading research papers and articles", weight: { science: 3, arts: 2 } },
      {
        value: "creative-hobbies",
        label: "Pursuing creative hobbies like art or music",
        weight: { arts: 3, vocational: 1 },
      },
      { value: "business-news", label: "Following business news and trends", weight: { commerce: 3, science: 1 } },
      { value: "building-things", label: "Building or fixing things", weight: { vocational: 3, science: 2 } },
    ],
  },
  {
    id: 8,
    category: "personality",
    question: "Which describes your approach to problem-solving?",
    options: [
      { value: "systematic", label: "Systematic and methodical approach", weight: { science: 3, commerce: 2 } },
      { value: "intuitive", label: "Intuitive and creative approach", weight: { arts: 3, vocational: 1 } },
      { value: "strategic", label: "Strategic and business-minded approach", weight: { commerce: 3, arts: 1 } },
      { value: "hands-on", label: "Hands-on and practical approach", weight: { vocational: 3, science: 1 } },
    ],
  },
]

const streamInfo = {
  science: {
    name: "Science",
    description: "Perfect for analytical minds interested in research, technology, and innovation",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"],
    careers: ["Engineer", "Doctor", "Researcher", "Data Scientist", "Biotechnologist"],
    color: "bg-blue-100 text-blue-800",
  },
  commerce: {
    name: "Commerce",
    description: "Ideal for business-minded individuals interested in economics and management",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics", "English"],
    careers: ["Business Analyst", "Chartered Accountant", "Marketing Manager", "Entrepreneur", "Financial Advisor"],
    color: "bg-green-100 text-green-800",
  },
  arts: {
    name: "Arts/Humanities",
    description: "Great for creative and socially conscious individuals",
    subjects: ["History", "Geography", "Political Science", "Psychology", "English Literature"],
    careers: ["Teacher", "Journalist", "Psychologist", "Civil Servant", "Social Worker"],
    color: "bg-purple-100 text-purple-800",
  },
  vocational: {
    name: "Vocational",
    description: "Perfect for hands-on learners interested in practical skills",
    subjects: ["Computer Applications", "Multimedia", "Fashion Design", "Agriculture", "Healthcare"],
    careers: ["Web Developer", "Graphic Designer", "Chef", "Fashion Designer", "Technician"],
    color: "bg-orange-100 text-orange-800",
  },
}

const careerRoadmaps = [
  {
    id: "btech-cse",
    degree: "B.Tech Computer Science",
    duration: "4 years",
    pathways: {
      government: [
        {
          title: "Civil Services",
          exams: ["UPSC CSE", "State PSC", "SSC CGL"],
          roles: ["IAS Officer", "IPS Officer", "Collector", "SDM"],
        },
        {
          title: "Technical Services",
          exams: ["GATE", "ISRO", "DRDO", "BARC"],
          roles: ["Scientist", "Engineer", "Technical Officer", "Research Associate"],
        },
      ],
      private: [
        {
          title: "Software Industry",
          companies: ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
          roles: ["Software Engineer", "Data Scientist", "Product Manager", "DevOps Engineer"],
        },
        {
          title: "Consulting",
          companies: ["McKinsey", "BCG", "Deloitte", "Accenture"],
          roles: ["Technology Consultant", "Business Analyst", "Solution Architect"],
        },
      ],
      entrepreneurship: [
        {
          title: "Tech Startup",
          opportunities: ["SaaS Products", "Mobile Apps", "AI/ML Solutions", "Fintech"],
          skills: ["Product Development", "Team Leadership", "Fundraising", "Market Analysis"],
        },
        {
          title: "Freelancing",
          opportunities: ["Web Development", "App Development", "Data Analysis", "Consulting"],
          skills: ["Client Management", "Project Management", "Marketing", "Networking"],
        },
      ],
      higherEducation: [
        {
          title: "Master's Programs",
          courses: ["M.Tech", "MS", "MBA"],
          specializations: ["AI/ML", "Cybersecurity", "Data Science", "Management"],
        },
        {
          title: "Research",
          courses: ["PhD", "Research Fellowship"],
          specializations: ["Computer Vision", "NLP", "Robotics", "Quantum Computing"],
        },
      ],
    },
  },
  {
    id: "bcom",
    degree: "B.Com (Bachelor of Commerce)",
    duration: "3 years",
    pathways: {
      government: [
        {
          title: "Banking & Finance",
          exams: ["IBPS PO", "SBI PO", "RBI Grade B", "NABARD"],
          roles: ["Bank Manager", "Financial Analyst", "Credit Officer", "Investment Advisor"],
        },
        {
          title: "Civil Services",
          exams: ["UPSC CSE", "State PSC", "SSC CGL"],
          roles: ["IAS Officer", "IRS Officer", "Accounts Officer", "Auditor"],
        },
      ],
      private: [
        {
          title: "Corporate Finance",
          companies: ["HDFC", "ICICI", "Kotak", "Axis Bank", "Yes Bank"],
          roles: ["Financial Analyst", "Investment Banker", "Portfolio Manager", "Risk Analyst"],
        },
        {
          title: "Accounting Firms",
          companies: ["Deloitte", "PwC", "EY", "KPMG"],
          roles: ["Chartered Accountant", "Tax Consultant", "Audit Manager", "Financial Advisor"],
        },
      ],
      entrepreneurship: [
        {
          title: "Financial Services",
          opportunities: ["Investment Advisory", "Tax Consulting", "Insurance Brokerage", "Fintech"],
          skills: ["Financial Planning", "Client Relations", "Regulatory Knowledge", "Technology"],
        },
        {
          title: "Business Consulting",
          opportunities: ["Business Advisory", "Startup Consulting", "Market Research", "Training"],
          skills: ["Business Analysis", "Strategic Planning", "Communication", "Leadership"],
        },
      ],
      higherEducation: [
        {
          title: "Professional Courses",
          courses: ["CA", "CMA", "CS", "CFA"],
          specializations: ["Taxation", "Audit", "Corporate Law", "Investment Management"],
        },
        {
          title: "Master's Programs",
          courses: ["M.Com", "MBA", "M.Fin"],
          specializations: ["Finance", "Marketing", "International Business", "Analytics"],
        },
      ],
    },
  },
  {
    id: "ba-english",
    degree: "B.A. English Literature",
    duration: "3 years",
    pathways: {
      government: [
        {
          title: "Civil Services",
          exams: ["UPSC CSE", "State PSC", "UPSC CDS"],
          roles: ["IAS Officer", "IFS Officer", "Administrative Officer", "Cultural Officer"],
        },
        {
          title: "Education Sector",
          exams: ["UGC NET", "State TET", "DSSSB"],
          roles: ["Professor", "Teacher", "Education Officer", "Curriculum Developer"],
        },
      ],
      private: [
        {
          title: "Media & Publishing",
          companies: ["Times Group", "Hindustan Times", "Penguin", "HarperCollins"],
          roles: ["Journalist", "Editor", "Content Writer", "Publisher"],
        },
        {
          title: "Corporate Communications",
          companies: ["Tata", "Reliance", "Infosys", "Wipro"],
          roles: ["Content Manager", "PR Executive", "Communications Specialist", "Brand Manager"],
        },
      ],
      entrepreneurship: [
        {
          title: "Content Creation",
          opportunities: ["Blogging", "YouTube", "Podcasting", "Online Courses"],
          skills: ["Content Strategy", "Digital Marketing", "Video Production", "Audience Building"],
        },
        {
          title: "Publishing & Writing",
          opportunities: ["Book Publishing", "Magazine", "Content Agency", "Translation Services"],
          skills: ["Writing", "Editing", "Project Management", "Client Relations"],
        },
      ],
      higherEducation: [
        {
          title: "Literature & Language",
          courses: ["M.A. English", "M.Phil", "PhD"],
          specializations: ["Comparative Literature", "Linguistics", "Creative Writing", "Translation Studies"],
        },
        {
          title: "Professional Programs",
          courses: ["MBA", "Mass Communication", "Journalism"],
          specializations: ["Marketing", "Media Management", "Digital Marketing", "Public Relations"],
        },
      ],
    },
  },
  {
    id: "bsc-physics",
    degree: "B.Sc. Physics",
    duration: "3 years",
    pathways: {
      government: [
        {
          title: "Research Organizations",
          exams: ["GATE", "CSIR NET", "ISRO", "BARC"],
          roles: ["Scientist", "Research Fellow", "Technical Officer", "Lab Assistant"],
        },
        {
          title: "Defense & Space",
          exams: ["DRDO", "ISRO", "Indian Navy", "Indian Air Force"],
          roles: ["Defense Scientist", "Aerospace Engineer", "Technical Officer", "Research Associate"],
        },
      ],
      private: [
        {
          title: "Technology Companies",
          companies: ["Intel", "NVIDIA", "Qualcomm", "Samsung", "IBM"],
          roles: ["Hardware Engineer", "Data Analyst", "Quality Analyst", "Technical Consultant"],
        },
        {
          title: "Education & Training",
          companies: ["BYJU'S", "Unacademy", "Vedantu", "Toppr"],
          roles: ["Physics Teacher", "Content Developer", "Curriculum Designer", "Academic Coordinator"],
        },
      ],
      entrepreneurship: [
        {
          title: "EdTech",
          opportunities: ["Online Tutoring", "Educational Apps", "Science Content", "Lab Equipment"],
          skills: ["Teaching", "Content Creation", "Technology", "Business Development"],
        },
        {
          title: "Research & Development",
          opportunities: ["Scientific Consulting", "Patent Research", "Technical Writing", "Innovation Labs"],
          skills: ["Research Methods", "Technical Writing", "Project Management", "Innovation"],
        },
      ],
      higherEducation: [
        {
          title: "Advanced Physics",
          courses: ["M.Sc. Physics", "M.Tech", "PhD"],
          specializations: ["Quantum Physics", "Astrophysics", "Nuclear Physics", "Condensed Matter"],
        },
        {
          title: "Interdisciplinary",
          courses: ["MBA", "M.Tech", "Data Science"],
          specializations: ["Technology Management", "Engineering Physics", "Computational Physics", "Analytics"],
        },
      ],
    },
  },
]

const pathwayIcons = {
  government: Building2,
  private: Briefcase,
  entrepreneurship: Lightbulb,
  higherEducation: GraduationCap,
}

const pathwayColors = {
  government: "bg-blue-100 text-blue-800 border-blue-200",
  private: "bg-green-100 text-green-800 border-green-200",
  entrepreneurship: "bg-orange-100 text-orange-800 border-orange-200",
  higherEducation: "bg-purple-100 text-purple-800 border-purple-200",
}

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  // Colleges state and filters
  const [colleges, setColleges] = useState([])
  const [isLoadingColleges, setIsLoadingColleges] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    location: "",
    minFees: "",
    maxFees: ""
  })

  useEffect(() => {
    async function fetchColleges() {
      setIsLoadingColleges(true)
      try {
        const params = new URLSearchParams()
        if (filters.search) params.append("search", filters.search)
        if (filters.type) params.append("type", filters.type)
        if (filters.location) params.append("location", filters.location)
        if (filters.minFees) params.append("minFees", filters.minFees)
        if (filters.maxFees) params.append("maxFees", filters.maxFees)

        const res = await fetch(`http://localhost:5000/api/colleges?${params.toString()}`)
        const data = await res.json()
        setColleges(data)
      } catch (err) {
        console.error("Error fetching colleges:", err)
      } finally {
        setIsLoadingColleges(false)
      }
    }
    fetchColleges()
  }, [filters])

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

  useEffect(() => {
    // Load user profile from localStorage
    const profileData = localStorage.getItem("profileData")
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (!isAuthenticated) {
      router.push("/auth")
      return
    }

    if (profileData) {
      setUserProfile(JSON.parse(profileData))
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("profileData")
    localStorage.removeItem("onboardingComplete")
    router.push("/")
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setAnswers({})
    setQuizCompleted(false)
    setQuizResults(null)
  }

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    const streamScores = { science: 0, commerce: 0, arts: 0, vocational: 0 }

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = quizQuestions.find((q) => q.id === Number.parseInt(questionId))
      const selectedOption = question?.options.find((opt) => opt.value === answer)

      if (selectedOption) {
        Object.entries(selectedOption.weight).forEach(([stream, weight]) => {
          streamScores[stream] += weight
        })
      }
    })

    // Find primary and secondary streams
    const sortedStreams = Object.entries(streamScores).sort(([, a], [, b]) => b - a)
    const primaryStream = sortedStreams[0][0]
    const secondaryStream = sortedStreams[1][0]

    const results = {
      streams: streamScores,
      personality: { analytical: 75, creative: 60, practical: 80, social: 65 },
      recommendations: {
        primaryStream,
        secondaryStream,
        careers: streamInfo[primaryStream].careers.slice(0, 3),
        subjects: streamInfo[primaryStream].subjects.slice(0, 4),
        reasoning: `Based on your responses, you show strong alignment with ${streamInfo[primaryStream].name} stream. Your analytical thinking and problem-solving approach make you well-suited for this field.`,
      },
    }

    setQuizResults(results)
    setQuizCompleted(true)
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setAnswers({})
    setQuizCompleted(false)
    setQuizResults(null)
  }

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>Please complete your profile setup first.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/onboarding")} className="w-full">
              Complete Profile Setup
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-serif font-bold text-xl text-foreground">ShikshaSetu</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {mockStats.upcomingDeadlines}
                </Badge>
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getInitials(userProfile.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{userProfile.fullName}</p>
                  <p className="text-xs text-muted-foreground">{userProfile.currentClass}</p>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Welcome back, {userProfile.fullName.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">
            Continue your career journey with personalized guidance and recommendations.
          </p>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Assessment</span>
            </TabsTrigger>
            <TabsTrigger value="roadmaps" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Roadmaps</span>
            </TabsTrigger>
            <TabsTrigger value="colleges" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Colleges</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.completedAssessments}</p>
                      <p className="text-xs text-muted-foreground">Assessments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <School className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.savedColleges}</p>
                      <p className="text-xs text-muted-foreground">Saved Colleges</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.scholarshipApplications}</p>
                      <p className="text-xs text-muted-foreground">Applications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.upcomingDeadlines}</p>
                      <p className="text-xs text-muted-foreground">Deadlines</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Recommended Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Recommended Actions</span>
                  </CardTitle>
                  <CardDescription>Complete these steps to maximize your career planning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => action.action === "assessment" && setActiveTab("assessment")}
                      >
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{action.title}</h4>
                          <p className="text-xs text-muted-foreground">{action.description}</p>
                          {action.progress > 0 && <Progress value={action.progress} className="h-1 mt-2" />}
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                  <CardDescription>Important dates you shouldn't miss</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingDeadlines.slice(0, 4).map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${getPriorityColor(deadline.priority).split(" ")[1]}`}
                        ></div>
                        <div>
                          <p className="font-medium text-sm">{deadline.title}</p>
                          <p className="text-xs text-muted-foreground">{deadline.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{new Date(deadline.date).toLocaleDateString()}</p>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(deadline.priority)}`}>
                          {deadline.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-3 bg-transparent">
                    View All Deadlines
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="bg-muted p-2 rounded-lg">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-6">
            {!quizStarted && !quizCompleted && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Aptitude & Interest Assessment</span>
                  </CardTitle>
                  <CardDescription>Discover your ideal career path through comprehensive assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-4">Ready to Discover Your Perfect Stream?</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Our comprehensive assessment analyzes your interests, personality traits, and skills to recommend
                      the best academic stream and career paths for you. The quiz takes about 5-10 minutes to complete.
                    </p>
                    <div className="grid md:grid-cols-4 gap-4 mb-8">
                      <div className="text-center">
                        <div className="bg-blue-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                          <Target className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-sm">Interest Analysis</h4>
                        <p className="text-xs text-muted-foreground">Discover what motivates you</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                          <User className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-medium text-sm">Personality Traits</h4>
                        <p className="text-xs text-muted-foreground">Understand your work style</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-purple-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                          <Lightbulb className="h-6 w-6 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-sm">Skills Assessment</h4>
                        <p className="text-xs text-muted-foreground">Identify your strengths</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-orange-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                          <TrendingUp className="h-6 w-6 text-orange-600" />
                        </div>
                        <h4 className="font-medium text-sm">Career Matching</h4>
                        <p className="text-xs text-muted-foreground">Get personalized recommendations</p>
                      </div>
                    </div>
                    <Button onClick={startQuiz} size="lg" className="px-8">
                      Start Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {quizStarted && !quizCompleted && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5" />
                      <span>Assessment in Progress</span>
                    </CardTitle>
                    <Badge variant="outline">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </Badge>
                  </div>
                  <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="mt-4" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">{quizQuestions[currentQuestion].question}</h3>
                    <RadioGroup
                      value={answers[quizQuestions[currentQuestion].id] || ""}
                      onValueChange={(value) => handleAnswerSelect(quizQuestions[currentQuestion].id, value)}
                    >
                      {quizQuestions[currentQuestion].options.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={previousQuestion}
                      disabled={currentQuestion === 0}
                      className="bg-transparent"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button onClick={nextQuestion} disabled={!answers[quizQuestions[currentQuestion].id]}>
                      {currentQuestion === quizQuestions.length - 1 ? "Complete Assessment" : "Next"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {quizCompleted && quizResults && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Assessment Complete!</span>
                    </CardTitle>
                    <CardDescription>Here are your personalized recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3">Recommended Streams</h3>
                        <div className="space-y-3">
                          <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">
                                {streamInfo[quizResults.recommendations.primaryStream].name}
                              </h4>
                              <Badge
                                className={
                                  streamInfo[quizResults.recommendations.primaryStream].color
                                }
                              >
                                Primary Match
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {
                                streamInfo[quizResults.recommendations.primaryStream]
                                  .description
                              }
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {streamInfo[quizResults.recommendations.primaryStream].subjects
                                .slice(0, 3)
                                .map((subject) => (
                                  <Badge key={subject} variant="secondary" className="text-xs">
                                    {subject}
                                  </Badge>
                                ))}
                            </div>
                          </div>

                          <div className="p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">
                                {
                                  streamInfo[quizResults.recommendations.secondaryStream]
                                    .name
                                }
                              </h4>
                              <Badge variant="outline">Secondary Match</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {
                                streamInfo[quizResults.recommendations.secondaryStream]
                                  .description
                              }
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {streamInfo[
                                quizResults.recommendations.secondaryStream
                              ].subjects
                                .slice(0, 3)
                                .map((subject) => (
                                  <Badge key={subject} variant="outline" className="text-xs">
                                    {subject}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Career Recommendations</h3>
                        <div className="space-y-2 mb-4">
                          {quizResults.recommendations.careers.map((career, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 rounded border">
                              <Briefcase className="h-4 w-4 text-primary" />
                              <span className="text-sm">{career}</span>
                            </div>
                          ))}
                        </div>

                        <h3 className="font-semibold mb-3">Recommended Subjects</h3>
                        <div className="flex flex-wrap gap-2">
                          {quizResults.recommendations.subjects.map((subject, index) => (
                            <Badge key={index} variant="secondary">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-semibold mb-2">Why This Recommendation?</h3>
                      <p className="text-sm text-muted-foreground">{quizResults.recommendations.reasoning}</p>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <Button onClick={resetQuiz} variant="outline" className="bg-transparent">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Retake Assessment
                      </Button>
                      <Button onClick={() => setActiveTab("colleges")}>
                        Explore Colleges
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Roadmaps Tab */}
          <TabsContent value="roadmaps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Course-to-Career Roadmaps</span>
                </CardTitle>
                <CardDescription>Visual pathways from your education to career opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Degree Selector */}
                  <div>
                    <Label htmlFor="degree-select" className="text-base font-medium mb-3 block">
                      Select Your Degree Program
                    </Label>
                    <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                      <SelectTrigger className="w-full max-w-md">
                        <SelectValue placeholder="Choose a degree program" />
                      </SelectTrigger>
                      <SelectContent>
                        {careerRoadmaps.map((roadmap) => (
                          <SelectItem key={roadmap.id} value={roadmap.id}>
                            {roadmap.degree} ({roadmap.duration})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pathway Selector */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Choose Your Career Path</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(pathwayIcons).map(([key, Icon]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedPathway(key)}
                          className={`p-4 rounded-lg border-2 transition-all ${selectedPathway === key
                            ? pathwayColors[key]
                            : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                          <Icon className="h-6 w-6 mx-auto mb-2" />
                          <div className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Roadmap Display */}
                  {(() => {
                    const selectedRoadmap = careerRoadmaps.find((r) => r.id === selectedDegree)
                    if (!selectedRoadmap) return null

                    const pathwayData =
                      selectedRoadmap.pathways[selectedPathway]
                    const PathwayIcon = pathwayIcons[selectedPathway]

                    return (
                      <div className="space-y-6">
                        {/* Roadmap Header */}
                        <div className="text-center py-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                          <div className="flex items-center justify-center mb-4">
                            <GraduationCap className="h-8 w-8 text-primary mr-3" />
                            <ArrowRight className="h-6 w-6 text-muted-foreground mx-2" />
                            <PathwayIcon className="h-8 w-8 text-primary ml-3" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">{selectedRoadmap.degree}</h3>
                          <p className="text-muted-foreground">
                            {selectedPathway.charAt(0).toUpperCase() +
                              selectedPathway.slice(1).replace(/([A-Z])/g, " $1")}{" "}
                            Career Pathways
                          </p>
                        </div>

                        {/* Career Pathways */}
                        <div className="grid gap-6">
                          {pathwayData.map((pathway, index) => (
                            <Card key={index} className="border-2 hover:shadow-md transition-shadow">
                              <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                  <div
                                    className={`p-2 rounded-lg ${pathwayColors[selectedPathway]}`}
                                  >
                                    <PathwayIcon className="h-5 w-5" />
                                  </div>
                                  <span>{pathway.title}</span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid md:grid-cols-3 gap-4">
                                  {/* First Column - Exams/Companies/Opportunities/Courses */}
                                  <div>
                                    <h4 className="font-medium mb-2 text-sm text-muted-foreground">
                                      {selectedPathway === "government"
                                        ? "Entrance Exams"
                                        : selectedPathway === "private"
                                          ? "Top Companies"
                                          : selectedPathway === "entrepreneurship"
                                            ? "Opportunities"
                                            : "Programs"}
                                    </h4>
                                    <div className="space-y-1">
                                      {(
                                        pathway.exams ||
                                        pathway.companies ||
                                        pathway.opportunities ||
                                        pathway.courses ||
                                        []
                                      ).map((item, idx) => (
                                        <Badge key={idx} variant="outline" className="block w-fit text-xs">
                                          {item}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Second Column - Roles/Skills/Specializations */}
                                  <div>
                                    <h4 className="font-medium mb-2 text-sm text-muted-foreground">
                                      {selectedPathway === "entrepreneurship"
                                        ? "Key Skills"
                                        : selectedPathway === "higherEducation"
                                          ? "Specializations"
                                          : "Career Roles"}
                                    </h4>
                                    <div className="space-y-1">
                                      {(pathway.roles || pathway.skills || pathway.specializations || []).map(
                                        (item, idx) => (
                                          <div key={idx} className="flex items-center space-x-2">
                                            <ChevronRight className="h-3 w-3 text-primary" />
                                            <span className="text-sm">{item}</span>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  </div>

                                  {/* Third Column - Career Progression */}
                                  <div>
                                    <h4 className="font-medium mb-2 text-sm text-muted-foreground">Career Growth</h4>
                                    <div className="space-y-2">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-xs">Entry Level (0-2 years)</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        <span className="text-xs">Mid Level (3-7 years)</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <span className="text-xs">Senior Level (8+ years)</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-4 pt-4 border-t">
                                  <Button size="sm" variant="outline" className="bg-transparent">
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Learn More
                                  </Button>
                                  <Button size="sm" onClick={() => setActiveTab("colleges")}>
                                    <School className="h-4 w-4 mr-2" />
                                    Find Colleges
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        {/* Success Tips */}
                        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Star className="h-5 w-5 text-yellow-500" />
                              <span>Success Tips for {selectedRoadmap.degree}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">During Your Degree</h4>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                  <li>• Maintain good academic performance (70%+ marks)</li>
                                  <li>• Participate in internships and projects</li>
                                  <li>• Build relevant skills through online courses</li>
                                  <li>• Network with professionals in your field</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">After Graduation</h4>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                  <li>• Start preparing for entrance exams early</li>
                                  <li>• Build a strong portfolio/resume</li>
                                  <li>• Consider additional certifications</li>
                                  <li>• Stay updated with industry trends</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colleges Tab */}
          <TabsContent value="colleges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>College Directory</span>
                </CardTitle>
                <CardDescription>
                  Search and filter colleges by type, location, and fees
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters Section */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <input
                    type="text"
                    placeholder="Search colleges..."
                    className="border rounded-lg px-3 py-2 text-sm w-full"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />

                  {/* Type Filter */}
                  <select
                    className="border rounded-lg px-3 py-2 text-sm"
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  >
                    <option value="">All Types</option>
                    <option value="Government">Government</option>
                    <option value="Private">Private</option>
                  </select>

                  {/* Location Filter */}
                  <input
                    type="text"
                    placeholder="Location"
                    className="border rounded-lg px-3 py-2 text-sm"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  />

                  {/* Fees Range */}
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min Fees"
                      className="border rounded-lg px-3 py-2 text-sm w-1/2"
                      value={filters.minFees}
                      onChange={(e) => setFilters({ ...filters, minFees: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Max Fees"
                      className="border rounded-lg px-3 py-2 text-sm w-1/2"
                      value={filters.maxFees}
                      onChange={(e) => setFilters({ ...filters, maxFees: e.target.value })}
                    />
                  </div>
                </div>

                {/* Colleges Grid */}
                {isLoadingColleges ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading colleges...</p>
                  </div>
                ) : colleges.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Colleges Found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting filters or add some colleges in MongoDB.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {colleges.map((college) => (
                      <Card
                        key={college._id}
                        className="border hover:shadow-md transition-shadow"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <School className="h-5 w-5 text-primary" />
                            <span>{college.name}</span>
                          </CardTitle>
                          <CardDescription>{college.location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            {college.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline">{college.type}</Badge>
                            <Badge variant="secondary">Fees: ₹{college.fees}</Badge>
                          </div>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>



          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Timeline />
          </TabsContent>

        </Tabs>

      </div>

      {/* Floating AI Chatbot Button */}
      <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg" size="lg">
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
