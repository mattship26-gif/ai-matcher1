export type Answer = {
  value: string
  label: string
}

export type Question = {
  id: string
  question: string
  answers: Answer[]
  conditional?: boolean
  showIf?: (answers: Record<string, string>) => boolean
}

// ==================== ROLE-SPECIFIC QUESTION SETS ====================

// ACCOUNTING/AUDITING QUESTIONS
const accountingQuestions: Question[] = [
  {
    id: 'accounting_primary_task',
    question: 'WHAT CONSUMES MOST OF YOUR TIME?',
    answers: [
      { value: 'reconciliations', label: '⚖️ Account reconciliations' },
      { value: 'financial_statements', label: '📊 Financial statement preparation' },
      { value: 'journal_entries', label: '📝 Journal entries and adjustments' },
      { value: 'audit_prep', label: '🔍 Audit preparation and support' },
      { value: 'variance_analysis', label: '📈 Variance analysis and reporting' },
      { value: 'compliance', label: '✅ Compliance and regulatory reporting' }
    ]
  },
  {
    id: 'accounting_pain_point',
    question: 'BIGGEST TIME DRAIN?',
    answers: [
      { value: 'manual_reconciliation', label: '🔄 Manual reconciliation processes' },
      { value: 'excel_complex', label: '📊 Complex Excel formulas and modeling' },
      { value: 'finding_documentation', label: '📁 Finding supporting documentation' },
      { value: 'period_close', label: '⏰ Period close bottlenecks' },
      { value: 'audit_requests', label: '📋 Responding to audit requests' },
      { value: 'report_formatting', label: '📄 Report formatting and presentation' }
    ]
  },
  {
    id: 'accounting_excel_level',
    question: 'EXCEL PROFICIENCY?',
    answers: [
      { value: 'basic', label: '📝 Basic (formulas, sorting, filtering)' },
      { value: 'intermediate', label: '📊 Intermediate (VLOOKUP, pivot tables)' },
      { value: 'advanced', label: '🚀 Advanced (INDEX-MATCH, complex models)' },
      { value: 'expert', label: '💎 Expert (VBA, Power Query, automation)' }
    ]
  }
]

// SOFTWARE DEVELOPER QUESTIONS
const developerQuestions: Question[] = [
  {
    id: 'dev_primary_language',
    question: 'PRIMARY PROGRAMMING LANGUAGE?',
    answers: [
      { value: 'javascript', label: '🟨 JavaScript/TypeScript' },
      { value: 'python', label: '🐍 Python' },
      { value: 'java', label: '☕ Java' },
      { value: 'csharp', label: '🔷 C#/.NET' },
      { value: 'go', label: '🔵 Go' },
      { value: 'rust', label: '🦀 Rust' },
      { value: 'multiple', label: '🌐 Multiple/Polyglot' }
    ]
  },
  {
    id: 'dev_primary_task',
    question: 'WHAT DO YOU BUILD MOST?',
    answers: [
      { value: 'frontend', label: '🎨 Frontend/UI applications' },
      { value: 'backend', label: '⚙️ Backend APIs and services' },
      { value: 'fullstack', label: '🔄 Full-stack applications' },
      { value: 'data_pipelines', label: '📊 Data pipelines and analytics' },
      { value: 'ml_ai', label: '🤖 ML/AI models and systems' },
      { value: 'mobile', label: '📱 Mobile applications' },
      { value: 'devops', label: '🔧 DevOps and infrastructure' }
    ]
  },
  {
    id: 'dev_pain_point',
    question: 'BIGGEST CODING BOTTLENECK?',
    answers: [
      { value: 'boilerplate', label: '🔄 Writing repetitive boilerplate code' },
      { value: 'debugging', label: '🐛 Debugging complex issues' },
      { value: 'documentation', label: '📚 Writing and maintaining documentation' },
      { value: 'learning_new', label: '📖 Learning new frameworks/languages' },
      { value: 'refactoring', label: '♻️ Refactoring legacy code' },
      { value: 'tests', label: '✅ Writing comprehensive tests' }
    ]
  },
  {
    id: 'dev_ai_experience',
    question: 'AI CODING TOOL EXPERIENCE?',
    answers: [
      { value: 'none', label: '🆕 Never used AI for coding' },
      { value: 'tried', label: '👀 Tried ChatGPT for code help' },
      { value: 'occasional', label: '📝 Occasionally use Copilot/similar' },
      { value: 'daily', label: '⚡ Daily AI coding assistant user' }
    ]
  }
]

