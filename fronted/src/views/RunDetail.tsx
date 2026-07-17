import React, { useState } from 'react';
import {
  Activity,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  FileText,
  GitPullRequest,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { getMockData } from '../data/mock';
import { useTranslation } from '../lib/i18n';
import { approveImprovementProposal, submitRunPrompt } from '../lib/runFlow';
import { RunDraft, RunMessage, ViewState } from '../types';
import { Badge, Button, Card } from '../components/ui';

type ArtifactTab = 'prd' | 'prototype' | 'check' | 'trace';

export function RunDetail({ onNavigate, run }: { onNavigate: (view: ViewState) => void; run: RunDraft | null }) {
  const { lang, t } = useTranslation();
  const { sampleRun, traceEvents, artifactSnapshots, baseProfile, improvementProposal, skills } = getMockData(lang);
  const [activeTab, setActiveTab] = useState<ArtifactTab>('prd');
  const [proposal, setProposal] = useState(improvementProposal);
  const [messages, setMessages] = useState<RunMessage[]>(() => run?.messages?.length ? run.messages : getInitialConversation(lang === 'zh'));
  const [messageDraft, setMessageDraft] = useState('');
  const isZh = lang === 'zh';
  const runTitle = run?.title || sampleRun.title;
  const sourceIds = run?.selectedSourceIds ?? ['constitution', 'prd-us-membership'];
  const sources = baseProfile.knowledgeSources.filter((source) => sourceIds.includes(source.id));

  const sendMessage = () => {
    if (!messageDraft.trim()) return;
    setMessages((current) => submitRunPrompt(current, messageDraft, lang));
    setMessageDraft('');
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] font-sans text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#202124]">
        <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="sm" aria-label={t('Back to base', '返回 Base')} className="h-9 w-9 shrink-0 p-0 text-white hover:bg-white/10" onClick={() => onNavigate('baseDetail')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-0">
              <div className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">Product Work Base / Active Run</div>
              <h1 className="truncate text-base font-semibold text-white md:text-lg">{runTitle}</h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Badge className="hidden border-white/10 bg-white/10 text-white/70 sm:inline-flex">{isZh ? '迭代 1' : 'Iteration 1'}</Badge>
            <Badge className="border-amber-300/20 bg-amber-300/10 text-amber-100">{isZh ? '持续优化' : 'Improving'}</Badge>
          </div>
        </div>
      </header>

      <main className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-[minmax(360px,40%)_minmax(0,1fr)]">
        <section className="flex min-h-[640px] flex-col border-b border-white/10 bg-[#181a1d] lg:min-h-0 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#3a3a3a] px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white"><Sparkles className="h-4 w-4 text-emerald-400" />{isZh ? 'Base Agent' : 'Base Agent'}</div>
            <span className="text-[11px] text-white/45">{sources.length} {isZh ? '条上下文已命中' : 'sources matched'}</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 lg:max-h-[calc(100vh-204px)]">
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                {index === 3 && <TraceDivider isZh={isZh} />}
                <ChatMessage message={message} isZh={isZh} />
              </React.Fragment>
            ))}
          </div>

          <div className="border-t border-white/10 bg-[#15171a] p-4">
            <div className="flex items-end gap-2 rounded-lg border border-white/10 bg-[#23262a] p-2 focus-within:border-emerald-400/45">
              <textarea
                aria-label={isZh ? '向 Base Agent 发送消息' : 'Message Base Agent'}
                value={messageDraft}
                onChange={(event) => setMessageDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={isZh ? '补充需求、规则或验收条件...' : 'Add a requirement, rule, or acceptance criterion...'}
                rows={2}
                className="min-h-11 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button type="button" aria-label={isZh ? '发送消息' : 'Send message'} onClick={sendMessage} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-400 text-[#10211d] transition-colors hover:bg-emerald-300">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="min-w-0 bg-[#0b0d10]">
          <nav className="flex overflow-x-auto border-b border-white/10 bg-[#111315] px-3" role="tablist" aria-label={isZh ? '运行产物' : 'Run artifacts'}>
            <TabButton active={activeTab === 'prd'} icon={<FileText className="h-4 w-4" />} label={isZh ? 'PRD 草案' : 'PRD Draft'} onClick={() => setActiveTab('prd')} />
            <TabButton active={activeTab === 'prototype'} icon={<Code2 className="h-4 w-4" />} label={isZh ? '原型' : 'Prototype'} onClick={() => setActiveTab('prototype')} />
            <TabButton active={activeTab === 'check'} icon={<ShieldCheck className="h-4 w-4" />} label={isZh ? '质量门禁' : 'Quality Check'} onClick={() => setActiveTab('check')} />
            <TabButton active={activeTab === 'trace'} icon={<Activity className="h-4 w-4" />} label={isZh ? 'Trace 日志' : 'Trace Log'} onClick={() => setActiveTab('trace')} />
          </nav>

          <div className="p-4 md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-white/50"><span className="h-2 w-2 rounded-full bg-emerald-400" />{isZh ? '本次运行的资产已绑定到上下文与版本' : 'Artifacts are pinned to this run and its context'}</div>
              <div className="flex flex-wrap gap-2">
                {artifactSnapshots.slice(0, 3).map((artifact) => <span key={artifact.id} className="rounded border border-white/10 bg-white/[0.035] px-2 py-1 text-[10px] text-white/55">{artifact.name} <span className="text-white/90">{artifact.version}</span></span>)}
              </div>
            </div>

            {activeTab === 'prd' && <PrdPanel isZh={isZh} sources={sources} skills={skills.slice(0, 2)} />}
            {activeTab === 'prototype' && <PrototypePanel isZh={isZh} />}
            {activeTab === 'check' && <CheckPanel isZh={isZh} />}
            {activeTab === 'trace' && <TracePanel isZh={isZh} proposalApproved={proposal.status === 'approved'} traceEvents={traceEvents} onApprove={() => setProposal((current) => approveImprovementProposal(current))} />}
          </div>
        </section>
      </main>
    </div>
  );
}

