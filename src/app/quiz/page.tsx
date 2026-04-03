'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Answer = {
  value: string
  label: string
  weight?: Record<string, number>
}

type Question = {
  id: string
  question: string
  answers: Answer[]
  conditional?: boolean
  showIf?: (answers: Record<string, string>) => boolean
}

export default function Quiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const allQuestions: Question[] = [
    {
      id: 'industry',
      question: 'What\'s your line of work?',
      answers: [
        { value: 'financial', label: '💼 Financial Services (Accounting, Audit, Tax, Finance)' },
        { value: 'technology', label: '💻 Technology (Engineering, IT, Data)' },
        { value: 'legal', label: '⚖️ Legal & Compliance' },
        { value: 'marketing', label: '📱 Marketing & Creative' },
        { value: 'operations', label: '⚙️ Operations & Supply Chain' },
        { value: 'sales', label: '📊 Sales & Business Development' },
        { value: 'hr', label: '👥 Human Resources' },
        { value: 'healthcare', label: '🏥 Healthcare' },
        { value: 'education', label: '📚 Education & Training' },
        { value: 'other', label: '🔧 Other Professional Services' }
      ]
    },
    // Financial Services roles
    {
      id: 'role',
      question: 'What\'s your specific role?',
      conditional: true,
      showIf: (ans) => ans.industry === 'financial',
      answers: [
        { value: 'accounting', label: 'Accounting/Auditing' },
        { value: 'financial_analysis', label: 'Financial Analysis' },
        { value: 'tax', label: 'Tax' },
        { value: 'risk', label: 'Risk & Compliance' },
        { value: 'trading', label: 'Trading/Investment Banking' },
        { value: 'general_finance', label: 'General Finance' }
      ]
    },
    // Technology roles
    {
      id: 'role',
      question: 'What\'s your specific role?',
      conditional: true,
      showIf: (ans) => ans.industry === 'technology',
      answers: [
        { value: 'software_dev', label: 'Software Development' },
        { value: 'data_science', label: 'Data Science/Analytics' },
        { value: 'product', label: 'Product Management' },
        { value: 'it_admin', label: 'IT/Systems Admin' },
        { value: 'tech_writing', label: 'Technical Writing' },
        { value: 'qa', label: 'QA/Testing' }
      ]
    },
    // Legal roles
    {
      id: 'role',
      question: 'What\'s your specific role?',
      conditional: true,
      showIf: (ans) => ans.industry === 'legal',
      answers: [
        { value: 'attorney', label: 'Attorney/Lawyer' },
        { value: 'paralegal', label: 'Paralegal' },
        { value: 'compliance', label: 'Compliance Officer' },
        { value: 'contracts', label: 'Contract Management' },
        { value: 'legal_research', label: 'Legal Research' }
      ]
    },
    // Marketing roles
    {
      id: 'role',
      question: 'What\'s your specific role?',
      conditional: true,
      showIf: (ans) => ans.industry === 'marketing',
      answers: [
        { value: 'content', label: 'Content Creation' },
        { value: 'social', label: 'Social Media' },
        { value: 'design', label: 'Design/Creative' },
        { value: 'seo', label: 'SEO/SEM' },
        { value: 'brand', label: 'Brand/Strategy' },
        { value: 'email', label: 'Email Marketing' }
      ]
    },
    // Operations roles
    {
      id: 'role',
      question: 'What\'s your specific role?',
      conditional: true,
      showIf: (ans) => ans.industry === 'operations',
      answers: [
        { value: 'project_mgmt', label: 'Project Management' },
        { value: 'supply_chain', label: 'Supply Chain' },
        { value: 'process', label: 'Process Improvement' },
        { value: 'logistics', label: 'Logistics' },
        { value: 'procurement', label: 'Procurement' }
      ]
    },
    // Sales roles
    {
      id: 'role',
      question: 'What\'s your specific role?',
      conditional: true,
      showIf: (ans) => ans.industry === 'sales',
      answers: [
        { value: 'account_exec', label: 'Account Executive' },
        { value: 'bdr', label: 'BDR/SDR' },
        { value: 'account_mgmt', label: 'Account Management' },
        { value: 'sales_ops', label: 'Sales Operations' },
        { value: 'sales_eng', label: 'Sales Engineering' }
      ]
    },
    // HR roles
    {
      id: 'role',
      question: 'What\'s your specific role?',
      conditional: true,
      showIf: (ans) => ans.industry === 'hr',
      answers: [
        { value: 'recruiting', label: 'Recruiting/Talent Acquisition' },
        { value: 'hr_ops', label: 'HR Operations' },
        { value: 'learning', label: 'Learning & Development' },
        { value: 'comp_benefits', label: 'Compensation & Benefits' },
        { value: 'hr_business', label: 'HR Business Partner' }
      ]
    },
    // Healthcare roles
    {
      id: 'role',
      question: 'What\'s your specific role?',
      conditional: true,
      showIf: (ans) => ans.industry === 'healthcare',
      answers: [
        { value: 'clinical', label: 'Clinical/Medical' },
        { value: 'admin', label: 'Healthcare Administration' },
        { value: 'research', label: 'Medical Research' },
        { value: 'health_it', label: 'Health IT' },
        { value: 'pharma', label: 'Pharmaceutical' }
      ]
    },
    // Education roles
    {
      id: 'role',
      question: 'What\'s your specific role?',
      conditional: true,
      showIf: (ans) => ans.industry === 'education',
      answers: [
        { value: 'teacher', label: 'Teacher/Instructor' },
        { value: 'curriculum', label: 'Curriculum Development' },
        { value: 'ed_admin', label: 'Educational Administration' },
        { value: 'instructional', label: 'Instructional Design' },
        { value: 'ed_tech', label: 'Educational Technology' }
      ]
    },
    // Other roles
    {
      id: 'role',
      question: 'What\'s your specific role?',
      conditional: true,
      showIf: (ans) => ans.industry === 'other',
      answers: [
        { value: 'consulting', label: 'Consulting' },
        { value: 'research', label: 'Research & Analysis' },
        { value: 'admin', label: 'Administration' },
        { value: 'customer_service', label: 'Customer Service' },
        { value: 'other_role', label: 'Other' }
      ]
    },
    // Task-based questions (apply to all)
    {
      id: 'primary_task',
      question: 'What takes up most of your time?',
      answers: [
        { value: 'writing', label: '✍️ Writing reports, emails, or documents' },
        { value: 'data_analysis', label: '📊 Analyzing data or numbers' },
        { value: 'coding', label: '💻 Writing or reviewing code' },
        { value: 'research', label: '🔍 Research and information gathering' },
        { value: 'creative', label: '🎨 Creative work (design, content, etc.)' },
        { value: 'communication', label: '💬 Client/team communication' },
        { value: 'admin', label: '📋 Administrative tasks' }
      ]
    },
    {
      id: 'biggest_pain',
      question: 'What\'s your biggest productivity bottleneck?',
      answers: [
        { value: 'repetitive', label: '🔄 Repetitive tasks that waste time' },
        { value: 'writing_quality', label: '📝 Getting writing to sound right' },
        { value: 'finding_info', label: '🔎 Finding the right information quickly' },
        { value: 'staying_current', label: '📰 Keeping up with industry changes' },
        { value: 'complex_analysis', label: '🧠 Breaking down complex problems' },
        { value: 'consistency', label: '⚖️ Maintaining consistency across work' }
      ]
    },
    {
      id: 'work_style',
      question: 'How do you prefer to work?',
      answers: [
        { value: 'deep', label: '🧠 Deep, focused sessions' },
        { value: 'quick', label: '⚡ Quick hits throughout the day' },
        { value: 'collaborative', label: '👥 Collaborative with others' },
        { value: 'iterative', label: '🔄 Iterative refinement' }
      ]
    },
    {
      id: 'tech_comfort',
      question: 'How comfortable are you with new technology?',
      answers: [
        { value: 'expert', label: '🚀 Very comfortable - I love trying new tools' },
        { value: 'comfortable', label: '👍 Comfortable - I can learn quickly' },
        { value: 'moderate', label: '🤷 Moderate - I need clear instructions' },
        { value: 'beginner', label: '🆕 Beginner - I prefer simple, intuitive tools' }
      ]
    },
    {
      id: 'budget',
      question: 'What\'s your budget for AI tools?',
      answers: [
        { value: 'free', label: '🆓 Free tools only' },
        { value: 'low', label: '💵 Under $20/month' },
        { value: 'medium', label: '💰 $20-50/month' },
        { value: 'flexible', label: '💎 Whatever works best' }
      ]
    }
  ]

  // Filter questions based on previous answers
  const getVisibleQuestions = () => {
    return allQuestions.filter(q => {
      if (!q.conditional) return true
      if (q.showIf) return q.showIf(answers)
      return false
    })
  }

  const visibleQuestions = getVisibleQuestions()
  const currentQ = visibleQuestions[currentQuestion]

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value }
    setAnswers(newAnswers)

    // Recalculate visible questions with new answers
    const newVisibleQuestions = allQuestions.filter(q => {
      if (!q.conditional) return true
      if (q.showIf) return q.showIf(newAnswers)
      return false
    })

    if (currentQuestion < newVisibleQuestions.length - 1) {
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

  const progress = ((currentQuestion + 1) / visibleQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {visibleQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-2">
            {currentQ.answers.map((answer) => (
              <button
                key={answer.value}
                onClick={() => handleAnswer(answer.value)}
                className="w-full text-left p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-900"
              >
                {answer.label}
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="mt-4 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
