import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../lib/i18n';
import { getMockData } from '../data/mock';
import { Card, Badge } from './ui';
import { Database, TrendingUp, ShieldCheck, Activity, Users, Box } from 'lucide-react';

export function EnterpriseGraph() {
  const { lang, t } = useTranslation();
  const mockData = getMockData(lang);
  const { bases } = mockData;

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    { id: 'root', x: 50, y: 50, type: 'root', label: t('Enterprise AI Core', '企业 AI 核心'), icon: <Box className="w-5 h-5 text-[#ededed]" /> },
    { id: 'cat-product', x: 25, y: 35, type: 'category', label: t('Product & Eng', '产品与研发'), icon: <Database className="w-4 h-4 text-emerald-500" /> },
    { id: 'cat-market', x: 75, y: 35, type: 'category', label: t('Market & Ops', '市场与运营'), icon: <TrendingUp className="w-4 h-4 text-amber-500" /> },
    { id: 'cat-risk', x: 50, y: 75, type: 'category', label: t('Risk & Compliance', '风控与合规'), icon: <ShieldCheck className="w-4 h-4 text-rose-500" /> },
    // Bases
    { id: 'base-prod-1', x: 15, y: 15, type: 'base', categoryId: 'cat-product', data: bases.find(b => b.id === 'base-prod-1') },
    { id: 'base-prod-2', x: 35, y: 15, type: 'base', categoryId: 'cat-product', data: bases.find(b => b.id === 'base-prod-2') },
    { id: 'base-mkt-1', x: 75, y: 15, type: 'base', categoryId: 'cat-market', data: bases.find(b => b.id === 'base-mkt-1') },
    { id: 'base-risk-1', x: 50, y: 95, type: 'base', categoryId: 'cat-risk', data: bases.find(b => b.id === 'base-risk-1') },
  ];

  const edges = [
    { source: 'root', target: 'cat-product' },
    { source: 'root', target: 'cat-market' },
    { source: 'root', target: 'cat-risk' },
    { source: 'cat-product', target: 'base-prod-1' },
    { source: 'cat-product', target: 'base-prod-2' },
    { source: 'cat-market', target: 'base-mkt-1' },
    { source: 'cat-risk', target: 'base-risk-1' },
  ];

  const getNodeCoords = (id: string) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 50, y: 50 };
  };

  return (
    <Card className="w-full h-[500px] relative bg-white/50 backdrop-blur-sm overflow-hidden flex flex-col shadow-sm border border-[#DCE7F6]">
      <div className="absolute top-4 left-6 z-20">
        <h3 className="text-lg font-semibold text-[#08142F] flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#ededed]" />
          {t('Enterprise Capability Graph', '企业能力图谱')}
        </h3>
        <p className="text-xs text-[#5F6F8C] mt-1">{t('Visualizing AI integration across business domains', '全局 AI 能力与业务域的融合关系')}</p>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1b417f" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#d2d9df" stopOpacity="0.14" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {edges.map((edge, i) => {
          const s = getNodeCoords(edge.source);
          const tCoords = getNodeCoords(edge.target);
          return (
            <motion.line
              key={i}
              x1={`${s.x}%`}
              y1={`${s.y}%`}
              x2={`${tCoords.x}%`}
              y2={`${tCoords.y}%`}
              stroke="url(#edge-grad)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          );
        })}
      </svg>

      {nodes.map((node, i) => {
        const isHovered = hoveredNode === node.id;
        const isRelated = edges.some(e => (e.source === hoveredNode && e.target === node.id) || (e.target === hoveredNode && e.source === node.id));
        const opacity = hoveredNode ? (isHovered || isRelated ? 1 : 0.4) : 1;

        if (node.type === 'root') {
          return (
            <motion.div
              key={node.id}
              className="absolute w-24 h-24 -ml-12 -mt-12 rounded-2xl bg-[#07111f] border-2 border-[#1b417f] flex flex-col items-center justify-center shadow-[0_0_20px_rgba(27,65,127,0.32)] z-10 cursor-pointer"
              style={{ left: `${node.x}%`, top: `${node.y}%`, opacity }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
            >
              {node.icon}
              <span className="text-[10px] font-bold text-[#08142F] mt-2 text-center leading-tight px-1">{node.label}</span>
            </motion.div>
          );
        }

        if (node.type === 'category') {
          return (
            <motion.div
              key={node.id}
              className="absolute w-20 h-20 -ml-10 -mt-10 rounded-full bg-[#0d1b31] border border-white/15 flex flex-col items-center justify-center shadow-sm z-10 cursor-pointer"
              style={{ left: `${node.x}%`, top: `${node.y}%`, opacity }}
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
            >
              {node.icon}
              <span className="text-[9px] font-medium text-[#5F6F8C] mt-1 text-center px-2">{node.label}</span>
            </motion.div>
          );
        }

        if (node.type === 'base' && node.data) {
          return (
            <div key={node.id} className="absolute z-10" style={{ left: `${node.x}%`, top: `${node.y}%`, opacity }}>
              <motion.div
                className="w-4 h-4 -ml-2 -mt-2 rounded-full bg-[#1b417f] cursor-pointer shadow-[0_0_10px_rgba(27,65,127,0.6)] border-2 border-[#d2d9df] relative"
                whileHover={{ scale: 1.5 }}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
              >
                {/* Ping effect */}
                <span className="absolute inset-0 rounded-full bg-[#1b417f] opacity-50 animate-ping"></span>
              </motion.div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                <span className="text-xs font-semibold text-[#08142F] bg-white/80 px-2 py-0.5 rounded shadow-sm">{node.data.name}</span>
              </div>

              {/* Hover Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-xl border border-[#DCE7F6] p-4 z-50 pointer-events-none"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm text-[#08142F]">{node.data.name}</h4>
                      <Badge variant="success" className="text-[9px] py-0">{node.data.status}</Badge>
                    </div>
                    <p className="text-[10px] text-[#5F6F8C] mb-3 leading-relaxed">{node.data.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="bg-[#F4F8FF] p-2 rounded border border-[#DCE7F6]">
                        <div className="text-[#8A96AD] mb-0.5 uppercase tracking-wider">{t('Total Runs', '总运行次')}</div>
                        <div className="font-semibold text-[#08142F]">{node.data.recentRunIds?.length * 24 || 0}</div>
                      </div>
                      <div className="bg-[#F4F8FF] p-2 rounded border border-[#DCE7F6]">
                        <div className="text-[#8A96AD] mb-0.5 uppercase tracking-wider">{t('Owner', '负责人')}</div>
                        <div className="font-semibold text-[#08142F] truncate">{node.data.owner}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return null;
      })}
    </Card>
  );
}
