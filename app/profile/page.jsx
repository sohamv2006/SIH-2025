"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Settings,
  BookOpen,
  Target,
  Bell,
  Heart,
  Award,
  GraduationCap,
  ArrowLeft,
  Edit,
  Save,
  Camera,
  MapPin,
  School,
  TrendingUp,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Use plain JS objects, not TypeScript interfaces
const mockUser = {
  id: "1",
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  phone: "+91 9876543210",
  dateOfBirth: "2006-03-15",
  location: "Mumbai, Maharashtra",
  currentClass: "Class 12",
  school: "Delhi Public School",
  stream: "Science",
  subjects: ["Physics", "Chemistry", "Mathematics", "English", "Computer Science"],
  careerGoals: ["Software Engineer", "Data Scientist", "Research Scientist"],
  interests: ["Technology", "Research", "Innovation", "Problem Solving"],
  preferredCollegeTypes: ["Government", "Autonomous", "Deemed University"],
  budgetRange: "₹2-5 Lakhs",
  bio: "Passionate about technology and innovation. Aspiring to become a software engineer and contribute to cutting-edge research in artificial intelligence.",
  academicPerformance: {
    class10Percentage: 92,
    class12Percentage: 89,
    currentGPA: 8.9,
  },
  preferences: {
    notifications: true,
    emailUpdates: true,
    scholarshipAlerts: true,
    collegeRecommendations: true,
  },
  savedItems: {
    colleges: ["IIT Delhi", "BITS Pilani", "NIT Trichy"],
    scholarships: ["National Merit Scholarship", "Inspire Scholarship"],
    careers: ["Software Engineer", "Data Scientist"],
    resources: ["JEE Preparation Guide", "Programming Fundamentals"],
  },
  applicationHistory: {
    scholarships: 3,
    colleges: 5,
    completedAssessments: 2,
  },
}

