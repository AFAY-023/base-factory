(() => {
  'use strict';
  const script = document.currentScript;
  const lang = script.dataset.lang;
  const page = script.dataset.page;
  const storageKey = 'base-site-language';
  const toolbar = document.createElement('div');
  toolbar.className = 'base-language-bar';
  const home = document.createElement('a');
  home.href = 'index.html';
  home.className = 'base-language-home';
  home.textContent = page === 'prototype' ? (lang === 'zh' ? '← 项目介绍' : '← Case study') : 'BASE / CASE STUDY';
  if (page === 'intro') home.setAttribute('aria-label', lang === 'zh' ? '回到介绍页开头' : 'Back to case study top');
  toolbar.append(home);
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', lang === 'zh' ? '界面语言' : 'Interface language');
  ['zh', 'en'].forEach(target => {
    const a = document.createElement('a');
    a.textContent = target === 'zh' ? '中文' : 'English';
    a.lang = target === 'zh' ? 'zh-CN' : 'en';
    a.hreflang = a.lang;
    a.href = '../' + target + '/' + (page === 'prototype' ? 'prototype.html' : 'index.html') + location.hash;
    a.dataset.language = target;
    if (target === lang) a.setAttribute('aria-current', 'true');
    a.setAttribute('aria-label', target === 'zh' ? '切换为中文' : 'Switch to English');
    a.addEventListener('click', event => {
      try { localStorage.setItem(storageKey, target); } catch (_) {}
      const currentSection = page === 'intro' && scrollY > 500 ? document.querySelector('.contents a[aria-current]')?.hash : null;
      a.href = '../' + target + '/' + (page === 'prototype' ? 'prototype.html' : 'index.html') + (currentSection || location.hash);
      if (target === lang) { event.preventDefault(); return; }
      const app = window.__baseApp;
      if (page === 'prototype' && app) {
        const s = app.state;
        const known = ['assistant', 'insight', 'collector', 'prototype', 'code'];
        const project = ['product', 'research'].includes(s.activeProject) ? s.activeProject : 'product';
        const detailProject = ['product', 'research'].includes(s.detail?.project) ? s.detail.project : 'product';
        const state = {
          view: s.view, activeAgent: known.includes(s.activeAgent) ? s.activeAgent : 'assistant',
          activeProject: project, detail: { ...s.detail, project: detailProject },
          builderAgent: known.includes(s.builder.agent) ? s.builder.agent : 'insight',
          marketMode: s.marketMode, marketTab: s.marketTab, projectMode: s.projectMode,
        };
        try { sessionStorage.setItem('base-language-nav', JSON.stringify({ target, state })); } catch (_) {}
      }
    });
    nav.append(a);
  });
  toolbar.append(nav);
  document.body.prepend(toolbar);
  function restoreNavigation() {
    const app = window.__baseApp;
    if (!app) return;
    try {
      const data = JSON.parse(sessionStorage.getItem('base-language-nav') || 'null');
      if (!data || data.target !== lang) return;
      sessionStorage.removeItem('base-language-nav');
      const { builderAgent, ...state } = data.state;
      app.setState(s => ({ ...state, modal: null, builder: { ...s.builder, agent: builderAgent }, v3: { ...s.v3, brief: null } }));
    } catch (_) {}
  }
  window.addEventListener('base-ready', restoreNavigation, { once: true });
  restoreNavigation();
  // Direct language URLs stay fixed. Only the root entry selects a language automatically.
})();
