import React from 'react';
import { ViewState } from '../types';
import { Button, Card, Badge } from '../components/ui';
import { LayoutGrid, Settings, Activity, Plus } from 'lucide-react';
import { bases } from '../data/mock';
import { BusinessBase } from '../types';

export function BaseList({ onNavigate, onSelectBase, categoryFilter }: { onNavigate: (view: ViewState) => void, onSelectBase: (id: string) => void, categoryFilter?: string | null }) {
  const filteredBases = categoryFilter ? bases.filter(b => b.businessDomain === categoryFilter) : bases;

  return (
    <div className="min-h-screen bg-[#F4F8FF] text-[#08142F] p-8 flex flex-col font-sans">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <header className="flex items-center justify-between mb-10 pb-6 border-b border-[#DCE7F6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-white/60 flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-[#4A8DFF]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#08142F]">
                {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Workspace Bases` : 'Workspace Bases'}
              </h1>
              <p className="text-sm text-[#5F6F8C]">Manage and monitor your enterprise AI capability bases.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="bg-[#0d1b31]/85 text-[#ededed] border-white/15 hover:bg-[#14345f]"
              onClick={() => onNavigate('landing')}
            >
              Home
            </Button>
            <Button variant="outline" onClick={() => onNavigate('dashboard')}>Back to Dashboard</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          {filteredBases.map(base => (
            <BaseCard key={base.id} base={base} onClick={() => {
              onSelectBase(base.id);
              onNavigate('baseDetail');
            }} />
          ))}
          
          <Card className="p-6 border-dashed border-2 border-[#DCE7F6] bg-transparent hover:bg-white/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[250px] shadow-none" onClick={() => {}}>
            <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-[#DCE7F6] flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-[#4A8DFF]" />
            </div>
            <h3 className="font-semibold text-lg text-[#08142F]">Create New Base</h3>
            <p className="text-sm text-[#5F6F8C] mt-2 max-w-[240px]">Define a new workflow base for your business unit.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BaseCard({ base, onClick }: { key?: React.Key, base: BusinessBase, onClick: () => void }) {
  const isActive = base.status === 'active';
  
  return (
    <Card className="p-6 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all group flex flex-col" onClick={onClick}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#EEF5FF] border border-white flex items-center justify-center">
            <LayoutGrid className="w-6 h-6 text-[#4A8DFF]" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-[#08142F] group-hover:text-[#4A8DFF] transition-colors">{base.name}</h3>
            <div className="flex items-center gap-2 text-xs text-[#5F6F8C] mt-1">
              <span>{base.owner}</span>
              <span>•</span>
              <span className="font-mono">{base.version}</span>
            </div>
          </div>
        </div>
        <Badge variant={isActive ? 'success' : 'outline'}>{base.status}</Badge>
      </div>
      
      <p className="text-sm text-[#5F6F8C] mb-6 flex-1">{base.description}</p>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F0F4F8]">
        <div>
          <div className="text-xs text-[#8A96AD] mb-1">Active Skills</div>
          <div className="font-medium text-sm flex items-center gap-1.5 text-[#08142F]">
            <Settings className="w-3.5 h-3.5 text-[#4A8DFF]" />
            {base.builtInSkills.length} configured
          </div>
        </div>
        <div>
          <div className="text-xs text-[#8A96AD] mb-1">Recent Activity</div>
          <div className="font-medium text-sm flex items-center gap-1.5 text-[#08142F]">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            {base.recentRunIds.length} runs this week
          </div>
        </div>
      </div>
    </Card>
  );
}
