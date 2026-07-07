import React from 'react';
import { ViewState } from '../types';
import { Button, Card, Badge } from '../components/ui';
import { LayoutGrid, TrendingUp, FileBox, Database, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { getMockData } from '../data/mock';
import { useTranslation } from '../lib/i18n';
import { EnterpriseGraph } from '../components/EnterpriseGraph';

export function Dashboard({ onNavigate, onSelectCategory }: { onNavigate: (view: ViewState) => void, onSelectCategory: (cat: string) => void }) {
  const { lang, t } = useTranslation();
  const { bases } = getMockData(lang);

  const totalBases = bases.length;
  const activeRuns = 12;
  const newAssets = 34;
  const trendBars = [
    { height: 40, fill: 'from-[#0d1b31] via-[#1b417f] to-[#6f879d]' },
    { height: 65, fill: 'from-[#0d1b31] via-[#24518f] to-[#9fb2c6]' },
    { height: 45, fill: 'from-[#07111f] via-[#183866] to-[#6f879d]' },
    { height: 80, fill: 'from-[#0d1b31] via-[#2f5f9b] to-[#b8c7d6]' },
    { height: 55, fill: 'from-[#07111f] via-[#1b417f] to-[#7f96aa]' },
    { height: 90, fill: 'from-[#0d1b31] via-[#3468a6] to-[#d2d9df]' },
    { height: 75, fill: 'from-[#0d1b31] via-[#294f7d] to-[#a7b9c9]' }
  ];

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    onNavigate('baseList');
  };

  return (
    <div className="min-h-screen bg-[#F4F8FF] text-[#08142F] p-8 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-[#DCE7F6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d1b31] shadow-sm border border-white/15 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#ededed]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#08142F]">{t('Enterprise Overview', '企业总览')}</h1>
              <p className="text-sm text-[#5F6F8C]">{t('Global state of AI capability bases and generated assets.', 'AI 能力基座及生成资产的全局状态。')}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-[#0d1b31]/85 text-[#ededed] border-white/15 hover:bg-[#14345f]"
            onClick={() => onNavigate('landing')}
          >
            {t('Home', '首页')}
          </Button>
        </header>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="relative overflow-hidden p-6 bg-[#0d1b31]/75 border-white/15">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#07111f] via-[#1b417f] to-[#d2d9df]/70" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#07111f] border border-white/15 flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-[#ededed]" />
              </div>
              <Badge variant="success">{t('Healthy', '健康')}</Badge>
            </div>
            <div className="text-3xl font-semibold text-[#08142F] mb-1">{totalBases}</div>
            <div className="text-sm font-medium text-[#5F6F8C]">{t('Total Bases', '基座总数')}</div>
          </Card>
          
          <Card className="relative overflow-hidden p-6 bg-[#0d1b31]/75 border-white/15">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#07111f] via-[#1b417f] to-[#d2d9df]/70" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#07111f] border border-white/15 flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#ededed]" />
              </div>
              <span className="text-xs font-semibold text-[#c2c2c2] flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +22%</span>
            </div>
            <div className="text-3xl font-semibold text-[#08142F] mb-1">{activeRuns}</div>
            <div className="text-sm font-medium text-[#5F6F8C]">{t('Active Runs Today', '今日活跃运行')}</div>
          </Card>

          <Card className="relative overflow-hidden p-6 bg-[#0d1b31]/75 border-white/15">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#07111f] via-[#1b417f] to-[#d2d9df]/70" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#07111f] border border-white/15 flex items-center justify-center">
                <FileBox className="w-5 h-5 text-[#ededed]" />
              </div>
              <span className="text-xs font-semibold text-[#c2c2c2] flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +15</span>
            </div>
            <div className="text-3xl font-semibold text-[#08142F] mb-1">{newAssets}</div>
            <div className="text-sm font-medium text-[#5F6F8C]">{t('New Assets Precipitated', '新沉淀资产')}</div>
          </Card>

          <Card className="relative overflow-hidden p-6 bg-[#0d1b31]/75 border-white/15">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#07111f] via-[#1b417f] to-[#d2d9df]/70" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#07111f] border border-white/15 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#ededed]" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-[#08142F] mb-1">94%</div>
            <div className="text-sm font-medium text-[#5F6F8C]">{t('Quality Gate Pass Rate', '质量门禁通过率')}</div>
          </Card>
        </div>

        {/* Chart & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2 p-6 bg-[#0d1b31]/60 border-white/15 flex flex-col h-[350px] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#08142F]">{t('Asset Precipitation Trend', '资产沉淀趋势')}</h3>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#c2c2c2]">
                <span className="h-2 w-8 rounded-full bg-gradient-to-r from-[#0d1b31] via-[#1b417f] to-[#d2d9df]" />
                Base assets
              </div>
            </div>
            <div className="flex-1 relative flex items-end justify-between px-4 pb-2 border-b border-white/10">
              {/* CSS Bar Chart Simulation */}
              {trendBars.map((bar, i) => (
                <div key={i} className="flex h-full flex-col items-center justify-end gap-2 group">
                  <div
                    className={`w-12 rounded-t-sm bg-gradient-to-t ${bar.fill} opacity-90 shadow-[0_0_18px_rgba(27,65,127,0.24)] ring-1 ring-white/10 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-110`}
                    style={{ height: `${bar.height}%` }}
                  ></div>
                  <span className="text-xs text-[#5F6F8C] font-mono">{t(`Day ${i+1}`, `第 ${i+1} 天`)}</span>
                </div>
              ))}
              {/* Grid Lines */}
              <div className="absolute left-0 right-0 bottom-1/4 h-px border-t border-dashed border-white/10 pointer-events-none"></div>
              <div className="absolute left-0 right-0 bottom-2/4 h-px border-t border-dashed border-white/10 pointer-events-none"></div>
              <div className="absolute left-0 right-0 bottom-3/4 h-px border-t border-dashed border-white/10 pointer-events-none"></div>
            </div>
          </Card>
          
          <Card className="col-span-1 p-6 bg-[#0d1b31]/45 border-white/15 flex flex-col h-[350px]">
            <h3 className="text-lg font-semibold text-[#08142F] mb-4">{t('Recent Traces', '近期追踪')}</h3>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {[
                { time: '10:15', msg: t('Prototype consistency checked.', '已完成原型一致性校验。'), domain: t('Product', '产品') },
                { time: '09:32', msg: t('New skill rule added via trace feedback.', '通过追踪反馈添加了新的规则技能。'), domain: t('Market', '市场') },
                { time: '08:45', msg: t('12 new PRD templates generated.', '生成了 12 份新 PRD 模板。'), domain: t('Product', '产品') },
                { time: '08:10', msg: t('Quality gate updated for Risk Base.', '风险基座的质量门禁已更新。'), domain: t('Risk', '风险') }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-12 text-[#8A96AD] font-mono shrink-0">{item.time}</div>
                  <div>
                    <div className="text-[#08142F] font-medium mb-0.5">{item.msg}</div>
                    <Badge variant="outline" className="text-[9px] py-0">{item.domain}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Enterprise Capability Graph */}
        <div className="mb-8">
          <EnterpriseGraph />
        </div>

        {/* Bases Categories */}
        <h3 className="text-lg font-semibold text-[#08142F] mb-4">{t('Workspace Categories', '工作空间分类')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard 
            title={t("Product & Engineering", "产品与研发")}
            count={2} 
            description={t("Manage PRDs, design prototypes, and engineering requirements.", "管理 PRD、设计原型以及研发需求规范。")}
            onClick={() => handleCategoryClick('product')}
            icon={<Database className="w-5 h-5 text-[#ededed]" />}
            lang={lang}
          />
          <CategoryCard 
            title={t("Market & Operations", "市场与运营")}
            count={1} 
            description={t("Competitor analysis, campaign briefs, and ops workflows.", "竞品分析、营销物料和运营自动化流程。")}
            onClick={() => handleCategoryClick('market')}
            icon={<TrendingUp className="w-5 h-5 text-[#ededed]" />}
            lang={lang}
          />
          <CategoryCard 
            title={t("Risk & Compliance", "风控与合规")}
            count={1} 
            description={t("Audits, policy checking, and regulation tracking.", "业务审核、政策校验与合规追踪。")}
            onClick={() => handleCategoryClick('risk')}
            icon={<ShieldCheck className="w-5 h-5 text-[#ededed]" />}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ title, count, description, onClick, icon, lang }: { title: string, count: number, description: string, onClick: () => void, icon: React.ReactNode, lang: 'en' | 'zh' }) {
  return (
    <Card className="p-6 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(27,65,127,0.18)] transition-all group" onClick={onClick}>
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#0d1b31] border border-white/15 flex items-center justify-center [&_*]:text-[#ededed]">
          {icon}
        </div>
        <Badge variant="outline">{count} {lang === 'zh' ? '个基座' : 'Bases'}</Badge>
      </div>
      <h3 className="font-semibold text-lg text-[#08142F] group-hover:text-[#d2d9df] transition-colors">{title}</h3>
      <p className="text-sm text-[#5F6F8C] mt-2 leading-relaxed">{description}</p>
      <div className="flex items-center gap-1 text-[#d2d9df] text-sm font-medium mt-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
        {lang === 'zh' ? '进入分类' : 'Enter Category'} <ArrowRight className="w-4 h-4" />
      </div>
    </Card>
  );
}