function getInitialConversation(isZh: boolean): RunMessage[] {
  return isZh
    ? [
      { id: 'pm-1', role: 'pm', timestamp: '10:00 AM', content: '希望在北美会员 Hub 内新增 Referral 功能，让会员可以分享专属链接，并在好友订单发货后获得奖励。' },
      { id: 'agent-1', role: 'agent', timestamp: '10:02 AM', content: '已命中 DTC 业务宪章与美国会员体系 PRD。我会按“功能组件”路由生成草案，并保留 Antavo 与 Shopify 的能力边界待确认。' },
      { id: 'pm-2', role: 'pm', timestamp: '10:05 AM', content: '确认：取消或退款订单不计入推荐成功；奖励记录必须能让会员自行查看。' },
      { id: 'agent-2', role: 'agent', timestamp: '10:06 AM', content: '已将退款排除规则写入 PRD，并同步标记为原型展示与质量门禁的必检项。右侧已更新当前草案。' },
    ]
    : [
      { id: 'pm-1', role: 'pm', timestamp: '10:00 AM', content: 'Add a Referral capability to the North America membership Hub. Members should share a unique link and earn rewards after a referred order is fulfilled.' },
      { id: 'agent-1', role: 'agent', timestamp: '10:02 AM', content: 'I matched the DTC business constitution and US Membership PRD. I will use the functional-component route and keep Antavo and Shopify capability boundaries open for confirmation.' },
      { id: 'pm-2', role: 'pm', timestamp: '10:05 AM', content: 'Confirmed: cancelled or refunded orders must not count as referral success, and members need a visible reward history.' },
      { id: 'agent-2', role: 'agent', timestamp: '10:06 AM', content: 'Captured. The refund exclusion is now in the PRD and marked as required in both the prototype and quality gate.' },
    ];
}

