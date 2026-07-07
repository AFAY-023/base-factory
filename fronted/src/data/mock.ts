import { Lang } from '../lib/i18n';
import { BusinessBase, SkillAsset, QualityGate, DemoRun, TraceEvent } from '../types';

export const getMockData = (lang: Lang) => {
  const isZh = lang === 'zh';
  
  const bases: BusinessBase[] = [
    {
      id: 'base-prod-1',
      name: isZh ? '产品工作基座' : 'Product Work Base',
      version: 'v1.2.0',
      businessDomain: 'product',
      status: 'active',
      owner: isZh ? '产品中台' : 'Platform Team',
      builtInSkills: ['sk-1', 'sk-2', 'sk-3'],
      qualityGateIds: ['qg-1', 'qg-2'],
      recentRunIds: ['run-101', 'run-102', 'run-103'],
      lastOptimizedAt: '2023-10-25T08:00:00Z',
      description: isZh 
        ? '核心研发基座，管理PRD与原型设计，通过语义规则引擎连接业务与开发团队。' 
        : 'Core R&D base. Manages PRDs and prototypes, connecting business and dev via semantic rules.'
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
    { id: 'sk-1', name: isZh ? 'PRD 模板生成' : 'PRD Template Gen', version: '1.2', purpose: isZh ? '结构化需求' : 'Structure Requirements', status: 'active' },
    { id: 'sk-2', name: isZh ? '状态映射抽取' : 'State Extraction', version: '1.0', purpose: isZh ? '识别加载/错误态' : 'Identify Edge States', status: 'active' },
    { id: 'sk-3', name: isZh ? '一致性推导' : 'Consistency Logic', version: '2.1', purpose: isZh ? '校验UI与规则' : 'Verify UI & Rules', status: 'active' },
  ];

  const qualityGates: QualityGate[] = [
    { id: 'qg-1', name: isZh ? '数据源追溯门禁' : 'Data Source Gate', checks: [isZh ? '所有图表必须声明数据源' : 'All charts must declare data source', isZh ? '数据刷新频率必填' : 'Refresh frequency required'], blocksProgress: true },
    { id: 'qg-2', name: isZh ? '状态完备性审查' : 'State Completeness', checks: [isZh ? '列表需有空状态' : 'Lists need empty states', isZh ? '表单需有错误态' : 'Forms need error states'], blocksProgress: true },
  ];

  const sampleRun: DemoRun = {
    runId: 'run-101',
    baseId: 'base-prod-1',
    title: isZh ? '业务工作台页面需求' : 'Business Workspace Generation',
    businessLine: isZh ? '内部工具' : 'Internal Tools',
    demandType: isZh ? '系统集成' : 'System Integration',
    currentStep: 'prd',
    status: 'improving',
    createdAt: '2023-10-25T10:00:00Z',
  };

  const traceEvents: TraceEvent[] = [
    { id: 'tr-1', timestamp: '10:00 AM', step: 'input', eventType: 'user_submit', actor: 'pm', description: isZh ? '提交了工作台建设需求' : 'Submitted workspace requirement' },
    { id: 'tr-2', timestamp: '10:01 AM', step: 'prd', eventType: 'agent_generate', actor: 'agent', description: isZh ? '生成 PRD 草稿，高亮了数据源定义的缺失' : 'Generated PRD draft, highlighted missing data sources' },
    { id: 'tr-3', timestamp: '10:05 AM', step: 'prd', eventType: 'user_edit', actor: 'pm', description: isZh ? '补充数据源说明并添加刷新频率要求' : 'Clarified data sources and refresh freq' },
    { id: 'tr-4', timestamp: '10:06 AM', step: 'prototype', eventType: 'agent_generate', actor: 'agent', description: isZh ? '基于 PRD v2 更新交互原型' : 'Updated UI prototype based on PRD v2' },
    { id: 'tr-5', timestamp: '10:12 AM', step: 'prototype', eventType: 'user_edit', actor: 'pm', description: isZh ? '移除了团队排行榜组件' : 'Removed Leaderboard component' },
    { id: 'tr-6', timestamp: '10:15 AM', step: 'check', eventType: 'system_gate', actor: 'system', description: isZh ? '触发完备性门禁: Todo List 缺少空状态' : 'Gate blocked: Missing empty state for Todo List', feedbackTag: 'edge-state' },
  ];

  const auditLogs = [
    { id: 'al-1', user: 'Alex Chen (PM)', action: isZh ? '启动 Run: 业务工作台' : 'Started Run: Business Workspace', time: '10:00 AM' },
    { id: 'al-2', user: 'System', action: isZh ? '基座版本升级至 v1.2' : 'Base version upgraded to v1.2', time: 'Yesterday' },
    { id: 'al-3', user: 'Sarah Lee (Designer)', action: isZh ? '修订了组件规范技能库' : 'Revised component spec skill', time: 'Oct 23' },
    { id: 'al-4', user: 'David Kim (Dev)', action: isZh ? '添加了新的一致性门禁规则' : 'Added new consistency gate rule', time: 'Oct 20' },
  ];

  const generatedAssets = [
    { id: 'as-1', name: isZh ? 'Workspace_PRD_v2.md' : 'Workspace_PRD_v2.md', type: 'document', time: '10:06 AM', size: '24 KB' },
    { id: 'as-2', name: isZh ? 'Prototype_Schema.json' : 'Prototype_Schema.json', type: 'code', time: '10:06 AM', size: '12 KB' },
    { id: 'as-3', name: isZh ? 'UI_Component_Specs.ts' : 'UI_Component_Specs.ts', type: 'code', time: '10:07 AM', size: '4 KB' },
  ];

  const optimizationInsights = [
    { id: 'oi-1', category: 'Efficiency', title: isZh ? '重复提示词缩减' : 'Prompt Redundancy Reduced', detail: isZh ? '将数据源约束移至质量门禁，每次生成的 Token 减少 15%' : 'Moved data source constraints to gates, saving 15% tokens.' },
    { id: 'oi-2', category: 'Quality', title: isZh ? '空状态补全率提升' : 'Empty State Coverage Up', detail: isZh ? '过去一周原型的边缘状态覆盖率从 70% 提升至 98%' : 'Edge state coverage increased from 70% to 98% this week.' },
  ];

  return {
    bases,
    productWorkBase,
    skills,
    qualityGates,
    sampleRun,
    traceEvents,
    auditLogs,
    generatedAssets,
    optimizationInsights
  };
};

export const bases = getMockData('en').bases;
export const productWorkBase = getMockData('en').productWorkBase;
export const skills = getMockData('en').skills;
export const qualityGates = getMockData('en').qualityGates;
export const sampleRun = getMockData('en').sampleRun;
export const traceEvents = getMockData('en').traceEvents;
