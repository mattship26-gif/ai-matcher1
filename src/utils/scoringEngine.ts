import { AI_TOOLS, type AITool } from '@/data/tools'

export type ScoredTool = AITool & {
  score: number
  matchReasons: string[]
  confidenceLevel: 'high' | 'medium' | 'low'
  roleAlignment: number
  taskAlignment: number
  budgetAlignment: number
}

// ==================== SCORING WEIGHTS ====================

const WEIGHTS = {
  ROLE_MATCH: 5,
  TASK_MATCH: 4,
  PAIN_POINT_MATCH: 4,
  INDUSTRY_MATCH: 3,
  TECH_COMFORT_MATCH: 2,
  BUDGET_MATCH: 3,
  WORK_STYLE_MATCH: 2
}

// ==================== MAIN SCORING FUNCTION ====================

export function scoreTools(userProfile: Record<string, string>): ScoredTool[] {
  const scoredTools: ScoredTool[] = AI_TOOLS.map(tool => {
    let totalScore = 0
    const matchReasons: string[] = []
    
    // Role-specific scoring
    const roleScore = calculateRoleScore(tool, userProfile)
    totalScore += roleScore.score
    matchReasons.push(...roleScore.reasons)
    
    // Task-specific scoring
    const taskScore = calculateTaskScore(tool, userProfile)
    totalScore += taskScore.score
    matchReasons.push(...taskScore.reasons)
    
    // Pain point alignment
    const painScore = calculatePainPointScore(tool, userProfile)
    totalScore += painScore.score
    matchReasons.push(...painScore.reasons)
    
    // Industry alignment
    const industryScore = calculateIndustryScore(tool, userProfile)
    totalScore += industryScore.score
    
    // Tech comfort alignment
    const techScore = calculateTechComfortScore(tool, userProfile)
    totalScore += techScore.score
    
    // Budget alignment
    const budgetScore = calculateBudgetScore(tool, userProfile)
    totalScore += budgetScore.score
    matchReasons.push(...budgetScore.reasons)
    
    // Work style alignment
    const workStyleScore = calculateWorkStyleScore(tool, userProfile)
    totalScore += workStyleScore.score
    
    // Calculate confidence level
    const confidenceLevel = calculateConfidenceLevel(totalScore, matchReasons.length)
    
    return {
      ...tool,
      score: totalScore,
      matchReasons: matchReasons.slice(0, 5), // Top 5 reasons
      confidenceLevel,
      roleAlignment: roleScore.score,
      taskAlignment: taskScore.score,
      budgetAlignment: budgetScore.score
    }
  })
  
  // Sort by score and return top matches
  return scoredTools
    .filter(tool => tool.score > 0)
    .sort((a, b) => b.score - a.score)
}

// ==================== ROLE SCORING ====================

function calculateRoleScore(tool: AITool, profile: Record<string, string>) {
  const role = profile.role
  const score = { score: 0, reasons: [] as string[] }
  
  if (!role) return score
  
  // Direct role match
  if (tool.roles?.includes(role)) {
    score.score += WEIGHTS.ROLE_MATCH * 3
    score.reasons.push(`Specifically built for ${getRoleName(role)} professionals`)
  }
  
  // Role family match
  const roleFamily = getRoleFamily(role)
  if (tool.roles?.some(r => getRoleFamily(r) === roleFamily)) {
    score.score += WEIGHTS.ROLE_MATCH * 2
    score.reasons.push(`Designed for ${roleFamily} workflows`)
  }
  
  // All-roles tools get moderate score
  if (tool.roles?.includes('all')) {
    score.score += WEIGHTS.ROLE_MATCH * 1.5
  }
  
  return score
}

// ==================== TASK SCORING ====================

function calculateTaskScore(tool: AITool, profile: Record<string, string>) {
  const score = { score: 0, reasons: [] as string[] }
  
  // Map user tasks to tool use cases
  const userTasks = extractUserTasks(profile)
  
  userTasks.forEach(task => {
    if (tool.useCases.includes(task)) {
      score.score += WEIGHTS.TASK_MATCH
      score.reasons.push(`Perfect for ${formatTask(task)}`)
    }
  })
  
  return score
}

// ==================== PAIN POINT SCORING ====================