// LEGAL PROFESSIONAL QUESTIONS
const legalQuestions: Question[] = [
  {
    id: 'legal_primary_task',
    question: 'PRIMARY LEGAL WORK?',
    answers: [
      { value: 'research', label: '🔍 Legal research and case law' },
      { value: 'contract_drafting', label: '📝 Contract drafting and review' },
      { value: 'litigation', label: '⚖️ Litigation and court documents' },
      { value: 'compliance', label: '✅ Compliance and regulatory work' },
      { value: 'due_diligence', label: '📋 Due diligence and transactions' },
      { value: 'memo_writing', label: '📄 Legal memo and opinion writing' }
    ]
  },
  {
    id: 'legal_pain_point',
    question: 'BIGGEST TIME SINK?',
    answers: [
      { value: 'legal_research', label: '📚 Sifting through case law and statutes' },
      { value: 'document_review', label: '📑 Reviewing lengthy documents' },
      { value: 'contract_comparison', label: '🔄 Comparing contract versions' },
      { value: 'cite_checking', label: '✅ Citation checking and formatting' },
      { value: 'client_updates', label: '💼 Writing client updates' },
      { value: 'precedent_finding', label: '🔎 Finding relevant precedents' }
    ]
  },
  {
    id: 'legal_doc_volume',
    question: 'DOCUMENT VOLUME?',
    answers: [
      { value: 'low', label: '📄 Few documents (1-5/week)' },
      { value: 'medium', label: '📚 Moderate (5-20/week)' },
      { value: 'high', label: '📦 High (20-50/week)' },
      { value: 'very_high', label: '🏢 Very high (50+/week)' }
    ]
  }
]

// MARKETING/CONTENT CREATOR QUESTIONS
const marketingQuestions: Question[] = [
  {
    id: 'marketing_primary_content',
    question: 'PRIMARY CONTENT TYPE?',
    answers: [
      { value: 'blog_articles', label: '✍️ Blog posts and articles' },
      { value: 'social_media', label: '📱 Social media content' },
      { value: 'email', label: '📧 Email campaigns' },
      { value: 'video', label: '🎥 Video scripts and content' },
      { value: 'ads', label: '🎯 Ad copy and campaigns' },
      { value: 'visual', label: '🎨 Visual design and graphics' }
    ]
  },
  {
    id: 'marketing_pain_point',
    question: 'BIGGEST CREATIVE CHALLENGE?',
    answers: [
      { value: 'ideas', label: '💡 Coming up with fresh ideas' },
      { value: 'writing_speed', label: '⚡ Writing content fast enough' },
      { value: 'consistency', label: '🎯 Maintaining brand voice consistency' },
      { value: 'visuals', label: '🎨 Creating engaging visuals' },
      { value: 'optimization', label: '📊 Optimizing for performance' },
      { value: 'personalization', label: '👤 Personalizing at scale' }
    ]
  },
  {
    id: 'marketing_volume',
    question: 'CONTENT VOLUME NEEDED?',
    answers: [
      { value: 'low', label: '📝 Few pieces/week' },
      { value: 'medium', label: '📚 Several pieces/day' },
      { value: 'high', label: '🚀 Multiple pieces/day' },
      { value: 'very_high', label: '⚡ Dozens of pieces/day' }
    ]
  }
]

