"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Target, TrendingUp, GraduationCap } from "lucide-react"
import Link from "next/link"

// Remove TypeScript interface and use plain JS objects
const questions = [
	{
		id: "interests",
		question: "Which subjects do you find most interesting?",
		type: "multiple",
		options: [
			{ value: "mathematics", label: "Mathematics" },
			{ value: "physics", label: "Physics" },
			{ value: "chemistry", label: "Chemistry" },
			{ value: "biology", label: "Biology" },
			{ value: "economics", label: "Economics" },
			{ value: "history", label: "History" },
			{ value: "geography", label: "Geography" },
			{ value: "english", label: "English Literature" },
			{ value: "psychology", label: "Psychology" },
			{ value: "computer", label: "Computer Science" },
		],
	},
	{
		id: "career_goal",
		question: "What type of career are you most interested in?",
		type: "single",
		options: [
			{ value: "engineering", label: "Engineering & Technology" },
			{ value: "medical", label: "Medical & Healthcare" },
			{ value: "business", label: "Business & Management" },
			{ value: "arts", label: "Arts & Creative Fields" },
			{ value: "research", label: "Research & Academia" },
			{ value: "government", label: "Government & Civil Services" },
			{ value: "law", label: "Law & Legal Services" },
			{ value: "teaching", label: "Teaching & Education" },
		],
	},
	{
		id: "strengths",
		question: "What are your key strengths?",
		type: "multiple",
		options: [
			{ value: "analytical", label: "Analytical Thinking" },
			{ value: "creative", label: "Creative Problem Solving" },
			{ value: "communication", label: "Communication Skills" },
			{ value: "leadership", label: "Leadership Abilities" },
			{ value: "technical", label: "Technical Aptitude" },
			{ value: "research", label: "Research Skills" },
			{ value: "teamwork", label: "Teamwork" },
			{ value: "attention", label: "Attention to Detail" },
		],
	},
	{
		id: "learning_style",
		question: "How do you prefer to learn?",
		type: "single",
		options: [
			{ value: "practical", label: "Hands-on & Practical" },
			{ value: "theoretical", label: "Theoretical & Conceptual" },
			{ value: "visual", label: "Visual & Graphical" },
			{ value: "discussion", label: "Discussion & Debate" },
		],
	},
]

const subjectCombinations = {
	science_pcm: {
		name: "Science (PCM)",
		subjects: ["Physics", "Chemistry", "Mathematics"],
		careers: ["Engineering", "Architecture", "Pilot", "Data Science", "Research"],
		description: "Perfect for students interested in engineering, technology, and mathematical sciences.",
		entranceExams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE"],
	},
	science_pcb: {
		name: "Science (PCB)",
		subjects: ["Physics", "Chemistry", "Biology"],
		careers: ["Medicine", "Dentistry", "Pharmacy", "Biotechnology", "Nursing"],
		description: "Ideal for students aspiring for careers in medical and life sciences.",
		entranceExams: ["NEET", "AIIMS", "JIPMER", "State Medical Exams"],
	},
	science_pcmb: {
		name: "Science (PCMB)",
		subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
		careers: ["Biomedical Engineering", "Bioinformatics", "Research", "Medicine", "Engineering"],
		description: "Comprehensive option keeping both engineering and medical paths open.",
		entranceExams: ["JEE Main", "NEET", "BITSAT", "AIIMS"],
	},
	commerce: {
		name: "Commerce",
		subjects: ["Accountancy", "Business Studies", "Economics"],
		careers: ["CA", "CS", "Banking", "Finance", "Business Management"],
		description: "Great for students interested in business, finance, and entrepreneurship.",
		entranceExams: ["CA Foundation", "CS Foundation", "CLAT", "BBA Entrance"],
	},
	arts: {
		name: "Arts/Humanities",
		subjects: ["History", "Geography", "Political Science", "Psychology"],
		careers: ["Civil Services", "Journalism", "Psychology", "Social Work", "Teaching"],
		description: "Perfect for students interested in social sciences, literature, and public service.",
		entranceExams: ["UPSC", "State PSC", "JNU Entrance", "DU Entrance"],
	},
}

