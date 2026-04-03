'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { getTopRecommendations, type ScoredTool } from '@/utils/scoringEngine'

function ResultsContent() {
  const searchParams = useSearchParams()
  const [expandedTool, setExpandedTool] = useState<string | null>(null)
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)
  const [showAllTools, setShowAllTools] = useState(false)

  // Build user profile from search params
  const userProfile: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    userProfile[key] = value
  })

  // Get recommendations using our sophisticated scoring engine
  const allRecommendations = getTopRecommendations(userProfile, 20)
  const topRecommendations = showAllTools ? allRecommendations : allRecommendations.slice(0, 5)
  
  if (allRecommendations.length === 0) {
    return (
      <div className="min-h-screen bg-black terminal-grid scanlines flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 font-mono text-xl mb-4">ERROR: NO_MATCHES_FOUND</div>
          <Link href="/quiz" className="text-green-400 hover:text-green-300 font-mono text-sm">
            ← RESTART_ANALYSIS
          </Link>
        </div>
      </div>
    )
  }

  const topTool = allRecommendations[0]
  const maxScore = topTool.score

  // Format user role for display
  const formatRole = (role: string) => {
    return role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }

  // Get confidence badge
  const getConfidenceBadge = (level: 'high' | 'medium' | 'low') => {
    const badges = {
      high: { text: 'HIGH CONFIDENCE', color: 'green', icon: '⚡' },
      medium: { text: 'GOOD MATCH', color: 'blue', icon: '✓' },
      low: { text: 'POTENTIAL MATCH', color: 'yellow', icon: '~' }
    }
    return badges[level]
  }

  return (
    <div className="min-h-screen bg-black terminal-grid scanlines relative">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12 max-w-6xl relative z-10">
        {/* Terminal header */}
        <div className="mb-8 font-mono text-xs text-green-400/60">
          <div className="mb-1">$ neural_match_algorithm.status = <span className="text-green-400">SUCCESS</span></div>
          <div className="mb-1">$ analyzed_tools = {allRecommendations.length}</div>
          <div className="mb-1">$ confidence_score = {Math.round((topTool.score / maxScore) * 100)}%</div>
          <div className="mb-4">$ rendering_results... <span className="text-green-400">✓</span></div>
        </div>

        {/* Profile Summary */}
        <div className="mb-8 p-6 bg-zinc-950/50 border border-green-500/20 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-mono text-sm text-green-400 mb-2 uppercase tracking-wider">YOUR PROFILE</h3>
              <div className="flex flex-wrap gap-3">
                {userProfile.industry && (
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-400/30 rounded-full font-mono text-xs text-blue-400">
                    {formatRole(userProfile.industry)}
                  </span>
                )}
                {userProfile.role && (
                  <span className="px-3 py-1 bg-purple-500/10 border border-purple-400/30 rounded-full font-mono text-xs text-purple-400">
                    {formatRole(userProfile.role)}
                  </span>
                )}
                {userProfile.budget && (
                  <span className="px-3 py-1 bg-green-500/10 border border-green-400/30 rounded-full font-mono text-xs text-green-400">
                    Budget: {userProfile.budget}
                  </span>
                )}
              </div>
            </div>
            <Link
              href="/quiz"
              className="font-mono text-xs text-gray-600 hover:text-green-400 transition-colors"
            >
              RETAKE →
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black font-mono text-white mb-4 neon-glow">
            YOUR_AI_TOOLKIT
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Personalized recommendations based on your role, workflow, and challenges
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-400/30 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-green-400">
              {allRecommendations.length} TOOLS ANALYZED
            </span>
          </div>
        </div>

        {/* Top recommendation - HERO CARD */}
        <div className="relative group/hero mb-12">
          <div className="absolute -inset-3 bg-gradient-to-r from-green-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl group-hover/hero:blur-3xl transition-all" />
          
          <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-green-400/50 rounded-3xl p-10 overflow-hidden">
            {/* Scanline effect */}
            <div className="absolute inset-0 scanlines opacity-30" />
            
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-400 rounded-lg font-mono text-xs text-green-400 uppercase tracking-wider">
                <span>🏆</span>
                <span>TOP RECOMMENDATION</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 border border-blue-400/30 rounded font-mono text-xs text-blue-400">
                <span>{getConfidenceBadge(topTool.confidenceLevel).icon}</span>
                <span>{getConfidenceBadge(topTool.confidenceLevel).text}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <h2 className="text-5xl font-black font-mono text-white mb-4 neon-glow leading-tight">
                  {topTool.name}
                </h2>
                
                {/* Match Score */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-mono text-green-400">MATCH SCORE</span>
                      <span className="font-mono text-white font-bold">{Math.round((topTool.score / maxScore) * 100)}%</span>
                    </div>
                    <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-green-500/30">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(topTool.score / maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {topTool.description}
                </p>

                {/* Why This Tool Section */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-xl p-6 mb-6">
                  <h3 className="font-mono text-sm text-blue-400 mb-4 uppercase tracking-wider flex items-center">
                    <span className="mr-2">💡</span>
                    WHY_THIS_TOOL_FOR_YOU:
                  </h3>
                  <ul className="space-y-3">
                    {topTool.matchReasons.slice(0, 5).map((reason, idx) => (
                      <li key={idx} className="flex items-start text-white">
                        <span className="text-green-400 mr-3 mt-1 text-lg">›</span>
                        <span className="font-medium">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Quick Stats */}
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <div className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-wider">Category</div>
                  <div className="text-white font-semibold">{topTool.category}</div>
                </div>

                {/* Pricing */}
                <div>
                  <div className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-wider">Pricing</div>
                  <div className="text-green-400 font-mono font-semibold">{topTool.pricing}</div>
                </div>

                {/* Alignment Scores */}
                <div>
                  <div className="font-mono text-xs text-gray-500 mb-3 uppercase tracking-wider">Alignment</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Role Fit</span>
                        <span className="text-white font-mono">{Math.round((topTool.roleAlignment / 15) * 100)}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(topTool.roleAlignment / 15) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Task Match</span>
                        <span className="text-white font-mono">{Math.round((topTool.taskAlignment / 16) * 100)}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${(topTool.taskAlignment / 16) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Budget Fit</span>
                        <span className="text-white font-mono">{Math.round((topTool.budgetAlignment / 9) * 100)}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(topTool.budgetAlignment / 9) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best For */}
                <div>
                  <div className="font-mono text-xs text-gray-500 mb-3 uppercase tracking-wider">Best For</div>
                  <div className="space-y-2">
                    {topTool.bestFor.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex items-start text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <a
                href={topTool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-block overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-75 group-hover/btn:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 blur-xl opacity-50 group-hover/btn:opacity-75 transition-opacity" />
                <div className="relative bg-black border-2 border-green-400 text-green-400 font-mono font-bold py-4 px-10 uppercase tracking-wider hover:bg-green-400/10 transition-all m-[2px] flex items-center space-x-3">
                  <span>START USING {topTool.name.toUpperCase()}</span>
                  <span className="text-2xl">→</span>
                </div>
              </a>
              
              <button
                onClick={() => setExpandedTool(expandedTool === topTool.id ? null : topTool.id)}
                className="px-6 py-4 border border-green-500/30 rounded text-green-400 hover:bg-green-500/10 font-mono text-sm transition-all"
              >
                {expandedTool === topTool.id ? 'HIDE DETAILS' : 'VIEW DETAILS'}
              </button>
            </div>

            {/* Expanded Details */}
            {expandedTool === topTool.id && (
              <div className="mt-8 pt-8 border-t border-green-500/20 animate-slide-down">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-mono text-xs text-green-400 mb-4 uppercase tracking-wider">Key Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {topTool.strengths.map((strength, idx) => (
                        <span key={idx} className="px-3 py-1 bg-zinc-900 border border-green-500/30 rounded-full font-mono text-xs text-gray-300">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-green-400 mb-4 uppercase tracking-wider">Use Cases</h4>
                    <div className="flex flex-wrap gap-2">
                      {topTool.useCases.map((useCase, idx) => (
                        <span key={idx} className="px-3 py-1 bg-zinc-900 border border-blue-500/30 rounded-full font-mono text-xs text-gray-300">
                          {useCase.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alternative Recommendations */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-mono text-xl text-gray-400 uppercase tracking-wider">
              <span className="text-green-400">// </span>
              ALTERNATIVE_OPTIONS
            </h2>
            {allRecommendations.length > 5 && (
              <button
                onClick={() => setShowAllTools(!showAllTools)}
                className="font-mono text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                {showAllTools ? 'SHOW LESS' : `SHOW ALL ${allRecommendations.length} TOOLS`} →
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {topRecommendations.slice(1).map((tool, index) => (
              <div
                key={tool.id}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                className="relative group/card"
              >
                {hoveredTool === tool.id && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur-lg transition-all" />
                )}
                
                <div className={`relative bg-zinc-950/80 border rounded-xl p-6 transition-all ${
                  hoveredTool === tool.id
                    ? 'border-green-400/50 transform scale-[1.02]'
                    : 'border-green-500/20'
                }`}>
                  {/* Header */}
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
                          {Math.round((tool.score / maxScore) * 100)}% MATCH
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-500">{tool.pricing}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-mono ${
                      tool.confidenceLevel === 'high' ? 'bg-green-500/10 text-green-400 border border-green-400/30' :
                      tool.confidenceLevel === 'medium' ? 'bg-blue-500/10 text-blue-400 border border-blue-400/30' :
                      'bg-yellow-500/10 text-yellow-400 border border-yellow-400/30'
                    }`}>
                      {getConfidenceBadge(tool.confidenceLevel).icon}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Match Reasons */}
                  <div className="mb-4">
                    <div className="font-mono text-xs text-blue-400 mb-2">WHY IT FITS:</div>
                    <ul className="space-y-1">
                      {tool.matchReasons.slice(0, 2).map((reason, idx) => (
                        <li key={idx} className="text-gray-300 text-xs flex items-start">
                          <span className="text-green-400 mr-2">›</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {tool.bestFor.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="px-2 py-1 bg-zinc-900 border border-green-500/20 rounded text-xs text-gray-400">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-green-500/10 border border-green-400/30 rounded text-green-400 hover:bg-green-500/20 font-mono text-sm transition-all"
                    >
                      LEARN MORE →
                    </a>
                    <button
                      onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                      className="px-4 py-2 border border-green-500/20 rounded text-gray-400 hover:text-green-400 hover:border-green-400/50 font-mono text-xs transition-all"
                    >
                      {expandedTool === tool.id ? '−' : '+'}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedTool === tool.id && (
                    <div className="mt-4 pt-4 border-t border-green-500/20 animate-slide-down">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="font-mono text-gray-500 mb-2">CATEGORY</div>
                          <div className="text-gray-300">{tool.category}</div>
                        </div>
                        <div>
                          <div className="font-mono text-gray-500 mb-2">MATCH SCORE</div>
                          <div className="text-green-400 font-mono">{Math.round((tool.score / maxScore) * 100)}%</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-12 border-t border-green-500/20">
          <h3 className="font-mono text-lg text-white mb-4">
            WANT DIFFERENT RECOMMENDATIONS?
          </h3>
          <Link
            href="/quiz"
            className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-green-400 rounded-lg text-green-400 hover:bg-green-400/10 font-mono font-bold transition-all"
          >
            <span>←</span>
            <span>RETAKE ANALYSIS</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 font-mono text-xs text-gray-700">
          <div className="mb-2">
            <span className="text-green-400/40">// </span>
            Recommendations powered by multi-factor scoring algorithm v2.0
          </div>
          <div className="text-gray-800">
            Analyzed {allRecommendations.length} tools across {topTool.matchReasons.length} matching criteria
            <span className="text-green-400/40 cursor-blink ml-1"></span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default function Results() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black terminal-grid scanlines flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-400 rounded-full animate-spin" />
          </div>
          <div className="font-mono text-green-400 text-lg mt-6 mb-2 cursor-blink">
            PROCESSING_NEURAL_MATCH...
          </div>
          <div className="font-mono text-xs text-gray-600">
            $ analyzing your profile against 100+ tools
          </div>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
