import React, { useState } from 'react';
import { ViewState } from './types';
import { Lang, LangContext } from './lib/i18n';
import { LandingPage } from './views/LandingPage';
import { Dashboard } from './views/Dashboard';
import { BaseList } from './views/BaseList';
import { BaseDetail } from './views/BaseDetail';
import { RunDetail } from './views/RunDetail';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedBaseId, setSelectedBaseId] = useState<string | null>(null);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>('en');

  return (
    <LangContext.Provider value={lang}>
      <div className="min-h-screen">
        {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} onSelectLang={setLang} currentLang={lang} />}
        {currentView === 'dashboard' && (
          <Dashboard 
            onNavigate={setCurrentView} 
            onSelectCategory={(cat) => setCategoryFilter(cat)} 
          />
        )}
        {currentView === 'baseList' && (
          <BaseList 
            onNavigate={setCurrentView} 
            onSelectBase={(id) => setSelectedBaseId(id)} 
            categoryFilter={categoryFilter}
          />
        )}
        {currentView === 'baseDetail' && (
          <BaseDetail 
            onNavigate={setCurrentView} 
            onSelectRun={(id) => setSelectedRunId(id)} 
          />
        )}
        {currentView === 'runDetail' && (
          <RunDetail 
            onNavigate={setCurrentView} 
          />
        )}
      </div>
    </LangContext.Provider>
  );
}
