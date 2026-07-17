import { ImprovementProposal, RequirementType, RunDraft, RunMessage } from '../types';

type CreateDtcRunInput = {
  title: string;
  requirementType: RequirementType;
  selectedSourceIds: string[];
};

export function createDtcRun(input: CreateDtcRunInput): RunDraft {
  return {
    ...input,
    messages: createRunSetupMessages('en'),
    step: 1,
    status: 'draft',
  };
}

export function createRunSetupMessages(lang: 'en' | 'zh'): RunMessage[] {
  return [{
    id: 'setup-agent-1',
    role: 'agent',
    timestamp: 'Now',
    content: lang === 'zh'
      ? '先告诉我这次要解决的业务问题。我会据此选择需求路径，并匹配 Product Work Base 中的资料。'
      : 'What business problem should this run solve? I will choose the requirement route and match the right Product Work Base sources.',
  }];
}

export function submitRunSetupPrompt(run: RunDraft, prompt: string, lang: 'en' | 'zh'): RunDraft {
  const content = prompt.trim();
  if (!content) return run;

  const messages = run.messages.length > 0 ? run.messages : createRunSetupMessages(lang);
  const sequence = messages.length + 1;
  const isDemandStep = run.step === 1;
  const reply = isDemandStep
    ? lang === 'zh'
      ? '需求已记录。我已命中 DTC 业务宪章和美国会员体系 PRD，请在右侧确认本次运行要固定的上下文。'
      : 'Demand captured. I matched the DTC Business Constitution and US Membership PRD. Confirm the sources to pin from the panel on the right.'
    : run.step === 2
      ? lang === 'zh'
        ? '这项补充已加入上下文。右侧会同步更新，确认资料后即可进入启动检查。'
        : 'I added that detail to the context. The brief on the right is updated; confirm the sources when ready.'
      : lang === 'zh'
        ? '已记录为启动条件。请检查右侧的就绪状态，确认后即可创建 Trace 并启动运行。'
        : 'Captured as a launch condition. Review readiness on the right, then start the run to create its first trace.';

  return {
    ...run,
    title: isDemandStep ? content : run.title,
    step: isDemandStep ? 2 : run.step,
    messages: [
      ...messages,
      { id: `setup-pm-${sequence}`, role: 'pm', content, timestamp: 'Now' },
      { id: `setup-agent-${sequence}`, role: 'agent', content: reply, timestamp: 'Now' },
    ],
  };
}

export function advanceRunStep(run: RunDraft): RunDraft {
  if (run.step === 1 || run.step === 2) {
    return { ...run, step: (run.step + 1) as 2 | 3 };
  }

  return {
    ...run,
    status: 'reviewing',
    currentStep: 'clarify',
  };
}

export function approveImprovementProposal(proposal: ImprovementProposal): ImprovementProposal {
  if (proposal.status === 'approved') {
    throw new Error('This proposal has already been approved.');
  }

  return { ...proposal, status: 'approved' };
}

export function submitRunPrompt(messages: RunMessage[], prompt: string, lang: 'en' | 'zh'): RunMessage[] {
  const content = prompt.trim();
  if (!content) return messages;

  const sequence = messages.length + 1;
  const reply = lang === 'zh'
    ? '已记录这项补充。我会将退款订单排除规则写入 PRD，并标记为原型与质量门禁的必检项。'
    : 'Captured. I will add the refund-order exclusion to the PRD and flag it as required for both the prototype and quality gate.';

  return [
    ...messages,
    { id: `pm-${sequence}`, role: 'pm', content, timestamp: 'Now' },
    { id: `agent-${sequence}`, role: 'agent', content: reply, timestamp: 'Now' },
  ];
}
