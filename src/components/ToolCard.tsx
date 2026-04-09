import React from 'react'

interface Tool {
  name: string
  category: string
  description: string
  useCases: string[]
  features: string[]
  bestFor: string[]
  pricing: string
  url: string
  skillLevel: string
}

interface ToolCardProps {
  tool: Tool
  featured?: boolean
}

export default function ToolCard({ tool, featured = false }: ToolCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow ${featured ? 'ring-2 ring-purple-500' : ''}`}>
      {featured && (
        <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-1 rounded-full mb-3">
          ⭐ Top Match
        </div>
      )}
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
      <p className="text-sm text-purple-600 mb-3">{tool.category}</p>
      <p className="text-gray-600 mb-4">{tool.description}</p>
      
      <div className="space-y-3 mb-4">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Best For</p>
          <div className="flex flex-wrap gap-1">
            {tool.bestFor.slice(0, 3).map((item, i) => (
              <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                {item}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Pricing</p>
          <p className="text-sm text-gray-700">{tool.pricing}</p>
        </div>
      </div>
      
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
      >
        Learn More →
      </a>
    </div>
  )
}
