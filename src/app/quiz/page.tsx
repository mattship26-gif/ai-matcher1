'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Answer = {
  value: string
  label: string
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const allQuestions: Question[] = [
    {
      id: 'industry',
      question: 'SELECT YOUR INDUSTRY',
      answers: [
        { value: 'financial', label: '💼 Financial Services' },
        { value: 'technology', label: '💻 Technology' },
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
      question: 'SELECT YOUR ROLE',
      conditional: true,
      showIf: (ans) => ans.industry === 'financial',
      answers: [
        { value: 'accounting', label: 'Accounting/Auditing' },
        { value: 'financial_analysis', label: 'Financial Analysis' },
        { value: 'tax', label: 'Tax' },
        { value: 'risk', label: 'Risk & Compliance' },
        { value: 'trading', label: 'Trading/Investment Banking' },
        { value: 'general_finance', label: 'General Finance' },
        { value: 'other_financial', label: 'Other Financial Role' }
      ]
    },
    // Technology roles
    {
      id: 'role',
      question: 'SELECT YOUR ROLE',
      conditional: true,
      showIf: (ans) => ans.industry === 'technology',
      answers: [
        { value: 'software_dev', label: 'Software Development' },
        { value: 'data_science', label: 'Data Science/Analytics' },
        { value: 'product', label: 'Product Management' },
        { value: 'it_admin', label: 'IT/Systems Admin' },
        { value: 'tech_writing', label: 'Technical Writing' },
        { value: 'qa', label: 'QA/Testing' },
        { value: 'other_tech', label: 'Other Tech Role' }
      ]
    },
    // Legal roles
    {
      id: 'role',
      question: 'SELECT YOUR ROLE',
      conditional: true,
      showIf: (ans) => ans.industry === 'legal',
      answers: [
        { value: 'attorney', label: 'Attorney/Lawyer' },
        { value: 'paralegal', label: 'Paralegal' },
        { value: 'compliance', label: 'Compliance Officer' },
        { value: 'contracts', label: 'Contract Management' },
        { value: 'legal_research', label: 'Legal Research' },
        { value: 'other_legal', label: 'Other Legal Role' }
      ]
    },
    // Marketing roles
    {
      id: 'role',
      question: 'SELECT YOUR ROLE',
      conditional: true,
      showIf: (ans) => ans.industry === 'marketing',
      answers: [
        { value: 'content', label: 'Content Creation' },
        { value: 'social', label: 'Social Media' },
        { value: 'design', label: 'Design/Creative' },
        { value: 'seo', label: 'SEO/SEM' },
        { value: 'brand', label: 'Brand/Strategy' },
        { value: 'email', label: 'Email Marketing' },
        { value: 'other_marketing', label: 'Other Marketing Role' }
      ]
    },
    // Operations roles
    {
      id: 'role',
      question: 'SELECT YOUR ROLE',
      conditional: true,
      showIf: (ans) => ans.industry === 'operations',
      answers: [
        { value: 'project_mgmt', label: 'Project Management' },
        { value: 'supply_chain', label: 'Supply Chain' },
        { value: 'process', label: 'Process Improvement' },
        { value: 'logistics', label: 'Logistics' },
        { value: 'procurement', label: 'Procurement' },
        { value: 'other_operations', label: 'Other Operations Role' }
      ]
    },
    // Sales roles
    {
      id: 'role',
      question: 'SELECT YOUR ROLE',
      conditional: true,
      showIf: (ans) => ans.industry === 'sales',
      answers: [
        { value: 'account_exec', label: 'Account Executive' },
        { value: 'bdr', label: 'BDR/SDR' },
        { value: 'account_mgmt', label: 'Account Management' },
        { value: 'sales_ops', label: 'Sales Operations' },
        { value: 'sales_eng', label: 'Sales Engineering' },
        { value: 'other_sales', label: 'Other Sales Role' }
      ]
    },
    // HR roles
    {
      id: 'role',
      question: 'SELECT YOUR ROLE',
      conditional: true,
      showIf: (ans) => ans.industry === 'hr',
      answers: [
        { value: 'recruiting', label: 'Recruiting/Talent Acquisition' },
        { value: 'hr_ops', label: 'HR Operations' },
        { value: 'learning', label: 'Learning & Development' },
        { value: 'comp_benefits', label: 'Compensation & Benefits' },
        { value: 'hr_business', label: 'HR Business Partner' },
        { value: 'other_hr', label: 'Other HR Role' }
      ]
    },
    // Healthcare roles
    {
      id: 'role',
      question: 'SELECT YOUR ROLE',
      conditional: true,
      showIf: (ans) => ans.industry === 'healthcare',
      answers: [
        { value: 'clinical', label: 'Clinical/Medical' },
        { value: 'admin', label: 'Healthcare Administration' },
        { value: 'research', label: 'Medical Research' },
        { value: 'health_it', label: 'Health IT' },
        { value: 'pharma', label: 'Pharmaceutical' },
        { value: 'other_healthcare', label: 'Other Healthcare Role' }
      ]
    },
    // Education roles
    {
      id: 'role',
      question: 'SELECT YOUR ROLE',
      conditional: true,
      showIf: (ans) => ans.industry === 'education',
      answers: [
        { value: 'teacher', label: 'Teacher/Instructor' },
        { value: 'curriculum', label: 'Curriculum Development' },
        { value: 'ed_admin', label: 'Educational Administration' },
        { value: 'instructional', label: 'Instructional Design' },
        { value: 'ed_tech', label: 'Educational Technology' },
        { value: 'other_education', label: 'Other Education Role' }
      ]
    },
    // Other roles
    {
      id: 'role',
      question: 'SELECT YOUR ROLE',
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
    // Task-based questions
    {
      id: 'primary_task',
      question: 'PRIMARY TIME CONSUMER',
      answers: [
        { value: 'writing', label: '✍️ Writing reports, emails, documents' },
        { value: 'data_analysis', label: '📊 Analyzing data or numbers' },
        { value: 'coding', label: '💻 Writing or reviewing code' },
        { value: 'research', label: '🔍 Research and information gathering' },
        { value: 'creative', label: '🎨 Creative work (design, content)' },
        { value: 'communication', label: '💬 Client/team communication' },
        { value: 'admin', label: '📋 Administrative tasks' }
      ]
    },
    {
      id: 'biggest_pain',
      question: 'BIGGEST BOTTLENECK',
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
      question: 'WORK STYLE PREFERENCE',
      answers: [
        { value: 'deep', label: '🧠 Deep, focused sessions' },
        { value: 'quick', label: '⚡ Quick hits throughout the day' },
        { value: 'collaborative', label: '👥 Collaborative with others' },
        { value: 'iterative', label: '🔄 Iterative refinement' }
      ]
    },
    {
      id: 'tech_comfort',
      question: 'TECH COMFORT LEVEL',
      answers: [
        { value: 'expert', label: '🚀 Very comfortable - I love trying new tools' },
        { value: 'comfortable', label: '👍 Comfortable - I can learn quickly' },
        { value: 'moderate', label: '🤷 Moderate - I need clear instructions' },
        { value: 'beginner', label: '🆕 Beginner - I prefer simple, intuitive tools' }
      ]
    },
    {
      id: 'budget',
      question: 'BUDGET ALLOCATION',
      answers: [
        { value: 'free', label: '🆓 Free tools only' },
        { value: 'low', label: '💵 Under $20/month' },
        { value: 'medium', label: '💰 $20-50/month' },
        { value: 'flexible', label: '💎 Whatever works best' }
      ]
    }
  ]

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
    <div className="min-h-screen bg-black terminal-grid scanlines relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12 max-w-3xl relative z-10">
        {/* Terminal header */}
        <div className="mb-6 font-mono text-xs text-green-400/60">
          $ running analysis_protocol.exe
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-mono text-gray-500 mb-3">
            <span className="text-green-400">
              QUERY [{currentQuestion + 1}/{visibleQuestions.length}]
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden border border-green-500/20">
            <div
              className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-500 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 blur-sm" />
            </div>
          </div>
        </div>

        {/* Question card */}
        <div className="relative group/card mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg blur-lg group-hover/card:blur-xl transition-all" />
          
          <div className="relative bg-black border border-green-500/30 rounded-lg p-8">
            <div className="font-mono text-xs text-green-400/60 mb-4">
              {'>'} PROCESSING_INPUT
            </div>
            <h2 className="text-3xl font-black font-mono text-white mb-8 neon-glow">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.answers.map((answer, index) => (
                <button
                  key={answer.value}
                  onClick={() => handleAnswer(answer.value)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="w-full group/btn relative overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  {hoveredIndex === index && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-blue-500/30 blur-md transition-all" />
                  )}
                  
                  <div className={`relative flex items-center p-4 rounded border transition-all ${
                    hoveredIndex === index
                      ? 'border-green-400 bg-green-500/5'
                      : 'border-green-500/20 bg-zinc-950/50'
                  }`}>
                    <span className={`mr-3 font-mono text-sm transition-all ${
                      hoveredIndex === index ? 'text-green-400' : 'text-gray-600'
                    }`}>
                      [{String.fromCharCode(65 + index)}]
                    </span>
                    <span className={`flex-1 text-left transition-all ${
                      hoveredIndex === index ? 'text-white' : 'text-gray-400'
                    }`}>
                      {answer.label}
                    </span>
                    <span className={`font-mono text-xs transition-all ${
                      hoveredIndex === index ? 'text-green-400 opacity-100' : 'opacity-0'
                    }`}>
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="mt-6 font-mono text-sm text-gray-600 hover:text-green-400 transition-colors"
              >
                {'<'} BACK
              </button>
            )}
          </div>
        </div>

        {/* Hint text */}
        <div className="text-center font-mono text-xs text-gray-700">
          Press [A-{String.fromCharCode(65 + currentQ.answers.length - 1)}] or click to select
        </div>
      </div>
    </div>
  )
}