// FINANCIAL ANALYST QUESTIONS
const financialAnalystQuestions: Question[] = [
  {
    id: 'analyst_primary_task',
    question: 'PRIMARY ANALYSIS TYPE?',
    answers: [
      { value: 'financial_modeling', label: '📊 Financial modeling and forecasting' },
      { value: 'data_analysis', label: '📈 Data analysis and insights' },
      { value: 'reporting', label: '📋 Financial reporting and presentations' },
      { value: 'valuation', label: '💰 Valuation and investment analysis' },
      { value: 'budgeting', label: '💵 Budgeting and planning' },
      { value: 'performance', label: '📉 Performance analysis and KPIs' }
    ]
  },
  {
    id: 'analyst_pain_point',
    question: 'BIGGEST BOTTLENECK?',
    answers: [
      { value: 'data_cleaning', label: '🧹 Cleaning and organizing data' },
      { value: 'complex_models', label: '🔢 Building complex Excel models' },
      { value: 'visualization', label: '📊 Creating clear visualizations' },
      { value: 'report_writing', label: '📝 Writing analysis narratives' },
      { value: 'data_gathering', label: '🔍 Gathering data from multiple sources' },
      { value: 'automation', label: '⚙️ Automating repetitive analysis' }
    ]
  },
  {
    id: 'analyst_data_size',
    question: 'TYPICAL DATASET SIZE?',
    answers: [
      { value: 'small', label: '📄 Small (Excel-friendly)' },
      { value: 'medium', label: '📊 Medium (thousands of rows)' },
      { value: 'large', label: '📈 Large (hundreds of thousands)' },
      { value: 'very_large', label: '💾 Very large (millions+)' }
    ]
  }
]

// SALES PROFESSIONAL QUESTIONS
const salesQuestions: Question[] = [
  {
    id: 'sales_primary_task',
    question: 'PRIMARY SALES ACTIVITY?',
    answers: [
      { value: 'prospecting', label: '🎯 Prospecting and lead generation' },
      { value: 'outbound', label: '📧 Outbound emails and sequences' },
      { value: 'calls', label: '☎️ Sales calls and demos' },
      { value: 'proposals', label: '📄 Proposals and presentations' },
      { value: 'negotiation', label: '🤝 Negotiation and closing' },
      { value: 'account_management', label: '👥 Account management and upsells' }
    ]
  },
  {
    id: 'sales_pain_point',
    question: 'BIGGEST TIME DRAIN?',
    answers: [
      { value: 'email_writing', label: '✉️ Writing personalized emails' },
      { value: 'research', label: '🔍 Researching prospects and accounts' },
      { value: 'crm_admin', label: '📊 CRM admin and data entry' },
      { value: 'proposal_creation', label: '📝 Creating custom proposals' },
      { value: 'follow_ups', label: '🔄 Managing follow-ups' },
      { value: 'meeting_prep', label: '📋 Preparing for meetings' }
    ]
  },
  {
    id: 'sales_cycle',
    question: 'TYPICAL SALES CYCLE?',
    answers: [
      { value: 'short', label: '⚡ Short (days to weeks)' },
      { value: 'medium', label: '📅 Medium (1-3 months)' },
      { value: 'long', label: '📆 Long (3-6 months)' },
      { value: 'very_long', label: '⏰ Very long (6+ months)' }
    ]
  }
]

// HR/RECRUITING QUESTIONS
const hrQuestions: Question[] = [
  {
    id: 'hr_primary_task',
    question: 'PRIMARY HR FUNCTION?',
    answers: [
      { value: 'recruiting', label: '🎯 Recruiting and talent acquisition' },
      { value: 'screening', label: '📋 Resume screening and candidate evaluation' },
      { value: 'onboarding', label: '👋 Onboarding and training' },
      { value: 'performance', label: '📊 Performance management' },
      { value: 'employee_relations', label: '🤝 Employee relations and engagement' },
      { value: 'compensation', label: '💰 Compensation and benefits' }
    ]
  },
  {
    id: 'hr_pain_point',
    question: 'BIGGEST CHALLENGE?',
    answers: [
      { value: 'resume_volume', label: '📚 High volume of resumes to review' },
      { value: 'job_descriptions', label: '📝 Writing compelling job descriptions' },
      { value: 'candidate_sourcing', label: '🔍 Finding qualified candidates' },
      { value: 'scheduling', label: '📅 Interview scheduling coordination' },
      { value: 'communication', label: '💬 Candidate communication at scale' },
      { value: 'documentation', label: '📄 HR documentation and policies' }
    ]
  },
  {
    id: 'hr_hiring_volume',
    question: 'HIRING VOLUME?',
    answers: [
      { value: 'low', label: '📝 Low (1-5 hires/month)' },
      { value: 'medium', label: '📊 Medium (5-20 hires/month)' },
      { value: 'high', label: '📈 High (20-50 hires/month)' },
      { value: 'very_high', label: '🚀 Very high (50+ hires/month)' }
    ]
  }
]