export default function SubjectAdvisorPage() {
	const [currentStep, setCurrentStep] = useState(0)
	const [answers, setAnswers] = useState({})
	const [showResults, setShowResults] = useState(false)
	const [recommendations, setRecommendations] = useState([])

	const handleAnswer = (questionId, value) => {
		setAnswers((prev) => ({ ...prev, [questionId]: value }))
	}

	const nextStep = () => {
		if (currentStep < questions.length - 1) {
			setCurrentStep(currentStep + 1)
		} else {
			generateRecommendations()
		}
	}

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1)
		}
	}

	const generateRecommendations = () => {
		const recs = []
		const interests = answers.interests || []
		const careerGoal = answers.career_goal
		const strengths = answers.strengths || []

		if (careerGoal === "engineering" || interests.includes("mathematics") || interests.includes("physics")) {
			recs.push("science_pcm")
		}
		if (careerGoal === "medical" || interests.includes("biology") || interests.includes("chemistry")) {
			recs.push("science_pcb")
		}
		if (interests.includes("mathematics") && interests.includes("biology")) {
			recs.push("science_pcmb")
		}
		if (careerGoal === "business" || interests.includes("economics")) {
			recs.push("commerce")
		}
		if (careerGoal === "arts" || careerGoal === "government" || interests.includes("history")) {
			recs.push("arts")
		}

		if (recs.length === 0) {
			recs.push("science_pcm", "commerce", "arts")
		}

		setRecommendations(recs)
		setShowResults(true)
	}

	const resetQuiz = () => {
		setCurrentStep(0)
		setAnswers({})
		setShowResults(false)
		setRecommendations([])
	}

	if (showResults) {
		return (
			<div className="min-h-screen bg-background">
				{/* Navigation */}
				<nav className="border-b bg-card/50 backdrop-blur-sm">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between items-center h-16">
							<Link href="/" className="flex items-center space-x-2">
								<GraduationCap className="h-8 w-8 text-primary" />
								<span className="font-serif font-bold text-xl text-foreground">CareerPath</span>
							</Link>
							<Button variant="outline" onClick={resetQuiz}>
								Retake Assessment
							</Button>
						</div>
					</div>
				</nav>

				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="text-center mb-12">
						<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<Target className="h-8 w-8 text-primary" />
						</div>
						<h1 className="font-serif font-bold text-3xl md:text-4xl mb-4">Your Personalized Recommendations</h1>
						<p className="text-lg text-muted-foreground">
							Based on your responses, here are the subject combinations that align with your interests and goals.
						</p>
					</div>

					<div className="space-y-6">
						{recommendations.map((recKey, index) => {
							const rec = subjectCombinations[recKey]
							return (
								<Card key={recKey} className="border-2 hover:border-primary/20 transition-colors">
									<CardHeader>
										<div className="flex items-center justify-between">
											<div>
												<CardTitle className="text-xl flex items-center gap-2">
													<Badge variant={index === 0 ? "default" : "secondary"}>
														{index === 0 ? "Best Match" : `Option ${index + 1}`}
													</Badge>
													{rec.name}
												</CardTitle>
												<CardDescription className="mt-2">{rec.description}</CardDescription>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<div className="grid md:grid-cols-3 gap-6">
											<div>
												<h4 className="font-semibold mb-2 flex items-center gap-2">
													<BookOpen className="h-4 w-4 text-primary" />
													Core Subjects
												</h4>
												<div className="flex flex-wrap gap-2">
													{rec.subjects.map((subject) => (
														<Badge key={subject} variant="outline">
															{subject}
														</Badge>
													))}
												</div>
											</div>
											<div>
												<h4 className="font-semibold mb-2 flex items-center gap-2">
													<TrendingUp className="h-4 w-4 text-primary" />
													Career Options
												</h4>
												<div className="flex flex-wrap gap-2">
													{rec.careers.map((career) => (
														<Badge key={career} variant="secondary">
															{career}
														</Badge>
													))}
												</div>
											</div>
											<div>
												<h4 className="font-semibold mb-2 flex items-center gap-2">
													<Lightbulb className="h-4 w-4 text-primary" />
													Entrance Exams
												</h4>
												<div className="flex flex-wrap gap-2">
													{rec.entranceExams.map((exam) => (
														<Badge key={exam} variant="outline" className="text-xs">
															{exam}
														</Badge>
													))}
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							)
						})}
					</div>

					<div className="mt-12 text-center">
						<Card className="bg-muted/30 border-0">
							<CardContent className="pt-6">
								<h3 className="font-semibold text-lg mb-2">Need More Guidance?</h3>
								<p className="text-muted-foreground mb-4">
									Connect with our expert counselors for personalized advice and detailed career planning.
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Button>Book Counseling Session</Button>
									<Button variant="outline">Explore Colleges</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		)
	}

	const currentQuestion = questions[currentStep]
	const progress = ((currentStep + 1) / questions.length) * 100

	return (
		<div className="min-h-screen bg-background">
			{/* Navigation */}
			<nav className="border-b bg-card/50 backdrop-blur-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<Link href="/" className="flex items-center space-x-2">
							<ArrowLeft className="h-5 w-5" />
							<GraduationCap className="h-8 w-8 text-primary" />
							<span className="font-serif font-bold text-xl text-foreground">CareerPath</span>
						</Link>
						<Badge variant="outline">
							Question {currentStep + 1} of {questions.length}
						</Badge>
					</div>
				</div>
			</nav>

			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<h1 className="font-serif font-bold text-2xl">Subject Combination Advisor</h1>
						<span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
					</div>
					<Progress value={progress} className="h-2" />
				</div>

				<Card className="border-2">
					<CardHeader>
						<CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
						<CardDescription>
							{currentQuestion.type === "multiple"
								? "Select all that apply"
								: "Choose the option that best describes you"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{currentQuestion.type === "single" ? (
							<RadioGroup
								value={answers[currentQuestion.id] || ""}
								onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
							>
								<div className="space-y-3">
									{currentQuestion.options.map((option) => (
										<div key={option.value} className="flex items-center space-x-2">
											<RadioGroupItem value={option.value} id={option.value} />
											<Label htmlFor={option.value} className="cursor-pointer">
												{option.label}
											</Label>
										</div>
									))}
								</div>
							</RadioGroup>
						) : (
							<div className="space-y-3">
								{currentQuestion.options.map((option) => (
									<div key={option.value} className="flex items-center space-x-2">
										<Checkbox
											id={option.value}
											checked={(answers[currentQuestion.id] || []).includes(option.value)}
											onCheckedChange={(checked) => {
												const currentAnswers = answers[currentQuestion.id] || []
												if (checked) {
													handleAnswer(currentQuestion.id, [...currentAnswers, option.value])
												} else {
													handleAnswer(
														currentQuestion.id,
														currentAnswers.filter((a) => a !== option.value),
													)
												}
											}}
										/>
										<Label htmlFor={option.value} className="cursor-pointer">
											{option.label}
										</Label>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				<div className="flex justify-between mt-8">
					<Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Previous
					</Button>
					<Button
						onClick={nextStep}
						disabled={
							!answers[currentQuestion.id] ||
							(Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)
						}
					>
						{currentStep === questions.length - 1 ? "Get Recommendations" : "Next"}
						<ArrowRight className="h-4 w-4 ml-2" />
					</Button>
				</div>
			</div>
		</div>
	)
}
