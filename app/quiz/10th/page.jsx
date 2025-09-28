"use client";

import { useState } from "react";

export default function TenthQuiz() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  // Quiz data with grade-appropriate questions for 10th grade
  const subjects = {
    Maths: [
      { text: "What is the solution to the equation 2x + 4 = 10?", options: ["2", "3", "4", "5"], correct: "3", hint: "Isolate x by subtracting 4 and dividing by 2." },
      { text: "Which of these is a quadratic equation?", options: ["x + 5 = 0", "x² - 9 = 0", "3x = 6", "x³ = 8"], correct: "x² - 9 = 0", hint: "Look for an equation with x²." },
      { text: "What is the area of a triangle with base 6 cm and height 4 cm?", options: ["10 cm²", "12 cm²", "20 cm²", "24 cm²"], correct: "12 cm²", hint: "Use the formula: (base × height) / 2." },
      { text: "Which of these is a rational number?", options: ["√2", "0.333...", "1/2", "π"], correct: "1/2", hint: "It can be expressed as a fraction." },
      { text: "What is the value of cos 60°?", options: ["0.5", "0.707", "1", "0"], correct: "0.5", hint: "Recall common trigonometric values." },
    ],
    Science: [
      { text: "What process do plants use to make food?", options: ["Respiration", "Photosynthesis", "Transpiration", "Fermentation"], correct: "Photosynthesis", hint: "It involves sunlight and chlorophyll." },
      { text: "Which gas is most abundant in Earth’s atmosphere?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"], correct: "Nitrogen", hint: "It makes up about 78% of the air." },
      { text: "What organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], correct: "Mitochondria", hint: "It produces energy (ATP)." },
      { text: "Which of these is a non-renewable resource?", options: ["Solar energy", "Wind energy", "Coal", "Water"], correct: "Coal", hint: "It takes millions of years to form." },
      { text: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: "Newton", hint: "It’s named after a famous physicist." },
    ],
    English: [
      { text: "Which figure of speech is used in 'The stars danced in the sky'?", options: ["Metaphor", "Personification", "Simile", "Alliteration"], correct: "Personification", hint: "It gives human traits to non-human things." },
      { text: "What is the plural of 'goose'?", options: ["Gooses", "Geese", "Goose", "Goosies"], correct: "Geese", hint: "It’s an irregular plural form." },
      { text: "Which word is a synonym for 'brave'?", options: ["Cowardly", "Fearful", "Courageous", "Timid"], correct: "Courageous", hint: "Think of a similar bold quality." },
      { text: "What is the tense of 'They will go to school'?", options: ["Present", "Past", "Future", "Present Perfect"], correct: "Future", hint: "It uses 'will' to show future action." },
      { text: "Which punctuation mark is used to introduce a list?", options: ["Comma", "Colon", "Semicolon", "Dash"], correct: "Colon", hint: "It often follows a complete sentence." },
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
        <h1 className="text-3xl font-bold text-center mb-6">10th Grade Career Quiz</h1>
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
        <h1 className="text-3xl font-bold text-center mb-6">10th Grade Career Quiz</h1>
        <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
          <p className="mb-4">Your Score: {score}%</p>
          <p className="mb-4">
            {score >= 80
              ? "Excellent! You have a strong interest in this subject."
              : score >= 60
              ? "Good effort! Keep exploring your options."
              : "Nice try! Consider trying different subjects."}
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
      <h1 className="text-3xl font-bold text-center mb-6">10th Grade Career Quiz</h1>
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