'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Link from 'next/link'

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
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

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

    // Role-based scoring (including "other" roles)
    const roleWeights: Record<string, Record<string, number>> = {
      accounting: { excel_copilot: 5, chatgpt: 4, alteryx: 4, notion: 3 },
      financial_analysis: { excel_copilot: 5, tableau: 4, chatgpt: 4, claude: 4 },
      tax: { claude: 5, chatgpt: 4, perplexity: 4, notion: 3 },
      risk: { claude: 5, chatgpt: 4, excel_copilot: 4, notion: 4 },
      trading: { excel_copilot: 5, chatgpt: 4, perplexity: 3 },
      general_finance: { chatgpt: 4, claude: 4, excel_copilot: 4, notion: 3 },
      other_financial: { chatgpt: 4, claude: 4, excel_copilot: 3, notion: 3 },
      
      software_dev: { copilot: 5, cursor: 5, tabnine: 4, claude: 4 },
      data_science: { copilot: 4, chatgpt: 4, claude: 4, notion: 3, tableau: 4 },
      product: { notion: 5, chatgpt: 4, claude: 4, canva: 3 },
      it_admin: { chatgpt: 4, notion: 4, copilot: 3 },
      tech_writing: { chatgpt: 5, claude: 5, grammarly: 4, notion: 4 },
      qa: { copilot: 4, chatgpt: 4, notion: 3 },
      other_tech: { chatgpt: 4, copilot: 3, notion: 3 },
      
      attorney: { claude: 5, perplexity: 5, grammarly: 4 },
      paralegal: { chatgpt: 4, claude: 4, grammarly: 4, notion: 3 },
      compliance: { claude: 5, chatgpt: 4, perplexity: 4, notion: 4 },
      contracts: { claude: 5, chatgpt: 4, grammarly: 4 },
      legal_research: { perplexity: 5, claude: 5, chatgpt: 4 },
      other_legal: { chatgpt: 4, claude: 4, grammarly: 3 },
      
      content: { jasper: 5, copy_ai: 5, chatgpt: 5, grammarly: 4 },
      social: { chatgpt: 5, copy_ai: 4, canva: 4, jasper: 4 },
      design: { midjourney: 5, canva: 5, chatgpt: 3 },
      seo: { chatgpt: 4, jasper: 4, perplexity: 4 },
      brand: { chatgpt: 4, claude: 4, canva: 4, jasper: 3 },
      email: { jasper: 5, copy_ai: 5, grammarly: 4 },
      other_marketing: { chatgpt: 4, jasper: 3, canva: 3 },
      
      project_mgmt: { notion: 5, chatgpt: 4, claude: 3 },
      supply_chain: { excel_copilot: 4, alteryx: 4, chatgpt: 3, notion: 4 },
      process: { notion: 5, chatgpt: 4, claude: 4 },
      logistics: { excel_copilot: 4, notion: 4, chatgpt: 3 },
      procurement: { excel_copilot: 4, notion: 4, chatgpt: 3 },
      other_operations: { chatgpt: 4, notion: 4, excel_copilot: 3 },
      
      account_exec: { chatgpt: 5, grammarly: 4, notion: 4 },
      bdr: { chatgpt: 5, copy_ai: 4, grammarly: 4 },
      account_mgmt: { chatgpt: 4, grammarly: 4, notion: 4 },
      sales_ops: { excel_copilot: 4, notion: 5, chatgpt: 4 },
      sales_eng: { chatgpt: 4, copilot: 4, notion: 3 },
      other_sales: { chatgpt: 4, grammarly: 3, notion: 3 },
      
      recruiting: { chatgpt: 4, notion: 5, grammarly: 3 },
      hr_ops: { notion: 5, chatgpt: 4, excel_copilot: 3 },
      learning: { chatgpt: 5, claude: 4, notion: 5, canva: 4 },
      comp_benefits: { excel_copilot: 5, chatgpt: 4, notion: 4 },
      hr_business: { chatgpt: 4, claude: 4, notion: 4 },
      other_hr: { chatgpt: 4, notion: 4 },
      
      clinical: { claude: 5, perplexity: 5, chatgpt: 4 },
      admin: { notion: 5, chatgpt: 4, excel_copilot: 3 },
      research: { perplexity: 5, claude: 5, chatgpt: 4 },
      health_it: { chatgpt: 4, copilot: 4, notion: 4 },
      pharma: { claude: 5, perplexity: 5, chatgpt: 4 },
      other_healthcare: { chatgpt: 4, claude: 4, notion: 3 },
      
      teacher: { chatgpt: 5, claude: 4, notion: 5, canva: 4 },
      curriculum: { chatgpt: 5, claude: 4, notion: 5 },
      ed_admin: { notion: 5, chatgpt: 4, excel_copilot: 3 },
      instructional: { chatgpt: 5, canva: 4, notion: 5 },
      ed_tech: { chatgpt: 4, copilot: 4, notion: 4, canva: 3 },
      other_education: { chatgpt: 4, notion: 4, canva: 3 },
      
      consulting: { chatgpt: 5, claude: 5, notion: 4, grammarly: 4 },
      customer_service: { chatgpt: 5, grammarly: 4, notion: 3 },
      other_role: { chatgpt: 4, claude: 4, notion: 3 }
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
        scores[tool] += weight * 3
      })
    }

    if (roleWeights[role]) {
      Object.entries(roleWeights[role]).forEach(([tool, weight]) => {
        scores[tool] += weight * 4
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

  const generateWhyForYou = (toolName: string): string => {
    const reasons: string[] = []
    const industry = searchParams.get('industry') || ''
    const role = searchParams.get('role') || ''
    
    if (industry === 'financial' && ['chatgpt', 'claude', 'excel_copilot'].includes(toolName)) {
      reasons.push('Perfect for financial analysis and reporting')
    }
    if (role.includes('software_dev') || role.includes('tech') && ['copilot', 'cursor'].includes(toolName)) {
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
    if (role.includes('other') && ['chatgpt', 'claude', 'notion'].includes(toolName)) {
      reasons.push('Versatile enough to adapt to your unique role')
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
    <div className="min-h-screen bg-black terminal-grid scanlines relative">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12 max-w-5xl relative z-10">
        {/* Terminal header */}
        <div className="mb-8 font-mono text-xs text-green-400/60">
          <div className="mb-1">$ analysis_complete.status = SUCCESS</div>
          <div className="mb-1">$ neural_match_score = {Math.round((recommendations[0].score / maxScore) * 100)}%</div>
          <div className="mb-4">$ rendering_results... <span className="text-green-400">✓</span></div>
        </div>

        {/* Main header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black font-mono text-white mb-3 neon-glow">
            ANALYSIS_COMPLETE
          </h1>
          <p className="text-gray-400 text-lg">
            Your personalized AI toolkit // Optimized for your workflow
          </p>
        </div>

        {/* Top match - Hero card */}
        <div className="relative group/hero mb-8">
          <div className="absolute -inset-2 bg-gradient-to-r from-green-500/30 via-blue-500/30 to-purple-500/30 rounded-2xl blur-2xl group-hover/hero:blur-3xl transition-all" />
          
          <div className="relative bg-gradient-to-br from-zinc-950 to-black border-2 border-green-400/50 rounded-2xl p-8 overflow-hidden">
            {/* Scanline effect */}
            <div className="absolute inset-0 scanlines opacity-30" />
            
            {/* Badge */}
            <div className="inline-block mb-4 px-4 py-1 bg-green-500/10 border border-green-400 rounded font-mono text-xs text-green-400 uppercase tracking-wider">
              🏆 PRIMARY_RECOMMENDATION
            </div>

            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-black font-mono text-white mb-2 neon-glow">
                  {recommendations[0].name}
                </h2>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="font-mono text-green-400">
                    MATCH: {Math.round((recommendations[0].score / maxScore) * 100)}%
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-400">{recommendations[0].pricing}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-400/30 rounded-lg p-4 mb-6">
              <div className="font-mono text-xs text-blue-400 mb-2">WHY_THIS_TOOL:</div>
              <p className="text-white font-medium">{recommendations[0].whyForYou}</p>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {recommendations[0].description}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-mono text-xs text-green-400 mb-3 uppercase tracking-wider">
                  BEST_FOR:
                </h3>
                <div className="space-y-2">
                  {recommendations[0].bestFor.map((item, idx) => (
                    <div key={idx} className="flex items-center text-gray-300 text-sm">
                      <span className="text-green-400 mr-2">›</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-mono text-xs text-green-400 mb-3 uppercase tracking-wider">
                  PRICING_MODEL:
                </h3>
                <p className="text-gray-300 text-sm">{recommendations[0].pricing}</p>
              </div>
            </div>

            <a
              href={recommendations[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-block overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-75 group-hover/btn:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 blur-xl opacity-50 group-hover/btn:opacity-75 transition-opacity" />
              <div className="relative bg-black border-2 border-green-400 text-green-400 font-mono font-bold py-3 px-8 uppercase tracking-wider hover:bg-green-400/10 transition-all m-[2px]">
                [ DEPLOY_TOOL ] →
              </div>
            </a>
          </div>
        </div>

        {/* Alternative recommendations */}
        <div className="mb-8">
          <h2 className="font-mono text-sm text-gray-500 mb-4 uppercase tracking-wider">
            // ALTERNATIVE_OPTIONS
          </h2>
          <div className="space-y-4">
            {recommendations.slice(1).map((tool, index) => (
              <div
                key={tool.name}
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
                className="relative group/card"
              >
                {hoveredTool === tool.name && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg blur-lg transition-all" />
                )}
                
                <div className={`relative bg-zinc-950/80 border rounded-lg p-6 transition-all ${
                  hoveredTool === tool.name
                    ? 'border-green-400/50'
                    : 'border-green-500/20'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono text-xs text-gray-600">
                          #{index + 2}
                        </span>
                        <h3 className="text-2xl font-bold font-mono text-white">
                          {tool.name}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-3 text-sm mb-3">
                        <span className="font-mono text-green-400/70">
                          MATCH: {Math.round((tool.score / maxScore) * 100)}%
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-500">{tool.pricing}</span>
                      </div>
                      <div className="text-blue-400 text-sm italic mb-3">
                        💡 {tool.whyForYou}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">
                    {tool.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-mono text-xs text-gray-600 mb-2 uppercase">Best for:</h4>
                      <div className="space-y-1">
                        {tool.bestFor.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="text-gray-500 text-xs flex items-center">
                            <span className="text-green-400/50 mr-1">›</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-mono text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    LEARN_MORE →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 pt-8 border-t border-green-500/20">
          <Link
            href="/"
            className="inline-flex items-center font-mono text-sm text-gray-600 hover:text-green-400 transition-colors"
          >
            ← RUN_ANALYSIS_AGAIN
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 font-mono text-xs text-gray-700">
          <span className="text-green-400/40">// </span>
          Results generated using neural matching algorithm v3.0.1
          <span className="text-green-400/40 cursor-blink ml-1"></span>
        </div>
      </div>
    </div>
  )
}

export default function Results() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black terminal-grid scanlines flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-green-400 text-lg mb-2 cursor-blink">
            LOADING_RESULTS...
          </div>
          <div className="font-mono text-xs text-gray-600">
            $ processing neural network data
          </div>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
