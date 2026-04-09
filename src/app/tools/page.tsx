import { getAllTools } from '@/lib/toolsService';
import { ToolCard } from '@/components/ToolCard';
import { SearchBar } from '@/components/SearchBar';

export default function AllToolsPage() {
  const tools = getAllTools();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">All Tools</h1>
          <p className="text-xl text-slate-600 mb-6">
            Browse all {tools.length} tools in our database. Use search or filters to narrow down.
          </p>
          <SearchBar />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
