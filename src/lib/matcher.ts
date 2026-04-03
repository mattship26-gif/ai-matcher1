import { aiSolutions, AISolution } from '@/data/solutions';

export interface QuizAnswers {
  industry: string;
  companySize: string;
  useCases: string[];
  budget: string;
  techLevel: number;
}

interface ScoredSolution extends AISolution {
  score: number;
  matchReasons: string[];
}

export function matchSolutions(answers: QuizAnswers): ScoredSolution[] {
  const scored = aiSolutions.map(solution => {
    let score = 0;
    const matchReasons: string[] = [];

    // Industry match (25 points)
    if (solution.industries.includes(answers.industry) || solution.industries.includes('all')) {
      score += 25;
      if (solution.industries.includes(answers.industry)) {
        matchReasons.push(`Built for ${answers.industry} industry`);
      }
    }

    // Company size match (20 points)
    if (solution.companySize.includes(answers.companySize)) {
      score += 20;
      matchReasons.push(`Perfect for ${answers.companySize} businesses`);
    }

    // Use case match (30 points - most important)
    const useCaseMatches = answers.useCases.filter(useCase => 
      solution.useCases.includes(useCase)
    );
    const useCaseScore = (useCaseMatches.length / answers.useCases.length) * 30;
    score += useCaseScore;
    if (useCaseMatches.length > 0) {
      matchReasons.push(`Handles ${useCaseMatches.length} of your key needs`);
    }

    // Budget match (15 points)
    const budgetMatch = isBudgetMatch(answers.budget, solution.pricing.tier);
    if (budgetMatch) {
      score += 15;
      matchReasons.push('Within your budget');
    } else if (isBudgetClose(answers.budget, solution.pricing.tier)) {
      score += 7;
      matchReasons.push('Slightly above budget but worth considering');
    }

    // Tech level match (10 points)
    const techDiff = Math.abs(answers.techLevel - solution.techLevel);
    const techScore = Math.max(0, 10 - (techDiff * 3));
    score += techScore;
    if (techDiff <= 1) {
      matchReasons.push('Matches your technical comfort level');
    }

    return {
      ...solution,
      score,
      matchReasons
    };
  });

  // Sort by score and return top matches
  return scored
    .sort((a, b) => b.score - a.score)
    .filter(s => s.score > 30); // Only return reasonably good matches
}

function isBudgetMatch(userBudget: string, solutionTier: string): boolean {
  const budgetMap: { [key: string]: string[] } = {
    'under-500': ['free', 'low'],
    '500-2000': ['low', 'mid'],
    '2000-5000': ['mid', 'high'],
    'over-5000': ['high', 'enterprise'],
    'flexible': ['free', 'low', 'mid', 'high', 'enterprise']
  };

  return budgetMap[userBudget]?.includes(solutionTier) || false;
}

function isBudgetClose(userBudget: string, solutionTier: string): boolean {
  const budgetOrder = ['free', 'low', 'mid', 'high', 'enterprise'];
  const userTiers = {
    'under-500': ['free', 'low', 'mid'],
    '500-2000': ['free', 'low', 'mid', 'high'],
    '2000-5000': ['low', 'mid', 'high', 'enterprise'],
    'over-5000': ['mid', 'high', 'enterprise'],
    'flexible': budgetOrder
  };

  return userTiers[userBudget]?.includes(solutionTier) || false;
}
