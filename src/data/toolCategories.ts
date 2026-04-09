export type ToolCategory = 
  | 'Audit Data Analytics'
  | 'Audit Management'
  | 'General Ledger & ERP'
  | 'AP/AR Automation'
  | 'Tax Compliance'
  | 'Tax Provision & Research'
  | 'Financial Close & Reconciliation'
  | 'Business Intelligence & Reporting'
  | 'Document Management'
  | 'Risk & Compliance'
  | 'Fraud Detection & Forensics'
  | 'Generative AI & Automation'
  | 'Project Management'
  | 'CRM & Client Management'
  | 'Expense Management'
  | 'Time & Billing';

export type CompanySize = 'small' | 'medium' | 'large' | 'enterprise';
export type PricingTier = 'free' | 'starter' | 'professional' | 'enterprise';

export interface ToolRating {
  source: 'G2' | 'Capterra' | 'TrustRadius' | 'Gartner';
  score: number;
  reviewCount: number;
  lastUpdated: string;
}

export interface CaseStudy {
  company: string;
  industry: string;
  outcome: string;
  roi?: string;
  source: string;
}

export interface Integration {
  toolName: string;
  integrationType: 'native' | 'api' | 'zapier' | 'manual';
  complexity: 'easy' | 'medium' | 'complex';
}
