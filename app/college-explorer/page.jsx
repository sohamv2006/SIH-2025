"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Star,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  GraduationCap,
  Filter,
  ArrowLeft,
  ExternalLink,
  Heart,
  Compass as Compare,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

// Use plain JS objects, not TypeScript interfaces
const colleges = [
  {
    id: "1",
    name: "Delhi University",
    location: "New Delhi",
    state: "Delhi",
    type: "Government",
    rating: 4.5,
    established: 1922,
    students: 132000,
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc.", "M.Com", "Ph.D."],
    fees: { undergraduate: 15000, postgraduate: 20000 },
    admissionProcess: ["CUET", "Merit Based", "Entrance Exam"],
    facilities: ["Library", "Hostel", "Sports Complex", "Labs", "Cafeteria"],
    placements: { percentage: 85, averagePackage: 600000, topPackage: 2500000 },
    image: "/delhi-university-campus.jpg",
    description: "One of India's premier universities offering diverse undergraduate and postgraduate programs.",
  },
  {
    id: "2",
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    state: "Delhi",
    type: "Government",
    rating: 4.3,
    established: 1969,
    students: 8500,
    courses: ["B.A.", "M.A.", "M.Phil.", "Ph.D.", "M.Sc.", "M.Tech"],
    fees: { undergraduate: 12000, postgraduate: 18000 },
    admissionProcess: ["JNUEE", "Merit Based"],
    facilities: ["Library", "Hostel", "Research Centers", "Labs", "Medical Center"],
    placements: { percentage: 78, averagePackage: 550000, topPackage: 1800000 },
    image: "/jnu-campus-with-modern-buildings.jpg",
    description: "Renowned for research and academic excellence in social sciences and sciences.",
  },
  {
    id: "3",
    name: "Banaras Hindu University",
    location: "Varanasi",
    state: "Uttar Pradesh",
    type: "Government",
    rating: 4.2,
    established: 1916,
    students: 30000,
    courses: ["B.A.", "B.Sc.", "B.Tech", "M.A.", "M.Sc.", "M.Tech", "MBBS"],
    fees: { undergraduate: 18000, postgraduate: 25000 },
    admissionProcess: ["BHU UET", "NEET", "JEE Main"],
    facilities: ["Library", "Hostel", "Hospital", "Sports Complex", "Museums"],
    placements: { percentage: 82, averagePackage: 650000, topPackage: 2200000 },
    image: "/bhu-historic-campus-architecture.jpg",
    description: "Historic university offering comprehensive education from arts to engineering and medicine.",
  },
  {
    id: "4",
    name: "Jamia Millia Islamia",
    location: "New Delhi",
    state: "Delhi",
    type: "Government",
    rating: 4.1,
    established: 1920,
    students: 19000,
    courses: ["B.A.", "B.Tech", "B.Arch", "M.A.", "M.Tech", "MBA"],
    fees: { undergraduate: 16000, postgraduate: 22000 },
    admissionProcess: ["JMI Entrance", "GATE", "CAT"],
    facilities: ["Library", "Hostel", "Labs", "Sports", "Cultural Centers"],
    placements: { percentage: 75, averagePackage: 580000, topPackage: 2000000 },
    image: "/jamia-millia-islamia-campus.jpg",
    description: "Central university known for its diverse academic programs and inclusive environment.",
  },
  {
    id: "5",
    name: "University of Calcutta",
    location: "Kolkata",
    state: "West Bengal",
    type: "Government",
    rating: 4.0,
    established: 1857,
    students: 120000,
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc.", "M.Com"],
    fees: { undergraduate: 14000, postgraduate: 19000 },
    admissionProcess: ["Merit Based", "Entrance Exam"],
    facilities: ["Library", "Research Centers", "Labs", "Hostels"],
    placements: { percentage: 70, averagePackage: 480000, topPackage: 1500000 },
    image: "/university-of-calcutta-heritage-building.jpg",
    description: "One of India's oldest universities with a rich heritage in arts and sciences.",
  },
  {
    id: "6",
    name: "Aligarh Muslim University",
    location: "Aligarh",
    state: "Uttar Pradesh",
    type: "Government",
    rating: 4.1,
    established: 1875,
    students: 28000,
    courses: ["B.A.", "B.Tech", "MBBS", "M.A.", "M.Tech", "MBA"],
    fees: { undergraduate: 17000, postgraduate: 23000 },
    admissionProcess: ["AMU Entrance", "NEET", "JEE Main"],
    facilities: ["Library", "Hospital", "Hostels", "Sports", "Museums"],
    placements: { percentage: 80, averagePackage: 620000, topPackage: 2100000 },
    image: "/amu-campus-with-islamic-architecture.jpg",
    description: "Prestigious central university offering quality education across multiple disciplines.",
  },
]