function ChatMessage({ message, isZh }: { message: RunMessage; isZh: boolean }) {
  const isPm = message.role === 'pm';
  return <div className={`flex gap-3 ${isPm ? 'flex-row-reverse' : ''}`}>
    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${isPm ? 'bg-white/10 text-white' : 'bg-emerald-400/15 text-emerald-300'}`}>
      {isPm ? <UserRound className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
    </div>
    <div className={`min-w-0 max-w-[82%] ${isPm ? 'items-end' : 'items-start'} flex flex-col`}>
      <div className={`rounded-xl border px-3.5 py-3 text-sm leading-relaxed ${isPm ? 'border-white/15 bg-[#3d3d3d] text-white' : 'border-white/10 bg-[#292b2e] text-white/90'}`}>{message.content}</div>
      <span className="mt-1.5 px-1 text-[10px] text-white/35">{message.timestamp} {isPm ? (isZh ? 'PM' : 'PM') : 'Base Agent'}</span>
    </div>
  </div>;
}

function TraceDivider({ isZh }: { isZh: boolean }) {
  return <div className="flex items-center gap-3 py-1"><span className="h-px flex-1 bg-white/10" /><span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300"><Activity className="h-3 w-3" />{isZh ? 'Trace 已记录' : 'Trace captured'}</span><span className="h-px flex-1 bg-white/10" /></div>;
}

function TabButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button type="button" role="tab" aria-selected={active} onClick={onClick} className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition-colors ${active ? 'border-emerald-400 bg-white/[0.055] text-white' : 'border-transparent text-white/55 hover:text-white'}`}>{icon}{label}</button>;
}

function PrdPanel({ isZh, sources, skills }: { isZh: boolean; sources: Array<{ id: string; name: string; description: string }>; skills: Array<{ id: string; name: string; version: string; purpose: string }> }) {
  return <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_220px]">
    <Card className="rounded-xl border-white/10 bg-[#1b1d20] p-5 md:p-7">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-5"><div className="flex items-center gap-2"><FileText className="h-5 w-5 text-emerald-300" /><div><h2 className="font-semibold text-white">{isZh ? 'PRD 草案' : 'PRD Draft'}</h2><p className="mt-1 text-xs text-white/45">referral-prd.md · v0.1</p></div></div><Badge className="border-amber-300/20 bg-amber-300/10 text-amber-100">{isZh ? '待评审' : 'Needs review'}</Badge></div>
      <div className="space-y-7 text-sm leading-relaxed text-white/70">
        <DocSection title={isZh ? '1. 背景与目标' : '1. Background & Goals'}>{isZh ? '在北美会员 Hub 中提供统一的 Referral 入口、专属链接与奖励记录，降低会员分享路径的操作成本。' : 'Provide a unified referral entry, unique link, and reward history in the North America membership Hub.'}</DocSection>
        <DocSection title={isZh ? '2. 核心模块' : '2. Core Modules'}>
          <RequirementCard title={isZh ? '2.1 Referral 入口与专属链接' : '2.1 Referral Entry & Unique Link'} copy={isZh ? '仅对登录会员展示；支持复制链接并进入购买路径。' : 'Visible to signed-in members; supports copying a link into the purchase path.'} />
          <RequirementCard title={isZh ? '2.2 奖励记录与成功判定' : '2.2 Reward History & Success'} copy={isZh ? '订单发货后更新奖励；取消或退款订单不计入推荐成功。' : 'Rewards update after fulfillment; cancelled or refunded orders do not count as success.'} highlighted />
        </DocSection>
        <DocSection title={isZh ? '3. 待确认边界' : '3. Open Boundaries'}>{isZh ? 'Antavo 与 Shopify 的具体职责、字段来源和同步频率需要在开发前确认。' : 'Antavo and Shopify ownership, field sources, and refresh cadence need confirmation before development.'}</DocSection>
      </div>
    </Card>
    <aside className="space-y-4">
      <Card className="rounded-xl border-white/10 bg-[#1b1d20] p-4"><div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/60"><CheckCircle2 className="h-4 w-4 text-emerald-400" />{isZh ? '已启用技能' : 'Active Skills'}</div><div className="space-y-2">{skills.map((skill) => <div key={skill.id} className="rounded-lg border border-white/10 bg-white/[0.035] p-3"><div className="flex items-start gap-2"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /><div><div className="text-xs font-medium text-white">{skill.name} v{skill.version}</div><div className="mt-1 text-[11px] leading-relaxed text-white/45">{skill.purpose}</div></div></div></div>)}</div></Card>
      <Card className="rounded-xl border-white/10 bg-[#17191c] p-4"><div className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/60">{isZh ? '命中上下文' : 'Matched Context'}</div><div className="space-y-2">{sources.map((source) => <div key={source.id} className="rounded-md border border-white/10 bg-white/[0.025] p-2.5"><div className="text-xs font-medium text-white">{source.name}</div><div className="mt-1 text-[11px] leading-relaxed text-white/45">{source.description}</div></div>)}</div></Card>
    </aside>
  </div>;
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) { return <section><h3 className="mb-2 text-sm font-semibold text-white">{title}</h3><div>{children}</div></section>; }
function RequirementCard({ title, copy, highlighted = false }: { title: string; copy: string; highlighted?: boolean }) { return <div className={`mt-3 rounded-lg border p-4 ${highlighted ? 'border-amber-300/35 bg-amber-300/[0.09]' : 'border-white/10 bg-white/[0.045]'}`}><div className="font-medium text-white">{title}</div><p className="mt-1.5 text-sm leading-relaxed text-white/60">{copy}</p>{highlighted && <div className="mt-3 flex items-start gap-2 border-t border-amber-300/20 pt-3 text-xs text-amber-100"><UserRound className="mt-0.5 h-3.5 w-3.5 shrink-0" />{`Human edit: ${copy}`}</div>}</div>; }

