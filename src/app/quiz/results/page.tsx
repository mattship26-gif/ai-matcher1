'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const toolData: Record<string, any> = {
  chatgpt: {
    name: 'ChatGPT',
    icon: '🤖',
    tagline: 'The Swiss Army knife of AI',
    description: 'Best all-around conversational AI for general tasks, brainstorming, and quick answers.',
    pros: [
      'Extremely versatile across many use cases',
      'Free tier available with GPT-3.5',
      'Large knowledge base and strong reasoning',
      'Easy to use, conversational interface',
      'Fast responses'
    ],
    cons: [
      'Can be verbose or off-target at times',
      'Free tier has usage limits',
      'Knowledge cutoff (not always current)',
      'Less specialized than purpose-built tools'
    ],
    bestFor: [
      'General writing and content creation',
      'Brainstorming and ideation',
      'Quick research and explanations',
      'Coding help (basic to intermediate)',
      'First-time AI users'
    ],
    pricing: 'Free (GPT-3.5) | $20/month (GPT-4)',
    url: 'https://chat.openai.com'
  },
  claude: {
    name: 'Claude',
    icon: '🧠',
    tagline: 'The thoughtful analyst',
    description: 'Anthropic\'s AI excels at nuanced reasoning, long-form content, and technical analysis.',
    pros: [
      'Exceptional at long, detailed responses',
      'Strong analytical and reasoning capabilities',
      'More nuanced and careful than most AIs',
      'Excellent for technical documentation',
      'Large context window (200K tokens)'
    ],
    cons: [
      'Can be overly cautious or verbose',
      'Slower than some alternatives',
      'Free tier is more limited',
      'Less well-known, smaller community'
    ],
    bestFor: [
      'Complex analysis and research',
      'Long-form writing projects',
      'Technical documentation',
      'Code review and architecture discussions',
      'When accuracy matters most'
    ],
    pricing: 'Free (limited) | $20/month (Pro)',
    url: 'https://claude.ai'
  },
  copilot: {
    name: 'GitHub Copilot',
    icon: '🚀',
    tagline: 'Your AI pair programmer',
    description: 'AI coding assistant that lives in your editor and suggests code as you type.',
    pros: [
      'Integrates directly into VS Code and other IDEs',
      'Real-time code suggestions as you type',
      'Learns your coding style and patterns',
      'Huge training dataset from GitHub',
      'Speeds up coding significantly'
    ],
    cons: [
      'Requires IDE setup',
      'Suggestions can be hit-or-miss',
      'Not free (though affordable)',
      'Limited to coding tasks',
      'May suggest outdated patterns'
    ],
    bestFor: [
      'Professional developers',
      'Writing boilerplate code quickly',
      'Learning new languages or frameworks',
      'Autocompleting repetitive code',
      'Anyone coding daily'
    ],
    pricing: '$10/month (Individual) | $19/month (Business)',
    url: 'https://github.com/features/copilot'
  },
  cursor: {
    name: 'Cursor',
    icon: '⚡',
    tagline: 'The AI-native code editor',
    description: 'VS Code fork with AI built into every feature for a seamless coding experience.',
    pros: [
      'Deep AI integration throughout editor',
      'Chat with your entire codebase',
      'Inline AI edits and completions',
      'Multi-file editing with AI',
      'Familiar VS Code interface'
    ],
    cons: [
      'Subscription required for full features',
      'Newer tool, still evolving',
      'Requires switching from your current editor',
      'Can be overwhelming for beginners'
    ],
    bestFor: [
      'Developers who want AI everywhere',
      'Large codebase refactoring',
      'AI-assisted architecture decisions',
      'Rapid prototyping',
      'Power users willing to invest'
    ],
    pricing: 'Free (limited) | $20/month (Pro)',
    url: 'https://cursor.sh'
  },
  midjourney: {
    name: 'Midjourney',
    icon: '🎨',
    tagline: 'Artistic AI image generation',
    description: 'Creates stunning, artistic images from text prompts via Discord.',
    pros: [
      'Best-in-class artistic quality',
      'Highly detailed and creative outputs',
      'Active community for inspiration',
      'Regular model updates',
      'Great for conceptual and stylized art'
    ],
    cons: [
      'Requires Discord (can be confusing)',
      'No free tier anymore',
      'Public by default (privacy concerns)',
      'Less precise control than some tools',
      'Learning curve for good prompts'
    ],
    bestFor: [
      'Concept art and creative projects',
      'Marketing visuals and social media',
      'Artistic exploration',
      'Presentations and mockups',
      'When aesthetics matter most'
    ],
    pricing: '$10/month (Basic) | $30/month (Standard) | $60/month (Pro)',
    url: 'https://midjourney.com'
  },
  dalle: {
    name: 'DALL-E 3',
    icon: '🖼️',
    tagline: 'Precise image generation',
    description: 'OpenAI\'s image generator integrated with ChatGPT for easy, precise creations.',
    pros: [
      'Integrated with ChatGPT',
      'Excellent text rendering in images',
      'More predictable than Midjourney',
      'Easy to use, no Discord needed',
      'Good for specific, detailed requests'
    ],
    cons: [
      'Less artistic than Midjourney',
      'Requires ChatGPT Plus subscription',
      'Slower generation times',
      'Fewer style options',
      'More content restrictions'
    ],
    bestFor: [
      'Quick image generation',
      'Images with text or logos',
      'Precise, literal interpretations',
      'Infographics and diagrams',
      'If you already have ChatGPT Plus'
    ],
    pricing: 'Included with ChatGPT Plus ($20/month)',
    url: 'https://chat.openai.com (with Plus)'
  },
  jasper: {
    name: 'Jasper',
    icon: '✍️',
    tagline: 'AI marketing copywriter',
    description: 'Purpose-built for marketing teams to create on-brand content at scale.',
    pros: [
      'Specialized for marketing copy',
      'Templates for ads, emails, social media',
      'Brand voice customization',
      'Team collaboration features',
      'SEO optimization tools'
    ],
    cons: [
      'Expensive compared to general AIs',
      'Overkill for casual users',
      'Learning curve for features',
      'Requires subscription commitment'
    ],
    bestFor: [
      'Marketing teams and agencies',
      'Content marketers',
      'Ad copy and campaign creation',
      'Social media management',
      'Brand-consistent content'
    ],
    pricing: '$39/month (Creator) | $99/month (Teams) | Custom (Business)',
    url: 'https://jasper.ai'
  },
  perplexity: {
    name: 'Perplexity',
    icon: '🔍',
    tagline: 'AI-powered search engine',
    description: 'Combines AI with real-time web search for current, cited information.',
    pros: [
      'Always has current information',
      'Cites sources for claims',
      'Cleaner interface than traditional search',
      'Good for research and fact-checking',
      'Free tier is generous'
    ],
    cons: [
      'Less conversational than ChatGPT',
      'Shorter, more concise responses',
      'Limited creative capabilities',
      'Pro features locked behind paywall'
    ],
    bestFor: [
      'Research and fact-checking',
      'Current events and news',
      'Academic research',
      'When you need citations',
      'Quick, accurate answers'
    ],
    pricing: 'Free | $20/month (Pro)',
    url: 'https://perplexity.ai'
  },
  canva: {
    name: 'Canva AI',
    icon: '🎨',
    tagline: 'Design made simple',
    description: 'Easy-to-use design platform with AI features for non-designers.',
    pros: [
      'Extremely user-friendly',
      'Huge template library',
      'AI image generation and editing',
      'Magic Resize for different formats',
      'Great for social media content'
    ],
    cons: [
      'Limited compared to Photoshop',
      'Pro features require subscription',
      'Can look template-y',
      'Less control for advanced users'
    ],
    bestFor: [
      'Social media graphics',
      'Presentations and slideshows',
      'Marketing materials',
      'Non-designers who need visuals',
      'Quick design projects'
    ],
    pricing: 'Free | $12.99/month (Pro) | $30/month (Teams)',
    url: 'https://canva.com'
  },
  notion: {
    name: 'Notion AI',
    icon: '📝',
    tagline: 'AI-powered workspace',
    description: 'AI writing assistant built into your notes and documents.',
    pros: [
      'Integrated into your workspace',
      'Helps organize and summarize notes',
      'Good for team collaboration',
      'Write, edit, and brainstorm in context',
      'Database and wiki features'
    ],
    cons: [
      'Additional cost on top of Notion',
      'Not as powerful as standalone AIs',
      'Requires learning Notion first',
      'Limited to text-based tasks'
    ],
    bestFor: [
      'Knowledge management',
      'Team documentation',
      'Meeting notes and summaries',
      'Project planning',
      'If you already use Notion'
    ],
    pricing: '$10/month (add-on to Notion plans)',
    url: 'https://notion.so'
  },
  gemini: {
    name: 'Google Gemini',
    icon: '✨',
    tagline: 'Google\'s multimodal AI',
    description: 'Google\'s latest AI integrated with Search, Gmail, and Google Workspace.',
    pros: [
      'Free access to powerful AI',
      'Integrates with Google services',
      'Good at current information',
      'Multimodal (text, images, video)',
      'Fast and responsive'
    ],
    cons: [
      'Less established than ChatGPT',
      'Privacy concerns (Google)',
      'Advanced features require Google One',
      'Can be less nuanced than Claude'
    ],
    bestFor: [
      'Google Workspace users',
      'Free AI access',
      'Research with current info',
      'Multimodal projects',
      'Integration with Gmail/Docs'
    ],
    pricing: 'Free | $19.99/month (Gemini Advanced)',
    url: 'https://gemini.google.com'
  },
  tabnine: {
    name: 'Tabnine',
    icon: '⚙️',
    tagline: 'Private AI code completion',
    description: 'Code completion focused on privacy and running on your own infrastructure.',
    pros: [
      'Privacy-focused (local model option)',
      'Works with many IDEs',
      'Team training on your codebase',
      'Good for enterprise/security',
      'Consistent, predictable suggestions'
    ],
    cons: [
      'Less powerful than Copilot/Cursor',
      'More expensive for teams',
      'Smaller community',
      'May require setup/configuration'
    ],
    bestFor: [
      'Security-conscious organizations',
      'Private codebases',
      'Enterprise development',
      'When data cannot leave premises',
      'Regulated industries'
    ],
    pricing: 'Free (basic) | $12/month (Pro) | Custom (Enterprise)',
    url: 'https://tabnine.com'
  },
  grammarly: {
    name: 'Grammarly',
    icon: '📖',
    tagline: 'AI writing assistant',
    description: 'Real-time grammar, spelling, and style suggestions as you write.',
    pros: [
      'Works everywhere you write',
      'Real-time corrections',
      'Tone and clarity suggestions',
      'Easy to use browser extension',
      'Free version is very capable'
    ],
    cons: [
      'Limited creative writing help',
      'Not conversational like ChatGPT',
      'Premium features are pricey',
      'Can be overly prescriptive'
    ],
    bestFor: [
      'Email and professional writing',
      'Editing and proofreading',
      'Non-native English speakers',
      'Business communication',
      'Improving writing quality'
    ],
    pricing: 'Free | $12/month (Premium) | $15/month (Business)',
    url: 'https://grammarly.com'
  },
  copyai: {
    name: 'Copy.ai',
    icon: '💬',
    tagline: 'Marketing copy generator',
    description: 'AI tool specialized in creating marketing and sales copy quickly.',
    pros: [
      'Fast marketing copy generation',
      'Many templates and workflows',
      'Good for brainstorming',
      'Affordable pricing',
      'Easy to use'
    ],
    cons: [
      'Quality can be inconsistent',
      'May need heavy editing',
      'Less powerful than ChatGPT',
      'Templates can feel generic'
    ],
    bestFor: [
      'Social media posts',
      'Product descriptions',
      'Email subject lines',
      'Ad copy variations',
      'Quick content ideas'
    ],
    pricing: 'Free | $49/month (Pro)',
    url: 'https://copy.ai'
  },
  firefly: {
    name: 'Adobe Firefly',
    icon: '🔥',
    tagline: 'Safe commercial AI images',
    description: 'Adobe\'s AI trained only on licensed content for commercial safety.',
    pros: [
      'Safe for commercial use',
      'Integrates with Adobe tools',
      'High quality outputs',
      'No copyright concerns',
      'Good for professional work'
    ],
    cons: [
      'Requires Adobe subscription',
      'Less creative than Midjourney',
      'Smaller feature set',
      'More expensive overall'
    ],
    bestFor: [
      'Professional designers',
      'Commercial projects',
      'Adobe Creative Cloud users',
      'When licensing matters',
      'Corporate environments'
    ],
    pricing: 'Included with Adobe Creative Cloud ($54.99/month)',
    url: 'https://firefly.adobe.com'
  }
};

