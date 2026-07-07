import React, { useState } from 'react';
import { ViewState, BaseTab, BusinessBase } from '../types';
import { getMockData } from '../data/mock';
import { useTranslation } from '../lib/i18n';
import { Button, Card, Badge } from '../components/ui';
import { LayoutGrid, Settings, FileBox, PlayCircle, TrendingUp, History, Shield, CheckCircle, ArrowRight, Database, Search, Download } from 'lucide-react';

export function BaseDetail({ onNavigate, onSelectRun }: { onNavigate: (view: ViewState) => void, onSelectRun: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<BaseTab>('overview');
  const { lang, t } = useTranslation();
  const mockData = getMockData(lang);
  const base = mockData.productWorkBase;

  return (
    <div className="min-h-screen bg-[#F4F8FF] flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white/70 backdrop-blur-md border-r border-[#DCE7F6] flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-[#DCE7F6]">
          <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F8C] mb-4 cursor-pointer hover:text-[#4A8DFF] transition-colors" onClick={() => onNavigate('baseList')}>
            <LayoutGrid className="w-4 h-4" />
            {t('All Bases', '所有基座')}
          </div>
          <h2 className="font-semibold text-lg text-[#08142F]">{base.name}</h2>
          <Badge variant="success" className="mt-2">{base.version}</Badge>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
          <div>
            <div className="px-3 mb-2 text-xs font-semibold text-[#8A96AD] uppercase tracking-wider">{t('Base Management', '基座管理')}</div>
            <div className="space-y-1">
              <NavItem icon={<LayoutGrid />} label={t("Overview", "总览")} active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
              <NavItem icon={<Settings />} label={t("Configuration", "配置")} active={activeTab === 'configure'} onClick={() => setActiveTab('configure')} />
              <NavItem icon={<TrendingUp />} label={t("Optimization Insights", "优化洞察")} active={activeTab === 'optimize'} onClick={() => setActiveTab('optimize')} />
              <NavItem icon={<History />} label={t("Audit Log", "审计日志")} active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} />
            </div>
          </div>
          
          <div>
            <div className="px-3 mb-2 text-xs font-semibold text-[#8A96AD] uppercase tracking-wider">{t('User Executions', '用户执行')}</div>
            <div className="space-y-1">
              <NavItem icon={<PlayCircle />} label={t("Recent Runs", "近期运行")} active={activeTab === 'runs'} onClick={() => setActiveTab('runs')} />
              <NavItem icon={<FileBox />} label={t("Generated Assets", "生成资产")} active={activeTab === 'workspace'} onClick={() => setActiveTab('workspace')} />
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4A8DFF] opacity-10 blur-[120px] pointer-events-none" />
        
        <header className="h-16 bg-white/50 backdrop-blur-md border-b border-[#DCE7F6] flex items-center px-8 justify-between shrink-0 z-10">
          <h1 className="text-lg font-medium text-[#08142F] capitalize">
            {activeTab === 'runs' ? t('Recent Executions', '近期执行记录') : 
             activeTab === 'optimize' ? t('Optimization Insights', '优化洞察') :
             activeTab === 'audit' ? t('Audit Log', '审计日志') :
             activeTab === 'workspace' ? t('Generated Assets', '生成资产') :
             activeTab === 'configure' ? t('Configuration', '配置') :
             t('Overview', '总览')}
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="bg-[#0d1b31]/85 text-[#ededed] border-white/15 hover:bg-[#14345f]"
              onClick={() => onNavigate('landing')}
            >
              {t('Home', '首页')}
            </Button>
            <Button
              className="bg-[#0d1b31] text-white border border-white/15 hover:bg-[#14345f] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
              onClick={() => { onSelectRun(mockData.sampleRun.runId); onNavigate('runDetail'); }}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              {t('Start New Run', '启动新运行')}
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-8 z-10 relative">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && <OverviewTab base={base} />}
            {activeTab === 'configure' && <ConfigureTab />}
            {activeTab === 'runs' && <RunsTab onSelectRun={(id) => { onSelectRun(id); onNavigate('runDetail'); }} />}
            {activeTab === 'optimize' && <OptimizeTab />}
            {activeTab === 'audit' && <AuditTab />}
            {activeTab === 'workspace' && <WorkspaceTab />}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active ? 'bg-[#EEF5FF] text-[#4A8DFF] shadow-sm' : 'text-[#5F6F8C] hover:bg-white hover:text-[#08142F] hover:shadow-sm'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: "w-4.5 h-4.5" })}
      {label}
    </button>
  );
}

