"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap, BookOpen, Target, MapPin, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const initialData = {
  fullName: "",
  age: "",
  gender: "",
  location: "",
  currentClass: "12th",
  subjects: [],
  academicPerformance: "",
  interests: [],
  careerGoals: [],
  preferredCollegeTypes: [],
  budgetRange: "",
  studyPreferences: [],
  futureGoals: "",
}

const steps = [
  { id: 1, title: "Basic Information", icon: User },
  { id: 2, title: "Academic Details", icon: GraduationCap },
  { id: 3, title: "Interests & Goals", icon: Target },
  { id: 4, title: "Preferences", icon: BookOpen },
  { id: 5, title: "Complete Setup", icon: CheckCircle },
]

const subjectOptions = {
  science: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science", "English"],
  commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics", "English", "Informatics Practices"],
  arts: ["History", "Geography", "Political Science", "Psychology", "Sociology", "English", "Hindi"],
  vocational: ["Computer Applications", "Multimedia", "Tourism", "Fashion Design", "Agriculture", "Healthcare"],
}

const interestOptions = [
  "Technology",
  "Science",
  "Mathematics",
  "Arts & Design",
  "Business",
  "Healthcare",
  "Engineering",
  "Research",
  "Teaching",
  "Sports",
  "Music",
  "Writing",
  "Social Work",
  "Environment",
  "Politics",
  "Psychology",
  "Economics",
  "History",
]

