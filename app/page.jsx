import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  TrendingUp,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Library,
  DollarSign,
  User,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-serif font-bold text-xl text-foreground">CareerPath</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/subject-advisor" className="text-foreground hover:text-primary transition-colors">
                Subject Advisor
              </Link>
              <Link href="/college-explorer" className="text-foreground hover:text-primary transition-colors">
                College Explorer
              </Link>
              <Link href="/career-outcomes" className="text-foreground hover:text-primary transition-colors">
                Career Outcomes
              </Link>
              <Link href="/resources" className="text-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="/scholarships" className="text-foreground hover:text-primary transition-colors">
                Scholarships
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Trusted by 10,000+ Students
          </Badge>
          <h1 className="font-serif font-bold text-4xl md:text-6xl text-balance mb-6">
            Your Future Starts with the <span className="text-primary">Right Choice</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-8">
            Navigate your post-12th journey with confidence. Get personalized guidance on subject combinations, college
            selection, career outcomes, and access to scholarships and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Take Career Quiz
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Everything You Need to Plan Your Future</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources to help you make informed decisions about your education and career
              path.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/subject-advisor">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Subject Advisor</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get personalized recommendations for subject combinations based on your interests and career goals.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/college-explorer">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">College Explorer</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Discover local government colleges, courses, and admission requirements tailored to your
                    preferences.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/career-outcomes">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Career Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Understand job prospects, salary expectations, and skill requirements for different career paths.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/resources">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Library className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Resource Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Access free e-books, study materials, and skill development resources to support your journey.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif font-bold text-3xl text-center mb-12">Start Exploring Your Options</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/sign-in">
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Career Path Finder</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    Take our comprehensive assessment to discover careers that match your interests and strengths.
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/sign-in">
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Personal Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    Track your progress, manage preferences, and get personalized recommendations for your journey.
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/sign-in">
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Scholarship Portal</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    Discover scholarships and financial aid opportunities to support your educational journey.
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    Find Scholarships
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-primary-foreground/80">Students Guided</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Career Paths</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-primary-foreground/80">Colleges Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/80">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="font-serif font-bold text-lg">CareerPath</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering students to make informed decisions about their future through personalized career and
                education guidance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/subject-advisor" className="hover:text-foreground transition-colors">
                    Career Assessment
                  </Link>
                </li>
                <li>
                  <Link href="/college-explorer" className="hover:text-foreground transition-colors">
                    College Explorer
                  </Link>
                </li>
                <li>
                  <Link href="/career-outcomes" className="hover:text-foreground transition-colors">
                    Career Outcomes
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-foreground transition-colors">
                    Resource Library
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships" className="hover:text-foreground transition-colors">
                    Scholarships
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/sign-in" className="hover:text-foreground transition-colors">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest career insights and educational updates.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CareerPath. All rights reserved. Built with care for students' futures.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}