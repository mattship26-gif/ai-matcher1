'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getRoleSpecificQuestions, universalQuestions, type Question } from '@/data/questionFlows'

type Answer = {
  value: string
  label: string
}

export default function Quiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  // ==================== QUESTION FLOW LOGIC ====================
  
  const industryQuestion: Question = {
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
      { value: 'consulting', label: '🎯 Consulting & Professional Services' },
      { value: 'other', label: '🔧 Other' }
    ]
  }

  const getRoleQuestions = (industry: string): Question => {
    const roleQuestions: Record<string, Question> = {
      financial: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'accounting', label: 'Accounting/Auditing' },
          { value: 'financial_analysis', label: 'Financial Analysis' },
          { value: 'tax', label: 'Tax' },
          { value: 'risk', label: 'Risk & Compliance' },
          { value: 'trading', label: 'Trading/Investment Banking' },
          { value: 'fpa', label: 'FP&A' },
          { value: 'other_financial', label: 'Other Financial Role' }
        ]
      },
      technology: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'software_dev', label: 'Software Development' },
          { value: 'data_science', label: 'Data Science/ML Engineering' },
          { value: 'product', label: 'Product Management' },
          { value: 'it_admin', label: 'IT/Systems Admin' },
          { value: 'tech_writing', label: 'Technical Writing' },
          { value: 'qa', label: 'QA/Testing' },
          { value: 'devops', label: 'DevOps/SRE' },
          { value: 'other_tech', label: 'Other Tech Role' }
        ]
      },
      legal: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'attorney', label: 'Attorney/Lawyer' },
          { value: 'paralegal', label: 'Paralegal' },
          { value: 'compliance', label: 'Compliance Officer' },
          { value: 'contracts', label: 'Contract Management' },
          { value: 'legal_research', label: 'Legal Research' },
          { value: 'legal_ops', label: 'Legal Operations' },
          { value: 'other_legal', label: 'Other Legal Role' }
        ]
      },
      marketing: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'content', label: 'Content Creation' },
          { value: 'social', label: 'Social Media' },
          { value: 'design', label: 'Design/Creative' },
          { value: 'seo', label: 'SEO/SEM' },
          { value: 'brand', label: 'Brand/Strategy' },
          { value: 'email', label: 'Email Marketing' },
          { value: 'copywriter', label: 'Copywriting' },
          { value: 'other_marketing', label: 'Other Marketing Role' }
        ]
      },
      operations: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'project_mgmt', label: 'Project Management' },
          { value: 'supply_chain', label: 'Supply Chain' },
          { value: 'process', label: 'Process Improvement' },
          { value: 'logistics', label: 'Logistics' },
          { value: 'procurement', label: 'Procurement' },
          { value: 'other_operations', label: 'Other Operations Role' }
        ]
      },
      sales: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'account_exec', label: 'Account Executive' },
          { value: 'bdr', label: 'BDR/SDR' },
          { value: 'account_mgmt', label: 'Account Management' },
          { value: 'sales_ops', label: 'Sales Operations' },
          { value: 'sales_eng', label: 'Sales Engineering' },
          { value: 'other_sales', label: 'Other Sales Role' }
        ]
      },
      hr: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'recruiting', label: 'Recruiting/Talent Acquisition' },
          { value: 'hr_ops', label: 'HR Operations' },
          { value: 'learning', label: 'Learning & Development' },
          { value: 'comp_benefits', label: 'Compensation & Benefits' },
          { value: 'hr_business', label: 'HR Business Partner' },
          { value: 'other_hr', label: 'Other HR Role' }
        ]
      },
      healthcare: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'clinical', label: 'Clinical/Medical' },
          { value: 'admin', label: 'Healthcare Administration' },
          { value: 'research', label: 'Medical Research' },
          { value: 'health_it', label: 'Health IT' },
          { value: 'pharma', label: 'Pharmaceutical' },
          { value: 'other_healthcare', label: 'Other Healthcare Role' }
        ]
      },
      education: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'teacher', label: 'Teacher/Instructor' },
          { value: 'curriculum', label: 'Curriculum Development' },
          { value: 'ed_admin', label: 'Educational Administration' },
          { value: 'instructional', label: 'Instructional Design' },
          { value: 'ed_tech', label: 'Educational Technology' },
          { value: 'other_education', label: 'Other Education Role' }
        ]
      },
      consulting: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'consulting', label: 'Management Consulting' },
          { value: 'strategy', label: 'Strategy Consulting' },
          { value: 'tech_consulting', label: 'Technology Consulting' },
          { value: 'other_consulting', label: 'Other Consulting' }
        ]
      },
      other: {
        id: 'role',
        question: 'SELECT YOUR ROLE',
        answers: [
          { value: 'research', label: 'Research & Analysis' },
          { value: 'admin', label: 'Administration' },
          { value: 'customer_service', label: 'Customer Service' },
          { value: 'other_role', label: 'Other' }
        ]
      }
    }

    return roleQuestions[industry] || roleQuestions.other
  }

  const buildQuestionFlow = (): Question[] => {
    const flow: Question[] = [industryQuestion]
    
    // Add role question if industry is selected
    if (answers.industry) {
      flow.push(getRoleQuestions(answers.industry))
    }
    
    // Add role-specific questions if role is selected
    if (answers.industry && answers.role) {
      const roleSpecific = getRoleSpecificQuestions(answers.industry, answers.role)
      flow.push(...roleSpecific)
    }
    
    // Always add universal questions at the end
    if (answers.role) {
      flow.push(...universalQuestions)
    }
    
    return flow
  }

  const visibleQuestions = buildQuestionFlow()
  const currentQ = visibleQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / visibleQuestions.length) * 100

  // ==================== HANDLERS ====================

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value }
    setAnswers(newAnswers)

    // Rebuild question flow with new answer
    const newFlow = buildQuestionFlowWithAnswers(newAnswers)

    if (currentQuestion < newFlow.length - 1) {
      setDirection('forward')
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 150)
    } else {
      // Quiz complete - navigate to results
      const params = new URLSearchParams()
      Object.entries(newAnswers).forEach(([key, val]) => {
        params.append(key, val)
      })
      router.push(`/quiz/results')
    }
  }

  const buildQuestionFlowWithAnswers = (currentAnswers: Record<string, string>): Question[] => {
    const flow: Question[] = [industryQuestion]
    
    if (currentAnswers.industry) {
      flow.push(getRoleQuestions(currentAnswers.industry))
    }
    
    if (currentAnswers.industry && currentAnswers.role) {
      const roleSpecific = getRoleSpecificQuestions(currentAnswers.industry, currentAnswers.role)
      flow.push(...roleSpecific)
    }
    
    if (currentAnswers.role) {
      flow.push(...universalQuestions)
    }
    
    return flow
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection('back')
      setTimeout(() => setCurrentQuestion(currentQuestion - 1), 150)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!currentQ) return
      
      const key = e.key.toUpperCase()
      const charCode = key.charCodeAt(0)
      
      // Check if it's A-Z and within range of answers
      if (charCode >= 65 && charCode <= 90) {
        const index = charCode - 65
        if (index < currentQ.answers.length) {
          handleAnswer(currentQ.answers[index].value)
        }
      }
      
      // Backspace for going back
      if (e.key === 'Backspace' && currentQuestion > 0) {
        e.preventDefault()
        handleBack()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentQ, currentQuestion])

  if (!currentQ) return null

  return (
    <div className="min-h-screen bg-black terminal-grid scanlines relative overflow-hidden">
      {/* Animated ambient glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
        {/* Terminal header with typing effect */}
        <div className="mb-6 font-mono text-xs text-green-400/60">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">$</span>
            <span className="animate-pulse">running neural_match_algorithm.exe</span>
          </div>
          <div className="mt-1 text-gray-700">
            analyzing professional profile...
          </div>
        </div>

        {/* Enhanced progress bar with segments */}
        <div className="mb-10">
          <div className="flex justify-between items-center text-sm font-mono text-gray-500 mb-3">
            <div className="flex items-center space-x-3">
              <span className="text-green-400 font-bold">
                QUERY [{currentQuestion + 1}/{visibleQuestions.length}]
              </span>
              <span className="text-gray-700">•</span>
              <span className="text-blue-400/70">
                {currentQ.id === 'industry' ? 'INDUSTRY' : 
                 currentQ.id === 'role' ? 'ROLE' : 
                 currentQ.id.includes('_') ? currentQ.id.split('_').map(w => w.toUpperCase()).join(' ') :
                 'PROFILE'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{Math.round(progress)}%</span>
              <span className="text-gray-700">COMPLETE</span>
            </div>
          </div>
          
          {/* Progress bar with segments */}
          <div className="relative h-2 bg-zinc-900 rounded-full overflow-hidden border border-green-500/20">
            {/* Background segments */}
            <div className="absolute inset-0 flex">
              {visibleQuestions.map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 border-r border-zinc-800 last:border-r-0"
                />
              ))}
            </div>
            
            {/* Progress fill */}
            <div
              className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-500 relative"
              style={{ width: progress + '%' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 blur-sm opacity-50" />
            </div>
          </div>
        </div>

        {/* Question card with animation */}
        <div 
          className={`relative group/card mb-8 transition-all duration-300 ${
            direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'
          }`}
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover/card:blur-2xl transition-all" />
          
          <div className="relative bg-gradient-to-br from-zinc-950 to-black border border-green-500/30 rounded-2xl p-10 overflow-hidden">
            {/* Scanline effect */}
            <div className="absolute inset-0 scanlines opacity-20" />
            
            {/* Question number badge */}
            <div className="inline-flex items-center space-x-2 mb-4 px-3 py-1 bg-green-500/10 border border-green-400/30 rounded font-mono text-xs text-green-400 uppercase tracking-wider">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>PROCESSING_INPUT</span>
            </div>

            {/* Question text */}
            <h2 className="text-4xl md:text-5xl font-black font-mono text-white mb-10 neon-glow leading-tight">
              {currentQ.question}
            </h2>

            {/* Answer options */}
            <div className="space-y-3">
              {currentQ.answers.map((answer, index) => (
                <button
                  key={answer.value}
                  onClick={() => handleAnswer(answer.value)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="w-full group/btn relative overflow-hidden"
                >
                  {/* Hover glow effect */}
                  {hoveredIndex === index && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 via-blue-500/30 to-purple-500/30 blur-md transition-all" />
                  )}
                  
                  <div className={`relative flex items-center p-5 rounded-lg border transition-all duration-200 ${
                    hoveredIndex === index
                      ? 'border-green-400 bg-gradient-to-r from-green-500/10 to-blue-500/10 transform scale-[1.02]'
                      : 'border-green-500/20 bg-zinc-950/50'
                  }`}>
                    {/* Keyboard shortcut */}
                    <span className={`mr-4 font-mono text-sm font-bold transition-all duration-200 ${
                      hoveredIndex === index ? 'text-green-400 scale-110' : 'text-gray-600'
                    }`}>
                      [{String.fromCharCode(65 + index)}]
                    </span>
                    
                    {/* Answer text */}
                    <span className={`flex-1 text-left font-medium transition-all duration-200 ${
                      hoveredIndex === index ? 'text-white' : 'text-gray-400'
                    }`}>
                      {answer.label}
                    </span>
                    
                    {/* Arrow indicator */}
                    <span className={`font-mono text-sm transition-all duration-200 ${
                      hoveredIndex === index ? 'text-green-400 opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    }`}>
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              {currentQuestion > 0 ? (
                <button
                  onClick={handleBack}
                  className="group flex items-center space-x-2 font-mono text-sm text-gray-600 hover:text-green-400 transition-colors"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  <span>BACK</span>
                  <span className="text-xs text-gray-700">[Backspace]</span>
                </button>
              ) : (
                <div />
              )}
              
              <div className="text-right font-mono text-xs text-gray-700">
                <div>Press [A-{String.fromCharCode(65 + currentQ.answers.length - 1)}]</div>
                <div className="text-gray-800">or click to select</div>
              </div>
            </div>
          </div>
        </div>

        {/* Help text */}
        <div className="text-center font-mono text-xs text-gray-800">
          <span className="text-green-400/40">// </span>
          Your responses are used to match you with the most relevant AI tools
          <span className="text-green-400/40 cursor-blink ml-1"></span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
