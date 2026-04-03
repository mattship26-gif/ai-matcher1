export interface AISolution {
  id: string;
  name: string;
  description: string;
  category: string[];
  industries: string[];
  useCases: string[];
  pricing: {
    tier: 'free' | 'low' | 'mid' | 'high' | 'enterprise';
    range: string;
    model: string;
  };
  techLevel: number; // 1-5, 1 = easiest
  companySize: string[];
  integrations: string[];
  pros: string[];
  cons: string[];
  affiliateLink: string;
  bestFor: string;
}

export const aiSolutions: AISolution[] = [
  {
    id: 'quickbooks-ai',
    name: 'QuickBooks AI Assistant',
    description: 'AI-powered bookkeeping and financial management with automated categorization and insights',
    category: ['Accounting', 'Finance'],
    industries: ['accounting', 'retail', 'services', 'consulting'],
    useCases: ['bookkeeping', 'invoicing', 'expense-tracking', 'financial-reporting'],
    pricing: {
      tier: 'mid',
      range: '$30-200/month',
      model: 'Subscription per user'
    },
    techLevel: 2,
    companySize: ['solo', 'small', 'medium'],
    integrations: ['PayPal', 'Stripe', 'Bank feeds', 'Excel'],
    pros: [
      'Industry standard with AI enhancements',
      'Automated transaction categorization',
      'Easy bank reconciliation',
      'Mobile app included'
    ],
    cons: [
      'Can be complex for total beginners',
      'Additional fees for payroll',
      'Learning curve for advanced features'
    ],
    affiliateLink: '#',
    bestFor: 'Small businesses needing comprehensive accounting with AI automation'
  },
  {
    id: 'dext',
    name: 'Dext (formerly Receipt Bank)',
    description: 'AI document processing for receipts, invoices, and financial documents',
    category: ['Accounting', 'Document Processing'],
    industries: ['accounting', 'consulting', 'services'],
    useCases: ['document-processing', 'expense-tracking', 'bookkeeping'],
    pricing: {
      tier: 'mid',
      range: '$10-50/month',
      model: 'Per user subscription'
    },
    techLevel: 1,
    companySize: ['solo', 'small', 'medium'],
    integrations: ['QuickBooks', 'Xero', 'Sage', 'Google Drive'],
    pros: [
      'Incredibly accurate OCR',
      'Mobile receipt capture',
      'Automatic data extraction',
      'Integrates with major accounting software'
    ],
    cons: [
      'Requires accounting software integration',
      'Limited standalone functionality',
      'Per-document costs can add up'
    ],
    affiliateLink: '#',
    bestFor: 'Businesses drowning in paper receipts and invoices'
  },
  {
    id: 'xero',
    name: 'Xero AI',
    description: 'Cloud accounting platform with AI-powered bank reconciliation and cash flow forecasting',
    category: ['Accounting', 'Finance'],
    industries: ['accounting', 'retail', 'services', 'consulting'],
    useCases: ['bookkeeping', 'invoicing', 'financial-reporting', 'inventory'],
    pricing: {
      tier: 'mid',
      range: '$13-70/month',
      model: 'Tiered subscription'
    },
    techLevel: 2,
    companySize: ['solo', 'small', 'medium'],
    integrations: ['Stripe', 'PayPal', 'Shopify', '1000+ apps'],
    pros: [
      'Beautiful, intuitive interface',
      'Strong app marketplace',
      'Excellent mobile experience',
      'Smart bank reconciliation'
    ],
    cons: [
      'Payroll costs extra',
      'Limited US-specific features vs QuickBooks',
      'Can get pricey with add-ons'
    ],
    affiliateLink: '#',
    bestFor: 'Modern businesses wanting cloud-first accounting'
  },
  {
    id: 'docsumo',
    name: 'Docsumo',
    description: 'AI-powered document data extraction for invoices, receipts, and forms',
    category: ['Document Processing', 'Automation'],
    industries: ['accounting', 'legal', 'healthcare', 'finance'],
    useCases: ['document-processing', 'data-entry', 'invoice-processing'],
    pricing: {
      tier: 'mid',
      range: '$500-2000/month',
      model: 'Based on document volume'
    },
    techLevel: 3,
    companySize: ['small', 'medium', 'large'],
    integrations: ['API', 'QuickBooks', 'Zapier', 'Custom integrations'],
    pros: [
      'High accuracy extraction',
      'Custom document types',
      'API for developers',
      'Bulk processing'
    ],
    cons: [
      'Requires technical setup',
      'Pricey for small volumes',
      'Overkill for simple needs'
    ],
    affiliateLink: '#',
    bestFor: 'Medium-sized firms processing hundreds of documents monthly'
  },
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    description: 'General-purpose AI assistant for writing, analysis, coding, and problem-solving',
    category: ['General AI', 'Content Creation'],
    industries: ['all'],
    useCases: ['content-creation', 'customer-service', 'research', 'data-analysis'],
    pricing: {
      tier: 'low',
      range: '$20/month',
      model: 'Per user subscription'
    },
    techLevel: 1,
    companySize: ['solo', 'small', 'medium', 'large'],
    integrations: ['Browser plugins', 'API available'],
    pros: [
      'Incredibly versatile',
      'Low cost',
      'Easy to start using',
      'Constantly improving'
    ],
    cons: [
      'Generic, not industry-specific',
      'Requires prompting skills',
      'No native integrations',
      'Can make mistakes'
    ],
    affiliateLink: '#',
    bestFor: 'Anyone needing a flexible AI assistant for various tasks'
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    description: 'AI content creation platform for marketing copy, blog posts, and social media',
    category: ['Content Creation', 'Marketing'],
    industries: ['marketing', 'consulting', 'services'],
    useCases: ['content-creation', 'marketing', 'social-media'],
    pricing: {
      tier: 'mid',
      range: '$49-125/month',
      model: 'Per user subscription'
    },
    techLevel: 1,
    companySize: ['solo', 'small', 'medium'],
    integrations: ['Chrome extension', 'Surfer SEO', 'Grammarly'],
    pros: [
      'Built specifically for marketing',
      'Templates for common content types',
      'Brand voice training',
      'SEO optimization features'
    ],
    cons: [
      'Expensive for solo users',
      'Still needs human editing',
      'Learning curve for best results'
    ],
    affiliateLink: '#',
    bestFor: 'Marketing teams needing consistent content output'
  },
  {
    id: 'intercom-fin',
    name: 'Intercom Fin',
    description: 'AI customer service chatbot that resolves support tickets automatically',
    category: ['Customer Service', 'Automation'],
    industries: ['services', 'retail', 'saas'],
    useCases: ['customer-service', 'support-automation'],
    pricing: {
      tier: 'mid',
      range: '$74+/month',
      model: 'Base + per resolution'
    },
    techLevel: 2,
    companySize: ['small', 'medium', 'large'],
    integrations: ['Help Center', 'Slack', 'Salesforce', 'API'],
    pros: [
      'Resolves ~50% of queries automatically',
      'Learns from your help docs',
      'Smooth handoff to humans',
      'Works across channels'
    ],
    cons: [
      'Requires good documentation',
      'Additional costs per resolution',
      'Overkill for tiny businesses'
    ],
    affiliateLink: '#',
    bestFor: 'Growing businesses with repetitive customer questions'
  },
  {
    id: 'calendly-ai',
    name: 'Calendly',
    description: 'AI-powered scheduling that automatically finds meeting times and reduces back-and-forth',
    category: ['Scheduling', 'Productivity'],
    industries: ['all'],
    useCases: ['scheduling', 'meeting-coordination'],
    pricing: {
      tier: 'low',
      range: '$10-16/month',
      model: 'Per user subscription'
    },
    techLevel: 1,
    companySize: ['solo', 'small', 'medium', 'large'],
    integrations: ['Google Calendar', 'Outlook', 'Zoom', 'Salesforce'],
    pros: [
      'Dead simple to use',
      'Eliminates scheduling emails',
      'Smart timezone detection',
      'Great free tier'
    ],
    cons: [
      'Limited customization on free plan',
      'Some clients prefer personal touch',
      'Advanced features cost more'
    ],
    affiliateLink: '#',
    bestFor: 'Anyone who schedules client meetings regularly'
  },
  {
    id: 'otter-ai',
    name: 'Otter.ai',
    description: 'AI meeting transcription and note-taking that captures conversations in real-time',
    category: ['Productivity', 'Meeting Tools'],
    industries: ['all'],
    useCases: ['meeting-notes', 'transcription', 'documentation'],
    pricing: {
      tier: 'low',
      range: '$0-30/month',
      model: 'Tiered subscription'
    },
    techLevel: 1,
    companySize: ['solo', 'small', 'medium', 'large'],
    integrations: ['Zoom', 'Google Meet', 'Microsoft Teams', 'Dropbox'],
    pros: [
      'Incredibly accurate transcription',
      'Generous free tier',
      'Real-time collaboration',
      'Speaker identification'
    ],
    cons: [
      'Monthly minute limits',
      'Can struggle with accents',
      'Requires clear audio'
    ],
    affiliateLink: '#',
    bestFor: 'Teams wanting to capture meeting insights without manual note-taking'
  },
  {
    id: 'zapier',
    name: 'Zapier AI',
    description: 'Workflow automation platform that connects apps and automates repetitive tasks',
    category: ['Automation', 'Integration'],
    industries: ['all'],
    useCases: ['workflow-automation', 'data-entry', 'integration'],
    pricing: {
      tier: 'mid',
      range: '$20-600/month',
      model: 'Based on tasks/month'
    },
    techLevel: 2,
    companySize: ['solo', 'small', 'medium', 'large'],
    integrations: ['6000+ apps'],
    pros: [
      'Connects virtually any app',
      'No coding required',
      'Huge template library',
      'AI-powered automation suggestions'
    ],
    cons: [
      'Can get expensive with heavy use',
      'Troubleshooting can be tricky',
      'Complex workflows need planning'
    ],
    affiliateLink: '#',
    bestFor: 'Businesses with repetitive tasks across multiple tools'
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI-enhanced workspace for notes, docs, wikis, and project management',
    category: ['Productivity', 'Knowledge Management'],
    industries: ['all'],
    useCases: ['documentation', 'project-management', 'content-creation'],
    pricing: {
      tier: 'low',
      range: '$10-15/user/month',
      model: 'Per user subscription'
    },
    techLevel: 1,
    companySize: ['solo', 'small', 'medium', 'large'],
    integrations: ['Slack', 'Google Drive', 'GitHub', 'Figma'],
    pros: [
      'All-in-one workspace',
      'Beautiful and flexible',
      'AI writing assistance built-in',
      'Great for remote teams'
    ],
    cons: [
      'Learning curve for advanced features',
      'Can become messy without structure',
      'AI features cost extra'
    ],
    affiliateLink: '#',
    bestFor: 'Teams wanting a central knowledge base with AI assistance'
  },
  {
    id: 'grammarly-business',
    name: 'Grammarly Business',
    description: 'AI writing assistant that improves grammar, tone, and clarity across all communications',
    category: ['Writing', 'Communication'],
    industries: ['all'],
    useCases: ['content-creation', 'email-writing', 'documentation'],
    pricing: {
      tier: 'mid',
      range: '$15-30/user/month',
      model: 'Per user subscription'
    },
    techLevel: 1,
    companySize: ['solo', 'small', 'medium', 'large'],
    integrations: ['Email', 'Google Docs', 'Slack', 'Microsoft Office'],
    pros: [
      'Works everywhere you write',
      'Real-time suggestions',
      'Brand voice consistency',
      'Plagiarism detection'
    ],
    cons: [
      'Can be overly prescriptive',
      'Doesn't understand all context',
      'Subscription per user adds up'
    ],
    affiliateLink: '#',
    bestFor: 'Teams that need polished, professional writing across all communications'
  },
  {
    id: 'hubspot-ai',
    name: 'HubSpot AI Tools',
    description: 'CRM with AI-powered sales automation, content generation, and customer insights',
    category: ['CRM', 'Sales', 'Marketing'],
    industries: ['all'],
    useCases: ['customer-management', 'sales-automation', 'marketing', 'email-campaigns'],
    pricing: {
      tier: 'mid',
      range: '$50-3200/month',
      model: 'Tiered based on features'
    },
    techLevel: 2,
    companySize: ['small', 'medium', 'large'],
    integrations: ['Gmail', 'Outlook', 'Salesforce', 'Shopify', '1000+ apps'],
    pros: [
      'Comprehensive CRM platform',
      'Strong free tier to start',
      'AI content assistant included',
      'Excellent learning resources'
    ],
    cons: [
      'Gets expensive quickly',
      'Feature overload for simple needs',
      'Lock-in with ecosystem'
    ],
    affiliateLink: '#',
    bestFor: 'Growing businesses needing integrated CRM and marketing automation'
  },
  {
    id: 'fireflies',
    name: 'Fireflies.ai',
    description: 'AI meeting assistant that records, transcribes, and analyzes conversations',
    category: ['Meeting Tools', 'Productivity'],
    industries: ['all'],
    useCases: ['meeting-notes', 'transcription', 'team-collaboration'],
    pricing: {
      tier: 'low',
      range: '$0-29/user/month',
      model: 'Tiered subscription'
    },
    techLevel: 1,
    companySize: ['solo', 'small', 'medium', 'large'],
    integrations: ['Zoom', 'Google Meet', 'Teams', 'Slack', 'CRMs'],
    pros: [
      'Automatic meeting summaries',
      'Search across all meetings',
      'Action item extraction',
      'Great free plan'
    ],
    cons: [
      'Privacy concerns for some clients',
      'Can miss nuance in discussions',
      'Requires meeting participants consent'
    ],
    affiliateLink: '#',
    bestFor: 'Sales and client service teams needing meeting documentation'
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'AI copywriting tool for marketing content, emails, and social media posts',
    category: ['Content Creation', 'Marketing'],
    industries: ['marketing', 'consulting', 'services'],
    useCases: ['content-creation', 'marketing', 'social-media', 'email-campaigns'],
    pricing: {
      tier: 'low',
      range: '$49-249/month',
      model: 'Tiered subscription'
    },
    techLevel: 1,
    companySize: ['solo', 'small', 'medium'],
    integrations: ['Chrome extension', 'Zapier'],
    pros: [
      'Easy to use',
      '90+ content templates',
      'Multiple language support',
      'Fast content generation'
    ],
    cons: [
      'Generic output without editing',
      'Limited customization',
      'Requires human review'
    ],
    affiliateLink: '#',
    bestFor: 'Small marketing teams needing quick content ideation'
  },
  {
    id: 'zendesk-ai',
    name: 'Zendesk AI',
    description: 'Customer service platform with AI-powered ticket routing and response suggestions',
    category: ['Customer Service'],
    industries: ['retail', 'services', 'saas'],
    useCases: ['customer-service', 'support-automation', 'ticket-management'],
    pricing: {
      tier: 'mid',
      range: '$55-115/agent/month',
      model: 'Per agent subscription'
    },
    techLevel: 3,
    companySize: ['medium', 'large'],
    integrations: ['Slack', 'Salesforce', 'Jira', '1000+ apps'],
    pros: [
      'Enterprise-grade support platform',
      'Smart ticket routing',
      'AI suggests responses',
      'Comprehensive analytics'
    ],
    cons: [
      'Expensive for small teams',
      'Requires setup time',
      'Can be overwhelming'
    ],
    affiliateLink: '#',
    bestFor: 'Established businesses with dedicated support teams'
  },
  {
    id: 'microsoft-copilot',
    name: 'Microsoft 365 Copilot',
    description: 'AI assistant integrated across Word, Excel, PowerPoint, Outlook, and Teams',
    category: ['Productivity', 'Office Suite'],
    industries: ['all'],
    useCases: ['content-creation', 'data-analysis', 'email-writing', 'presentation'],
    pricing: {
      tier: 'mid',
      range: '$30/user/month',
      model: 'Add-on to Microsoft 365'
    },
    techLevel: 2,
    companySize: ['small', 'medium', 'large'],
    integrations: ['Native to Microsoft 365 apps'],
    pros: [
      'Works in tools you already use',
      'No new tool to learn',
      'Enterprise security',
      'Deep Office integration'
    ],
    cons: [
      'Requires Microsoft 365 subscription',
      'Limited to Microsoft ecosystem',
      'Still rolling out features'
    ],
    affiliateLink: '#',
    bestFor: 'Businesses already using Microsoft 365 who want AI everywhere'
  },
  {
    id: 'bardeen',
    name: 'Bardeen AI',
    description: 'Browser-based automation that uses AI to handle repetitive web tasks',
    category: ['Automation', 'Productivity'],
    industries: ['all'],
    useCases: ['workflow-automation', 'data-entry', 'web-scraping'],
    pricing: {
      tier: 'low',
      range: '$10-25/month',
      model: 'Tiered subscription'
    },
    techLevel: 2,
    companySize: ['solo', 'small', 'medium'],
    integrations: ['Browser-based', 'Notion', 'Google Sheets', 'Slack'],
    pros: [
      'No-code automation',
      'Works across web apps',
      'AI builds automations for you',
      'Generous free tier'
    ],
    cons: [
      'Browser-only (no server automation)',
      'Learning curve for complex workflows',
      'Limited compared to Zapier'
    ],
    affiliateLink: '#',
    bestFor: 'Solo entrepreneurs automating repetitive browser tasks'
  },
  {
    id: 'claude-pro',
    name: 'Claude Pro',
    description: 'Advanced AI assistant with longer conversations, file uploads, and priority access',
    category: ['General AI'],
    industries: ['all'],
    useCases: ['content-creation', 'data-analysis', 'research', 'coding'],
    pricing: {
      tier: 'low',
      range: '$20/month',
      model: 'Per user subscription'
    },
    techLevel: 1,
    companySize: ['solo', 'small', 'medium', 'large'],
    integrations: ['API available for developers'],
    pros: [
      'Excellent for analysis and reasoning',
      'Can process documents and images',
      'More nuanced than ChatGPT',
      'Great for research tasks'
    ],
    cons: [
      'Less well-known than ChatGPT',
      'No plugin ecosystem',
      'Occasional usage limits'
    ],
    affiliateLink: '#',
    bestFor: 'Professionals needing thoughtful AI analysis and document review'
  },
  {
    id: 'persado',
    name: 'Persado',
    description: 'AI-powered marketing language optimization for campaigns and messaging',
    category: ['Marketing', 'Content Creation'],
    industries: ['marketing', 'retail', 'finance'],
    useCases: ['marketing', 'email-campaigns', 'content-optimization'],
    pricing: {
      tier: 'enterprise',
      range: 'Custom pricing',
      model: 'Enterprise contract'
    },
    techLevel: 4,
    companySize: ['large'],
    integrations: ['Marketing platforms', 'Email systems', 'API'],
    pros: [
      'Data-driven language optimization',
      'Proven ROI improvement',
      'A/B testing built-in',
      'Emotional targeting'
    ],
    cons: [
      'Enterprise-only pricing',
      'Requires significant data',
      'Long implementation time',
      'Overkill for small businesses'
    ],
    affiliateLink: '#',
    bestFor: 'Large marketing teams with substantial budgets and data'
  }
];
