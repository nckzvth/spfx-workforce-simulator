import React, { useState } from 'react';
import { IPeopleAnalyticsProps } from './IPeopleAnalyticsProps';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import {
  Info,
  SlidersHorizontal,
  Activity,
  ArrowRightLeft,
  DollarSign,
  ShieldCheck
} from 'lucide-react';

// Mini Sparkline Component
const Sparkline: React.FC<{ data: number[]; color?: string }> = ({ data, color = '#E04828' }) => {
  const chartData = data.map((val, idx) => ({ idx, val }));
  return (
    <div className="w-20 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="val"
            stroke={color}
            strokeWidth={1.8}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Sanitized Mock Datasets for Workforce Overview
const MOCK_TRAILING_DATA: Record<string, { month: string; current: number; previous: number }[]> = {
  Headcount: [
    { month: "Sep '25", current: 3620, previous: 3500 },
    { month: "Nov '25", current: 3680, previous: 3540 },
    { month: "Jan '26", current: 3710, previous: 3590 },
    { month: "Mar '26", current: 3790, previous: 3640 },
    { month: "Apr '26", current: 3720, previous: 3680 },
    { month: "May '26", current: 3760, previous: 3700 },
    { month: "Jul '26", current: 3810, previous: 3720 },
    { month: "Sep '26", current: 3840, previous: 3750 }
  ],
  'New Hires': [
    { month: "Sep '25", current: 64, previous: 55 },
    { month: "Nov '25", current: 72, previous: 60 },
    { month: "Jan '26", current: 85, previous: 75 },
    { month: "Mar '26", current: 78, previous: 70 },
    { month: "Apr '26", current: 48, previous: 65 },
    { month: "May '26", current: 55, previous: 62 },
    { month: "Jul '26", current: 62, previous: 58 },
    { month: "Sep '26", current: 42, previous: 54 }
  ],
  Exits: [
    { month: "Sep '25", current: 28, previous: 32 },
    { month: "Nov '25", current: 32, previous: 34 },
    { month: "Jan '26", current: 35, previous: 38 },
    { month: "Mar '26", current: 40, previous: 36 },
    { month: "Apr '26", current: 55, previous: 35 },
    { month: "May '26", current: 38, previous: 33 },
    { month: "Jul '26", current: 30, previous: 31 },
    { month: "Sep '26", current: 26, previous: 30 }
  ],
  'Global Share': [
    { month: "Sep '25", current: 28.5, previous: 25.0 },
    { month: "Nov '25", current: 29.2, previous: 25.8 },
    { month: "Jan '26", current: 29.9, previous: 26.4 },
    { month: "Mar '26", current: 30.5, previous: 27.1 },
    { month: "Apr '26", current: 31.0, previous: 27.5 },
    { month: "May '26", current: 31.4, previous: 28.0 },
    { month: "Jul '26", current: 31.9, previous: 28.4 },
    { month: "Sep '26", current: 32.1, previous: 28.8 }
  ],
  'Manager Ratio': [
    { month: "Sep '25", current: 11.2, previous: 11.5 },
    { month: "Nov '25", current: 11.4, previous: 11.6 },
    { month: "Jan '26", current: 11.5, previous: 11.5 },
    { month: "Mar '26", current: 11.7, previous: 11.4 },
    { month: "Apr '26", current: 11.8, previous: 11.3 },
    { month: "May '26", current: 11.6, previous: 11.2 },
    { month: "Jul '26", current: 11.5, previous: 11.2 },
    { month: "Sep '26", current: 11.4, previous: 11.3 }
  ],
  'Avg Tenure': [
    { month: "Sep '25", current: 4.2, previous: 4.0 },
    { month: "Nov '25", current: 4.2, previous: 4.0 },
    { month: "Jan '26", current: 4.3, previous: 4.1 },
    { month: "Mar '26", current: 4.4, previous: 4.1 },
    { month: "Apr '26", current: 4.4, previous: 4.2 },
    { month: "May '26", current: 4.5, previous: 4.2 },
    { month: "Jul '26", current: 4.5, previous: 4.3 },
    { month: "Sep '26", current: 4.6, previous: 4.3 }
  ]
};

const MOCK_GEO_DATA = [
  { name: 'North America Hub', value: 2420, color: '#008779' },
  { name: 'Global Delivery Center', value: 1232, color: '#E04828' },
  { name: 'Regional Remote', value: 188, color: '#B4BFB8' }
];

export const PeopleAnalytics: React.FC<IPeopleAnalyticsProps> = () => {
  const [activeNav, setActiveNav] = useState('Workforce Overview');
  const [activeMetricTab, setActiveMetricTab] = useState('Headcount');

  const navItems = [
    { id: 'Workforce Overview', label: 'Workforce Overview', period: 'Monthly' },
    { id: 'Org Health', label: 'Org Health', period: 'Quarterly' },
    { id: 'Talent Flow', label: 'Talent Flow', period: 'Monthly' },
    { id: 'Org Design', label: 'Org Design', period: 'Quarterly' },
    { id: 'Comp & Labor Cost', label: 'Comp & Labor Cost', period: 'Quarterly' },
    { id: 'Performance & Goals', label: 'Performance & Goals', period: 'Quarterly' },
    { id: 'Engagement & Experience', label: 'Engagement & Experience', period: 'Quarterly' },
    { id: 'Attendance', label: 'Attendance', period: 'Monthly' }
  ];

  const metricTabs = ['Headcount', 'New Hires', 'Exits', 'Global Share', 'Manager Ratio', 'Avg Tenure'];

  return (
    <div className="flex min-h-screen bg-[#F7F6F3] text-slate-800 font-['Segoe_UI',sans-serif]">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-64 border-r border-[#E8E6E1] bg-[#F7F6F3] p-5 flex flex-col justify-between select-none shrink-0">
        <div>
          {/* Logo / Header */}
          <div className="flex items-center space-x-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#E04828] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
              PL
            </div>
            <div>
              <div className="text-xs font-bold tracking-tight text-slate-900 leading-tight">People Leadership</div>
              <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Dashboard Suite</div>
            </div>
          </div>

          {/* Navigation Links (All fully clickable and switch views!) */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-[#E04828] text-white font-bold shadow-sm'
                      : 'text-slate-600 hover:bg-[#EFECE6] font-medium'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <span
                    className={`text-[10px] ml-2 ${
                      isActive ? 'text-white/80' : 'text-slate-400'
                    }`}
                  >
                    {item.period}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="text-[10px] text-slate-400 pt-6 border-t border-[#E8E6E1]">
          SPFx Enterprise Architecture Preview
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-8 space-y-6 overflow-x-hidden">
        
        {/* VIEW 1: Workforce Overview */}
        {activeNav === 'Workforce Overview' && (
          <>
            {/* Top Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Workforce Overview</h1>
                <div className="text-[11px] font-bold text-[#E04828] uppercase tracking-wider mt-0.5">
                  Headcount & Composition
                </div>
                
                {/* Metadata Line with Sanitized Mock Data Info */}
                <div className="flex items-center space-x-2 text-xs text-slate-500 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span>Data as of 9/14/2026</span>
                  <span>•</span>
                  <span>current month: Sep 2026 (in progress)</span>
                  <span>•</span>
                  <span>last fully-elapsed month: Aug 2026</span>
                  <span>•</span>
                  <span className="text-slate-400">source: Mock_People_Core_Dataset.csv</span>
                </div>

                <p className="text-[11px] text-slate-400 mt-1 max-w-4xl leading-relaxed">
                  Sep '26 is still in progress — figures reflect sample snapshots for architecture preview. Point-in-time reads simulate live tenant data connected to internal SharePoint/Graph data feeds.
                </p>
              </div>

              <button className="self-start inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 shadow-sm transition">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span>Filters</span>
              </button>
            </div>

            {/* KPI Cards Grid (8 Cards with Sanitized Data) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              
              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-slate-600">
                    <span>Headcount</span>
                    <Info className="w-3 h-3 text-slate-400 cursor-pointer" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Live</span>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900 tracking-tight">3,840</div>
                    <div className="text-[11px] font-semibold text-[#E04828] mt-0.5">▼ 28 vs last</div>
                  </div>
                  <Sparkline data={[3710, 3740, 3790, 3720, 3760, 3810, 3840]} color="#E04828" />
                </div>
              </div>

              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-slate-600">
                    <span>New Hires</span>
                    <Info className="w-3 h-3 text-slate-400 cursor-pointer" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Live</span>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900 tracking-tight">42</div>
                    <div className="text-[11px] font-semibold text-[#E04828] mt-0.5">▼ 20 vs last</div>
                  </div>
                  <Sparkline data={[72, 85, 78, 48, 55, 62, 42]} color="#E04828" />
                </div>
              </div>

              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-slate-600">
                    <span>Exits</span>
                    <Info className="w-3 h-3 text-slate-400 cursor-pointer" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Live</span>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900 tracking-tight">26</div>
                    <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">▲ 14 vs last</div>
                  </div>
                  <Sparkline data={[32, 35, 40, 55, 38, 30, 26]} color="#E04828" />
                </div>
              </div>

              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-slate-600">
                    <span>Global Share</span>
                    <Info className="w-3 h-3 text-slate-400 cursor-pointer" />
                  </div>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900 tracking-tight">32.1%</div>
                    <div className="text-[11px] font-semibold text-slate-600 mt-0.5">▲ 0.2 pts vs last</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-slate-600">
                    <span>Senior Mix</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-500">Unavailable</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-extrabold text-slate-500">TBD</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                    Sample governance review indicator — proxy status pending confirmation.
                  </div>
                </div>
              </div>

              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-slate-600">
                    <span>Manager Ratio</span>
                    <Info className="w-3 h-3 text-slate-400 cursor-pointer" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Live</span>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900 tracking-tight">11.4%</div>
                    <div className="text-[11px] font-semibold text-slate-600 mt-0.5">▲ 0.1 pts vs last</div>
                  </div>
                  <Sparkline data={[11.2, 11.4, 11.5, 11.8, 11.6, 11.5, 11.4]} color="#E04828" />
                </div>
              </div>

              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-slate-600">
                    <span>Avg Tenure</span>
                    <Info className="w-3 h-3 text-slate-400 cursor-pointer" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Live</span>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900 tracking-tight">4.6 <span className="text-base font-normal">yrs</span></div>
                    <div className="text-[11px] font-semibold text-slate-600 mt-0.5">▲ 0.1 vs last</div>
                  </div>
                  <Sparkline data={[4.2, 4.3, 4.4, 4.4, 4.5, 4.5, 4.6]} color="#E04828" />
                </div>
              </div>

              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-600">vs Plan</div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-extrabold text-slate-400">—</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">No planned/budgeted headcount</div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Direction of Travel & Where People Are */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Left Chart: Direction of travel (2/3 width) */}
              <div className="lg:col-span-2 bg-[#EDEDEA]/70 p-6 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Direction of travel</h3>
                    <p className="text-[11px] text-slate-500">Trailing 13 months</p>
                  </div>

                  {/* Pill Metric Switcher Tabs */}
                  <div className="flex flex-wrap gap-1 bg-[#E2E0DB]/60 p-1 rounded-xl">
                    {metricTabs.map((tab) => {
                      const isSelected = activeMetricTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveMetricTab(tab)}
                          className={`px-3 py-1 rounded-lg text-xs transition font-semibold cursor-pointer ${
                            isSelected
                              ? 'bg-[#E04828] text-white shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Trailing Line Chart */}
                <div className="h-64 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_TRAILING_DATA[activeMetricTab]} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1E293B',
                          borderRadius: '8px',
                          border: 'none',
                          color: '#FFF',
                          fontSize: '12px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="previous"
                        name="1 year ago"
                        stroke="#94A3B8"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="current"
                        name="This period"
                        stroke="#E04828"
                        strokeWidth={2}
                        dot={{ r: 3, fill: '#E04828' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex items-center space-x-4 text-xs mt-3 pt-3 border-t border-slate-300/40">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3.5 h-0.5 bg-[#E04828]"></span>
                    <span className="text-slate-600 font-medium">This period</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3.5 h-0.5 bg-slate-400 border-b border-dashed border-slate-500"></span>
                    <span className="text-slate-400 font-medium">1 year ago</span>
                  </div>
                </div>
              </div>

              {/* Right Chart: Where people are (Donut) */}
              <div className="bg-[#EDEDEA]/70 p-6 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Where people are</h3>
                  <p className="text-[11px] text-slate-500">Sep '26 Snapshot</p>

                  <div className="relative h-56 flex items-center justify-center mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={MOCK_GEO_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {MOCK_GEO_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1E293B',
                            borderRadius: '8px',
                            border: 'none',
                            color: '#FFF',
                            fontSize: '12px'
                          }}
                          formatter={(val: number) => [`${val.toLocaleString()} staff`, 'Count']}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-extrabold text-slate-900">3,840</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">colleagues</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-slate-300/40">
                  {MOCK_GEO_DATA.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-slate-600 font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-800">{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </>
        )}

        {/* VIEW 2: Org Health */}
        {activeNav === 'Org Health' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Organizational Health</h1>
              <p className="text-xs text-slate-500 mt-1">Retention stability, span of control, and leadership ratio indicators</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#EDEDEA]/70 p-5 rounded-2xl border border-white/60">
                <span className="text-xs font-bold text-slate-500 uppercase">Manager Span of Control</span>
                <div className="text-3xl font-extrabold text-slate-900 mt-2">7.2 : 1</div>
                <p className="text-xs text-emerald-600 mt-1 font-semibold">Optimal executive range (6-8)</p>
              </div>
              <div className="bg-[#EDEDEA]/70 p-5 rounded-2xl border border-white/60">
                <span className="text-xs font-bold text-slate-500 uppercase">Voluntary Attrition (YTD)</span>
                <div className="text-3xl font-extrabold text-slate-900 mt-2">5.8%</div>
                <p className="text-xs text-emerald-600 mt-1 font-semibold">↓ 1.4% decrease YoY</p>
              </div>
              <div className="bg-[#EDEDEA]/70 p-5 rounded-2xl border border-white/60">
                <span className="text-xs font-bold text-slate-500 uppercase">Flight Risk Critical Roles</span>
                <div className="text-3xl font-extrabold text-amber-600 mt-2">14</div>
                <p className="text-xs text-slate-500 mt-1">Identified across key technical nodes</p>
              </div>
            </div>
            <div className="bg-[#EDEDEA]/70 p-6 rounded-2xl border border-white/60">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Retention Stability Index by Functional Area</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { area: 'Core Tech', stability: 92 },
                    { area: 'Customer Ops', stability: 86 },
                    { area: 'Revenue & Sales', stability: 79 },
                    { area: 'G&A Support', stability: 95 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="area" fontSize={11} stroke="#64748B" />
                    <YAxis domain={[0, 100]} fontSize={11} stroke="#64748B" />
                    <Tooltip />
                    <Bar dataKey="stability" fill="#008779" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Talent Flow */}
        {activeNav === 'Talent Flow' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Talent Flow & Velocity</h1>
              <p className="text-xs text-slate-500 mt-1">Inflows, internal promotions, lateral mobility, and separation metrics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60">
                <span className="text-xs font-bold text-slate-500">External Inflows</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">+42</div>
                <span className="text-[11px] text-emerald-600 font-semibold">This Month</span>
              </div>
              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60">
                <span className="text-xs font-bold text-slate-500">Internal Promotions</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">19</div>
                <span className="text-[11px] text-[#0078D4] font-semibold">Career Mobility</span>
              </div>
              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60">
                <span className="text-xs font-bold text-slate-500">Lateral Transfers</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">11</div>
                <span className="text-[11px] text-purple-600 font-semibold">Cross-Functional</span>
              </div>
              <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60">
                <span className="text-xs font-bold text-slate-500">Separations</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">-26</div>
                <span className="text-[11px] text-slate-500 font-semibold">All Categories</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: Comp & Labor Cost */}
        {activeNav === 'Comp & Labor Cost' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Compensation & Labor Economics</h1>
              <p className="text-xs text-slate-500 mt-1">Budget burn, compa-ratio distribution, and salary benchmark adherence</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#EDEDEA]/70 p-5 rounded-2xl border border-white/60">
                <span className="text-xs font-bold text-slate-500 uppercase">Median Compa-Ratio</span>
                <div className="text-3xl font-extrabold text-slate-900 mt-2">0.98</div>
                <p className="text-xs text-emerald-600 mt-1 font-semibold">Aligned with market 50th percentile</p>
              </div>
              <div className="bg-[#EDEDEA]/70 p-5 rounded-2xl border border-white/60">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Monthly Labor Run-Rate</span>
                <div className="text-3xl font-extrabold text-slate-900 mt-2">$28.4M</div>
                <p className="text-xs text-slate-500 mt-1">Within +0.8% of planned budget</p>
              </div>
              <div className="bg-[#EDEDEA]/70 p-5 rounded-2xl border border-white/60">
                <span className="text-xs font-bold text-slate-500 uppercase">Pay Equity Index</span>
                <div className="text-3xl font-extrabold text-emerald-600 mt-2">99.4%</div>
                <p className="text-xs text-slate-500 mt-1">Zero statistically significant disparities</p>
              </div>
            </div>
          </div>
        )}

        {/* Other Views Placeholder (Clean & Interactive) */}
        {!['Workforce Overview', 'Org Health', 'Talent Flow', 'Comp & Labor Cost'].includes(activeNav) && (
          <div className="bg-[#EDEDEA]/70 p-12 rounded-2xl border border-white/60 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white text-[#E04828] flex items-center justify-center mx-auto shadow-sm">
              <Activity className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">{activeNav} Suite</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Simulated module view ready for live data binding. With SPFx, each module renders natively as a sub-view within SharePoint.
            </p>
            <button
              onClick={() => setActiveNav('Workforce Overview')}
              className="mt-4 px-4 py-2 bg-[#E04828] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-[#c93c1f] transition cursor-pointer"
            >
              Return to Workforce Overview
            </button>
          </div>
        )}

      </main>

    </div>
  );
};
