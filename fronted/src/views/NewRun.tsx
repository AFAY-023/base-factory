import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpenCheck,
  Check,
  CheckCircle2,
  CircleAlert,
  FileSearch,
  FolderSearch,
  PlayCircle,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { getMockData } from '../data/mock';
import { useTranslation } from '../lib/i18n';
import {
  advanceRunStep,
  createDtcRun,
  createRunSetupMessages,
  submitRunSetupPrompt,
} from '../lib/runFlow';
import { RequirementType, RunDraft, RunMessage, ViewState } from '../types';
import { Badge, Button, Card } from '../components/ui';

const requirementIcons: Record<RequirementType, React.ReactNode> = {
  'quick-optimization': <Sparkles className="h-4 w-4" />,
  'marketing-calendar': <PlayCircle className="h-4 w-4" />,
  'functional-component': <FolderSearch className="h-4 w-4" />,
  'site-building': <FileSearch className="h-4 w-4" />,
  'strategic-project': <ShieldCheck className="h-4 w-4" />,
};

const demoDemand = {
  en: 'Add a Referral capability to the North America membership Hub, including a unique sharing link and visible reward history.',
  zh: '在北美会员 Hub 中新增 Referral 功能，包括专属分享链接和会员可查看的奖励记录。',
};

export function NewRun({ onNavigate, onStart }: { onNavigate: (view: ViewState) => void; onStart: (run: RunDraft) => void }) {
  const { lang, t } = useTranslation();
  const { baseProfile } = getMockData(lang);
  const isZh = lang === 'zh';
  const [messageDraft, setMessageDraft] = useState('');
  const [run, setRun] = useState<RunDraft>(() => ({
    ...createDtcRun({
      title: '',
      requirementType: 'functional-component',
      selectedSourceIds: ['constitution', 'prd-us-membership'],
    }),
    messages: createRunSetupMessages(lang),
  }));

  const selectedSources = baseProfile.knowledgeSources.filter((source) => run.selectedSourceIds.includes(source.id));
  const route = baseProfile.requirementTypes.find((type) => type.id === run.requirementType);
  const demandReady = run.title.trim().length > 0;
  const contextReady = run.selectedSourceIds.length > 0;
  const canStart = demandReady && contextReady && run.step === 3;

  const submitMessage = (content = messageDraft) => {
    if (!content.trim()) return;
    setRun((current) => submitRunSetupPrompt(current, content, lang));
    setMessageDraft('');
  };

  const continueFromDemand = () => {
    if (!demandReady) return;
    setRun((current) => submitRunSetupPrompt(current, current.title, lang));
  };

  const confirmContext = () => {
    if (!contextReady) return;
    setRun((current) => ({
      ...advanceRunStep(current),
      messages: [
        ...current.messages,
        {
          id: `setup-agent-context-${current.messages.length + 1}`,
          role: 'agent',
          timestamp: 'Now',
          content: isZh
            ? `已固定 ${current.selectedSourceIds.length} 条上下文。启动检查已就绪，请确认需求摘要与质量边界。`
            : `Pinned ${current.selectedSourceIds.length} context sources. Launch checks are ready; review the brief and quality boundaries.`,
        },
      ],
    }));
  };

  const startRun = () => {
    if (!canStart) return;
    onStart(advanceRunStep(run));
  };

  const toggleSource = (sourceId: string) => {
    setRun((current) => ({
      ...current,
      selectedSourceIds: current.selectedSourceIds.includes(sourceId)
        ? current.selectedSourceIds.filter((id) => id !== sourceId)
        : [...current.selectedSourceIds, sourceId],
    }));
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] font-sans text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#15243a]">
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="sm" aria-label={t('Back to base', '返回 Base')} className="h-9 w-9 shrink-0 p-0 text-white hover:bg-white/10" onClick={() => onNavigate('baseDetail')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-0">
              <div className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">Product Work Base / New Run</div>
              <h1 className="truncate text-base font-semibold text-white md:text-lg">{demandReady ? run.title : t('Start a new run', '启动新运行')}</h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Badge className="hidden border-white/10 bg-white/5 text-white/60 sm:inline-flex">DTC Workspace</Badge>
            <Badge className="border-[#2f72c8]/40 bg-[#173b66] text-[#cfe6ff]">{isZh ? `步骤 ${run.step} / 3` : `Step ${run.step} / 3`}</Badge>
          </div>
        </div>
      </header>

      <main className="grid min-h-[calc(100vh-64px)] grid-cols-1 md:grid-cols-[minmax(360px,42%)_minmax(0,1fr)]">
        <section className="flex min-h-[620px] flex-col border-b border-white/10 bg-[#181a1d] md:min-h-0 md:border-b-0 md:border-r">
          <div className="flex h-12 items-center justify-between border-b border-white/10 bg-[#30343a] px-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white"><Sparkles className="h-4 w-4 text-emerald-400" />Base Agent</div>
            <span className="text-[11px] text-white/45">{isZh ? '引导式启动' : 'Guided setup'}</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 md:max-h-[calc(100vh-204px)]">
            {run.messages.map((message) => <SetupMessage key={message.id} message={message} />)}
            {run.step === 1 && run.messages.length === 1 && (
              <button type="button" onClick={() => submitMessage(demoDemand[lang])} className="ml-11 flex items-center gap-2 rounded-md border border-[#2f72c8]/45 bg-[#102743] px-3 py-2 text-left text-xs text-[#cfe6ff] transition-colors hover:bg-[#173b66]">
                <PlayCircle className="h-3.5 w-3.5" />{isZh ? '使用演示需求' : 'Use demo requirement'}
              </button>
            )}
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
                    submitMessage();
                  }
                }}
                placeholder={run.step === 1
                  ? t('Describe the business problem...', '描述这次要解决的业务问题...')
                  : t('Add a rule, boundary, or acceptance criterion...', '补充规则、边界或验收条件...')}
                rows={2}
                className="min-h-11 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button type="button" aria-label={t('Send message', '发送消息')} onClick={() => submitMessage()} disabled={!messageDraft.trim()} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-400 text-[#10211d] transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="min-w-0 bg-[#0b0d10] md:max-h-[calc(100vh-64px)] md:overflow-y-auto">
          <div className="border-b border-white/10 bg-[#111315] px-4 md:px-6">
            <ol className="grid grid-cols-3" aria-label={t('Run setup progress', '运行配置进度')}>
              {[
                t('Demand input', '需求输入'),
                t('Context match', '上下文命中'),
                t('Launch check', '启动检查'),
              ].map((label, index) => {
                const step = (index + 1) as 1 | 2 | 3;
                const active = run.step === step;
                const complete = run.step > step;
                return <li key={label} className={`flex min-h-14 items-center gap-2 border-b-2 px-2 text-xs font-medium md:px-4 ${active ? 'border-emerald-400 bg-white/[0.035] text-white' : complete ? 'border-transparent text-emerald-300' : 'border-transparent text-white/35'}`}><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${complete ? 'bg-emerald-400 text-[#0b1713]' : active ? 'bg-[#1e5fae] text-white' : 'bg-white/10 text-white/45'}`}>{complete ? <Check className="h-3 w-3" /> : step}</span><span className="truncate">{label}</span></li>;
              })}
            </ol>
          </div>

          <div className="p-4 md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div><div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">Run Brief</div><p className="mt-1 text-sm text-white/65">{isZh ? 'Agent 对话与结构化配置会实时同步。' : 'Agent conversation and structured configuration stay in sync.'}</p></div>
              <Badge className={canStart ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300' : 'border-amber-300/20 bg-amber-300/10 text-amber-100'}>{canStart ? t('Ready to start', '可以启动') : t('Setup in progress', '配置中')}</Badge>
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_240px]">
              <div className="space-y-4">
                <Card className={`rounded-lg border-white/10 bg-[#171a1f] p-5 ${run.step === 1 ? 'ring-1 ring-[#2f72c8]/70' : ''}`}>
                  <SectionHeader icon={<BookOpenCheck className="h-4 w-4" />} title={t('Demand and route', '需求与路径')} status={demandReady ? t('Captured', '已记录') : t('Required', '必填')} complete={demandReady} />
                  <label className="mt-5 block text-xs font-medium text-white/55" htmlFor="run-demand">{t('Demand', '需求描述')}</label>
                  <textarea id="run-demand" value={run.title} onChange={(event) => setRun((current) => ({ ...current, title: event.target.value }))} placeholder={t('Describe the outcome and business scope...', '描述目标结果与业务范围...')} rows={3} className="mt-2 w-full resize-y rounded-md border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm leading-relaxed text-white outline-none transition focus:border-[#2f72c8]" />
                  <div className="mt-5 text-xs font-medium text-white/55">{t('Requirement route', '需求路径')}</div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {baseProfile.requirementTypes.map((type) => {
                      const selected = run.requirementType === type.id;
                      return <button key={type.id} type="button" aria-pressed={selected} onClick={() => setRun((current) => ({ ...current, requirementType: type.id }))} className={`flex items-start gap-2 rounded-md border p-3 text-left transition-colors ${selected ? 'border-[#2f72c8] bg-[#102743]' : 'border-white/10 bg-white/[0.025] hover:border-white/25'}`}><span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${selected ? 'bg-[#1e5fae] text-white' : 'bg-white/5 text-white/45'}`}>{requirementIcons[type.id]}</span><span><span className="block text-xs font-medium text-white">{type.label}</span><span className="mt-1 block text-[11px] leading-relaxed text-white/40">{type.description}</span></span></button>;
                    })}
                  </div>
                  {run.step === 1 && <div className="mt-5 flex justify-end"><Button disabled={!demandReady} onClick={continueFromDemand} className="bg-[#1e5fae] text-white hover:bg-[#2f72c8]">{t('Use this demand', '确认该需求')}</Button></div>}
                </Card>

                <Card className={`rounded-lg border-white/10 bg-[#171a1f] p-5 ${run.step === 2 ? 'ring-1 ring-[#2f72c8]/70' : ''}`}>
                  <SectionHeader icon={<FolderSearch className="h-4 w-4" />} title={t('Matched context', '命中的上下文')} status={`${run.selectedSourceIds.length} ${t('selected', '项已选')}`} complete={contextReady} />
                  <div className="mt-4 space-y-2">
                    {baseProfile.knowledgeSources.map((source) => {
                      const selected = run.selectedSourceIds.includes(source.id);
                      return <label key={source.id} className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors ${selected ? 'border-emerald-400/30 bg-emerald-400/[0.055]' : 'border-white/10 bg-white/[0.025] hover:border-white/25'}`}><input type="checkbox" checked={selected} onChange={() => toggleSource(source.id)} className="mt-0.5 h-4 w-4 accent-emerald-400" /><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-3"><span className="text-xs font-medium text-white">{source.name}</span><span className="text-[10px] uppercase text-white/35">{source.type}</span></span><span className="mt-1 block text-[11px] leading-relaxed text-white/45">{source.description}</span></span></label>;
                    })}
                  </div>
                  {run.step === 2 && <div className="mt-5 flex items-center justify-between gap-3"><Button variant="ghost" className="text-white/55" onClick={() => setRun((current) => ({ ...current, step: 1 }))}>{t('Back', '返回')}</Button><Button disabled={!contextReady} onClick={confirmContext} className="bg-[#1e5fae] text-white hover:bg-[#2f72c8]">{t('Confirm context', '确认上下文')}</Button></div>}
                </Card>
              </div>

              <aside className="space-y-4">
                <Card className="rounded-lg border-white/10 bg-[#131820] p-4">
                  <div className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-white/45">{t('Run summary', '运行摘要')}</div>
                  <SummaryItem label={t('Route', '路径')} value={route?.label ?? run.requirementType} />
                  <SummaryItem label={t('Boundary', '业务边界')} value={t('North America DTC', '北美 DTC')} />
                  <SummaryItem label={t('Sources', '资料')} value={`${selectedSources.length} ${t('pinned', '项固定')}`} />
                </Card>

                <Card className={`rounded-lg border-white/10 bg-[#131820] p-4 ${run.step === 3 ? 'ring-1 ring-emerald-400/45' : ''}`}>
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/45"><ShieldCheck className="h-4 w-4 text-emerald-400" />{t('Launch readiness', '启动检查')}</div>
                  <ReadinessRow label={t('Demand captured', '需求已记录')} complete={demandReady} />
                  <ReadinessRow label={t('Context pinned', '上下文已固定')} complete={contextReady} />
                  <ReadinessRow label={t('External boundaries flagged', '外部能力边界已标记')} complete={run.step === 3} />
                  <div className="mt-4 rounded-md border border-amber-300/20 bg-amber-300/[0.07] p-3 text-[11px] leading-relaxed text-amber-100"><CircleAlert className="mr-1.5 inline h-3.5 w-3.5" />{t('Antavo and Shopify capabilities remain confirmation items.', 'Antavo 与 Shopify 的能力仍保留为待确认项。')}</div>
                  {run.step === 3 && <Button disabled={!canStart} onClick={startRun} className="mt-4 w-full bg-emerald-400 text-[#10211d] hover:bg-emerald-300"><PlayCircle className="mr-2 h-4 w-4" />{t('Start run', '启动运行')}</Button>}
                </Card>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function SetupMessage({ message }: { key?: React.Key; message: RunMessage }) {
  const isPm = message.role === 'pm';
  return <div className={`flex gap-3 ${isPm ? 'flex-row-reverse' : ''}`}><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isPm ? 'bg-white/10 text-white' : 'bg-emerald-400/15 text-emerald-300'}`}>{isPm ? <UserRound className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}</div><div className={`flex max-w-[84%] flex-col ${isPm ? 'items-end' : 'items-start'}`}><div className={`rounded-lg border px-3.5 py-3 text-sm leading-relaxed ${isPm ? 'border-[#2f72c8]/45 bg-[#102743] text-white' : 'border-white/10 bg-[#292c31] text-white/85'}`}>{message.content}</div><span className="mt-1 px-1 text-[10px] text-white/30">{message.timestamp}</span></div></div>;
}

function SectionHeader({ icon, title, status, complete }: { icon: React.ReactNode; title: string; status: string; complete: boolean }) {
  return <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm font-semibold text-white"><span className="text-emerald-300">{icon}</span>{title}</div><span className={`flex items-center gap-1 text-[11px] ${complete ? 'text-emerald-300' : 'text-amber-100'}`}>{complete && <CheckCircle2 className="h-3.5 w-3.5" />}{status}</span></div>;
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-white/10 py-3 last:border-b-0"><div className="text-[10px] uppercase tracking-[0.08em] text-white/35">{label}</div><div className="mt-1 text-xs font-medium leading-relaxed text-white/80">{value}</div></div>;
}

function ReadinessRow({ label, complete }: { label: string; complete: boolean }) {
  return <div className="mb-3 flex items-center gap-2 text-xs text-white/65"><span className={`flex h-5 w-5 items-center justify-center rounded-full ${complete ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/5 text-white/25'}`}>{complete ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}</span>{label}</div>;
}