function calculatePainPointScore(tool: AITool, profile: Record<string, string>) {
  const score = { score: 0, reasons: [] as string[] }
  
  const painPointMappings: Record<string, string[]> = {
    // Accounting pain points
    manual_reconciliation: ['automation', 'reconciliation', 'accuracy'],
    excel_complex: ['formulas', 'excel-native', 'analysis'],
    finding_documentation: ['search', 'organization', 'knowledge-management'],
    period_close: ['automation', 'financial_close', 'workflow'],
    
    // Developer pain points
    boilerplate: ['code-completion', 'automation', 'templates'],
    debugging: ['debugging', 'error-detection', 'testing'],
    documentation: ['documentation', 'code-documentation'],
    learning_new: ['learning', 'examples', 'tutorials'],
    refactoring: ['refactoring', 'code-analysis'],
    
    // Legal pain points
    legal_research: ['legal-research', 'search', 'case-law'],
    document_review: ['document-review', 'analysis'],
    contract_comparison: ['contract-focused', 'comparison'],
    cite_checking: ['citations', 'accuracy'],
    
    // Marketing pain points
    ideas: ['idea-generation', 'brainstorming', 'creativity'],
    writing_speed: ['speed', 'automation', 'templates'],
    consistency: ['brand-voice', 'consistency'],
    visuals: ['design', 'image-generation', 'visual'],
    
    // Sales pain points
    email_writing: ['email', 'writing', 'personalization'],
    research: ['research', 'intelligence', 'data'],
    crm_admin: ['automation', 'crm-integration'],
    proposal_creation: ['document-creation', 'templates'],
    
    // General pain points
    repetitive: ['automation', 'workflow', 'efficiency'],
    writing_quality: ['writing', 'grammar', 'clarity'],
    finding_info: ['search', 'research', 'knowledge-management'],
    staying_current: ['current-info', 'real-time', 'news'],
    complex_analysis: ['analysis', 'reasoning', 'insights'],
  }
  
  const userPainPoints = extractPainPoints(profile)
  
  userPainPoints.forEach(painPoint => {
    const relevantStrengths = painPointMappings[painPoint] || []
    const matches = tool.strengths.filter(s => relevantStrengths.includes(s))
    
    if (matches.length > 0) {
      score.score += WEIGHTS.PAIN_POINT_MATCH * matches.length
      score.reasons.push(`Solves your ${formatPainPoint(painPoint)} challenges`)
    }
  })
  
  return score
}

// ==================== INDUSTRY SCORING ====================

function calculateIndustryScore(tool: AITool, profile: Record<string, string>) {
  const industry = profile.industry
  const score = { score: 0, reasons: [] as string[] }
  
  if (!industry) return score
  
  if (tool.industries?.includes(industry)) {
    score.score += WEIGHTS.INDUSTRY_MATCH * 2
  }
  
  if (tool.industries?.includes('all')) {
    score.score += WEIGHTS.INDUSTRY_MATCH
  }
  
  return score
}

// ==================== TECH COMFORT SCORING ====================

function calculateTechComfortScore(tool: AITool, profile: Record<string, string>) {
  const techComfort = profile.tech_comfort
  const score = { score: 0, reasons: [] as string[] }
  
  if (!techComfort) return score
  
  const techComfortMappings: Record<string, string[]> = {
    beginner: ['easy-to-use', 'simple', 'intuitive', 'no-code', 'templates'],
    moderate: ['user-friendly', 'guided', 'templates'],
    comfortable: ['powerful', 'flexible', 'customizable'],
    expert: ['advanced', 'api', 'customizable', 'powerful', 'technical']
  }
  
  const preferredStrengths = techComfortMappings[techComfort] || []
  const matches = tool.strengths.filter(s => preferredStrengths.includes(s))
  
  if (matches.length > 0) {
    score.score += WEIGHTS.TECH_COMFORT_MATCH * matches.length
  }
  
  return score
}

// ==================== BUDGET SCORING ====================

