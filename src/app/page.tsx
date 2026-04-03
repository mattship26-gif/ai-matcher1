'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Find Your Perfect AI Tool
          </h1>
          <p className="text-lg text-gray-700">
            Answer a few questions and discover which AI tools match your workflow
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-gray-900 mb-1">Personalized</h3>
              <p className="text-sm text-gray-600">
                Matched to your actual job and workflow
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">Quick & Easy</h3>
              <p className="text-sm text-gray-600">
                Takes 2 minutes. No signup required.
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-1">Specific Results</h3>
              <p className="text-sm text-gray-600">
                See exactly why each tool fits you
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push('/quiz')}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Start the Quiz →
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm">
          No tracking. No data collection. Just helpful recommendations.
        </p>
      </div>
    </div>
  )
}
