'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

type Tool = {
  name: string
  score: number
  description: string
  bestFor: string[]
  pricing: string
  link: string
  whyForYou: string
}

function ResultsContent() {
  const searchParams = useSearchParams()

  const calculateScores = () => {
    const industry = searchParams.get('industry') || ''
    const role = searchParams.get('role') || ''
    const primaryTask = searchParams.get('primary_task') || ''
    const biggestPain = searchParams.get('biggest_pain') || ''
    const workStyle = searchParams.get('work_style') || ''
    const techComfort = searchParams.get('tech_comfort') || ''
    const budget = searchParams.get('budget') || ''

    const scores: Record<string, number> = {
      chatgpt: 0,
      claude: 0,
      copilot: 0,
      cursor: 0,
      perplexity: 0,
      midjourney: 0,
      notion: 0,
      grammarly: 0,
      canva: 0,
      gemini: 0,
      tabnine: 0,
      excel_copilot: 0,
      alteryx: 0,
      tableau: 0,
      jasper: 0,
      copy_ai: 0
    }

    // Industry-based scoring
    const industryWeights: Record<string, Record<string, number>> = {
      financial: {
        chatgpt: 4, claude: 5, excel_copilot: 5, copilot: 3, notion: 4, 
        perplexity: 4, grammarly: 3, alteryx: 4, tableau: 3
      },
      technology: {
        copilot: 5, cursor: 5, tabnine: 4, chatgpt: 4, claude: 4, 
        perplexity: 4, notion: 3, gemini: 3
      },
      legal: {
        claude: 5, chatgpt: 4, perplexity: 5, grammarly: 4, notion: 4
      },
      marketing: {
        chatgpt: 5, jasper: 5, copy_ai: 5, canva: 5, midjourney: 4, 
        claude: 3, grammarly: 4, notion: 3
      },
      operations: {
        notion: 5, chatgpt: 4, claude: 4, alteryx: 3, tableau: 3, 
        excel_copilot: 4
      },
      sales: {
        chatgpt: 5, grammarly: 4, notion: 4, claude: 3, perplexity: 3
      },
      hr: {
        chatgpt: 4, claude: 4, notion: 5, grammarly: 4, canva: 3
      },
      healthcare: {
        claude: 5, perplexity: 5, chatgpt: 4, notion: 4
      },
      education: {
        chatgpt: 5, claude: 4, canva: 4, notion: 5, grammarly: 4
      },
      other: {
        chatgpt: 4, claude: 4, notion: 4, grammarly: 3
      }
    }

    // Role-based scoring
    const roleWeights: Record<string, Record<string, number>> = {
      // Financial roles
      accounting: { excel_copilot: 5, chatgpt: 4, alteryx: 4, notion: 3 },
      financial_analysis: { excel_copilot: 5, tableau: 4, chatgpt: 4, claude: 4 },
      tax: { claude: 5, chatgpt: 4, perplexity: 4, notion: 3 },
      
      // Tech roles
      software_dev: { copilot: 5, cursor: 5, tabnine: 4, claude: 4 },
      data_science: { copilot: 4, chatgpt: 4, claude: 4, notion: 3 },
      
      // Legal roles
      attorney: { claude: 5, perplexity: 5, grammarly: 4 },
      
      // Marketing roles
      content: { jasper: 5, copy_ai: 5, chatgpt: 5, grammarly: 4 },
      design: { midjourney: 5, canva: 5, chatgpt: 3 },
      
      // Add more as needed
    }

    // Task-based scoring
    const taskWeights: Record<string, Record<string, number>> = {
      writing: { chatgpt: 5, claude: 5, jasper: 4, grammarly: 4, copy_ai: 4 },
      data_analysis: { excel_copilot: 5, alteryx: 4, tableau: 4, chatgpt: 3 },
      coding: { copilot: 5, cursor: 5, tabnine: 4, claude: 3 },
      research: { perplexity: 5, claude: 4, chatgpt: 4 },
      creative: { midjourney: 5, canva: 5, chatgpt: 4, jasper: 4 },
      communication: { chatgpt: 4, grammarly: 4, notion: 3 },
      admin: { notion: 5, chatgpt: 4, excel_copilot: 3 }
    }

    // Pain point scoring
    const painWeights: Record<string, Record<string, number>> = {
      repetitive: { copilot: 5, excel_copilot: 5, chatgpt: 4, notion: 4 },
      writing_quality: { claude: 5, grammarly: 5, jasper: 4, chatgpt: 4 },
      finding_info: { perplexity: 5, chatgpt: 4, claude: 4 },
      staying_current: { perplexity: 5, chatgpt: 4, gemini: 3 },
      complex_analysis: { claude: 5, chatgpt: 4, perplexity: 4 },
      consistency: { grammarly: 5, notion: 4, chatgpt: 3 }
    }

    // Tech comfort affects tool selection
    const techComfortWeights: Record<string, Record<string, number>> = {
      beginner: { chatgpt: 5, grammarly: 5, canva: 5, notion: 4 },
      moderate: { chatgpt: 4, claude: 4, grammarly: 4, notion: 4 },
      comfortable: { claude: 5, copilot: 4, chatgpt: 4, cursor: 3 },
      expert: { cursor: 5, claude: 5, copilot: 5, perplexity: 4 }
    }

    // Budget filters
    const budgetWeights: Record<string, Record<string, number>> = {
      free: { chatgpt: 5, gemini: 5, canva: 3, grammarly: 2 },
      low: { chatgpt: 5, claude: 5, grammarly: 4, copilot: 3 },
      medium: { copilot: 5, notion: 5, claude: 4, cursor: 4 },
      flexible: { cursor: 5, claude: 5, copilot: 5, notion: 4 }
    }

    // Apply all weights
    if (industryWeights[industry]) {
      Object.entries(industryWeights[industry]).forEach(([tool, weight]) => {
        scores[tool] += weight * 3 // Industry is important
      })
    }

    if (roleWeights[role]) {
      Object.entries(roleWeights[role]).forEach(([tool, weight]) => {
        scores[tool] += weight * 4 // Role is very important
      })
    }

    if (taskWeights[primaryTask]) {
      Object.entries(taskWeights[primaryTask]).forEach(([tool, weight]) => {
        scores[tool] += weight * 3
      })
    }

    if (painWeights[biggestPain]) {
      Object.entries(painWeights[biggestPain]).forEach(([tool, weight]) => {
        scores[tool] += weight * 3
      })
    }

    if (techComfortWeights[techComfort]) {
      Object.entries(techComfortWeights[techComfort]).forEach(([tool, weight]) => {
        scores[tool] += weight * 2
      })
    }

    if (budgetWeights[budget]) {
      Object.entries(budgetWeights[budget]).forEach(([tool, weight]) => {
        scores[tool] += weight * 2
      })
    }

    return scores
  }

  const scores = calculateScores()
  const sortedTools = Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const industry = searchParams.get('industry') || ''
  const role = searchParams.get('role') || ''

  const toolDetails: Record<string, Omit<Tool, 'score' | 'whyForYou'>> = {
    chatgpt: {
      name: 'ChatGPT',
      description: 'Versatile conversational AI for writing, brainstorming, and general tasks',
      bestFor: ['Writing assistance', 'Quick research', 'Brainstorming', 'General Q&A'],
      pricing: 'Free tier, Plus at $20/mo',
      link: 'https://chat.openai.com'
    },
    claude: {
      name: 'Claude',
      description: 'Advanced AI for nuanced analysis, long documents, and complex reasoning',
      bestFor: ['Deep analysis', 'Long documents', 'Technical writing', 'Research'],
      pricing: 'Free tier, Pro at $20/mo',
      link: 'https://claude.ai'
    },
    copilot: {
      name: 'GitHub Copilot',
      description: 'AI pair programmer for code completion and development',
      bestFor: ['Code completion', 'Learning new languages', 'Documentation', 'Debugging'],
      pricing: '$10/mo individual, $19/mo business',
      link: 'https://github.com/features/copilot'
    },
    cursor: {
      name: 'Cursor',
      description: 'AI-first code editor with advanced context and natural language coding',
      bestFor: ['Full codebase understanding', 'Refactoring', 'Complex projects'],
      pricing: 'Free tier, Pro at $20/mo',
      link: 'https://cursor.sh'
    },
    perplexity: {
      name: 'Perplexity',
      description: 'AI search engine providing cited answers with real-time information',
      bestFor: ['Research', 'Current events', 'Fact-checking', 'Learning'],
      pricing: 'Free tier, Pro at $20/mo',
      link: 'https://perplexity.ai'
    },
    midjourney: {
      name: 'Midjourney',
      description: 'Leading AI image generator for artistic and creative visuals',
      bestFor: ['Concept art', 'Visual brainstorming', 'Design inspiration'],
      pricing: 'Starts at $10/mo',
      link: 'https://midjourney.com'
    },
    notion: {
      name: 'Notion AI',
      description: 'AI features integrated into Notion for writing and organization',
      bestFor: ['Note-taking', 'Documentation', 'Project management', 'Collaboration'],
      pricing: '$10/mo add-on',
      link: 'https://notion.so/product/ai'
    },
    grammarly: {
      name: 'Grammarly',
      description: 'AI writing assistant for grammar, clarity, and tone',
      bestFor: ['Writing polish', 'Professional communication', 'Grammar checking'],
      pricing: 'Free tier, Premium at $12/mo',
      link: 'https://grammarly.com'
    },
    canva: {
      name: 'Canva AI',
      description: 'Design platform with AI for graphics and templates',
      bestFor: ['Social media graphics', 'Presentations', 'Quick designs'],
      pricing: 'Free tier, Pro at $13/mo',
      link: 'https://canva.com'
    },
    gemini: {
      name: 'Google Gemini',
      description: 'Google\'s multimodal AI with strong research capabilities',
      bestFor: ['Google workspace integration', 'Research', 'Multimodal tasks'],
      pricing: 'Free tier, Advanced at $20/mo',
      link: 'https://gemini.google.com'
    },
    tabnine: {
      name: 'Tabnine',
      description: 'Privacy-focused AI code completion with team learning',
      bestFor: ['Privacy-focused coding', 'Enterprise use', 'Multiple IDEs'],
      pricing: 'Free tier, Pro at $12/mo',
      link: 'https://tabnine.com'
    },
    excel_copilot: {
      name: 'Microsoft Copilot for Excel',
      description: 'AI assistant built into Excel for formulas, analysis, and automation',
      bestFor: ['Excel automation', 'Formula generation', 'Data analysis', 'Financial modeling'],
      pricing: '$30/mo (Microsoft 365 Copilot)',
      link: 'https://www.microsoft.com/microsoft-365/copilot'
    },
    alteryx: {
      name: 'Alteryx AI',
      description: 'Data analytics platform with AI for data prep and analysis',
      bestFor: ['Data preparation', 'ETL processes', 'Advanced analytics'],
      pricing: 'Enterprise pricing',
      link: 'https://www.alteryx.com'
    },
    tableau: {
      name: 'Tableau with AI',
      description: 'Data visualization with AI-powered insights',
      bestFor: ['Data visualization', 'Business intelligence', 'Dashboards'],
      pricing: 'From $70/mo',
      link: 'https://www.tableau.com'
    },
    jasper: {
      name: 'Jasper',
      description: 'AI writing assistant specialized for marketing content',
      bestFor: ['Marketing copy', 'Blog posts', 'Social media', 'Ads'],
      pricing: 'From $49/mo',
      link: 'https://jasper.ai'
    },
    copy_ai: {
      name: 'Copy.ai',
      description: 'AI copywriting tool for marketing and sales content',
      bestFor: ['Sales copy', 'Email campaigns', 'Product descriptions'],
      pricing: 'Free tier, Pro at $49/mo',
      link: 'https://copy.ai'
    }
  }

  // Generate personalized "why for you" explanations
  const generateWhyForYou = (toolName: string): string => {
    const reasons: string[] = []
    
    if (industry === 'financial' && ['chatgpt', 'claude', 'excel_copilot'].includes(toolName)) {
      reasons.push('Perfect for financial analysis and reporting')
    }
    if (role === 'software_dev' && ['copilot', 'cursor'].includes(toolName)) {
      reasons.push('Built specifically for developers like you')
    }
    if (searchParams.get('primary_task') === 'writing' && ['chatgpt', 'claude', 'jasper', 'grammarly'].includes(toolName)) {
      reasons.push('Excels at the writing tasks you do most')
    }
    if (searchParams.get('biggest_pain') === 'repetitive' && ['copilot', 'excel_copilot', 'notion'].includes(toolName)) {
      reasons.push('Automates repetitive work')
    }
    if (searchParams.get('tech_comfort') === 'beginner' && ['chatgpt', 'grammarly', 'canva'].includes(toolName)) {
      reasons.push('Easy to learn and use')
    }
    
    return reasons.length > 0 ? reasons[0] : 'Matches your workflow and needs'
  }

  const recommendations: Tool[] = sortedTools.map(([key, score]) => ({
    ...toolDetails[key],
    score,
    whyForYou: generateWhyForYou(key)
  }))

  const maxScore = Math.max(...recommendations.map(r => r.score))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Personalized AI Toolkit
          </h1>
          <p className="text-gray-700">
            Based on your role and workflow, here are your top matches
          </p>
        </div>

        {/* Top recommendation */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-4 text-white">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-blue-100 text-xs font-semibold uppercase tracking-wide">
                🏆 Best Match
              </span>
              <h2 className="text-2xl font-bold mt-1">
                {recommendations[0].name}
              </h2>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {Math.round((recommendations[0].score / maxScore) * 100)}%
              </div>
              <div className="text-blue-100 text-xs">match</div>
            </div>
          </div>
          <p className="text-blue-50 mb-4 text-sm italic">
            💡 {recommendations[0].whyForYou}
          </p>
          <p className="text-white/90 mb-4">
            {recommendations[0].description}
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold mb-1 text-sm">Best for:</h3>
              <ul className="space-y-1 text-sm">
                {recommendations[0].bestFor.map((item, idx) => (
                  <li key={idx} className="text-white/80">• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm">Pricing:</h3>
              <p className="text-white/80 text-sm">{recommendations[0].pricing}</p>
            </div>
          </div>
          <a
            href={recommendations[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition-all"
          >
            Try {recommendations[0].name} →
          </a>
        </div>

        {/* Other recommendations */}
        <div className="space-y-3">
          {recommendations.slice(1).map((tool, index) => (
            <div
              key={tool.name}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-gray-500 text-xs font-medium">
                    #{index + 2} Match
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">
                    {tool.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-700">
                    {Math.round((tool.score / maxScore) * 100)}%
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic mb-2">
                💡 {tool.whyForYou}
              </p>
              <p className="text-gray-700 mb-3 text-sm">
                {tool.description}
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-3">
                <div>
                  <h4 className="text-gray-900 text-xs font-semibold mb-1">Best for:</h4>
                  <ul className="space-y-0.5 text-xs">
                    {tool.bestFor.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-gray-900 text-xs font-semibold mb-1">Pricing:</h4>
                  <p className="text-gray-600 text-xs">{tool.pricing}</p>
                </div>
              </div>
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            ← Take the quiz again
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Results() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-900 text-lg">Loading your results...</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
