'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const recommendation = searchParams.get('recommendation');

  const platforms = {
    chatgpt: {
      name: 'ChatGPT',
      description: 'Best for conversational AI and general purpose tasks',
      features: ['Natural conversations', 'Creative writing', 'Problem solving', 'Code assistance'],
      link: 'https://chat.openai.com'
    },
    claude: {
      name: 'Claude',
      description: 'Best for detailed analysis and long-form content',
      features: ['Document analysis', 'Research tasks', 'Technical writing', 'Thoughtful responses'],
      link: 'https://claude.ai'
    },
    midjourney: {
      name: 'Midjourney',
      description: 'Best for creative image generation',
      features: ['Artistic images', 'Design concepts', 'Visual storytelling', 'Style variety'],
      link: 'https://midjourney.com'
    },
    copilot: {
      name: 'GitHub Copilot',
      description: 'Best for software development',
      features: ['Code completion', 'Function suggestions', 'Test generation', 'Documentation'],
      link: 'https://github.com/features/copilot'
    }
  };

  const result = recommendation && platforms[recommendation as keyof typeof platforms];

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Results Found</h1>
          <Link href="/quiz" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Take the Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Perfect Match! 🎉</h1>
        <p className="text-gray-600 mb-8">Based on your answers, we recommend:</p>

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white mb-8">
          <h2 className="text-4xl font-bold mb-4">{result.name}</h2>
          <p className="text-xl mb-6">{result.description}</p>
          
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4">Key Features:</h3>
            <ul className="space-y-2">
              {result.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href={result.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition text-center"
          >
            Try {result.name} →
          </a>
          <Link
            href="/quiz"
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition text-center"
          >
            ← Retake Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
