"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  TrendingUp,
  DollarSign,
  BookOpen,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Clock,
  Star,
  ChevronRight,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

// Use plain JS objects, not TypeScript interfaces
const careerPaths = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    description: "Design, develop, and maintain software applications and systems.",
    averageSalary: { entry: 600000, mid: 1200000, senior: 2500000 },
    jobGrowth: 22,
    demandLevel: "High",
    requiredEducation: ["B.Tech/B.E. in Computer Science", "MCA", "M.Tech"],
    keySkills: ["Programming", "Problem Solving", "System Design", "Database Management"],
    topEmployers: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"],
    careerProgression: ["Junior Developer", "Software Engineer", "Senior Engineer", "Tech Lead", "Engineering Manager"],
    entranceExams: ["JEE Main", "JEE Advanced", "GATE"],
    workLifeBalance: 7,
    jobSatisfaction: 8,
    marketTrends: "Growing demand for AI/ML and cloud computing skills",
    successStories: 1250,
  },
  {
    id: "doctor",
    title: "Medical Doctor",
    category: "Healthcare",
    description: "Diagnose and treat patients, promote health and prevent disease.",
    averageSalary: { entry: 800000, mid: 1500000, senior: 3000000 },
    jobGrowth: 15,
    demandLevel: "High",
    requiredEducation: ["MBBS", "MD/MS Specialization"],
    keySkills: ["Medical Knowledge", "Patient Care", "Communication", "Critical Thinking"],
    topEmployers: ["AIIMS", "Apollo Hospitals", "Fortis", "Max Healthcare", "Government Hospitals"],
    careerProgression: ["Medical Student", "Intern", "Resident", "Specialist", "Consultant"],
    entranceExams: ["NEET UG", "NEET PG", "AIIMS"],
    workLifeBalance: 6,
    jobSatisfaction: 9,
    marketTrends: "Increasing demand for specialized healthcare services",
    successStories: 890,
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Technology",
    description: "Analyze complex data to help organizations make informed decisions.",
    averageSalary: { entry: 700000, mid: 1400000, senior: 2800000 },
    jobGrowth: 35,
    demandLevel: "High",
    requiredEducation: ["B.Tech/B.Sc. in relevant field", "M.Sc. Data Science", "MBA Analytics"],
    keySkills: ["Statistics", "Machine Learning", "Python/R", "Data Visualization"],
    topEmployers: ["Google", "Facebook", "Netflix", "Flipkart", "Zomato"],
    careerProgression: [
      "Data Analyst",
      "Data Scientist",
      "Senior Data Scientist",
      "Lead Data Scientist",
      "Chief Data Officer",
    ],
    entranceExams: ["JEE Main", "GATE", "CAT"],
    workLifeBalance: 7,
    jobSatisfaction: 8,
    marketTrends: "Explosive growth in AI and machine learning applications",
    successStories: 650,
  },
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    category: "Engineering",
    description: "Design and oversee construction of infrastructure projects.",
    averageSalary: { entry: 400000, mid: 800000, senior: 1800000 },
    jobGrowth: 8,
    demandLevel: "Medium",
    requiredEducation: ["B.Tech/B.E. Civil Engineering", "M.Tech"],
    keySkills: ["Structural Design", "Project Management", "AutoCAD", "Construction Knowledge"],
    topEmployers: ["L&T", "Tata Projects", "Shapoorji Pallonji", "IRCON", "NHAI"],
    careerProgression: ["Junior Engineer", "Site Engineer", "Project Engineer", "Project Manager", "Chief Engineer"],
    entranceExams: ["JEE Main", "JEE Advanced", "GATE"],
    workLifeBalance: 6,
    jobSatisfaction: 7,
    marketTrends: "Growth in infrastructure and smart city projects",
    successStories: 420,
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant",
    category: "Finance",
    description: "Provide financial advice, auditing, and taxation services.",
    averageSalary: { entry: 600000, mid: 1200000, senior: 2500000 },
    jobGrowth: 10,
    demandLevel: "High",
    requiredEducation: ["CA Foundation", "CA Intermediate", "CA Final"],
    keySkills: ["Accounting", "Taxation", "Auditing", "Financial Analysis"],
    topEmployers: ["Big 4 Firms", "Banks", "MNCs", "Government", "Private Practice"],
    careerProgression: ["Article Assistant", "CA", "Senior CA", "Partner", "CFO"],
    entranceExams: ["CA Foundation", "CA Intermediate", "CA Final"],
    workLifeBalance: 6,
    jobSatisfaction: 7,
    marketTrends: "Digital transformation in accounting and finance",
    successStories: 780,
  },
  {
    id: "teacher",
    title: "Teacher/Professor",
    category: "Education",
    description: "Educate and inspire students at various academic levels.",
    averageSalary: { entry: 300000, mid: 600000, senior: 1200000 },
    jobGrowth: 5,
    demandLevel: "Medium",
    requiredEducation: ["B.Ed", "M.Ed", "Ph.D. for higher education"],
    keySkills: ["Subject Expertise", "Communication", "Classroom Management", "Curriculum Development"],
    topEmployers: ["Government Schools", "Private Schools", "Universities", "Coaching Institutes"],
    careerProgression: ["Teacher", "Senior Teacher", "Head Teacher", "Principal", "Professor"],
    entranceExams: ["B.Ed Entrance", "NET/SET", "Ph.D. Entrance"],
    workLifeBalance: 8,
    jobSatisfaction: 8,
    marketTrends: "Growing demand for online and digital education",
    successStories: 950,
  },
]