function ResultsContent() {
  const searchParams = useSearchParams();
  const recommendations = searchParams.get('recommendations')?.split(',') || [];

  const topTools = recommendations
    .filter(tool => toolData[tool])
    .slice(0, 6)
    .map(tool => toolData[tool]);

  if (topTools.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No results found</h1>
          <Link href="/quiz" className="text-blue-600 hover:text-blue-700">
            Take the quiz again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Perfect AI Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Based on your answers, here are the top {topTools.length} tools we recommend for you
          </p>
          <Link 
            href="/quiz"
            className="inline-block px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
          >
            ← Retake Quiz
          </Link>
        </div>

        {/* Results */}
        <div className="space-y-8">
          {topTools.map((tool, index) => (
            <div 
              key={tool.name}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              {/* Tool Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{tool.icon}</div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-gray-900">{tool.name}</h2>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        #{index + 1} Match
                      </span>
                    </div>
                    <p className="text-lg text-gray-600 mt-1">{tool.tagline}</p>
                  </div>
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-medium"
                >
                  Try It →
                </a>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {tool.description}
              </p>

              {/* Pros and Cons Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Pros */}
                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    Why It is Great
                  </h3>
                  <ul className="space-y-2">
                    {tool.pros.map((pro: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-500 mt-1">●</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h3 className="text-lg font-semibold text-amber-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">⚠</span>
                    Keep in Mind
                  </h3>
                  <ul className="space-y-2">
                    {tool.cons.map((con: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="text-amber-500 mt-1">●</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Best For */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Best Used For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.bestFor.map((use: string, i: number) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">Pricing:</span> {tool.pricing}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Pick one of the tools above and start exploring! Most offer free trials or tiers to help you get started.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/quiz"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Retake Quiz
              </Link>
              <Link 
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-medium"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
