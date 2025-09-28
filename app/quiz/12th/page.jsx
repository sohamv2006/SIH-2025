"use client";

import { useState } from "react";

export default function TwelfthQuiz() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  // Quiz data with grade-appropriate questions for 12th grade
  const subjects = {
    Maths: [
      { text: "What is the derivative of sin(x)?", options: ["cos(x)", "-sin(x)", "sin(x)", "1/cos(x)"], correct: "cos(x)" },
      { text: "In a right-angled triangle, what is sin²θ + cos²θ equal to?", options: ["0", "1", "tanθ", "cotθ"], correct: "1" },
      { text: "What is the integral of 1/x dx?", options: ["ln|x| + C", "x²/2 + C", "e^x + C", "sin(x) + C"], correct: "ln|x| + C" },
      { text: "Which of these is a vector quantity?", options: ["Speed", "Distance", "Velocity", "Mass"], correct: "Velocity" },
      { text: "What is the value of limit as x approaches 0 of sin(x)/x?", options: ["0", "1", "∞", "undefined"], correct: "1" },
    ],
    Physics: [
      { text: "What is the unit of electric field strength?", options: ["Newton", "Volt/meter", "Coulomb", "Joule"], correct: "Volt/meter" },
      { text: "According to Ohm's law, V = ?", options: ["IR", "I/R", "R/I", "I²R"], correct: "IR" },
      { text: "What is the speed of light in vacuum?", options: ["3 × 10^6 m/s", "3 × 10^8 m/s", "3 × 10^10 m/s", "3 × 10^4 m/s"], correct: "3 × 10^8 m/s" },
      { text: "Which law states that action equals reaction?", options: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Pascal's Law"], correct: "Newton's 3rd Law" },
      { text: "What is the de Broglie wavelength related to?", options: ["Mass", "Momentum", "Energy", "Charge"], correct: "Momentum" },
    ],
    Chemistry: [
      { text: "What is the atomic number of carbon?", options: ["6", "8", "12", "14"], correct: "6" },
      { text: "Which type of bond is formed by sharing electrons?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correct: "Covalent" },
      { text: "What is the pH of a neutral solution?", options: ["0", "7", "14", "1"], correct: "7" },
      { text: "Which gas is produced when an acid reacts with a metal?", options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"], correct: "Hydrogen" },
      { text: "What is the molecular formula of glucose?", options: ["C6H12O6", "C12H22O11", "CH4", "C2H5OH"], correct: "C6H12O6" },
    ],
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setQuestionIndex(0);
    setAnswers({});
    setShowScore(false);
  };

  const handleOptionSelect = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleNext = () => {
    if (questionIndex < subjects[selectedSubject].length - 1 && answers[questionIndex]) {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (answers[questionIndex]) {
      let correctCount = 0;
      const currentQuestions = subjects[selectedSubject];
      currentQuestions.forEach((q, index) => {
        if (answers[index] === q.correct) correctCount++;
      });
      setScore((correctCount / currentQuestions.length) * 100);
      setShowScore(true);
    }
  };

  if (!selectedSubject) {
    return (
      <div className="min-h-screen bg-background p-6">
        <h1 className="text-3xl font-bold text-center mb-6">12th Grade Career Quiz</h1>
        <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select a Subject</h2>
          <div className="space-y-2">
            {Object.keys(subjects).map((subject) => (
              <button
                key={subject}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => handleSubjectSelect(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestions = subjects[selectedSubject];
  const currentQuestion = currentQuestions[questionIndex];

  if (showScore) {
    return (
      <div className="min-h-screen bg-background p-6">
        <h1 className="text-3xl font-bold text-center mb-6">12th Grade Career Quiz</h1>
        <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
          <p className="mb-4">Your Score: {score}%</p>
          <p className="mb-4">
            {score >= 80
              ? "Excellent! You have a strong grasp of your subject."
              : score >= 60
              ? "Good effort! Keep exploring your interests."
              : "Nice try! Consider reviewing the basics."}
          </p>
          <button
            className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => {
              setSelectedSubject(null);
              setShowScore(false);
            }}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold text-center mb-6">12th Grade Career Quiz</h1>
      <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Question {questionIndex + 1} of {currentQuestions.length}</h2>
        <p className="mb-4">{currentQuestion.text}</p>
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`q${questionIndex}`}
                className="form-radio"
                checked={answers[questionIndex] === option}
                onChange={() => handleOptionSelect(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          {questionIndex > 0 && (
            <button
              className="bg-secondary text-secondary-foreground py-2 px-4 rounded-md hover:bg-secondary/90 transition-colors"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {questionIndex < currentQuestions.length - 1 ? (
            <button
              className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              onClick={handleNext}
              disabled={!answers[questionIndex]}
            >
              Next Question
            </button>
          ) : (
            <button
              className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              onClick={handleSubmit}
              disabled={!answers[questionIndex]}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}