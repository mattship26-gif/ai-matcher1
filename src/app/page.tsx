'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Find Your Perfect AI Tool
            </h1>
            <p className="text-xl text-gray-300">
              Answer a few questions and discover which AI tools match your workflow
            </p>
          </div>

          {/* Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="text-4xl">🤖</span>
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    Personalized Recommendations
                  </h2>
                  <p className="text-gray-400">
                    We'll match you with AI tools based on your actual needs - not hype or marketing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-4xl">⚡</span>
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    Quick & Easy
                  </h2>
                  <p className="text-gray-400">
                    Takes less than 2 minutes. No signup, no email required.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-4xl">🎯</span>
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    Get Specific Results
                  </h2>
                  <p className="text-gray-400">
                    See exactly why each tool fits your workflow, with practical next steps.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push('/quiz')}
              className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Start the Quiz →
            </button>
          </div>

          {/* Footer note */}
          <p className="text-center text-gray-500 text-sm mt-8">
            No tracking. No data collection. Just helpful recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}
