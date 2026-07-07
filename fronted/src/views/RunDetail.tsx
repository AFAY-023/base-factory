import React, { useState } from 'react';
import { ViewState, RunStep } from '../types';
import { getMockData } from '../data/mock';
import { useTranslation } from '../lib/i18n';
import { Button, Card, Badge } from '../components/ui';
import { ArrowLeft, CheckCircle, FileText, Code, ShieldAlert, Activity, ArrowRight, MessageSquare, Play, Sparkles, CheckSquare, Search, LayoutGrid } from 'lucide-react';

export function RunDetail({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const [activeTab, setActiveTab] = useState<'prd' | 'prototype' | 'check' | 'trace'>('prd');
  const { lang, t } = useTranslation();
  const mockData = getMockData(lang);
  const { sampleRun, traceEvents } = mockData;

  return (
    <div className="min-h-screen bg-[#07111f] flex flex-col font-sans relative">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0d1b31] to-transparent opacity-70 pointer-events-none" />

      <header className="h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 flex items-center px-6 justify-between shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('baseDetail')} className="px-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="text-[10px] text-[#5F6F8C] uppercase tracking-wider font-semibold mb-0.5">{t('Product Work Base / Active Run', '产品工作基座 / 活跃运行')}</div>
            <h1 className="font-semibold text-lg text-[#08142F]">{sampleRun.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="bg-[#0d1b31]/85 text-[#ededed] border-white/15 hover:bg-[#14345f]"
            onClick={() => onNavigate('landing')}
          >
            {t('Home', '首页')}
          </Button>
          <Badge variant="outline" className="bg-white">{t('Iteration 3', '第 3 次迭代')}</Badge>
          <Badge variant="warning">{sampleRun.status}</Badge>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden z-10">
        {/* Left Pane: Chat / Conversation */}
        <div className="w-[450px] border-r border-white/10 bg-[#0a0a0a]/55 backdrop-blur-md flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-4 border-b border-white/10 flex items-center gap-2 bg-[#0d1b31]/55">
            <Sparkles className="w-4 h-4 text-[#ededed]" />
            <span className="font-semibold text-sm text-[#08142F]">{t('Base Agent', '基座智能体')}</span>
          </div>
          <div className="flex-1 overflow-auto p-5 space-y-6">
            <ChatMessage 
              role="user" 
              time="10:00 AM"
              content={t(
                "The business team wants to generate a personalized business workspace for different roles, allowing employees to see their to-dos, key metrics, quick links, risk alerts, and recent records.",
                "业务团队希望为不同角色生成个性化的业务工作台，让员工能够看到自己的待办事项、核心指标、快捷入口、风险预警以及近期操作记录。"
              )}
            />
            <ChatMessage 
              role="agent" 
              time="10:01 AM"
              content={t(
                "I've generated a draft PRD for the Workspace based on your request. I noticed a few ambiguities: What specific data sources are required for the metric cards?",
                "我已根据要求生成了工作台的 PRD 草稿。但我发现几个不明确的地方：指标卡片需要哪些具体的数据源？"
              )}
            />
            <ChatMessage 
              role="user" 
              time="10:05 AM"
              content={t(
                "All metric cards must explicitly display their data source and refresh frequency (e.g., 'Real-time', 'Hourly').",
                "所有指标卡片必须明确显示数据源和刷新频率（例如：“实时”、“每小时”）。"
              )}
            />
            
            <div className="flex items-center gap-2 my-2 opacity-80">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#c2c2c2] flex items-center gap-1">
                <Activity className="w-3 h-3" /> {t('Trace Captured', '追踪已捕获')}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent"></div>
            </div>

            <ChatMessage 
              role="agent" 
              time="10:06 AM"
              content={t(
                "Understood. I have updated the PRD to mandate Data Source and Refresh Frequency. I have also regenerated the Prototype Preview to reflect this structure.",
                "明白。我已更新 PRD 强制要求数据源和刷新频率。同时我已重新生成原型预览以反映此结构。"
              )}
            />
            
            <ChatMessage 
              role="user" 
              time="10:12 AM"
              content={t(
                "Remove the Team Leaderboard widget, it wasn't requested.",
                "移除团队排行榜组件，我们没有这个需求。"
              )}
            />

            <div className="flex items-center gap-2 my-2 opacity-80">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#c2c2c2] flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> {t('Gate Triggered', '门禁已触发')}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent"></div>
            </div>

            <ChatMessage 
              role="agent" 
              time="10:15 AM"
              content={t(
                "Removed the Team Leaderboard. I ran the consistency check, and it flagged a missing empty state for the Todo List module. Please review the Quality Check tab.",
                "已移除团队排行榜。我运行了一致性校验，发现待办列表模块缺少空状态定义。请查看质量检查标签页。"
              )}
            />
          </div>
          <div className="p-4 border-t border-white/10 bg-[#0a0a0a]/70">
            <div className="relative">
              <textarea 
                className="w-full bg-[#07111f] border border-white/15 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-white/20 text-[#ededed] placeholder:text-[#c2c2c2]/70" 
                placeholder={t("Clarify requirements or adjust prototype...", "澄清需求或调整原型...")}
                rows={3}
              ></textarea>
              <Button size="sm" className="absolute bottom-2 right-2 rounded-lg">{t('Send', '发送')}</Button>
            </div>
          </div>
        </div>

        {/* Right Pane: Artifacts */}
        <div className="flex-1 flex flex-col bg-[#0a0a0a]">
          <div className="h-14 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm flex px-4 gap-2 items-end pt-2 shrink-0">
            <TabButton active={activeTab === 'prd'} onClick={() => setActiveTab('prd')} icon={<FileText className="w-4 h-4" />} label={t("PRD Draft", "PRD 草案")} />
            <TabButton active={activeTab === 'prototype'} onClick={() => setActiveTab('prototype')} icon={<Code className="w-4 h-4" />} label={t("Prototype", "原型图")} />
            <TabButton active={activeTab === 'check'} onClick={() => setActiveTab('check')} icon={<CheckCircle className="w-4 h-4" />} label={t("Quality Check", "质量检查")} />
            <TabButton active={activeTab === 'trace'} onClick={() => setActiveTab('trace')} icon={<Activity className="w-4 h-4" />} label={t("Trace Log", "追踪日志")} />
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto h-full">
              {activeTab === 'prd' && <PRDStep />}
              {activeTab === 'prototype' && <PrototypeStep />}
              {activeTab === 'check' && <CheckStep />}
              {activeTab === 'trace' && <TraceStep onNext={() => onNavigate('baseDetail')} traceEvents={traceEvents} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ role, content, time }: { role: 'user' | 'agent', content: string, time: string }) {
  const isAgent = role === 'agent';
  return (
    <div className={`flex gap-3 ${isAgent ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isAgent ? 'bg-[#0d1b31] text-[#ededed] border border-white/15' : 'bg-zinc-800 text-white'}`}>
        {isAgent ? <Sparkles className="w-4 h-4" /> : <div className="text-xs font-semibold">PM</div>}
      </div>
      <div className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}>
        <div className={`p-3 rounded-2xl max-w-[320px] text-sm leading-relaxed ${isAgent ? 'bg-white border border-white/10 text-[#08142F] rounded-tl-sm shadow-sm' : 'bg-zinc-800 text-white rounded-tr-sm shadow-sm'}`}>
          {content}
        </div>
        <div className="text-[10px] text-[#8A96AD] mt-1 font-medium">{time}</div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium transition-colors border border-b-0 ${
        active ? 'bg-[#0d1b31] border-white/15 text-[#ededed]' : 'bg-transparent border-transparent text-[#c2c2c2] hover:text-[#ededed] hover:bg-white/10'
      }`}
      style={{ marginBottom: active ? '-1px' : '0' }}
    >
      {icon}
      {label}
    </button>
  );
}

function PRDStep() {
  const { lang, t } = useTranslation();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <Card className="col-span-2 p-8 overflow-auto shadow-sm flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-[#F0F4F8] pb-4 shrink-0">
          <FileText className="w-5 h-5 text-[#ededed]" />
          <h2 className="text-lg font-semibold text-[#08142F]">{t('PRD Draft', 'PRD 草案')}</h2>
        </div>
        
        <div className="flex-1 overflow-auto pr-4 space-y-6 text-[#08142F]">
          <div>
            <h3 className="font-semibold text-base mb-2">{t('1. Background & Goals', '1. 背景与目标')}</h3>
            <p className="text-[#5F6F8C] leading-relaxed">{t('Reduce context switching by providing a unified workspace for different roles.', '通过为不同角色提供统一的工作台，减少上下文切换。')}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-3">{t('2. Core Modules', '2. 核心模块')}</h3>
            
            <div className="space-y-4">
              <div className="bg-white border border-white/10 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#ededed] mb-1">{t('2.1 Metric Cards', '2.1 指标卡片')}</h4>
                <p className="text-sm text-[#5F6F8C]">{t('Display key metrics relevant to the user\'s role.', '展示与用户角色相关的核心指标。')}</p>
                
                {/* Simulated human edit */}
                <div className="mt-4 bg-amber-50/50 border border-amber-200 p-3 rounded-md text-sm flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-amber-700">PM</span>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-800 text-xs uppercase tracking-wider block mb-1">{t('Human Edit', '人工修改')}</span>
                    <ins className="no-underline text-[#08142F] block">{t('Added requirement: All metric cards must explicitly display their data source and refresh frequency (e.g., \'Real-time\', \'Hourly\').', '新增需求：所有指标卡片必须明确显示数据源和刷新频率（例如：“实时”、“每小时”）。')}</ins>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-white/10 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#ededed] mb-1">{t('2.2 Risk Alerts', '2.2 风险预警')}</h4>
                <p className="text-sm text-[#5F6F8C]">{t('Highlight pending items that require immediate attention.', '高亮显示需要立即关注的待处理事项。')}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6 border-t border-white/10 pt-6 shrink-0 items-center">
          <span className="text-xs text-[#8A96AD]">{t('Auto-saved 10:15 AM', '自动保存于 10:15 AM')}</span>
          <Button variant="outline" size="sm">{t('Edit Document', '编辑文档')}</Button>
        </div>
      </Card>
      
      <div className="space-y-4 flex flex-col">
        <Card className="p-6 bg-[#161616] text-white border border-white/10 shadow-none">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4 pb-3 border-b border-white/10 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {t('Active Skills', '已启用技能')}
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10"><CheckCircle className="w-4 h-4 text-emerald-400"/> {t('PRD Draft Skill v1.2', 'PRD 草案技能 v1.2')}</div>
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10 text-white/70"><CheckSquare className="w-4 h-4 text-[#ededed]"/> {t('Applied Workspace Template', '应用了工作台模板')}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PrototypeStep() {
  const { lang, t } = useTranslation();
  return (
    <Card className="flex flex-col h-full min-h-[500px] overflow-hidden bg-[#F4F8FF] shadow-sm">
      <div className="h-12 border-b border-white/10 bg-[#0a0a0a]/75 backdrop-blur-sm flex items-center px-4 justify-between shrink-0">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[#5F6F8C] flex items-center gap-2">
          <Code className="w-4 h-4" />
          {t('Role-based Workspace - Preview', '角色化工作台 - 预览')}
        </div>
        <div className="w-16"></div>
      </div>
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-5 flex flex-col justify-between bg-white shadow-sm border-white/60">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#5F6F8C]">{t('Total Tasks', '总任务数')}</div>
              <div className="text-3xl font-semibold text-[#08142F] mt-2">124</div>
            </Card>
            <Card className="p-5 relative flex flex-col justify-between bg-white shadow-sm border-amber-300 ring-2 ring-amber-400/20">
              <div className="absolute -top-3 -right-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-md flex items-center gap-1">
                <Search className="w-3 h-3" /> {t('Missing Source', '缺少来源')}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#5F6F8C]">{t('Conversion Rate', '转化率')}</div>
              <div className="text-3xl font-semibold text-[#08142F] mt-2">4.2<span className="text-lg text-[#5F6F8C] ml-1">%</span></div>
            </Card>
            <Card className="p-5 flex flex-col justify-between bg-white shadow-sm border-white/60">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#5F6F8C]">{t('Active Risks', '活跃风险')}</div>
              <div className="text-3xl font-semibold text-rose-500 mt-2">3</div>
            </Card>
          </div>
          <Card className="h-64 bg-white/50 border-dashed border-2 border-white/15 flex flex-col items-center justify-center text-[#8A96AD]">
            <LayoutGrid className="w-8 h-8 mb-3 opacity-50" />
            <div className="font-medium">{t('Todo List Module Placeholder', '待办列表模块占位符')}</div>
          </Card>
        </div>
      </div>
      <div className="bg-[#0a0a0a]/75 backdrop-blur-sm p-4 border-t border-white/10 flex justify-between shrink-0 items-center">
        <span className="text-xs text-[#8A96AD]">{t('Mapped to PRD Draft v2', '已映射至 PRD 草案 v2')}</span>
        <Button variant="outline" size="sm">{t('Open Sandbox', '打开沙盒')}</Button>
      </div>
    </Card>
  );
}

function CheckStep() {
  const { lang, t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
            <CheckCircle className="w-5 h-5 text-[#ededed]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#08142F]">{t('Consistency Check Report', '一致性校验报告')}</h2>
            <p className="text-sm text-[#5F6F8C]">{t('Evaluated against Quality Gates', '根据质量门禁评估')}</p>
          </div>
        </div>
        <Badge variant="warning">{lang === 'zh' ? '发现 3 个问题' : '3 Issues Found'}</Badge>
      </div>

      <Card className="overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F8FAFC] text-[#5F6F8C] border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{t('Issue', '问题')}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{t('Severity', '严重程度')}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{t('Recommendation', '建议')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F4F8] bg-white">
            <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
              <td className="px-6 py-5 font-medium text-[#08142F]">{t('Prototype missing empty/loading states for Todo List.', '原型图缺少待办列表的空状态/加载状态。')}</td>
              <td className="px-6 py-5"><Badge variant="warning">{t('High', '高')}</Badge></td>
              <td className="px-6 py-5 text-[#5F6F8C]">{t('Add comprehensive state coverage to the list module.', '为列表模块添加完整的状态覆盖。')}</td>
            </tr>
            <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
              <td className="px-6 py-5 font-medium text-[#08142F]">{t('PRD specifies Data Source for metrics, but Prototype lacks this field.', 'PRD 规定了指标的数据源，但原型图中缺少该字段。')}</td>
              <td className="px-6 py-5"><Badge variant="warning">{t('Medium', '中')}</Badge></td>
              <td className="px-6 py-5 text-[#5F6F8C]">{t('Update metric cards in prototype to include source tags.', '更新原型中的指标卡片，加入数据源标签。')}</td>
            </tr>
            <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
              <td className="px-6 py-5 font-medium text-[#08142F]">{t('AI generated a \'Team Leaderboard\' not defined in PRD.', 'AI 生成了 PRD 中未定义的“团队排行榜”。')}</td>
              <td className="px-6 py-5"><Badge variant="outline" className="bg-[#F4F8FF]">{t('Info', '提示')}</Badge></td>
              <td className="px-6 py-5 text-[#5F6F8C]">{t('Confirm with PM or remove unsupported assumption.', '与 PM 确认或移除该推测。')}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function TraceStep({ onNext, traceEvents }: { onNext: () => void, traceEvents: any[] }) {
  const { lang, t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-6 border-b border-white/10 pb-3 text-[#ededed]">{t('Event Trace', '事件追踪')}</h2>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-white/35 before:via-white/15 before:to-transparent">
          {traceEvents.map((tr, i) => (
            <div key={tr.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/15 bg-[#0d1b31] text-white text-[10px] font-bold shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {tr.timestamp.split(' ')[0]}
              </div>
              <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 shadow-sm hover:shadow-md transition-shadow bg-[rgba(212,212,212,0.1)] border-white/15">
                <div className="flex justify-between items-start mb-3 border-b border-white/10 pb-2">
                  <div className="text-sm font-semibold text-[#08142F]">{tr.eventType}</div>
                  <Badge variant="outline" className="text-[9px] py-0 h-4">{tr.step}</Badge>
                </div>
                <p className="text-sm text-[#5F6F8C] mb-3 leading-relaxed">{tr.description}</p>
                {tr.feedbackTag && (
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-white/10 border border-white/15 text-[10px] font-semibold uppercase tracking-wider text-[#ededed]">
                      Tag: {tr.feedbackTag}
                    </span>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-6 border-b border-white/10 pb-3 text-[#ededed]">{t('Optimization Candidates', '优化项分析')}</h2>
        <Card className="p-8 bg-[#161616] text-white border border-white/10 shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Play className="w-24 h-24" />
          </div>
          <div className="mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#ededed] mb-4">
              <Sparkles className="w-3 h-3" /> {t('Improvement Agent Insight', '智能体优化洞察')}
            </div>
            <p className="text-lg text-white/90 leading-relaxed font-medium">
              {t('62% of Workspace PRDs required manual addition of "Data Source & Refresh Frequency".', '62% 的工作台 PRD 均需要人工手动补充“数据源及刷新频率”。')} 
            </p>
          </div>
          
          <div className="border border-white/20 rounded-xl p-5 bg-white/5 mb-8 relative z-10 backdrop-blur-sm">
            <div className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              {t('Proposed Update: PRD Draft Skill v1.3', '提议更新：PRD 草案生成技能 v1.3')}
            </div>
            <ul className="text-sm text-[#ededed] space-y-2 font-mono">
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 shrink-0"/> {t('Add required "Data Source" section in template', '在模板中增加必填的“数据源”部分')}</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 shrink-0"/> {t('Require role visibility rules for widgets', '要求注明每个组件的角色可见性')}</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 shrink-0"/> {t('Mark unsupported solution assumptions as "Needs confirmation"', '将无依据的推测标记为“需要确认”')}</li>
            </ul>
          </div>
          
          <div className="flex justify-end gap-3 mt-6 relative z-10 border-t border-white/10 pt-6">
            <Button variant="ghost" className="text-white/60 hover:bg-white/10 hover:text-white">{t('Reject', '拒绝')}</Button>
            <Button className="bg-[#0d1b31] border border-white/15 text-white hover:bg-[#14345f] shadow-none" onClick={onNext}>{t('Approve to Base', '同意并合并至基座')}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