// DATA SCIENCE/ANALYTICS QUESTIONS
const dataScienceQuestions: Question[] = [
  {
    id: 'ds_primary_task',
    question: 'PRIMARY WORK FOCUS?',
    answers: [
      { value: 'ml_modeling', label: '🤖 Machine learning model development' },
      { value: 'data_analysis', label: '📊 Exploratory data analysis' },
      { value: 'data_engineering', label: '⚙️ Data pipelines and engineering' },
      { value: 'visualization', label: '📈 Data visualization and dashboards' },
      { value: 'statistics', label: '📉 Statistical analysis and testing' },
      { value: 'productionizing', label: '🚀 Deploying models to production' }
    ]
  },
  {
    id: 'ds_pain_point',
    question: 'BIGGEST BOTTLENECK?',
    answers: [
      { value: 'data_cleaning', label: '🧹 Data cleaning and preprocessing' },
      { value: 'feature_engineering', label: '🔧 Feature engineering' },
      { value: 'model_tuning', label: '⚙️ Model selection and tuning' },
      { value: 'code_documentation', label: '📚 Code documentation' },
      { value: 'stakeholder_comms', label: '💬 Explaining results to stakeholders' },
      { value: 'deployment', label: '🚀 Model deployment challenges' }
    ]
  },
  {
    id: 'ds_tool_preference',
    question: 'PRIMARY TOOLS?',
    answers: [
      { value: 'python_focused', label: '🐍 Python-focused (pandas, sklearn)' },
      { value: 'r_focused', label: '📊 R-focused (tidyverse, ggplot)' },
      { value: 'sql_heavy', label: '🗄️ SQL-heavy workflows' },
      { value: 'cloud_platforms', label: '☁️ Cloud platforms (AWS, Azure, GCP)' },
      { value: 'notebooks', label: '📓 Jupyter/notebook-heavy' },
      { value: 'mixed', label: '🌐 Mixed toolset' }
    ]
  }
]

// PROJECT MANAGER QUESTIONS
const projectManagerQuestions: Question[] = [
  {
    id: 'pm_primary_task',
    question: 'PRIMARY PM ACTIVITY?',
    answers: [
      { value: 'planning', label: '📋 Project planning and scoping' },
      { value: 'coordination', label: '🤝 Team coordination and communication' },
      { value: 'tracking', label: '📊 Progress tracking and reporting' },
      { value: 'stakeholder', label: '💼 Stakeholder management' },
      { value: 'risk', label: '⚠️ Risk management and mitigation' },
      { value: 'documentation', label: '📄 Documentation and process' }
    ]
  },
  {
    id: 'pm_pain_point',
    question: 'BIGGEST CHALLENGE?',
    answers: [
      { value: 'status_updates', label: '📊 Gathering and creating status updates' },
      { value: 'meeting_notes', label: '📝 Meeting notes and action items' },
      { value: 'documentation', label: '📚 Keeping documentation current' },
      { value: 'communication', label: '💬 Cross-team communication' },
      { value: 'timeline_management', label: '⏰ Managing competing timelines' },
      { value: 'reporting', label: '📈 Executive reporting' }
    ]
  },
  {
    id: 'pm_team_size',
    question: 'TYPICAL TEAM SIZE?',
    answers: [
      { value: 'small', label: '👥 Small (2-5 people)' },
      { value: 'medium', label: '👨‍👩‍👧‍👦 Medium (6-15 people)' },
      { value: 'large', label: '🏢 Large (16-30 people)' },
      { value: 'very_large', label: '🏛️ Very large (30+ people)' }
    ]
  }
]

