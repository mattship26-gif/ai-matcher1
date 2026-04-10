export type ToolCategory = string;
 
export type CompanySize = 'small' | 'medium' | 'large' | 'enterprise' | string;
 
export type PricingTier =
  | 'free'
  | 'starter'
  | 'professional'
  | 'enterprise'
  | string;
 
export interface ToolRating {
  source: string;
  score: number;
  reviewCount: number;
  lastUpdated?: string;
}
 
export interface CaseStudy {
  company?: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  roi?: string;
  source?: string;
  results?: string[];
}
 
export interface Integration {
  toolName: string;
  category?: string;
  integrationType?: string;
  complexity?: 'easy' | 'medium' | 'steep' | string;
}
