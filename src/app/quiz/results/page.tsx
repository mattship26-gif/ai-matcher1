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
}

function ResultsContent() {
  const searchParams = useSearchParams()

  const calculateScores = () => {
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
      tabnine: 0
    }

    const weights: Record<string, Record<string, number>> = {
      primary_use: {
        writing: 5,
        coding: 5,
        research: 5,
        design: 5,
        productivity: 5
      },
      work_style: {
        deep: 4,
        quick: 4,
        collaborative: 4,
        iterative: 4
      },
      complexity: {
        simple: 4,
        moderate: 4,
        complex: 5,
        technical: 5
      },
      platform: {
        browser: 4,
        desktop: 4,
        ide: 4,
        mobile: 3,
        flexible: 4
      },
      budget: {
        free: 4,
        low: 4,
        medium: 4,
        flexible: 4
      }
    }

    const answerWeights: Record<string, Record<string, Record<string, number>>> = {
      primary_use: {
        writing: { chatgpt: 5, claude: 5, notion: 4, grammarly: 4 },
        coding: { copilot: 5, cursor: 5, tabnine: 4, chatgpt: 3 },
        research: { perplexity: 5, chatgpt: 4, claude: 4, gemini: 3 },
        design: { midjourney: 5, canva: 4, chatgpt: 2, claude: 2 },
        productivity: { notion: 5, chatgpt: 4, claude: 3, grammarly: 3 }
      },
      work_style: {
        deep: { claude: 4, copilot: 4, notion: 3, perplexity: 3 },
        quick: { chatgpt: 4, grammarly: 4, canva: 3, gemini: 3 },
        collaborative: { notion: 4, canva: 3, chatgpt: 3, claude: 2 },
        iterative: { cursor: 4, midjourney: 4, claude: 3, copilot: 3 }
      },
      complexity: {
        simple: { grammarly: 4, canva: 4, chatgpt: 3, gemini: 3 },
        moderate: { chatgpt: 4, notion: 4, claude: 3, copilot: 3 },
        complex: { claude: 5, cursor: 4, perplexity: 4, copilot: 4 },
        technical: { copilot: 5, cursor: 5, tabnine: 4, claude: 4 }
      },
      platform: {
        browser: { chatgpt: 4, claude: 4, perplexity: 4, midjourney: 3 },
        desktop: { cursor: 4, notion: 3, canva: 2, grammarly: 3 },
        ide: { copilot: 4, cursor: 4, tabnine: 4, chatgpt: 2 },
        mobile: { chatgpt: 3, gemini: 3, grammarly: 2, canva: 3 },
        flexible: { chatgpt: 4, claude: 3, notion: 3, canva: 3 }
      },
      budget: {
        free: { gemini: 4, chatgpt: 3, canva: 2, grammarly: 2 },
        low: { chatgpt: 4, claude: 4, grammarly: 3, canva: 3 },
        medium: { copilot: 4, notion: 4, midjourney: 3, cursor: 3 },
        flexible: { cursor: 4, claude: 4, copilot: 4, perplexity: 3 }
      }
    }

    searchParams.forEach((value, key) => {
      if (answerWeights[key] && answerWeights[key][value]) {
        Object.entries(answerWeights[key][value]).forEach(([tool, weight]) => {
          scores[tool] += weight * (weights[key]?.[value] || 1)
        })
      }
    })

    return scores
  }

  const scores = calculateScores()
  const sortedTools = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const toolDetails: Record<string, Omit<Tool, 'score'>> = {
    chatgpt: {
      name: 'ChatGPT',
      description: 'Versatile conversational AI great for writing, brainstorming, and general knowledge tasks',
      bestFor: ['Writing assistance', 'Quick research', 'Brainstorming', 'General Q&A'],
      pricing: 'Free tier available, Plus at $20/mo',
      link: 'https://chat.openai.com'
    },
    claude: {
      name: 'Claude',
      description: 'Thoughtful AI assistant excelling at nuanced analysis, long-form content, and complex reasoning',
      bestFor: ['Deep analysis', 'Long documents', 'Nuanced writing', 'Research'],
      pricing: 'Free tier available, Pro at $20/mo',
      link: 'https://claude.ai'
    },
    copilot: {
      name: 'GitHub Copilot',
      description: 'AI pair programmer that suggests code completions and entire functions as you type',
      bestFor: ['Code completion', 'Learning new languages', 'Boilerplate code', 'Documentation'],
      pricing: '$10/mo for individuals, $19/mo for business',
      link: 'https://github.com/features/copilot'
    },
    cursor: {
      name: 'Cursor',
      description: 'AI-first code editor with powerful context awareness and natural language commands',
      bestFor: ['Full codebase understanding', 'Refactoring', 'Complex projects', 'AI-native coding'],
      pricing: 'Free tier available, Pro at $20/mo',
      link: 'https://cursor.sh'
    },
    perplexity: {
      name: 'Perplexity',
      description: 'AI-powered search engine that provides cited answers with real-time information',
      bestFor: ['Research', 'Current events', 'Fact-checking', 'Learning'],
      pricing: 'Free tier available, Pro at $20/mo',
      link: 'https://perplexity.ai'
    },
    midjourney: {
      name: 'Midjourney',
      description: 'Leading AI image generator creating stunning, artistic visuals from text prompts',
      bestFor: ['Concept art', 'Visual brainstorming', 'Creative projects', 'Design inspiration'],
      pricing: 'Starts at $10/mo',
      link: 'https://midjourney.com'
    },
    notion: {
      name: 'Notion AI',
      description: 'AI features integrated into Notion\'s workspace for writing, summarizing, and organizing',
      bestFor: ['Note-taking', 'Documentation', 'Project management', 'Team collaboration'],
      pricing: '$10/mo add-on to Notion workspace',
      link: 'https://notion.so/product/ai'
    },
    grammarly: {
      name: 'Grammarly',
      description: 'AI writing assistant that checks grammar, clarity, tone, and style in real-time',
      bestFor: ['Writing polish', 'Email drafts', 'Professional communication', 'Grammar checking'],
      pricing: 'Free tier available, Premium at $12/mo',
      link: 'https://grammarly.com'
    },
    canva: {
      name: 'Canva AI',
      description: 'Design platform with AI features for image generation, editing, and template creation',
      bestFor: ['Social media graphics', 'Presentations', 'Quick designs', 'Brand materials'],
      pricing: 'Free tier available, Pro at $13/mo',
      link: 'https://canva.com'
    },
    gemini: {
      name: 'Google Gemini',
      description: 'Google\'s multimodal AI integrated across Google services with strong research capabilities',
      bestFor: ['Google workspace integration', 'Research', 'General assistance', 'Multimodal tasks'],
      pricing: 'Free tier available, Advanced at $20/mo',
      link: 'https://gemini.google.com'
    },
    tabnine: {
      name: 'Tabnine',
      description: 'AI code completion tool with strong privacy features and team learning capabilities',
      bestFor: ['Privacy-focused coding', 'Team codebases', 'Enterprise use', 'Multiple IDEs'],
      pricing: 'Free tier available, Pro at $12/mo',
      link: 'https://tabnine.com'
    }
  }

  const recommendations: Tool[] = sortedTools.map(([key, score]) => ({
    ...toolDetails[key],
    score
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Your Personalized AI Toolkit
            </h1>
            <p className="text-gray-400 text-lg">
              Based on your answers, here are your top matches
            </p>
          </div>

          {/* Top recommendation */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-2xl p-8 mb-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">
                  🏆 Best Match
                </span>
                <h2 className="text-3xl font-bold text-white mt-2">
                  {recommendations[0].name}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-400">
                  {Math.round((recommendations[0].score / Math.max(...recommendations.map(r => r.score))) * 100)}%
                </div>
                <div className="text-gray-400 text-sm">match</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-lg">
              {recommendations[0].description}
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Best for:</h3>
                <ul className="space-y-1">
                  {recommendations[0].bestFor.map((item, idx) => (
                    <li key={idx} className="text-gray-400">• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Pricing:</h3>
                <p className="text-gray-400">{recommendations[0].pricing}</p>
              </div>
            </div>
            <a
              href={recommendations[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-[1.02]"
            >
              Try {recommendations[0].name} →
            </a>
          </div>

          {/* Other recommendations */}
          <div className="space-y-4">
            {recommendations.slice(1).map((tool, index) => (
              <div
                key={tool.name}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-gray-500 text-sm font-medium">
                      #{index + 2} Match
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {tool.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-300">
                      {Math.round((tool.score / Math.max(...recommendations.map(r => r.score))) * 100)}%
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  {tool.description}
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-white text-sm font-semibold mb-1">Best for:</h4>
                    <ul className="space-y-1">
                      {tool.bestFor.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-gray-500 text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold mb-1">Pricing:</h4>
                    <p className="text-gray-500 text-sm">{tool.pricing}</p>
                  </div>
                </div>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="/"
              className="inline-block text-gray-400 hover:text-white transition-colors"
            >
              ← Take the quiz again
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Results() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your results...</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