// CONSULTANT QUESTIONS
const consultantQuestions: Question[] = [
  {
    id: 'consultant_primary_task',
    question: 'PRIMARY CONSULTING WORK?',
    answers: [
      { value: 'strategy', label: '🎯 Strategy development' },
      { value: 'analysis', label: '📊 Data analysis and insights' },
      { value: 'presentations', label: '📽️ Presentation and deck creation' },
      { value: 'client_mgmt', label: '🤝 Client management and communication' },
      { value: 'implementation', label: '⚙️ Implementation and change management' },
      { value: 'research', label: '🔍 Market and competitive research' }
    ]
  },
  {
    id: 'consultant_pain_point',
    question: 'BIGGEST TIME SINK?',
    answers: [
      { value: 'slide_creation', label: '📊 Creating polished presentations' },
      { value: 'data_gathering', label: '🔍 Gathering and synthesizing data' },
      { value: 'client_prep', label: '📋 Preparing for client meetings' },
      { value: 'formatting', label: '✨ Formatting and beautifying deliverables' },
      { value: 'research', label: '📚 Background research' },
      { value: 'synthesis', label: '🧠 Synthesizing complex information' }
    ]
  },
  {
    id: 'consultant_deck_volume',
    question: 'PRESENTATION VOLUME?',
    answers: [
      { value: 'occasional', label: '📄 Occasional (1-2/month)' },
      { value: 'regular', label: '📊 Regular (1-2/week)' },
      { value: 'frequent', label: '📈 Frequent (3-5/week)' },
      { value: 'constant', label: '🚀 Constant (daily)' }
    ]
  }
]

// ==================== QUESTION FLOW MAPPER ====================

export function getRoleSpecificQuestions(
  industry: string,
  role: string
): Question[] {
  const roleQuestionMap: Record<string, Question[]> = {
    // Financial Services
    accounting: accountingQuestions,
    financial_analysis: financialAnalystQuestions,
    tax: accountingQuestions, // Similar to accounting
    risk: financialAnalystQuestions, // Similar to analysis
    
    // Technology
    software_dev: developerQuestions,
    data_science: dataScienceQuestions,
    product: projectManagerQuestions, // Product managers similar to PMs
    
    // Legal
    attorney: legalQuestions,
    paralegal: legalQuestions,
    compliance: legalQuestions,
    contracts: legalQuestions,
    legal_research: legalQuestions,
    
    // Marketing
    content: marketingQuestions,
    social: marketingQuestions,
    design: marketingQuestions,
    seo: marketingQuestions,
    brand: marketingQuestions,
    email: marketingQuestions,
    
    // Sales
    account_exec: salesQuestions,
    bdr: salesQuestions,
    account_mgmt: salesQuestions,
    sales_ops: salesQuestions,
    sales_eng: salesQuestions,
    
    // HR
    recruiting: hrQuestions,
    hr_ops: hrQuestions,
    learning: hrQuestions,
    comp_benefits: hrQuestions,
    hr_business: hrQuestions,
    
    // Operations & Consulting
    project_mgmt: projectManagerQuestions,
    consulting: consultantQuestions,
  }

  return roleQuestionMap[role] || []
}

// ==================== UNIVERSAL QUESTIONS (FOR ALL ROLES) ====================

export const universalQuestions: Question[] = [
  {
    id: 'work_style',
    question: 'WORK STYLE PREFERENCE?',
    answers: [
      { value: 'deep', label: '🧠 Deep, focused sessions' },
      { value: 'quick', label: '⚡ Quick hits throughout the day' },
      { value: 'collaborative', label: '👥 Collaborative with others' },
      { value: 'iterative', label: '🔄 Iterative refinement' }
    ]
  },
  {
    id: 'tech_comfort',
    question: 'TECH COMFORT LEVEL?',
    answers: [
      { value: 'expert', label: '🚀 Very comfortable - I love trying new tools' },
      { value: 'comfortable', label: '👍 Comfortable - I can learn quickly' },
      { value: 'moderate', label: '🤷 Moderate - I need clear instructions' },
      { value: 'beginner', label: '🆕 Beginner - I prefer simple tools' }
    ]
  },
  {
    id: 'budget',
    question: 'BUDGET ALLOCATION?',
    answers: [
      { value: 'free', label: '🆓 Free tools only' },
      { value: 'minimal', label: '💵 $1-25/month' },
      { value: 'low', label: '💰 $26-50/month' },
      { value: 'medium', label: '💼 $51-100/month' },
      { value: 'high', label: '🏢 $101-500/month' },
      { value: 'enterprise', label: '🏛️ $500+/month' },
      { value: 'flexible', label: '💎 Whatever works best' }
    ]
  }
]