function calculateBudgetScore(tool: AITool, profile: Record<string, string>) {
  const budget = profile.budget
  const score = { score: 0, reasons: [] as string[] }
  
  if (!budget) return score
  
  const pricing = tool.pricing.toLowerCase()
  
  // Extract price number from pricing string
  const priceMatch = pricing.match(/\$(\d+)/)
  const price = priceMatch ? parseInt(priceMatch[1]) : null
  
  if (budget === 'free') {
    if (pricing.includes('free')) {
      score.score += WEIGHTS.BUDGET_MATCH * 3
      score.reasons.push('Fits your free-tools budget')
    }
  } else if (budget === 'minimal') {
    if (pricing.includes('free') || (price !== null && price <= 25)) {
      score.score += WEIGHTS.BUDGET_MATCH * 2.5
      score.reasons.push('Affordable at your budget level')
    }
  } else if (budget === 'low') {
    if (pricing.includes('free') || (price !== null && price <= 50)) {
      score.score += WEIGHTS.BUDGET_MATCH * 2.5
      score.reasons.push('Well within your budget')
    }
  } else if (budget === 'medium') {
    if (price !== null && price <= 100 && !pricing.includes('enterprise')) {
      score.score += WEIGHTS.BUDGET_MATCH * 2
      score.reasons.push('Good value within your budget')
    }
  } else if (budget === 'high') {
    if (price !== null && price <= 500) {
      score.score += WEIGHTS.BUDGET_MATCH * 2
      score.reasons.push('Matches your budget tier')
    } else if (!pricing.includes('enterprise')) {
      score.score += WEIGHTS.BUDGET_MATCH * 1.5
      score.reasons.push('Within range of your budget')
    }
  } else if (budget === 'enterprise') {
    // Enterprise budget is flexible - everything scores reasonably
    score.score += WEIGHTS.BUDGET_MATCH * 1.5
    if (pricing.includes('enterprise')) {
      score.score += WEIGHTS.BUDGET_MATCH * 0.5
      score.reasons.push('Enterprise-grade solution')
    }
  } else if (budget === 'flexible') {
    score.score += WEIGHTS.BUDGET_MATCH
    score.reasons.push('Flexible budget match')
  }
  
  return score
}

// ==================== WORK STYLE SCORING ====================

function calculateWorkStyleScore(tool: AITool, profile: Record<string, string>) {
  const workStyle = profile.work_style
  const score = { score: 0, reasons: [] as string[] }
  
  if (!workStyle) return score
  
  const workStyleMappings: Record<string, string[]> = {
    deep: ['deep-focus', 'analysis', 'complex', 'long-context'],
    quick: ['fast', 'quick', 'real-time', 'speed'],
    collaborative: ['collaboration', 'team', 'sharing', 'real-time'],
    iterative: ['iterative', 'refinement', 'versioning']
  }
  
  const preferredStrengths = workStyleMappings[workStyle] || []
  const matches = tool.strengths.filter(s => preferredStrengths.includes(s))
  
  if (matches.length > 0) {
    score.score += WEIGHTS.WORK_STYLE_MATCH * matches.length
  }
  
  return score
}

// ==================== HELPER FUNCTIONS ====================

function calculateConfidenceLevel(score: number, reasonCount: number): 'high' | 'medium' | 'low' {
  if (score >= 40 && reasonCount >= 3) return 'high'
  if (score >= 25 && reasonCount >= 2) return 'medium'
  return 'low'
}

function getRoleFamily(role: string): string {
  const families: Record<string, string> = {
    accounting: 'finance',
    financial_analysis: 'finance',
    tax: 'finance',
    risk: 'finance',
    fpa: 'finance',
    
    software_dev: 'development',
    data_science: 'development',
    devops: 'development',
    qa: 'development',
    
    attorney: 'legal',
    paralegal: 'legal',
    compliance: 'legal',
    contracts: 'legal',
    
    content: 'marketing',
    social: 'marketing',
    design: 'marketing',
    copywriter: 'marketing',
    
    account_exec: 'sales',
    bdr: 'sales',
    sales_ops: 'sales',
    
    recruiting: 'hr',
    hr_ops: 'hr',
    learning: 'hr',
  }
  
  return families[role] || 'general'
}

function getRoleName(role: string): string {
  const names: Record<string, string> = {
    accounting: 'accounting',
    financial_analysis: 'financial analysis',
    software_dev: 'software development',
    attorney: 'legal',
    content: 'content creation',
    account_exec: 'sales',
  }
  
  return names[role] || role.replace(/_/g, ' ')
}

function extractUserTasks(profile: Record<string, string>): string[] {
  const tasks: string[] = []
  
  // Extract from various task-related fields
  Object.entries(profile).forEach(([key, value]) => {
    if (key.includes('task') || key.includes('primary')) {
      // Map user task values to tool use case values
      tasks.push(value)
    }
  })
  
  return tasks
}

function extractPainPoints(profile: Record<string, string>): string[] {
  const painPoints: string[] = []
  
  Object.entries(profile).forEach(([key, value]) => {
    if (key.includes('pain') || key.includes('bottleneck') || key.includes('challenge') || key.includes('drain')) {
      painPoints.push(value)
    }
  })
  
  return painPoints
}

function formatTask(task: string): string {
  return task.replace(/_/g, ' ')
}

function formatPainPoint(painPoint: string): string {
  return painPoint.replace(/_/g, ' ')
}

// ==================== EXPORT TOP RECOMMENDATIONS ====================

export function getTopRecommendations(userProfile: Record<string, string>, count: number = 5): ScoredTool[] {
  const scored = scoreTools(userProfile)
  return scored.slice(0, count)
}