function OverviewTab({ base }: { base: BusinessBase }) {
  const { lang, t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6 bg-white/80">
          <div className="text-[#5F6F8C] text-sm mb-2 font-medium">{t('Quality Gate Pass Rate', '门禁通过率')}</div>
          <div className="text-4xl font-semibold text-[#08142F]">86<span className="text-lg text-[#5F6F8C] ml-1">%</span></div>
          <div className="text-[#c2c2c2] text-xs mt-3 flex items-center gap-1 font-medium"><TrendingUp className="w-3 h-3"/> {lang === 'zh' ? '较上周提升 4%' : '+4% from last week'}</div>
        </Card>
        <Card className="p-6 bg-white/80">
          <div className="text-[#5F6F8C] text-sm mb-2 font-medium">{t('Optimization Candidates', '待优化项')}</div>
          <div className="text-4xl font-semibold text-[#08142F]">3</div>
          <div className="text-[#c2c2c2] text-xs mt-3 font-medium">{t('Requires review from Base Admin', '需要管理员确认')}</div>
        </Card>
        <Card className="p-6 bg-white/80">
          <div className="text-[#5F6F8C] text-sm mb-2 font-medium">{t('Last Optimized', '最近优化时间')}</div>
          <div className="text-base font-medium text-[#08142F] mt-4 whitespace-nowrap">{base.lastOptimizedAt}</div>
        </Card>
      </div>

      <h3 className="text-lg font-semibold text-[#08142F] pt-6 mb-4">{t('Base Architecture Overview', '基座架构总览')}</h3>
      <Card className="p-8 bg-[#161616] text-white border border-white/10 shadow-none">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between opacity-90 gap-4">
            <div className="text-center flex-1 min-w-[120px]">
              <div className="text-xs text-white/50 mb-2 font-mono uppercase tracking-widest">{t('Phase 1', '第一阶段')}</div>
              <div className="h-20 border border-white/20 bg-white/5 rounded-xl flex flex-col items-center justify-center p-3 text-sm font-medium shadow-inner backdrop-blur-sm">
                <span className="mb-1">{t('User Intent', '用户意图')}</span>
                <span className="text-[10px] text-white/60 font-normal">{t('Natural Language', '自然语言输入')}</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/40 mt-6" />
            <div className="text-center flex-1 min-w-[120px]">
              <div className="text-xs text-white/50 mb-2 font-mono uppercase tracking-widest">{t('Phase 2', '第二阶段')}</div>
              <div className="h-20 border border-white/20 bg-white/10 rounded-xl flex flex-col items-center justify-center p-3 text-[#ededed] text-sm font-medium">
                <span className="mb-1">{t('Agent Planner', '编排计划')}</span>
                <span className="text-[10px] text-white/70 font-normal">{t('Context Retrieval', '上下文召回')}</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/40 mt-6" />
            <div className="text-center flex-1 min-w-[120px]">
              <div className="text-xs text-white/50 mb-2 font-mono uppercase tracking-widest">{t('Phase 3', '第三阶段')}</div>
              <div className="h-20 border border-white/20 bg-white/5 rounded-xl flex flex-col items-center justify-center p-3 text-sm font-medium shadow-inner backdrop-blur-sm">
                <span className="mb-1">{t('Draft Assets', '资产草案')}</span>
                <span className="text-[10px] text-white/60 font-normal">{t('Code & Specs', '代码与文档')}</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/40 mt-6" />
            <div className="text-center flex-1 min-w-[120px]">
              <div className="text-xs text-white/50 mb-2 font-mono uppercase tracking-widest">{t('Phase 4', '第四阶段')}</div>
              <div className="h-20 border border-white/20 bg-white/10 rounded-xl flex flex-col items-center justify-center p-3 text-[#ededed] text-sm font-medium">
                <span className="mb-1">{t('Quality Gates', '质量门禁')}</span>
                <span className="text-[10px] text-white/70 font-normal">{t('Consistency Check', '一致性校验')}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-white/10 my-2"></div>
          <div className="flex justify-between text-xs text-white/40 font-mono">
            <span>{t('Data Sources: Vector DB, Confluence', '数据源: 向量库, Confluence')}</span>
            <span>{t('Feedback Loop: Auto-captures edits', '反馈循环: 自动捕获人工修改')}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ConfigureTab() {
  const { lang, t } = useTranslation();
  const mockData = getMockData(lang);
  
  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#08142F] flex items-center gap-2">
            <Database className="w-5 h-5 text-[#4A8DFF]" /> {t('Knowledge Sources', '知识库源')}
          </h3>
          <Button variant="outline" size="sm">{t('Connect Source', '连接数据源')}</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#EEF5FF] flex items-center justify-center shrink-0">
              <Database className="w-5 h-5 text-[#4A8DFF]" />
            </div>
            <div>
              <h4 className="font-medium text-[#08142F]">{t('Corporate UI Guidelines', '企业 UI 规范')}</h4>
              <p className="text-sm text-[#5F6F8C] mt-1">{t('Vector DB • Indexed 2 hours ago', '向量库 • 2小时前索引')}</p>
            </div>
          </Card>
          <Card className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#EEF5FF] flex items-center justify-center shrink-0">
              <FileBox className="w-5 h-5 text-[#4A8DFF]" />
            </div>
            <div>
              <h4 className="font-medium text-[#08142F]">{t('Historical PRDs', '历史 PRD 文档')}</h4>
              <p className="text-sm text-[#5F6F8C] mt-1">{t('Confluence Integration • Sync Active', 'Confluence 集成 • 同步中')}</p>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#08142F] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#4A8DFF]" /> {t('Active Skills', '已启用技能')}
          </h3>
          <Button variant="outline" size="sm">{t('Add Skill', '添加技能')}</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {mockData.skills.map(skill => (
            <Card key={skill.id} className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-[#08142F]">{skill.name}</h4>
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4">{skill.version}</Badge>
                </div>
                <div className="w-8 h-4 bg-emerald-100 rounded-full relative shadow-inner">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
              <p className="text-sm text-[#5F6F8C]">{skill.purpose}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#08142F] flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" /> {t('Quality Gates', '质量门禁')}
          </h3>
          <Button variant="outline" size="sm">{t('Add Gate', '添加门禁')}</Button>
        </div>
        <div className="space-y-3">
          {mockData.qualityGates.map(gate => (
            <Card key={gate.id} className="p-5">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#F0F4F8]">
                <h4 className="font-medium text-[#08142F]">{gate.name}</h4>
                {gate.blocksProgress && <Badge variant="warning">{t('Blocks Progress', '阻断流程')}</Badge>}
              </div>
              <ul className="space-y-2">
                {gate.checks.map((check, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#5F6F8C]">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {check}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function RunsTab({ onSelectRun }: { onSelectRun: (id: string) => void }) {
  const { lang } = useTranslation();
  const mockData = getMockData(lang);

  return (
    <div className="space-y-4">
      <Card className="p-5 flex items-center justify-between hover:border-[#4A8DFF]/30 hover:shadow-md cursor-pointer transition-all group" onClick={() => onSelectRun(mockData.sampleRun.runId)}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EEF5FF] flex items-center justify-center group-hover:scale-105 transition-transform">
            <PlayCircle className="w-6 h-6 text-[#4A8DFF]" />
          </div>
          <div>
            <h4 className="font-semibold text-[#08142F] text-lg">{mockData.sampleRun.title}</h4>
            <div className="text-xs text-[#5F6F8C] mt-1 flex items-center gap-2">
              <span>{mockData.sampleRun.createdAt}</span>
              <span>•</span>
              <Badge variant="outline" className="text-[10px] py-0 h-4">{mockData.sampleRun.businessLine}</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-[#5F6F8C] font-medium">Step: {mockData.sampleRun.currentStep}</div>
          <Badge variant="warning">{mockData.sampleRun.status}</Badge>
          <ArrowRight className="w-5 h-5 text-[#DCE7F6] group-hover:text-[#4A8DFF] transition-colors" />
        </div>
      </Card>
      {/* Additional mock runs */}
      <Card className="p-5 flex items-center justify-between border-dashed hover:border-[#DCE7F6] opacity-70">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F0F4F8] flex items-center justify-center">
            <PlayCircle className="w-6 h-6 text-[#8A96AD]" />
          </div>
          <div>
            <h4 className="font-semibold text-[#08142F] text-lg">{lang === 'zh' ? '用户认证模块改造' : 'User Auth Redesign'}</h4>
            <div className="text-xs text-[#5F6F8C] mt-1 flex items-center gap-2">
              <span>2023-10-24T14:30:00Z</span>
              <span>•</span>
              <Badge variant="outline" className="text-[10px] py-0 h-4">{lang === 'zh' ? '核心系统' : 'Core System'}</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-[#5F6F8C] font-medium">Step: check</div>
          <Badge variant="success">completed</Badge>
          <ArrowRight className="w-5 h-5 text-[#DCE7F6]" />
        </div>
      </Card>
    </div>
  );
}

function OptimizeTab() {
  const { lang, t } = useTranslation();
  const mockData = getMockData(lang);
  return (
    <div className="space-y-6">
      <p className="text-[#5F6F8C] mb-6">
        {t('Based on recent execution traces, the AI has identified the following patterns and suggests updates to the base.', '基于近期的执行追踪，AI 识别了以下模式并建议更新基座规则。')}
      </p>
      {mockData.optimizationInsights.map((insight) => (
        <Card key={insight.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h4 className="font-semibold text-[#08142F]">{insight.title}</h4>
                <div className="text-xs text-[#5F6F8C] font-mono mt-1">{insight.category}</div>
              </div>
            </div>
            <Button size="sm">{t('Apply Update', '应用更新')}</Button>
          </div>
          <p className="text-sm text-[#5F6F8C] leading-relaxed p-4 bg-[#F4F8FF] rounded-lg border border-[#DCE7F6]">
            {insight.detail}
          </p>
        </Card>
      ))}
    </div>
  );
}

function AuditTab() {
  const { lang, t } = useTranslation();
  const mockData = getMockData(lang);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8A96AD]" />
          <input 
            type="text" 
            placeholder={t('Search logs...', '搜索日志...')}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#DCE7F6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A8DFF]/50"
          />
        </div>
        <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />{t('Export', '导出')}</Button>
      </div>
      <div className="bg-white rounded-xl border border-[#DCE7F6] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F8FAFC] border-b border-[#DCE7F6]">
            <tr>
              <th className="px-6 py-3 font-semibold text-[#5F6F8C]">{t('Time', '时间')}</th>
              <th className="px-6 py-3 font-semibold text-[#5F6F8C]">{t('User / Actor', '用户 / 执行方')}</th>
              <th className="px-6 py-3 font-semibold text-[#5F6F8C]">{t('Action', '操作')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F4F8]">
            {mockData.auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-[#F4F8FF]/50 transition-colors">
                <td className="px-6 py-4 font-mono text-[#8A96AD] text-xs">{log.time}</td>
                <td className="px-6 py-4 font-medium text-[#08142F]">{log.user}</td>
                <td className="px-6 py-4 text-[#5F6F8C]">{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WorkspaceTab() {
  const { lang, t } = useTranslation();
  const mockData = getMockData(lang);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockData.generatedAssets.map((asset) => (
        <Card key={asset.id} className="p-5 flex flex-col hover:-translate-y-1 transition-transform cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-[#EEF5FF] flex items-center justify-center mb-4">
            <FileBox className="w-6 h-6 text-[#4A8DFF]" />
          </div>
          <h4 className="font-medium text-[#08142F] mb-1 truncate">{asset.name}</h4>
          <div className="text-xs text-[#5F6F8C] flex items-center justify-between mt-auto pt-4 border-t border-[#F0F4F8]">
            <span>{asset.time}</span>
            <span className="font-mono">{asset.size}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