const states = ["All States", "Delhi", "Uttar Pradesh", "West Bengal", "Maharashtra", "Karnataka", "Tamil Nadu"]
const courseTypes = ["All Courses", "B.A.", "B.Sc.", "B.Tech", "B.Com", "M.A.", "M.Sc.", "M.Tech", "MBA", "MBBS"]

export default function CollegeExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [selectedType, setSelectedType] = useState("All Types")
  const [minRating, setMinRating] = useState(0)
  const [maxFees, setMaxFees] = useState(100000)
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [compareList, setCompareList] = useState([])

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesSearch =
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesState = selectedState === "All States" || college.state === selectedState
      const matchesCourse = selectedCourse === "All Courses" || college.courses.includes(selectedCourse)
      const matchesType = selectedType === "All Types" || college.type === selectedType
      const matchesRating = college.rating >= minRating
      const matchesFees = college.fees.undergraduate <= maxFees

      return matchesSearch && matchesState && matchesCourse && matchesType && matchesRating && matchesFees
    })
  }, [searchTerm, selectedState, selectedCourse, selectedType, minRating, maxFees])

  const toggleFavorite = (collegeId) => {
    setFavorites((prev) => (prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId]))
  }

  const toggleCompare = (collegeId) => {
    setCompareList((prev) => {
      if (prev.includes(collegeId)) {
        return prev.filter((id) => id !== collegeId)
      } else if (prev.length < 3) {
        return [...prev, collegeId]
      }
      return prev
    })
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
              {compareList.length > 0 && (
                <Button variant="outline" size="sm">
                  <Compare className="h-4 w-4 mr-2" />
                  Compare ({compareList.length})
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Favorites ({favorites.length})
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-4">College & Course Explorer</h1>
          <p className="text-lg text-muted-foreground">
            Discover the perfect college and course combination for your academic journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search colleges by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {courseTypes.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">College Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Types">All Types</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Deemed">Deemed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rating">Minimum Rating: {minRating}</Label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full mt-2"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-muted-foreground">Showing {filteredColleges.length} colleges</p>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Sort by Rating</SelectItem>
              <SelectItem value="fees">Sort by Fees</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="established">Sort by Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* College Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex">
                <div className="w-1/3">
                  <img
                    src={college.image || "/placeholder.svg"}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-serif font-bold text-xl mb-1">{college.name}</h3>
                      <div className="flex items-center text-muted-foreground text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {college.location}, {college.state}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(college.id)}
                        className={favorites.includes(college.id) ? "text-red-500" : ""}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCompare(college.id)}
                        disabled={compareList.length >= 3 && !compareList.includes(college.id)}
                        className={compareList.includes(college.id) ? "text-primary" : ""}
                      >
                        <Compare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <Badge variant={college.type === "Government" ? "default" : "secondary"}>{college.type}</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{college.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Est. {college.established}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{college.description}</p>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="courses">Courses</TabsTrigger>
                      <TabsTrigger value="admission">Admission</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-primary" />
                          <span>{college.students.toLocaleString()} Students</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-primary" />
                          <span>₹{college.fees.undergraduate.toLocaleString()}/year</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                          <span>{college.placements.percentage}% Placement</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-primary" />
                          <span>{college.courses.length} Courses</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="courses" className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {college.courses.slice(0, 6).map((course) => (
                          <Badge key={course} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                        {college.courses.length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{college.courses.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="admission" className="mt-4">
                      <div className="space-y-2">
                        {college.admissionProcess.map((process) => (
                          <div key={process} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                            {process}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No colleges found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find more colleges.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