const careerOptions = [
  "Software Engineer",
  "Doctor",
  "Teacher",
  "Business Analyst",
  "Researcher",
  "Designer",
  "Lawyer",
  "Accountant",
  "Marketing Professional",
  "Consultant",
  "Data Scientist",
  "Civil Servant",
  "Entrepreneur",
  "Journalist",
  "Architect",
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const updateProfileData = (updates) => {
    setProfileData((prev) => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)

    // Simulate saving profile data
    setTimeout(() => {
      localStorage.setItem("profileData", JSON.stringify(profileData))
      localStorage.setItem("onboardingComplete", "true")
      router.push("/dashboard")
    }, 2000)
  }

  const toggleArrayItem = (array, item, setter) => {
    if (array.includes(item)) {
      setter(array.filter((i) => i !== item))
    } else {
      setter([...array, item])
    }
  }

  const getProgress = () => (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Let's Set Up Your Profile</h1>
          <p className="text-muted-foreground">Help us personalize your career guidance experience</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-xs text-center ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}
                  >
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="mb-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription>Tell us about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => updateProfileData({ fullName: e.target.value })}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Select value={profileData.age} onValueChange={(value) => updateProfileData({ age: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 14).map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age} years
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Gender *</Label>
                    <RadioGroup
                      value={profileData.gender}
                      onValueChange={(value) => updateProfileData({ gender: value })}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location (City, State) *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => updateProfileData({ location: e.target.value })}
                      placeholder="e.g., Mumbai, Maharashtra"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </div>
          )}

          {/* Step 2: Academic Details */}
          {currentStep === 2 && (
            <div>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Academic Details</span>
                </CardTitle>
                <CardDescription>Your current academic status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Current Class *</Label>
                  <RadioGroup
                    value={profileData.currentClass}
                    onValueChange={(value) => updateProfileData({ currentClass: value })}
                    className="flex space-x-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10th" id="class10" />
                      <Label htmlFor="class10">Class 10th</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="12th" id="class12" />
                      <Label htmlFor="class12">Class 12th</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="graduated" id="graduated" />
                      <Label htmlFor="graduated">Graduated</Label>
                    </div>
                  </RadioGroup>
                </div>

                {(profileData.currentClass === "12th" || profileData.currentClass === "graduated") && (
                  <div>
                    <Label>Stream *</Label>
                    <RadioGroup
                      value={profileData.stream}
                      onValueChange={(value) => updateProfileData({ stream: value, subjects: [] })}
                      className="grid grid-cols-2 gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="science" id="science" />
                        <Label htmlFor="science">Science</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="commerce" id="commerce" />
                        <Label htmlFor="commerce">Commerce</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="arts" id="arts" />
                        <Label htmlFor="arts">Arts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vocational" id="vocational" />
                        <Label htmlFor="vocational">Vocational</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {profileData.stream && (
                  <div>
                    <Label>Subjects *</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {subjectOptions[profileData.stream].map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={subject}
                            checked={profileData.subjects.includes(subject)}
                            onCheckedChange={() =>
                              toggleArrayItem(profileData.subjects, subject, (subjects) =>
                                updateProfileData({ subjects }),
                              )
                            }
                          />
                          <Label htmlFor={subject} className="text-sm">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="performance">Academic Performance</Label>
                  <Select
                    value={profileData.academicPerformance}
                    onValueChange={(value) => updateProfileData({ academicPerformance: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your performance level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (90%+)</SelectItem>
                      <SelectItem value="good">Good (75-89%)</SelectItem>
                      <SelectItem value="average">Average (60-74%)</SelectItem>
                      <SelectItem value="below-average">Below Average (&lt;60%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </div>
          )}

          {/* Step 3: Interests & Goals */}
          {currentStep === 3 && (
            <div>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Interests & Goals</span>
                </CardTitle>
                <CardDescription>What are you passionate about?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Areas of Interest *</Label>
                  <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
                  <div className="grid grid-cols-3 gap-2">
                    {interestOptions.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={profileData.interests.includes(interest)}
                          onCheckedChange={() =>
                            toggleArrayItem(profileData.interests, interest, (interests) =>
                              updateProfileData({ interests }),
                            )
                          }
                        />
                        <Label htmlFor={interest} className="text-sm">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {profileData.interests.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">Selected interests:</p>
                      <div className="flex flex-wrap gap-2">
                        {profileData.interests.map((interest) => (
                          <Badge key={interest} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label>Career Goals *</Label>
                  <p className="text-sm text-muted-foreground mb-3">What careers interest you?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {careerOptions.map((career) => (
                      <div key={career} className="flex items-center space-x-2">
                        <Checkbox
                          id={career}
                          checked={profileData.careerGoals.includes(career)}
                          onCheckedChange={() =>
                            toggleArrayItem(profileData.careerGoals, career, (careerGoals) =>
                              updateProfileData({ careerGoals }),
                            )
                          }
                        />
                        <Label htmlFor={career} className="text-sm">
                          {career}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {profileData.careerGoals.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">Selected careers:</p>
                      <div className="flex flex-wrap gap-2">
                        {profileData.careerGoals.map((career) => (
                          <Badge key={career} variant="outline">
                            {career}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <div>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Preferences</span>
                </CardTitle>
                <CardDescription>Your college and study preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Preferred College Types</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Government",
                      "Private",
                      "Autonomous",
                      "Deemed University",
                      "Central University",
                      "State University",
                    ].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={profileData.preferredCollegeTypes.includes(type)}
                          onCheckedChange={() =>
                            toggleArrayItem(profileData.preferredCollegeTypes, type, (types) =>
                              updateProfileData({ preferredCollegeTypes: types }),
                            )
                          }
                        />
                        <Label htmlFor={type} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget">Budget Range (Annual Fees)</Label>
                  <Select
                    value={profileData.budgetRange}
                    onValueChange={(value) => updateProfileData({ budgetRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="₹0-50K">₹0 - ₹50,000</SelectItem>
                      <SelectItem value="₹50K-1L">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="₹1L-3L">₹1,00,000 - ₹3,00,000</SelectItem>
                      <SelectItem value="₹3L-5L">₹3,00,000 - ₹5,00,000</SelectItem>
                      <SelectItem value="₹5L+">₹5,00,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Study Preferences</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Theoretical Learning",
                      "Practical Learning",
                      "Research Oriented",
                      "Industry Focused",
                      "Group Projects",
                      "Individual Study",
                    ].map((pref) => (
                      <div key={pref} className="flex items-center space-x-2">
                        <Checkbox
                          id={pref}
                          checked={profileData.studyPreferences.includes(pref)}
                          onCheckedChange={() =>
                            toggleArrayItem(profileData.studyPreferences, pref, (prefs) =>
                              updateProfileData({ studyPreferences: prefs }),
                            )
                          }
                        />
                        <Label htmlFor={pref} className="text-sm">
                          {pref}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="futureGoals">Future Goals</Label>
                  <Select
                    value={profileData.futureGoals}
                    onValueChange={(value) => updateProfileData({ futureGoals: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="What's your primary goal after graduation?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="job">Get a Job</SelectItem>
                      <SelectItem value="higher-studies">Pursue Higher Studies</SelectItem>
                      <SelectItem value="entrepreneurship">Start a Business</SelectItem>
                      <SelectItem value="government-job">Government Job</SelectItem>
                      <SelectItem value="research">Research & Development</SelectItem>
                      <SelectItem value="undecided">Still Deciding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </div>
          )}

          {/* Step 5: Complete Setup */}
          {currentStep === 5 && (
            <div>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Complete Setup</span>
                </CardTitle>
                <CardDescription>Review your information and complete setup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Profile Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {profileData.fullName}
                    </p>
                    <p>
                      <strong>Age:</strong> {profileData.age} years
                    </p>
                    <p>
                      <strong>Class:</strong> {profileData.currentClass}
                    </p>
                    {profileData.stream && (
                      <p>
                        <strong>Stream:</strong> {profileData.stream}
                      </p>
                    )}
                    <p>
                      <strong>Location:</strong> {profileData.location}
                    </p>
                    <p>
                      <strong>Interests:</strong> {profileData.interests.slice(0, 3).join(", ")}
                      {profileData.interests.length > 3 && "..."}
                    </p>
                    <p>
                      <strong>Career Goals:</strong> {profileData.careerGoals.slice(0, 2).join(", ")}
                      {profileData.careerGoals.length > 2 && "..."}
                    </p>
                  </div>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-primary">What's Next?</h3>
                  <ul className="text-sm space-y-1 text-primary/80">
                    <li>• Get personalized college recommendations</li>
                    <li>• Take aptitude tests for career guidance</li>
                    <li>• Discover scholarships matching your profile</li>
                    <li>• Access curated study resources</li>
                    <li>• Track important deadlines and alerts</li>
                  </ul>
                </div>

                <Button onClick={handleComplete} className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      <span>Setting up your profile...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Complete Setup & Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </CardContent>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 &&
                  (!profileData.fullName || !profileData.age || !profileData.gender || !profileData.location)) ||
                (currentStep === 2 &&
                  profileData.currentClass !== "10th" &&
                  (!profileData.stream || profileData.subjects.length === 0)) ||
                (currentStep === 3 && (profileData.interests.length === 0 || profileData.careerGoals.length === 0))
              }
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
