'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Answer = {
  value: string
  label: string
  weight: Record<string, number>
}

type Question = {
  id: string
  question: string
  answers: Answer[]
}

export default function Quiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const questions: Question[] = [
    {
      id: 'primary_use',
      question: 'What do you need AI to help with most?',
      answers: [
        { value: 'writing', label: '✍️ Writing & content creation', weight: { chatgpt: 5, claude: 5, notion: 4, grammarly: 4 } },
        { value: 'coding', label: '💻 Coding & development', weight: { copilot: 5, cursor: 5, tabnine: 4, chatgpt: 3 } },
        { value: 'research', label: '🔍 Research & learning', weight: { perplexity: 5, chatgpt: 4, claude: 4, gemini: 3 } },
        { value: 'design', label: '🎨 Design & visuals', weight: { midjourney: 5, canva: 4, chatgpt: 2, claude: 2 } },
        { value: 'productivity', label: '📊 General productivity', weight: { notion: 5, chatgpt: 4, claude: 3, grammarly: 3 } }
      ]
    },
    {
      id: 'work_style',
      question: 'How do you prefer to work?',
      answers: [
        { value: 'deep', label: '🧠 Deep, focused sessions', weight: { claude: 4, copilot: 4, notion: 3, perplexity: 3 } },
        { value: 'quick', label: '⚡ Quick hits throughout the day', weight: { chatgpt: 4, grammarly: 4, canva: 3, gemini: 3 } },
        { value: 'collaborative', label: '👥 Collaborative with others', weight: { notion: 4, canva: 3, chatgpt: 3, claude: 2 } },
        { value: 'iterative', label: '🔄 Iterative refinement', weight: { cursor: 4, midjourney: 4, claude: 3, copilot: 3 } }
      ]
    },
    {
      id: 'complexity',
      question: 'What level of complexity do you typically deal with?',
      answers: [
        { value: 'simple', label: '📝 Straightforward tasks', weight: { grammarly: 4, canva: 4, chatgpt: 3, gemini: 3 } },
        { value: 'moderate', label: '⚙️ Mix of simple and complex', weight: { chatgpt: 4, notion: 4, claude: 3, copilot: 3 } },
        { value: 'complex', label: '🎯 Complex, nuanced work', weight: { claude: 5, cursor: 4, perplexity: 4, copilot: 4 } },
        { value: 'technical', label: '🔬 Highly technical', weight: { copilot: 5, cursor: 5, tabnine: 4, claude: 4 } }
      ]
    },
    {
      id: 'platform',
      question: 'Where do you want to use AI?',
      answers: [
        { value: 'browser', label: '🌐 In my web browser', weight: { chatgpt: 4, claude: 4, perplexity: 4, midjourney: 3 } },
        { value: 'desktop', label: '💻 Desktop application', weight: { cursor: 4, notion: 3, canva: 2, grammarly: 3 } },
        { value: 'ide', label: '⚙️ Inside my code editor', weight: { copilot: 4, cursor: 4, tabnine: 4, chatgpt: 2 } },
        { value: 'mobile', label: '📱 On my phone', weight: { chatgpt: 3, gemini: 3, grammarly: 2, canva: 3 } },
        { value: 'flexible', label: '🔄 Wherever I am', weight: { chatgpt: 4, claude: 3, notion: 3, canva: 3 } }
      ]
    },
    {
      id: 'budget',
      question: 'What\'s your budget preference?',
      answers: [
        { value: 'free', label: '🆓 Free tools only', weight: { gemini: 4, chatgpt: 3, canva: 2, grammarly: 2 } },
        { value: 'low', label: '💵 Under $20/month', weight: { chatgpt: 4, claude: 4, grammarly: 3, canva: 3 } },
        { value: 'medium', label: '💰 $20-50/month', weight: { copilot: 4, notion: 4, midjourney: 3, cursor: 3 } },
        { value: 'flexible', label: '💎 Whatever works best', weight: { cursor: 4, claude: 4, copilot: 4, perplexity: 3 } }
      ]
    }
  ]

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const params = new URLSearchParams()
      Object.entries(newAnswers).forEach(([key, val]) => {
        params.append(key, val)
      })
      router.push(`/results?${params.toString()}`)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50">
            <h2 className="text-3xl font-bold text-white mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].answers.map((answer) => (
                <button
                  key={answer.value}
                  onClick={() => handleAnswer(answer.value)}
                  className="w-full text-left p-4 rounded-xl bg-gray-700/30 hover:bg-gray-700/60 border border-gray-600/30 hover:border-blue-500/50 transition-all text-gray-200 hover:text-white transform hover:scale-[1.02]"
                >
                  {answer.label}
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="mt-6 text-gray-400 hover:text-white transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
