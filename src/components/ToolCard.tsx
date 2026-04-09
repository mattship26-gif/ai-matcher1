import Link from 'next/link';
import { Tool } from '@/data/tools';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  // Calculate average rating
  const avgRating = tool.ratings.length > 0
    ? (tool.ratings.reduce((sum, r) => sum + r.score, 0) / tool.ratings.length).toFixed(1)
    : null;

  // Get pricing badge color
  const pricingColor = {
    free: 'bg-green-100 text-green-800',
    starter: 'bg-blue-100 text-blue-800',
    professional: 'bg-purple-100 text-purple-800',
    enterprise: 'bg-slate-100 text-slate-800'
  }[tool.pricingTier];

  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition cursor-pointer h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-900">{tool.name}</h3>
          {avgRating && (
            <div className="flex items-center gap-1 text-sm">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold">{avgRating}</span>
            </div>
          )}
        </div>

        {/* Category & Pricing */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
            {tool.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded ${pricingColor}`}>
            {tool.pricingTier}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Best For */}
        <div className="text-xs text-slate-500">
          Best for: {tool.bestFor.join(', ')}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className="text-blue-600 text-sm font-medium">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
