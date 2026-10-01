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
  Cell
} from 'recharts';
import {
  Info,
  SlidersHorizontal,
  ChevronDown
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

// Data sets for the Trailing 13 months tab switcher
const TRAILING_DATA: Record<string, { month: string; current: number; previous: number; label?: string }[]> = {
  Headcount: [
    { month: "Sep '25", current: 4557, previous: 4420 },
    { month: "Nov '25", current: 4598, previous: 4460 },
    { month: "Jan '26", current: 4580, previous: 4500 },
    { month: "Mar '26", current: 4623, previous: 4540 },
    { month: "Apr '26", current: 4210, previous: 4550 },
    { month: "May '26", current: 4320, previous: 4560 },
    { month: "Jul '26", current: 4495, previous: 4580 },
    { month: "Sep '26", current: 4452, previous: 4590 }
  ],
  'New Hires': [
    { month: "Sep '25", current: 78, previous: 65 },
    { month: "Nov '25", current: 82, previous: 70 },
    { month: "Jan '26", current: 95, previous: 85 },
    { month: "Mar '26", current: 88, previous: 90 },
    { month: "Apr '26", current: 45, previous: 80 },
    { month: "May '26", current: 52, previous: 75 },
    { month: "Jul '26", current: 60, previous: 70 },
    { month: "Sep '26", current: 33, previous: 68 }
  ],
  Exits: [
    { month: "Sep '25", current: 42, previous: 40 },
    { month: "Nov '25", current: 40, previous: 45 },
    { month: "Jan '26", current: 48, previous: 50 },
    { month: "Mar '26", current: 52, previous: 48 },
    { month: "Apr '26", current: 120, previous: 46 },
    { month: "May '26", current: 65, previous: 44 },
    { month: "Jul '26", current: 45, previous: 42 },
    { month: "Sep '26", current: 38, previous: 40 }
  ],
  'India Share': [
    { month: "Sep '25", current: 31.2, previous: 28.0 },
    { month: "Nov '25", current: 31.8, previous: 28.5 },
    { month: "Jan '26", current: 32.4, previous: 29.2 },
    { month: "Mar '26", current: 32.9, previous: 29.8 },
    { month: "Apr '26", current: 33.1, previous: 30.1 },
    { month: "May '26", current: 33.3, previous: 30.5 },
    { month: "Jul '26", current: 33.5, previous: 30.9 },
    { month: "Sep '26", current: 33.6, previous: 31.2 }
  ],
  'Manager Ratio': [
    { month: "Sep '25", current: 11.8, previous: 12.0 },
    { month: "Nov '25", current: 11.9, previous: 12.1 },
    { month: "Jan '26", current: 12.0, previous: 12.1 },
    { month: "Mar '26", current: 12.1, previous: 12.0 },
    { month: "Apr '26", current: 12.3, previous: 11.9 },
    { month: "May '26", current: 12.2, previous: 11.8 },
    { month: "Jul '26", current: 12.2, previous: 11.8 },
    { month: "Sep '26", current: 12.2, previous: 11.9 }
  ],
  'Avg Tenure': [
    { month: "Sep '25", current: 4.6, previous: 4.4 },
    { month: "Nov '25", current: 4.6, previous: 4.4 },
    { month: "Jan '26", current: 4.7, previous: 4.5 },
    { month: "Mar '26", current: 4.7, previous: 4.5 },
    { month: "Apr '26", current: 4.8, previous: 4.6 },
    { month: "May '26", current: 4.8, previous: 4.6 },
    { month: "Jul '26", current: 4.8, previous: 4.6 },
    { month: "Sep '26", current: 4.8, previous: 4.7 }
  ]
};

const GEO_DATA = [
  { name: 'India', value: 1496, color: '#E04828' },
  { name: 'United States', value: 2715, color: '#008779' },
  { name: 'Other', value: 241, color: '#B4BFB8' }
];

export const PeopleAnalytics: React.FC<IPeopleAnalyticsProps> = () => {
  const [activeNav, setActiveNav] = useState('Workforce Overview');
  const [activeMetricTab, setActiveMetricTab] = useState('Headcount');

  const navItems = [
    { label: 'Workforce Overview', period: 'Monthly' },
    { label: 'Org Health', period: 'Quarterly' },
    { label: 'Talent Flow', period: 'Monthly' },
    { label: 'Org Design', period: 'Quarterly' },
    { label: 'Comp & Labor Cost', period: 'Quarterly' },
    { label: 'Performance & Goals', period: 'Quarterly' },
    { label: 'Engagement & Experience', period: 'Quarterly' },
    { label: 'Attendance', period: 'Monthly' }
  ];

  const metricTabs = ['Headcount', 'New Hires', 'Exits', 'India Share', 'Manager Ratio', 'Avg Tenure'];

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

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveNav(item.label)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition flex items-center justify-between group ${
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
          TriNet Internal People Intelligence
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-8 space-y-6 overflow-x-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Workforce Overview</h1>
            <div className="text-[11px] font-bold text-[#E04828] uppercase tracking-wider mt-0.5">
              Headcount & Composition
            </div>
            
            {/* Metadata Line */}
            <div className="flex items-center space-x-2 text-xs text-slate-500 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>Data as of 9/14/2026</span>
              <span>•</span>
              <span>current month: Sep 2026 (in progress)</span>
              <span>•</span>
              <span>last fully-elapsed month: Aug 2026</span>
              <span>•</span>
              <span className="text-slate-400">source: TNET History CSV.csv</span>
            </div>

            <p className="text-[11px] text-slate-400 mt-1 max-w-4xl leading-relaxed">
              Sep '26 is still in progress — data reflects snapshots through 9/14/2026 only. Headcount/comp figures are a current point-in-time read; new hires, exits, and attrition for this month will keep changing until the month fully elapses.
            </p>
          </div>

          <button className="self-start inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 shadow-sm transition">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Filters</span>
          </button>
        </div>

        {/* 3. KPI Cards Grid (8 Cards exactly matching screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Card 1: Headcount */}
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
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">4,452</div>
                <div className="text-[11px] font-semibold text-[#E04828] mt-0.5">▼ 53 vs last</div>
              </div>
              <Sparkline data={[4557, 4580, 4598, 4623, 4210, 4495, 4452]} color="#E04828" />
            </div>
          </div>

          {/* Card 2: New Hires */}
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
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">33</div>
                <div className="text-[11px] font-semibold text-[#E04828] mt-0.5">▼ 45 vs last</div>
              </div>
              <Sparkline data={[78, 82, 95, 88, 45, 60, 33]} color="#E04828" />
            </div>
          </div>

          {/* Card 3: Exits */}
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
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">38</div>
                <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">▲ 94 vs last</div>
              </div>
              <Sparkline data={[42, 40, 48, 52, 120, 45, 38]} color="#E04828" />
            </div>
          </div>

          {/* Card 4: India Share */}
          <div className="bg-[#EDEDEA]/70 p-4 rounded-2xl border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs font-semibold text-slate-600">
                <span>India Share</span>
                <Info className="w-3 h-3 text-slate-400 cursor-pointer" />
              </div>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">33.6%</div>
                <div className="text-[11px] font-semibold text-slate-600 mt-0.5">▲ 0.4 pts vs last</div>
              </div>
            </div>
          </div>

          {/* Card 5: Senior Mix */}
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
                Suppressed pending review of the Job Level &gt;120 leadership-threshold proxy — not yet HR-confirmed.
              </div>
            </div>
          </div>

          {/* Card 6: Manager Ratio */}
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
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">12.2%</div>
                <div className="text-[11px] font-semibold text-slate-600 mt-0.5">▲ 0.1 pts vs last</div>
              </div>
              <Sparkline data={[11.8, 11.9, 12.0, 12.1, 12.3, 12.2, 12.2]} color="#E04828" />
            </div>
          </div>

          {/* Card 7: Avg Tenure */}
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
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">4.8 <span className="text-base font-normal">yrs</span></div>
                <div className="text-[11px] font-semibold text-slate-600 mt-0.5">▲ 0.0 vs last</div>
              </div>
              <Sparkline data={[4.6, 4.6, 4.7, 4.7, 4.8, 4.8, 4.8]} color="#E04828" />
            </div>
          </div>

          {/* Card 8: vs Plan */}
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

        {/* 4. Bottom Row: Direction of Travel & Where People Are */}
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
                      className={`px-3 py-1 rounded-lg text-xs transition font-semibold ${
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
                <LineChart data={TRAILING_DATA[activeMetricTab]} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
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
                  {/* Dashed Benchmark Line (1 year ago) */}
                  <Line
                    type="monotone"
                    dataKey="previous"
                    name="1 year ago"
                    stroke="#94A3B8"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  {/* Current Active Line */}
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
              <p className="text-[11px] text-slate-500">Sep '26</p>

              {/* Donut Chart with Center Text */}
              <div className="relative h-56 flex items-center justify-center mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={GEO_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {GEO_DATA.map((entry, index) => (
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
                      formatter={(val: number) => [`${val.toLocaleString()} colleagues`, 'Count']}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Donut Center Count */}
                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-extrabold text-slate-900">4,452</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">colleagues</span>
                </div>
              </div>
            </div>

            {/* Geo Legend */}
            <div className="space-y-1.5 pt-4 border-t border-slate-300/40">
              {GEO_DATA.map((item) => (
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

      </main>

    </div>
  );
};
