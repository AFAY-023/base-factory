import React from 'react';
import { motion } from 'motion/react';
import { Button, Card } from '../components/ui';
import { ViewState } from '../types';
import { Lang } from '../lib/i18n';
import { ArrowRight, Layers, Workflow, CheckCircle, RefreshCcw, Database, Code2, Sparkles, Activity, FileText, Zap, ShieldCheck } from 'lucide-react';

export function LandingPage({ onNavigate, onSelectLang, currentLang }: { onNavigate: (view: ViewState) => void, onSelectLang: (lang: Lang) => void, currentLang: Lang }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans flex flex-col overflow-x-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-[720px] dimension-horizon pointer-events-none" />
      <div className="absolute top-[580px] left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#0a0a0a] pointer-events-none" />
      <div className="absolute top-[640px] left-0 right-0 h-px dimension-violet-wash opacity-70 pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,#000_0%,#000_56%,transparent_92%)] pointer-events-none" />

      {/* Navigation Layer */}
      <nav className="relative z-10 mt-6 flex w-[calc(100%-32px)] max-w-7xl items-center justify-between rounded-[19px] border border-white/15 bg-[#161616]/80 px-4 py-3 mx-auto backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-[var(--color-snow-white)] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#000000]" />
          </div>
          <span className="font-medium text-lg tracking-tight text-white">BaseFactory</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-[#c2c2c2]">
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm p-1 rounded-full border border-white/15">
            <button 
              className={`px-3 py-1.5 rounded-full transition-colors ${currentLang === 'en' ? 'bg-[var(--color-snow-white)] text-[#161616] font-medium' : 'hover:bg-white/10 text-[#c2c2c2]'}`}
              onClick={() => onSelectLang('en')}
            >
              EN
            </button>
            <button 
              className={`px-3 py-1.5 rounded-full transition-colors ${currentLang === 'zh' ? 'bg-[var(--color-snow-white)] text-[#161616] font-medium' : 'hover:bg-white/10 text-[#c2c2c2]'}`}
              onClick={() => onSelectLang('zh')}
            >
              中文
            </button>
          </div>
        </div>
      </nav>

      <main className="relative flex-1 flex flex-col px-6 md:px-12 pt-16 pb-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[560px]">
          {/* Left: Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161616]/70 backdrop-blur-md border border-white/15 rounded-full text-xs font-medium text-[#ededed] mb-8">
              <Layers className="w-4 h-4" />
              <span>{currentLang === 'zh' ? '企业级 AI 能力基座' : 'Enterprise AI Capability Base'}</span>
            </div>
            <h1 className="text-5xl md:text-[72px] leading-none font-medium tracking-[-0.035em] text-white mb-6">
              {currentLang === 'zh' ? (
                <>从孤立的 AI 工具走向 <br /> <span className="text-[#ededed]">可进化的业务基座</span></>
              ) : (
                <>From Isolated AI Tools to <br /><span className="text-[#ededed]">Evolvable Work Bases</span></>
              )}
            </h1>
            <p className="text-lg text-[#ededed]/85 leading-relaxed mb-10 max-w-lg">
              {currentLang === 'zh' 
                ? '为每个业务场景构建定制化的 AI 能力基座。将一次性的 AI 生成转化为持续的追踪、校验和组织学习循环。'
                : 'Build customizable AI bases for every business workflow. Turn one-off AI generations into a continuous loop of tracing, checking, and organizational learning.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => onNavigate('dashboard')}>
                {currentLang === 'zh' ? '启动交互式演示' : 'Launch Interactive Demo'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          <HeroShowcase currentLang={currentLang} />
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Workflow className="w-5 h-5 text-[#4A8DFF]" />}
            title={currentLang === 'zh' ? "语义层与规则引擎" : "Semantic Layer & Harness"}
            description={currentLang === 'zh' ? "映射企业业务对象、规则与操作，让 AI 在严格的边界内工作，而不仅仅是生成文本。" : "Map your business objects, rules, and actions so AI works within strict guardrails, not just generating text."}
          />
          <FeatureCard 
            icon={<CheckCircle className="w-5 h-5 text-emerald-500" />}
            title={currentLang === 'zh' ? "质量门禁与一致性" : "Quality Gates & Consistency"}
            description={currentLang === 'zh' ? "在人工审查前，自动验证 PRD 与原型之间的映射关系、状态覆盖和权限规则。" : "Automatically verify PRD-to-Prototype mapping, state coverage, and permission rules before human review."}
          />
          <FeatureCard 
            icon={<RefreshCcw className="w-5 h-5 text-amber-500" />}
            title={currentLang === 'zh' ? "追踪与持续进化" : "Trace & Evolve"}
            description={currentLang === 'zh' ? "捕获人类的修改作为学习信号，持续更新企业的专属技能库、模版和基座规则。" : "Capture human edits as learning signals to continuously update your skills, templates, and base rules."}
          />
        </div>

        {/* Value Proposition Section */}
        <div className="mt-32 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#08142F] mb-4">
              {currentLang === 'zh' ? '不仅仅是 AI 生成，而是企业级沉淀' : 'More Than AI Generation, It’s Enterprise Knowledge'}
            </h2>
            <p className="text-[#5F6F8C] max-w-2xl mx-auto text-lg">
              {currentLang === 'zh' 
                ? 'BaseFactory 连接设计与研发，让每个需求不再是孤岛，将 AI 的每一次交互转化为企业能力的持续增长。' 
                : 'BaseFactory connects design and engineering. Every requirement is no longer an island, turning every AI interaction into continuous growth of enterprise capability.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="w-12 h-12 bg-white/10 text-[#ededed] rounded-[10px] border border-white/10 flex items-center justify-center mb-6">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-[#08142F] mb-4">
                {currentLang === 'zh' ? '统一的上下文与一致性' : 'Unified Context & Consistency'}
              </h3>
              <p className="text-[#5F6F8C] leading-relaxed mb-6">
                {currentLang === 'zh'
                  ? '传统的 AI 工具往往生成一次性、碎片化的代码或文档，缺乏全局视野。通过抽象出 “Base” (基座)，我们将业务规则、UI 组件库、甚至安全规范都统一管理，确保每次生成的 PRD 与原型都高度一致。'
                  : 'Traditional AI tools often generate one-off, fragmented code or docs lacking a global view. By abstracting a "Base", we manage business rules, UI components, and security uniformly, ensuring generated PRDs and Prototypes are highly consistent.'}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[#08142F]"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {currentLang === 'zh' ? '连接设计与研发的鸿沟' : 'Bridge the gap between design and engineering'}</li>
                <li className="flex items-start gap-2 text-sm text-[#08142F]"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {currentLang === 'zh' ? '大幅降低上下文切换与对齐成本' : 'Significantly reduce context switching costs'}</li>
              </ul>
            </div>
            <ConsistencyPreview currentLang={currentLang} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <TraceFeedbackPreview currentLang={currentLang} />
            <div className="order-1 md:order-2">
              <div className="w-12 h-12 bg-white/10 text-[#ededed] rounded-[10px] border border-white/10 flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-[#08142F] mb-4">
                {currentLang === 'zh' ? '闭环的 Trace 与底座反馈' : 'Closed-Loop Trace & Feedback'}
              </h3>
              <p className="text-[#5F6F8C] leading-relaxed mb-6">
                {currentLang === 'zh'
                  ? '这是让企业真正“沉淀”价值的核心。当工程师或产品经理对 AI 生成的结果进行修改时，系统会通过 Trace 捕获这些偏差。优化智能体（Improvement Agent）会分析这些行为，并提议对底座技能或模板进行更新。'
                  : 'This is the core of true enterprise "accumulation". When engineers or PMs modify AI outputs, the system captures these deviations via Traces. The Improvement Agent analyzes these behaviors and proposes updates to base skills or templates.'}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[#08142F]"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> {currentLang === 'zh' ? '自动捕获人类微调与修改' : 'Automatically capture human edits'}</li>
                <li className="flex items-start gap-2 text-sm text-[#08142F]"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> {currentLang === 'zh' ? '反哺企业大模型资产库' : 'Feed back into enterprise asset library'}</li>
              </ul>
            </div>
          </div>
        </div>

        <DemoWalkthrough currentLang={currentLang} />
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 py-12 text-center text-[#c2c2c2]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-[4px] bg-[var(--color-snow-white)] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#000000]" />
            </div>
            <span className="font-medium text-lg text-[#ededed]">BaseFactory</span>
          </div>
          <p className="text-sm">© 2026 BaseFactory Inc. {currentLang === 'zh' ? '保留所有权利。' : 'All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="p-6 bg-[rgba(212,212,212,0.1)] border-white/15 hover:bg-white/15 transition-all hover:-translate-y-1 group">
      <div className="w-10 h-10 rounded-[10px] bg-white/10 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform [&_*]:text-[#ededed]">
        {icon}
      </div>
      <h3 className="text-base font-medium text-[#ededed] mb-2">{title}</h3>
      <p className="text-sm text-[#c2c2c2] leading-relaxed">{description}</p>
    </Card>
  );
}

function ConsistencyPreview({ currentLang }: { currentLang: Lang }) {
  const isZh = currentLang === 'zh';
  const checks = [
    { label: isZh ? '字段映射' : 'Field mapping', value: '18/18' },
    { label: isZh ? '状态覆盖' : 'State coverage', value: '5/5' },
    { label: isZh ? '权限边界' : 'Role gates', value: '4/4' }
  ];

  return (
    <div className="relative h-[340px] overflow-hidden rounded-[24px] border border-white/15 bg-[#07111f] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(27,65,127,0.34),transparent_42%)]" />
      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            {isZh ? '一致性扫描' : 'Consistency Scanner'}
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            {isZh ? '全部通过' : 'all clear'}
          </span>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#c2c2c2]">
              <FileText className="h-4 w-4" />
              PRD
            </div>
            {['Metric cards', 'Risk alerts', 'Todo states'].map((item, index) => (
              <div key={item} className="rounded-[12px] border border-white/10 bg-white/5 p-3">
                <div className="mb-2 h-1.5 w-3/4 rounded-full bg-[#d2d9df]/70" />
                <div className="flex items-center justify-between text-[10px] text-[#c2c2c2]">
                  <span>{item}</span>
                  <span className="font-mono">0{index + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="h-14 w-px bg-gradient-to-b from-transparent via-emerald-400/60 to-transparent" />
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 p-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="h-14 w-px bg-gradient-to-b from-transparent via-emerald-400/60 to-transparent" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#c2c2c2]">
              <Code2 className="h-4 w-4" />
              {isZh ? '原型' : 'Prototype'}
            </div>
            {['Widget source', 'Empty state', 'Role visibility'].map((item) => (
              <div key={item} className="rounded-[12px] border border-white/10 bg-[#0d1b31]/80 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <div className="h-1.5 flex-1 rounded-full bg-[#d2d9df]/70" />
                </div>
                <div className="text-[10px] text-[#c2c2c2]">{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {checks.map((check) => (
            <div key={check.label} className="rounded-[10px] border border-white/10 bg-white/5 px-3 py-2">
              <div className="text-[10px] text-[#c2c2c2]">{check.label}</div>
              <div className="mt-1 text-sm font-semibold text-white">{check.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TraceFeedbackPreview({ currentLang }: { currentLang: Lang }) {
  const isZh = currentLang === 'zh';
  const events = [
    { tag: 'TRACE', text: isZh ? 'PM 补充数据来源' : 'PM added data source' },
    { tag: 'LEARN', text: isZh ? '归因到 PRD Skill' : 'Attributed to PRD Skill' },
    { tag: 'UPDATE', text: isZh ? '生成 v1.3 候选' : 'Generated v1.3 candidate' }
  ];

  return (
    <div className="order-2 md:order-1 relative h-[340px] overflow-hidden rounded-[24px] border border-white/15 bg-[#07111f] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_0%,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_100%_70%,rgba(27,65,127,0.35),transparent_42%)]" />
      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Activity className="h-4 w-4 text-emerald-400" />
            {isZh ? 'Trace 回流' : 'Trace Feedback'}
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-[#c2c2c2]">
            {isZh ? '可沉淀候选' : 'asset candidate'}
          </span>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.tag} className="rounded-[12px] border border-white/10 bg-white/5 p-3">
                <div className="mb-1 font-mono text-[10px] text-emerald-300">{event.tag}</div>
                <div className="text-xs font-medium text-white">{event.text}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
            <div className="rounded-full border border-white/15 bg-[#0d1b31] p-2">
              <ArrowRight className="h-4 w-4 text-[#ededed]" />
            </div>
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
          </div>

          <div className="rounded-[18px] border border-emerald-400/25 bg-emerald-400/10 p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-emerald-300">
              <RefreshCcw className="h-4 w-4" />
              {isZh ? '底座升级建议' : 'Base update proposal'}
            </div>
            <div className="text-xl font-semibold text-white">PRD Skill v1.3</div>
            <div className="mt-3 space-y-2 text-xs text-[#c2c2c2]">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                {isZh ? '新增数据来源必填项' : 'Require data source'}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                {isZh ? '强化 AI 越界假设检查' : 'Guard unsupported assumptions'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ['62%', isZh ? '同类补充' : 'repeat edits'],
            ['4', isZh ? '评审意见' : 'review notes'],
            ['1', isZh ? '升级候选' : 'proposal']
          ].map(([value, label]) => (
            <div key={label} className="rounded-[10px] border border-white/10 bg-white/5 px-3 py-2">
              <div className="text-sm font-semibold text-white">{value}</div>
              <div className="text-[10px] text-[#c2c2c2]">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroShowcase({ currentLang }: { currentLang: Lang }) {
  const isZh = currentLang === 'zh';
  return (
    <div className="relative min-h-[520px] w-full [perspective:1200px]">
      <div className="absolute inset-0 rounded-[42px] bg-[#07111f]/40 blur-3xl" />
      <motion.div
        className="absolute right-0 top-8 w-[94%] overflow-hidden rounded-[28px] border border-white/15 bg-[#07111f]/90 shadow-[0_36px_120px_rgba(0,0,0,0.55)] [transform:rotateX(7deg)_rotateY(-10deg)]"
        initial={{ opacity: 0, y: 34, rotateX: 3 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0a0a0a]/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-[#c2c2c2]">
            {isZh ? '实时底座指挥台' : 'Live Base Console'}
          </div>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src="/demo-shots/dashboard-overview.png"
            alt={isZh ? '企业 AI 底座管理台截图' : 'Enterprise AI base console screenshot'}
            className="h-full w-full object-cover object-top opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07111f]/15 via-transparent to-[#07111f]/60" />
          <div className="demo-scanline absolute inset-x-0 h-24 pointer-events-none" />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-2 top-24 w-48 rounded-[18px] border border-white/15 bg-[#0d1b31]/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md"
        initial={{ opacity: 0, x: -28, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white">
          <ShieldCheck className="h-4 w-4" />
          {isZh ? '质量门命中' : 'Gate Triggered'}
        </div>
        <div className="text-3xl font-semibold text-white">94%</div>
        <div className="mt-1 text-xs leading-relaxed text-[#c2c2c2]">
          {isZh ? 'PRD / Prototype 一致性通过率' : 'PRD / prototype consistency pass rate'}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-14 left-16 w-[62%] overflow-hidden rounded-[22px] border border-white/15 bg-[#161616]/90 shadow-[0_28px_90px_rgba(0,0,0,0.5)] backdrop-blur-md"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Activity className="h-4 w-4" />
            Trace to Base
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-[#c2c2c2]">
            {isZh ? '候选资产' : 'asset candidate'}
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 p-4">
          <div className="rounded-[12px] border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] uppercase tracking-wider text-[#c2c2c2]">{isZh ? '高频修改' : 'Recurring edit'}</div>
            <div className="mt-2 text-sm font-medium text-white">{isZh ? '补充数据来源' : 'Add data source'}</div>
          </div>
          <ArrowRight className="h-4 w-4 text-[#c2c2c2]" />
          <div className="rounded-[12px] border border-white/10 bg-[#0d1b31] p-3">
            <div className="text-[10px] uppercase tracking-wider text-[#c2c2c2]">{isZh ? '底座升级' : 'Base upgrade'}</div>
            <div className="mt-2 text-sm font-medium text-white">PRD Skill v1.3</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-8 bottom-2 w-44 rounded-[18px] border border-white/15 bg-white/10 p-4 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white">
          <Database className="h-4 w-4" />
          {isZh ? '沉淀资产' : 'Assets captured'}
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-semibold text-white">34</span>
          <span className="pb-1 text-xs text-[#c2c2c2]">+15</span>
        </div>
      </motion.div>
    </div>
  );
}

function DemoWalkthrough({ currentLang }: { currentLang: Lang }) {
  const isZh = currentLang === 'zh';
  const proofSteps = [
    {
      label: isZh ? '输入' : 'Input',
      detail: isZh ? '一句话需求与业务背景材料' : 'One-line demand and business context',
      icon: Layers
    },
    {
      label: isZh ? '澄清' : 'Clarify',
      detail: isZh ? '补齐角色、范围、验收与边界' : 'Fill role, scope, acceptance, and boundary gaps',
      icon: Sparkles
    },
    {
      label: 'PRD',
      detail: isZh ? '生成结构化草稿并记录人工修改' : 'Generate a structured draft and record human edits',
      icon: FileText
    },
    {
      label: isZh ? '原型' : 'Prototype',
      detail: isZh ? '映射页面、组件、字段和状态' : 'Map pages, components, fields, and states',
      icon: Code2
    },
    {
      label: isZh ? '质量门' : 'Quality Gate',
      detail: isZh ? '检查 PRD 与原型一致性' : 'Check PRD-to-prototype consistency',
      icon: ShieldCheck
    },
    {
      label: 'Trace',
      detail: isZh ? '把采纳、驳回和修改转成可学习信号' : 'Turn edits, adoption, and rejection into learning signals',
      icon: Activity
    },
    {
      label: isZh ? '优化' : 'Improve',
      detail: isZh ? '沉淀为模板、规则、Skill 或质量门候选' : 'Promote candidates into templates, rules, skills, or gates',
      icon: RefreshCcw
    }
  ];

  const layers = [
    {
      title: isZh ? '业务语义层' : 'Semantic Layer',
      copy: isZh ? 'Demand、PRD、Prototype、Page、Field 和 Trace Run 的对象关系。' : 'Object links across Demand, PRD, Prototype, Page, Field, and Trace Run.',
      icon: Database
    },
    {
      title: 'Context Layer',
      copy: isZh ? '历史 PRD、页面规范、指标口径、角色权限和组件规范。' : 'Historical PRDs, page guidelines, metric glossary, roles, and component rules.',
      icon: Layers
    },
    {
      title: 'Harness',
      copy: isZh ? '串起输入约束、上下文组装、工具调用、质量检查和人工确认。' : 'Orchestrates input constraints, context assembly, tools, gates, and human checkpoints.',
      icon: Workflow
    },
    {
      title: 'Skill / Agent',
      copy: isZh ? '澄清、PRD、原型、检查、归因和优化建议的可版本化能力。' : 'Versioned skills for clarification, PRD, prototype, checks, attribution, and improvement.',
      icon: Zap
    },
    {
      title: 'Trace / Eval',
      copy: isZh ? '记录修改、采纳、驳回和复发问题，用于评估底座是否变好。' : 'Records edits, adoption, rejection, and recurring issues to judge whether the base improves.',
      icon: Activity
    }
  ];

  return (
    <motion.section
      className="mt-28 space-y-10"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-[#ededed] mb-5">
            <Activity className="w-4 h-4" />
            {isZh ? '可点击 Demo 证明链' : 'Clickable Demo Proof Chain'}
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.02em] text-white">
            {isZh ? '不是一个生成器，而是一条可回流的企业工作链路' : 'Not a generator. A work loop that feeds the enterprise base.'}
          </h2>
        </div>
        <p className="max-w-md text-sm md:text-base text-[#c2c2c2] leading-relaxed">
          {isZh
            ? '第一版用 Product Work Base 作为样板间，演示角色化业务工作台如何从模糊需求走到 PRD、原型、一致性检查、Trace 和底座优化。'
            : 'The first version uses Product Work Base as the reference implementation, showing how a role-based workspace moves from vague demand into PRD, prototype, consistency checks, trace, and base optimization.'}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.2fr] gap-6">
        <Card className="dimension-navy-panel p-6 md:p-8 border-white/15 overflow-hidden">
          <div className="mb-8">
            <div>
              <h3 className="text-xl font-medium text-white">{isZh ? '核心证明链' : 'Core Proof Chain'}</h3>
              <p className="text-sm text-[#c2c2c2] mt-2">{isZh ? '每一步都在 Run 详情里可见。' : 'Each step is visible inside a run detail.'}</p>
            </div>
          </div>
          <div className="relative space-y-4">
            <div className="absolute left-5 top-8 bottom-8 w-px proof-flow-line rounded-full" />
            {proofSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  className="relative z-10 flex items-start gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                >
                  <div className="w-10 h-10 rounded-[10px] border border-white/15 bg-[#0d1b31] flex items-center justify-center shrink-0 shadow-[0_0_0_4px_rgba(7,17,31,0.9)]">
                    <Icon className="w-4 h-4 text-[#ededed]" />
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-medium text-white">{step.label}</div>
                    <div className="text-xs text-[#c2c2c2] leading-relaxed">{step.detail}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScreenshotFrame
            alt={isZh ? '底座管理台预览' : 'Dashboard preview'}
            caption={isZh ? '多业务底座、资产沉淀、Trace 和分类入口。' : 'Business bases, asset precipitation, traces, and category entry points.'}
            src="/demo-shots/dashboard-overview.png"
          />
          <ScreenshotFrame
            alt={isZh ? '运行详情预览' : 'Run preview'}
            caption={isZh ? '一次运行内的 PRD、原型、质量检查与 Trace。' : 'PRD, prototype, quality check, and trace inside one run.'}
            src="/demo-shots/run-detail.png"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <Card key={layer.title} className="p-5 bg-[rgba(212,212,212,0.1)] border-white/15">
              <div className="w-9 h-9 rounded-[10px] bg-[#0d1b31] border border-white/15 flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-[#ededed]" />
              </div>
              <h3 className="text-sm font-medium text-white mb-2">{layer.title}</h3>
              <p className="text-xs leading-relaxed text-[#c2c2c2]">{layer.copy}</p>
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
}

function ScreenshotFrame({ alt, caption, src }: { alt: string, caption: string, src: string }) {
  return (
    <Card className="overflow-hidden bg-[rgba(212,212,212,0.1)] border-white/15">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="text-xs text-[#c2c2c2] leading-relaxed">{caption}</div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="relative aspect-[16/11] overflow-hidden bg-[#07111f]">
        <img src={src} alt={alt} className="h-full w-full object-cover object-top opacity-95" />
        <div className="demo-scanline absolute inset-x-0 h-20 pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
      </div>
    </Card>
  );
}
