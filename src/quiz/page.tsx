'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 1,
    question: "What's your primary use case?",
    options: [
      "Customer service automation",
      "Content generation",
      "Data analysis",
      "Software development",
      "Research and insights"
    ]
  },
  {
    id: 2,
    question: "What's your team size?",
    options: [
      "Just me (1)",
      "Small team (2-10)",
      "Medium team (11-50)",
      "Large team (51-200)",
      "Enterprise (200+)"
    ]
  },
  {
    id: 3,
    question: "What's your technical expertise?",
    options: [
      "Non-technical (need simple interface)",
      "Some technical knowledge",
      "Developer-friendly (API access needed)",
      "Data scientist/ML engineer"
    ]
  },
  {
    id: 4,
    question: "What's your budget range?",
    options: [
      "Free/Very low cost",
      "Up to $100/month",
      "Up to $500/month",
      "$500-$2000/month",
      "Enterprise pricing (flexible)"
    ]
  }
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete - navigate to results
      router.push(`/results?answers=${encodeURIComponent(JSON.stringify(newAnswers))}`);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8">
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 bg-gray-700/50 hover:bg-purple-600/30 text-white rounded-lg transition-all transform hover:scale-102 border border-gray-600 hover:border-purple-500"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