function PrototypePanel({ isZh }: { isZh: boolean }) {
  const cards = isZh ? [['Referral 入口', '登录会员可见'], ['专属链接', '复制后进入购买链路'], ['奖励记录', '发货后更新']]
    : [['Referral entry', 'Visible to signed-in members'], ['Unique link', 'Moves into the purchase path'], ['Reward history', 'Updates after fulfillment']];
  return <Card className="overflow-hidden rounded-xl border-white/10 bg-[#1b1d20]"><div className="flex items-center justify-between border-b border-white/10 bg-[#272a2e] px-5 py-3"><div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div><span className="text-xs text-white/45">membership-hub / referral-hub.html</span></div><div className="p-5 md:p-8"><div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><div className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">Membership Hub</div><h2 className="mt-2 text-xl font-semibold text-white">{isZh ? '分享给朋友，解锁下一份奖励' : 'Share with a friend, unlock your next reward'}</h2></div><Button size="sm" className="bg-emerald-400 text-[#10211d] hover:bg-emerald-300">{isZh ? '复制推荐链接' : 'Copy referral link'}</Button></div><div className="grid gap-3 md:grid-cols-3">{cards.map(([title, copy]) => <div className="rounded-lg border border-white/10 bg-[#111315] p-4" key={title}><CheckCircle2 className="mb-5 h-5 w-5 text-emerald-400" /><div className="text-sm font-medium text-white">{title}</div><p className="mt-1.5 text-xs leading-relaxed text-white/50">{copy}</p></div>)}</div><div className="mt-4 rounded-lg border border-amber-300/25 bg-amber-300/[0.08] px-4 py-3 text-sm text-amber-100">{isZh ? '质量规则：取消或退款订单不会计入推荐成功。' : 'Quality rule: cancelled or refunded orders do not count as referral success.'}</div></div></Card>;
}

function CheckPanel({ isZh }: { isZh: boolean }) {
  const checks = isZh ? [['事实与范围', 'Antavo 与 Shopify 的职责边界仍需确认', '阻塞'], ['原型规则呈现', '退款订单排除规则已在原型中呈现', '通过'], ['状态覆盖', '奖励记录的空状态仍待补充', '待处理']]
    : [['Facts & scope', 'Antavo and Shopify ownership still needs confirmation', 'Blocked'], ['Prototype rules', 'The refund-exclusion rule is visible in the prototype', 'Passed'], ['State coverage', 'Reward history empty state still needs coverage', 'Pending']];
  return <Card className="rounded-xl border-white/10 bg-[#1b1d20] p-5 md:p-7"><div className="mb-6 flex items-center gap-3"><span className="rounded-lg bg-amber-300/10 p-2 text-amber-200"><ClipboardCheck className="h-5 w-5" /></span><div><h2 className="font-semibold text-white">{isZh ? '质量门禁报告' : 'Quality Gate Report'}</h2><p className="mt-1 text-sm text-white/50">{isZh ? '一个阻塞项需要确认后才能发布。' : 'One blocking item needs confirmation before release.'}</p></div></div><div className="space-y-3">{checks.map(([title, detail, status]) => <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 md:grid-cols-[160px_minmax(0,1fr)_auto] md:items-center" key={title}><div className="text-sm font-medium text-white">{title}</div><div className="text-sm leading-relaxed text-white/60">{detail}</div><StatusBadge status={status} /></div>)}</div></Card>;
}

function StatusBadge({ status }: { status: string }) { const passed = status === 'Passed' || status === '通过'; const blocked = status === 'Blocked' || status === '阻塞'; return <Badge className={passed ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300' : blocked ? 'border-amber-300/25 bg-amber-300/10 text-amber-100' : 'border-white/10 bg-white/5 text-white/60'}>{status}</Badge>; }

function TracePanel({ isZh, traceEvents, proposalApproved, onApprove }: { isZh: boolean; traceEvents: Array<{ id: string; timestamp: string; eventType: string; description: string; feedbackTag?: string }>; proposalApproved: boolean; onApprove: () => void }) {
  return <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_300px]"><Card className="rounded-xl border-white/10 bg-[#1b1d20] p-5 md:p-6"><div className="mb-5 flex items-center gap-2 text-sm font-semibold text-white"><Activity className="h-4 w-4 text-emerald-400" />{isZh ? '运行事件' : 'Run events'}</div><div className="space-y-3">{traceEvents.map((event) => <div className="flex gap-3" key={event.id}><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10"><Activity className="h-3 w-3 text-emerald-300" /></span><div className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.035] p-3"><div className="flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-medium text-white">{event.eventType}</span><span className="text-[11px] text-white/40">{event.timestamp}</span></div><p className="mt-1.5 text-sm leading-relaxed text-white/60">{event.description}</p>{event.feedbackTag && <span className="mt-2 inline-flex rounded bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-300">{event.feedbackTag}</span>}</div></div>)}</div></Card><Card className="rounded-xl border-emerald-400/20 bg-[#12211e] p-5"><div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white"><GitPullRequest className="h-4 w-4 text-emerald-400" />{isZh ? '合并到 Base' : 'Merge to Base'}</div><p className="rounded-lg border border-white/10 bg-black/10 p-3 text-sm leading-relaxed text-white/70">{isZh ? '将退款订单排除规则与外部能力确认项加入功能组件需求的默认质量检查。' : 'Add refund-order exclusions and external capability confirmation to the default checks for functional-component requests.'}</p><div className="my-4 flex items-center gap-2 text-xs text-white/50"><CheckCircle2 className="h-4 w-4 text-emerald-400" />{isZh ? '来自 4 次相似人工修订' : 'Attributed from 4 similar human edits'}</div>{proposalApproved ? <div className="flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-3 text-sm font-medium text-emerald-100"><CheckCircle2 className="h-4 w-4" />{isZh ? '已批准并合并至 v1.4' : 'Approved and merged to v1.4'}</div> : <Button className="w-full bg-emerald-400 text-[#10211d] hover:bg-emerald-300" onClick={onApprove}><CheckCircle2 className="mr-2 h-4 w-4" />{isZh ? '批准合并到 Base' : 'Approve and merge to Base'}</Button>}</Card></div>;
}
