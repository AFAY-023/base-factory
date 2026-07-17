export type ViewState = 
  | 'landing'
  | 'dashboard'
  | 'baseList'
  | 'baseDetail'
  | 'newRun'
  | 'runDetail';

export type BaseTab = 'overview' | 'configure' | 'workspace' | 'runs' | 'optimize' | 'audit';
export type RunStep = 'input' | 'clarify' | 'prd' | 'prototype' | 'check' | 'trace';

export type BusinessBase = {
  id: string;
  name: string;
  version: string;
  businessDomain: "product" | "market" | "risk" | "reporting";
  status: "draft" | "active" | "optimizing" | "archived";
  owner: string;
  builtInSkills: string[];
  qualityGateIds: string[];
  recentRunIds: string[];
  lastOptimizedAt: string;
  description: string;
};

export type SkillAsset = {
  id: string;
  name: string;
  version: string;
  purpose: string;
  status: "active" | "inactive";
};

export type QualityGate = {
  id: string;
  name: string;
  checks: string[];
  blocksProgress: boolean;
};

export type DemoRun = {
  runId: string;
  baseId: string;
  title: string;
  businessLine: string;
  demandType: string;
  currentStep: RunStep;
  status: "draft" | "reviewing" | "improving" | "evaluated" | "completed";
  createdAt: string;
};

export type TraceEvent = {
  id: string;
  timestamp: string;
  step: string;
  eventType: string;
  actor: "system" | "pm" | "agent" | "reviewer";
  description: string;
  feedbackTag?: string;
  improvementTarget?: string;
};

export type RequirementType =
  | 'quick-optimization'
  | 'marketing-calendar'
  | 'functional-component'
  | 'site-building'
  | 'strategic-project';

export type KnowledgeSource = {
  id: string;
  name: string;
  type: 'rule' | 'taxonomy' | 'index' | 'prd';
  description: string;
  tags: string[];
  updatedAt: string;
};

export type BaseProfile = {
  constitution: string;
  requirementTypes: Array<{ id: RequirementType; label: string; description: string }>;
  knowledgeSources: KnowledgeSource[];
};

export type RunDraft = {
  title: string;
  requirementType: RequirementType;
  selectedSourceIds: string[];
  messages: RunMessage[];
  step: 1 | 2 | 3;
  status: 'draft' | 'reviewing';
  currentStep?: RunStep;
};

export type ArtifactSnapshot = {
  id: string;
  name: string;
  version: string;
  type: 'context' | 'prd' | 'prototype' | 'check';
  status: 'ready' | 'needs-review' | 'blocked';
};

export type ImprovementProposal = {
  id: string;
  status: 'pending' | 'approved';
};

export type RunMessage = {
  id: string;
  role: 'pm' | 'agent';
  content: string;
  timestamp: string;
};