const categories = ["All Categories", "Technology", "Healthcare", "Engineering", "Finance", "Education", "Business"]

export default function CareerOutcomesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedCareer, setSelectedCareer] = useState(null)

  const filteredCareers = careerPaths.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || career.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatSalary = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
    return `₹${amount.toLocaleString()}`
  }

  const getDemandColor = (level) => {
    switch (level) {
      case "High":
        return "text-green-600 bg-green-50"
      case "Medium":
        return "text-yellow-600 bg-yellow-50"
      case "Low":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  if (selectedCareer) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => setSelectedCareer(null)} className="flex items-center space-x-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Careers</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <span className="font-serif font-bold text-xl text-foreground">CareerPath</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Career Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant="secondary">{selectedCareer.category}</Badge>
              <Badge className={getDemandColor(selectedCareer.demandLevel)}>{selectedCareer.demandLevel} Demand</Badge>
            </div>
            <h1 className="font-serif font-bold text-3xl md:text-4xl mb-4">{selectedCareer.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{selectedCareer.description}</p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Job Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">+{selectedCareer.jobGrowth}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Next 5 years</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Salary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{formatSalary(selectedCareer.averageSalary.mid)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Mid-level (5-10 years)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Work-Life Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold">{selectedCareer.workLifeBalance}/10</span>
                </div>
                <Progress value={selectedCareer.workLifeBalance * 10} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Job Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-2xl font-bold">{selectedCareer.jobSatisfaction}/10</span>
                </div>
                <Progress value={selectedCareer.jobSatisfaction * 10} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <Tabs defaultValue="salary" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="salary">Salary</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="progression">Career Path</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
            </TabsList>

            <TabsContent value="salary" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Salary Progression</CardTitle>
                    <CardDescription>Expected salary at different career stages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Entry Level (0-2 years)</span>
                        <span className="font-semibold">{formatSalary(selectedCareer.averageSalary.entry)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Mid Level (3-8 years)</span>
                        <span className="font-semibold">{formatSalary(selectedCareer.averageSalary.mid)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Senior Level (8+ years)</span>
                        <span className="font-semibold">{formatSalary(selectedCareer.averageSalary.senior)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Employers</CardTitle>
                    <CardDescription>Leading companies hiring for this role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedCareer.topEmployers.map((employer, index) => (
                        <div key={employer} className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                          >
                            {index + 1}
                          </Badge>
                          <span className="text-sm">{employer}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Skills Required</CardTitle>
                  <CardDescription>Essential skills for success in this career</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedCareer.keySkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Required Education</CardTitle>
                    <CardDescription>Educational qualifications needed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedCareer.requiredEducation.map((education) => (
                        <div key={education} className="flex items-center space-x-3">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span className="text-sm">{education}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Entrance Exams</CardTitle>
                    <CardDescription>Key exams for this career path</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedCareer.entranceExams.map((exam) => (
                        <Badge key={exam} variant="outline" className="mr-2 mb-2">
                          {exam}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="progression" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Career Progression Path</CardTitle>
                  <CardDescription>Typical career advancement stages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedCareer.careerProgression.map((stage, index) => (
                      <div key={stage} className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <span className="font-medium">{stage}</span>
                        </div>
                        {index < selectedCareer.careerProgression.length - 1 && (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="market" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Trends</CardTitle>
                    <CardDescription>Current industry outlook</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{selectedCareer.marketTrends}</p>
                    <div className="mt-4 flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{selectedCareer.successStories} Success Stories</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Job Market Demand</CardTitle>
                    <CardDescription>Current hiring trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge className={getDemandColor(selectedCareer.demandLevel)}>
                        {selectedCareer.demandLevel} Demand
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        Expected job growth of <strong>{selectedCareer.jobGrowth}%</strong> over the next 5 years.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <div className="mt-12">
            <Card className="bg-muted/30 border-0">
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Ready to Start Your Journey?</h3>
                <p className="text-muted-foreground mb-4">
                  Get personalized guidance and resources to pursue this career path.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button>Find Relevant Courses</Button>
                  <Button variant="outline">Connect with Professionals</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-serif font-bold text-xl text-foreground">CareerPath</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-4">Career Outcomes Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Explore detailed career insights, salary expectations, and growth opportunities across different fields.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Career Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => (
            <Card
              key={career.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              onClick={() => setSelectedCareer(career)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{career.category}</Badge>
                  <Badge className={getDemandColor(career.demandLevel)}>{career.demandLevel}</Badge>
                </div>
                <CardTitle className="text-xl">{career.title}</CardTitle>
                <CardDescription className="line-clamp-2">{career.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Avg. Salary</span>
                    </div>
                    <span className="font-semibold">{formatSalary(career.averageSalary.mid)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Job Growth</span>
                    </div>
                    <span className="font-semibold text-green-600">+{career.jobGrowth}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Satisfaction</span>
                    </div>
                    <span className="font-semibold">{career.jobSatisfaction}/10</span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex flex-wrap gap-1">
                      {career.keySkills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {career.keySkills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{career.keySkills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No careers found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
