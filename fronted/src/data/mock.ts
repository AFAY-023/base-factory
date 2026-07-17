import { Lang } from '../lib/i18n';
import {
  ArtifactSnapshot,
  BaseProfile,
  BusinessBase,
  DemoRun,
  ImprovementProposal,
  QualityGate,
  SkillAsset,
  TraceEvent,
} from '../types';

export const getMockData = (lang: Lang) => {
  const isZh = lang === 'zh';
  
  const bases: BusinessBase[] = [
    {
      id: 'base-prod-1',
      name: isZh ? '产品工作基座' : 'Product Work Base',
      version: 'v1.3.0',
      businessDomain: 'product',
      status: 'active',
      owner: isZh ? '产品中台' : 'Platform Team',
      builtInSkills: ['sk-1', 'sk-2', 'sk-3'],
      qualityGateIds: ['qg-1', 'qg-2'],
      recentRunIds: ['run-101', 'run-102', 'run-103'],
      lastOptimizedAt: '2023-10-25T08:00:00Z',
      description: isZh
        ? '以 DTC PM Workspace 为样板，管理业务规则、历史 PRD、需求澄清、评审原型与持续优化。'
        : 'A DTC PM workspace base for rules, PRD retrieval, requirement clarification, prototypes, and continuous improvement.'
    },
    {
      id: 'base-prod-2',
      name: isZh ? 'API 契约基座' : 'API Contract Base',
      version: 'v0.9.1',
      businessDomain: 'product',
      status: 'optimizing',
      owner: isZh ? '后端架构组' : 'Backend Architecture',
      builtInSkills: ['sk-4'],
      qualityGateIds: ['qg-3'],
      recentRunIds: ['run-104'],
      lastOptimizedAt: '2023-10-24T14:30:00Z',
      description: isZh 
        ? '根据前端视图需求自动生成和审查 OpenAPI 规范，确保前后端接口一致性。'
        : 'Generates and audits OpenAPI specs based on frontend views to ensure consistency.'
    },
    {
      id: 'base-mkt-1',
      name: isZh ? '营销投放基座' : 'Marketing Campaign Base',
      version: 'v2.0',
      businessDomain: 'market',
      status: 'active',
      owner: isZh ? '增长运营组' : 'Growth Ops',
      builtInSkills: ['sk-5'],
      qualityGateIds: ['qg-4'],
      recentRunIds: ['run-201', 'run-202'],
      lastOptimizedAt: '2023-10-23T09:00:00Z',
      description: isZh
        ? '根据投放渠道自动生成对应的多语言文案及配图要求。'
        : 'Automatically generates multi-lingual copy and asset requests for marketing channels.'
    },
    {
      id: 'base-risk-1',
      name: isZh ? '内容合规基座' : 'Content Compliance Base',
      version: 'v1.0.5',
      businessDomain: 'risk',
      status: 'active',
      owner: isZh ? '法务风控组' : 'Legal & Risk',
      builtInSkills: ['sk-6'],
      qualityGateIds: ['qg-5', 'qg-6'],
      recentRunIds: ['run-301'],
      lastOptimizedAt: '2023-10-20T10:00:00Z',
      description: isZh
        ? '智能审查宣发材料，拦截潜在的数据隐私与合规风险。'
        : 'Intelligent review of outbound materials, intercepting data privacy and compliance risks.'
    }
  ];

  const productWorkBase = bases[0];

  const skills: SkillAsset[] = [
    { id: 'sk-1', name: isZh ? 'PRD 生成器' : 'PRD Generator', version: '1.3', purpose: isZh ? '需求分类、澄清与结构化 PRD' : 'Classify, clarify, and write structured PRDs', status: 'active' },
    { id: 'sk-2', name: isZh ? 'HTML 原型生成器' : 'HTML Prototype Generator', version: '1.0', purpose: isZh ? '将评审需求转成可交互原型' : 'Turn approved requirements into interactive prototypes', status: 'active' },
    { id: 'sk-3', name: isZh ? '历史 PRD 索引器' : 'PRD Index Updater', version: '1.0', purpose: isZh ? '维护轻量检索索引' : 'Maintain lightweight retrieval indexes', status: 'active' },
    { id: 'sk-4', name: isZh ? '技能优化器' : 'Skill Improver', version: '1.1', purpose: isZh ? '将重复修改转化为更新提案' : 'Turn recurring edits into update proposals', status: 'active' },
  ];

  const qualityGates: QualityGate[] = [
    { id: 'qg-1', name: isZh ? '事实与范围门禁' : 'Facts & Scope Gate', checks: [isZh ? '未证实的系统能力必须标记为待确认' : 'Unsupported system capabilities must be marked for confirmation', isZh ? '明确区域、站点形态与非范围' : 'State market, site form, and out-of-scope items'], blocksProgress: true },
    { id: 'qg-2', name: isZh ? '原型一致性门禁' : 'Prototype Consistency Gate', checks: [isZh ? '覆盖关键状态与角色可见性' : 'Cover key states and role visibility', isZh ? '与 PRD 的字段、CTA 与边界一致' : 'Match PRD fields, CTAs, and boundaries'], blocksProgress: true },
  ];

  const sampleRun: DemoRun = {
    runId: 'run-101',
    baseId: 'base-prod-1',
    title: isZh ? '北美会员 Referral 功能' : 'North America Member Referral',
    businessLine: isZh ? '北美 DTC 官网' : 'North America DTC Site',
    demandType: isZh ? '功能组件新增' : 'Functional Component',
    currentStep: 'check',
    status: 'improving',
    createdAt: '2026-06-15T10:00:00Z',
  };

  const traceEvents: TraceEvent[] = [
    { id: 'tr-1', timestamp: '10:00 AM', step: 'input', eventType: 'user_submit', actor: 'pm', description: isZh ? '提交北美会员 Referral 功能需求' : 'Submitted the North America member referral requirement' },
    { id: 'tr-2', timestamp: '10:02 AM', step: 'clarify', eventType: 'context_match', actor: 'agent', description: isZh ? '命中会员体系历史 PRD 与业务宪章' : 'Matched the membership PRD and business constitution' },
    { id: 'tr-3', timestamp: '10:06 AM', step: 'prd', eventType: 'agent_generate', actor: 'agent', description: isZh ? '生成 Referral PRD，并将 Antavo/Shopify 能力标记为待确认' : 'Generated the referral PRD and marked Antavo/Shopify capabilities for confirmation' },
    { id: 'tr-4', timestamp: '10:10 AM', step: 'prototype', eventType: 'agent_generate', actor: 'agent', description: isZh ? '生成会员 Hub Referral 模块原型' : 'Generated a membership Hub referral module prototype' },
    { id: 'tr-5', timestamp: '10:13 AM', step: 'check', eventType: 'system_gate', actor: 'system', description: isZh ? '门禁提示：退款订单排除规则需要在原型中可见' : 'Gate flagged that refund-exclusion rules must be visible in the prototype', feedbackTag: 'edge-state' },
  ];

  const auditLogs = [
    { id: 'al-1', user: 'Alex Chen (PM)', action: isZh ? '启动 Run: 业务工作台' : 'Started Run: Business Workspace', time: '10:00 AM' },
    { id: 'al-2', user: 'System', action: isZh ? '基座版本升级至 v1.2' : 'Base version upgraded to v1.2', time: 'Yesterday' },
    { id: 'al-3', user: 'Sarah Lee (Designer)', action: isZh ? '修订了组件规范技能库' : 'Revised component spec skill', time: 'Oct 23' },
    { id: 'al-4', user: 'David Kim (Dev)', action: isZh ? '添加了新的一致性门禁规则' : 'Added new consistency gate rule', time: 'Oct 20' },
  ];

  const generatedAssets = [
    { id: 'as-1', name: 'referral-context.md', type: 'document', time: '10:02 AM', size: '8 KB' },
    { id: 'as-2', name: 'referral-prd-v0.1.md', type: 'document', time: '10:06 AM', size: '32 KB' },
    { id: 'as-3', name: 'referral-hub-prototype.html', type: 'code', time: '10:10 AM', size: '18 KB' },
  ];

  const optimizationInsights = [
    { id: 'oi-1', category: 'Quality', title: isZh ? '未证实能力自动标记' : 'Unsupported Capability Guard', detail: isZh ? '将外部系统能力统一标记为待确认，减少无依据的需求假设。' : 'Standardize unverified external capabilities as confirmation items to avoid unsupported assumptions.' },
    { id: 'oi-2', category: 'Consistency', title: isZh ? 'PRD 到原型的规则回填' : 'PRD-to-Prototype Rule Coverage', detail: isZh ? '将退款排除、角色可见性和奖励记录设为原型必须呈现的检查项。' : 'Require refund exclusions, role visibility, and reward history in prototype checks.' },
  ];

  const baseProfile: BaseProfile = {
    constitution: isZh ? '面向多区域 DTC 官网，统一业务目标、站点形态、质量基线与上线风险。' : 'A multi-region DTC web base with shared business goals, site forms, quality baselines, and launch risk controls.',
    requirementTypes: [
      { id: 'quick-optimization', label: isZh ? '快速优化' : 'Quick optimization', description: isZh ? '小范围页面、内容或配置变更' : 'Small page, content, or configuration changes' },
      { id: 'marketing-calendar', label: isZh ? '营销活动' : 'Marketing calendar', description: isZh ? '新品、活动与促销页面需求' : 'New product, campaign, and promotion pages' },
      { id: 'functional-component', label: isZh ? '功能组件' : 'Functional component', description: isZh ? '核心流程、插件或系统集成' : 'Core flows, plugins, or system integrations' },
      { id: 'site-building', label: isZh ? '建站项目' : 'Site building', description: isZh ? '区域站点与平台能力建设' : 'Regional sites and platform capabilities' },
      { id: 'strategic-project', label: isZh ? '战略功能' : 'Strategic project', description: isZh ? '0 到 1 的业务模块拓展' : '0-to-1 business capability expansion' },
    ],
    knowledgeSources: [
      { id: 'constitution', name: isZh ? 'DTC 业务宪章' : 'DTC Business Constitution', type: 'rule', description: isZh ? '定义站点形态、增长目标与质量基线。' : 'Defines site forms, growth goals, and quality baselines.', tags: ['global', 'quality'], updatedAt: '2026-06-15' },
      { id: 'taxonomy', name: isZh ? '需求类型规则' : 'Requirement Taxonomy', type: 'taxonomy', description: isZh ? '按需求复杂度决定澄清深度与 PRD 粒度。' : 'Sets clarification depth and PRD scope by requirement complexity.', tags: ['routing', 'clarify'], updatedAt: '2026-06-15' },
      { id: 'prd-index', name: isZh ? '历史 PRD 索引' : 'Historical PRD Index', type: 'index', description: isZh ? '10 份历史需求的轻量检索索引。' : 'A lightweight retrieval index for 10 historical requirements.', tags: ['retrieval', 'history'], updatedAt: '2026-06-15' },
      { id: 'prd-us-membership', name: isZh ? '美国会员体系 PRD' : 'US Membership PRD', type: 'prd', description: isZh ? '会员权益、折扣和 Referral 的强相关参考。' : 'A strong reference for membership benefits, discounts, and referral.', tags: ['membership', 'referral'], updatedAt: '2026-04-07' },
    ],
  };

  const artifactSnapshots: ArtifactSnapshot[] = [
    { id: 'context', name: 'referral-context.md', version: 'v0.1', type: 'context', status: 'ready' },
    { id: 'prd', name: 'referral-prd.md', version: 'v0.1', type: 'prd', status: 'needs-review' },
    { id: 'prototype', name: 'referral-hub.html', version: 'v0.1', type: 'prototype', status: 'needs-review' },
    { id: 'check', name: 'consistency-report', version: 'v0.1', type: 'check', status: 'blocked' },
  ];

  const improvementProposal: ImprovementProposal = { id: 'proposal-referral-gate', status: 'pending' };

  return {
    bases,
    productWorkBase,
    skills,
    qualityGates,
    sampleRun,
    traceEvents,
    auditLogs,
    generatedAssets,
    optimizationInsights,
    baseProfile,
    artifactSnapshots,
    improvementProposal,
  };
};

export const bases = getMockData('en').bases;
export const productWorkBase = getMockData('en').productWorkBase;
export const skills = getMockData('en').skills;
export const qualityGates = getMockData('en').qualityGates;
export const sampleRun = getMockData('en').sampleRun;
export const traceEvents = getMockData('en').traceEvents;