const personalizedRecommendations = {
  colleges: [
    {
      name: "IIT Delhi",
      match: 95,
      reason: "Perfect match for your Computer Science interests and academic performance",
    },
    {
      name: "BITS Pilani",
      match: 88,
      reason: "Strong engineering program aligned with your career goals",
    },
    {
      name: "NIT Trichy",
      match: 85,
      reason: "Excellent placement record in technology companies",
    },
  ],
  scholarships: [
    {
      name: "Inspire Scholarship",
      match: 92,
      reason: "Perfect for Science stream students with 85%+ marks",
      deadline: "2024-07-15",
    },
    {
      name: "National Merit Scholarship",
      match: 87,
      reason: "Merit-based scholarship matching your academic performance",
      deadline: "2024-06-30",
    },
  ],
  careers: [
    {
      name: "Software Engineer",
      match: 96,
      reason: "Aligns perfectly with your Computer Science background",
      growth: "22% expected growth",
    },
    {
      name: "Data Scientist",
      match: 89,
      reason: "Great fit for your Mathematics and analytical skills",
      growth: "35% expected growth",
    },
  ],
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a backend
  }

  const updatePreference = (key, value) => {
    setUser((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }))
  }

  const getCompletionPercentage = () => {
    const fields = [
      user.name,
      user.email,
      user.phone,
      user.location,
      user.school,
      user.bio,
      user.subjects.length > 0,
      user.careerGoals.length > 0,
      user.interests.length > 0,
    ]
    const completed = fields.filter(Boolean).length
    return Math.round((completed / fields.length) * 100)
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
              <span className="font-serif font-bold text-xl text-foreground">ShikshaSetu</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="flex items-center space-x-2"
              >
                {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              {isEditing && (
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="font-serif font-bold text-3xl">{user.name}</h1>
                <Badge variant="secondary">{user.currentClass}</Badge>
                <Badge variant="outline">{user.stream}</Badge>
              </div>
              <p className="text-muted-foreground mb-2">{user.bio}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <School className="h-4 w-4" />
                  <span>{user.school}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Profile Completion</div>
              <div className="flex items-center space-x-2">
                <Progress value={getCompletionPercentage()} className="w-24" />
                <span className="text-sm font-medium">{getCompletionPercentage()}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="saved">Saved Items</TabsTrigger>
            <TabsTrigger value="recommendations">For You</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={user.dateOfBirth}
                        onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={user.location}
                        onChange={(e) => setUser({ ...user, location: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="school">School</Label>
                      <Input
                        id="school"
                        value={user.school}
                        onChange={(e) => setUser({ ...user, school: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={user.bio}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Activity Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Scholarship Applications</span>
                    <span className="font-semibold">{user.applicationHistory.scholarships}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">College Applications</span>
                    <span className="font-semibold">{user.applicationHistory.colleges}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Assessments Completed</span>
                    <span className="font-semibold">{user.applicationHistory.completedAssessments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Saved Items</span>
                    <span className="font-semibold">
                      {Object.values(user.savedItems).reduce((acc, arr) => acc + arr.length, 0)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Academic Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Academic Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="class10">Class 10 Percentage</Label>
                    <Input
                      id="class10"
                      type="number"
                      value={user.academicPerformance.class10Percentage}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          academicPerformance: {
                            ...user.academicPerformance,
                            class10Percentage: Number(e.target.value),
                          },
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  {user.academicPerformance.class12Percentage && (
                    <div>
                      <Label htmlFor="class12">Class 12 Percentage</Label>
                      <Input
                        id="class12"
                        type="number"
                        value={user.academicPerformance.class12Percentage}
                        onChange={(e) =>
                          setUser({
                            ...user,
                            academicPerformance: {
                              ...user.academicPerformance,
                              class12Percentage: Number(e.target.value),
                            },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  )}
                  {user.academicPerformance.currentGPA && (
                    <div>
                      <Label htmlFor="gpa">Current GPA</Label>
                      <Input
                        id="gpa"
                        type="number"
                        step="0.1"
                        value={user.academicPerformance.currentGPA}
                        onChange={(e) =>
                          setUser({
                            ...user,
                            academicPerformance: {
                              ...user.academicPerformance,
                              currentGPA: Number(e.target.value),
                            },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Subjects & Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Subjects & Goals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Current Subjects</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Career Goals</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.careerGoals.map((goal) => (
                        <Badge key={goal} variant="outline">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Interests</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.interests.map((interest) => (
                        <Badge key={interest} className="bg-primary/10 text-primary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>Manage how you receive updates and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive instant notifications</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={user.preferences.notifications}
                      onCheckedChange={(checked) => updatePreference("notifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-updates">Email Updates</Label>
                      <p className="text-sm text-muted-foreground">Weekly digest and important updates</p>
                    </div>
                    <Switch
                      id="email-updates"
                      checked={user.preferences.emailUpdates}
                      onCheckedChange={(checked) => updatePreference("emailUpdates", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="scholarship-alerts">Scholarship Alerts</Label>
                      <p className="text-sm text-muted-foreground">New scholarship opportunities</p>
                    </div>
                    <Switch
                      id="scholarship-alerts"
                      checked={user.preferences.scholarshipAlerts}
                      onCheckedChange={(checked) => updatePreference("scholarshipAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="college-recommendations">College Recommendations</Label>
                      <p className="text-sm text-muted-foreground">Personalized college suggestions</p>
                    </div>
                    <Switch
                      id="college-recommendations"
                      checked={user.preferences.collegeRecommendations}
                      onCheckedChange={(checked) => updatePreference("collegeRecommendations", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* College Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>College Preferences</span>
                  </CardTitle>
                  <CardDescription>Your preferred college types and budget</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Preferred College Types</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.preferredCollegeTypes.map((type) => (
                        <Badge key={type} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select
                      value={user.budgetRange}
                      onValueChange={(value) => setUser({ ...user, budgetRange: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="₹0-2 Lakhs">₹0-2 Lakhs</SelectItem>
                        <SelectItem value="₹2-5 Lakhs">₹2-5 Lakhs</SelectItem>
                        <SelectItem value="₹5-10 Lakhs">₹5-10 Lakhs</SelectItem>
                        <SelectItem value="₹10+ Lakhs">₹10+ Lakhs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Saved Colleges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <School className="h-5 w-5" />
                    <span>Colleges</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.savedItems.colleges.map((college) => (
                      <div key={college} className="flex items-center justify-between">
                        <span className="text-sm">{college}</span>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Saved Scholarships */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Scholarships</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.savedItems.scholarships.map((scholarship) => (
                      <div key={scholarship} className="flex items-center justify-between">
                        <span className="text-sm">{scholarship}</span>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Saved Careers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Careers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.savedItems.careers.map((career) => (
                      <div key={career} className="flex items-center justify-between">
                        <span className="text-sm">{career}</span>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Saved Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Resources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.savedItems.resources.map((resource) => (
                      <div key={resource} className="flex items-center justify-between">
                        <span className="text-sm">{resource}</span>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <div className="space-y-8">
              {/* Recommended Colleges */}
              <div>
                <h3 className="font-serif font-bold text-xl mb-4">Recommended Colleges</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {personalizedRecommendations.colleges.map((college) => (
                    <Card key={college.name} className="border-2 border-primary/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{college.name}</CardTitle>
                          <Badge className="bg-green-100 text-green-800">{college.match}% Match</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{college.reason}</p>
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recommended Scholarships */}
              <div>
                <h3 className="font-serif font-bold text-xl mb-4">Recommended Scholarships</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {personalizedRecommendations.scholarships.map((scholarship) => (
                    <Card key={scholarship.name} className="border-2 border-accent/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                          <div className="text-right">
                            <Badge className="bg-blue-100 text-blue-800 mb-1">{scholarship.match}% Match</Badge>
                            <div className="flex items-center space-x-1 text-xs text-red-600">
                              <Clock className="h-3 w-3" />
                              <span>Due: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{scholarship.reason}</p>
                        <Button size="sm" className="w-full">
                          Apply Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recommended Careers */}
              <div>
                <h3 className="font-serif font-bold text-xl mb-4">Career Matches</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {personalizedRecommendations.careers.map((career) => (
                    <Card key={career.name} className="border-2 border-secondary/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{career.name}</CardTitle>
                          <div className="text-right">
                            <Badge className="bg-purple-100 text-purple-800 mb-1">{career.match}% Match</Badge>
                            <div className="flex items-center space-x-1 text-xs text-green-600">
                              <TrendingUp className="h-3 w-3" />
                              <span>{career.growth}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{career.reason}</p>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Explore Career
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
