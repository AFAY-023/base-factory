import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advanceRunStep,
  approveImprovementProposal,
  createRunSetupMessages,
  createDtcRun,
  submitRunSetupPrompt,
  submitRunPrompt,
} from './runFlow';

test('creates a DTC run with the selected knowledge sources pinned to the run', () => {
  const run = createDtcRun({
    title: 'North America Referral Program',
    requirementType: 'functional-component',
    selectedSourceIds: ['constitution', 'prd-us-membership'],
  });

  assert.equal(run.step, 1);
  assert.equal(run.status, 'draft');
  assert.deepEqual(run.selectedSourceIds, ['constitution', 'prd-us-membership']);
});

test('only starts a run after the confirmation step', () => {
  const draft = createDtcRun({
    title: 'North America Referral Program',
    requirementType: 'functional-component',
    selectedSourceIds: ['constitution'],
  });

  const review = advanceRunStep(advanceRunStep(draft));
  const started = advanceRunStep(review);

  assert.equal(review.step, 3);
  assert.equal(review.status, 'draft');
  assert.equal(started.status, 'reviewing');
  assert.equal(started.currentStep, 'clarify');
});

test('approves an improvement proposal exactly once', () => {
  const proposal = approveImprovementProposal({ id: 'proposal-prd-v13', status: 'pending' });

  assert.equal(proposal.status, 'approved');
  assert.throws(() => approveImprovementProposal(proposal), /already been approved/);
});

test('adds a PM prompt and an agent acknowledgement to the conversation', () => {
  const conversation = submitRunPrompt([], '确认退款订单不计入推荐成功', 'zh');

  assert.equal(conversation.length, 2);
  assert.equal(conversation[0].role, 'pm');
  assert.equal(conversation[0].content, '确认退款订单不计入推荐成功');
  assert.equal(conversation[1].role, 'agent');
  assert.match(conversation[1].content, /退款订单/);
});

test('starts the conversational setup with an agent prompt', () => {
  const messages = createRunSetupMessages('en');

  assert.equal(messages.length, 1);
  assert.equal(messages[0].role, 'agent');
  assert.match(messages[0].content, /business problem/i);
});

test('submitting the demand stores the conversation and advances to context matching', () => {
  const draft = createDtcRun({
    title: '',
    requirementType: 'functional-component',
    selectedSourceIds: ['constitution'],
  });

  const next = submitRunSetupPrompt(draft, 'Add referral rewards to the member hub', 'en');

  assert.equal(next.title, 'Add referral rewards to the member hub');
  assert.equal(next.step, 2);
  assert.equal(next.messages.at(-2)?.role, 'pm');
  assert.equal(next.messages.at(-1)?.role, 'agent');
  assert.match(next.messages.at(-1)?.content ?? '', /matched/i);
});
