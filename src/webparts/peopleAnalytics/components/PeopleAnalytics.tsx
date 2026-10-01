import React, { useState, useMemo } from 'react';
import { IPeopleAnalyticsProps } from './IPeopleAnalyticsProps';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  TrendingDown,
  Briefcase,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  RefreshCw,
  Sparkles,
  ChevronRight
} from 'lucide-react';

// Department datasets simulating live People Analytics
interface IDepartmentData {
  name: string;
  headcount: number;
  attritionRate: number;
  openReqs: number;
  offerAcceptance: number;
  growthQoQ: string;
  trend: { month: string; count: number; benchmark: number }[];
  subTeams: { name: string; headcount: number; attrition: number }[];
  demographics: { name: string; value: number; color: string }[];
}

const DEPARTMENT_METRICS: Record<string, IDepartmentData> = {
  All: {
    name: 'All Departments',
    headcount: 1420,
    attritionRate: 8.4,
    openReqs: 46,
    offerAcceptance: 89.2,
    growthQoQ: '+4.2%',
    trend: [
      { month: 'Jan', count: 1310, benchmark: 1300 },
      { month: 'Feb', count: 1325, benchmark: 1315 },
      { month: 'Mar', count: 1340, benchmark: 1330 },
      { month: 'Apr', count: 1352, benchmark: 1345 },
      { month: 'May', count: 1370, benchmark: 1360 },
      { month: 'Jun', count: 1385, benchmark: 1375 },
      { month: 'Jul', count: 1392, benchmark: 1385 },
      { month: 'Aug', count: 1405, benchmark: 1395 },
      { month: 'Sep', count: 1410, benchmark: 1405 },
      { month: 'Oct', count: 1415, benchmark: 1410 },
      { month: 'Nov', count: 1418, benchmark: 1415 },
      { month: 'Dec', count: 1420, benchmark: 1420 },
    ],
    subTeams: [
      { name: 'Engineering', headcount: 420, attrition: 6.2 },
      { name: 'Sales', headcount: 310, attrition: 11.4 },
      { name: 'Operations', headcount: 280, attrition: 7.8 },
      { name: 'Marketing', headcount: 145, attrition: 8.9 },
      { name: 'HR / People', headcount: 95, attrition: 4.1 },
      { name: 'Finance & Legal', headcount: 170, attrition: 5.5 },
    ],
    demographics: [
      { name: 'Individual Contributors', value: 68, color: '#0078D4' },
      { name: 'People Managers', value: 20, color: '#2B88D8' },
      { name: 'Directors & Execs', value: 12, color: '#71AFE5' },
    ]
  },
  Engineering: {
    name: 'Engineering',
    headcount: 420,
    attritionRate: 6.2,
    openReqs: 18,
    offerAcceptance: 93.1,
    growthQoQ: '+6.5%',
    trend: [
      { month: 'Jan', count: 375, benchmark: 370 },
      { month: 'Feb', count: 380, benchmark: 375 },
      { month: 'Mar', count: 385, benchmark: 380 },
      { month: 'Apr', count: 390, benchmark: 385 },
      { month: 'May', count: 395, benchmark: 390 },
      { month: 'Jun', count: 400, benchmark: 395 },
      { month: 'Jul', count: 405, benchmark: 400 },
      { month: 'Aug', count: 408, benchmark: 405 },
      { month: 'Sep', count: 412, benchmark: 410 },
      { month: 'Oct', count: 415, benchmark: 412 },
      { month: 'Nov', count: 418, benchmark: 415 },
      { month: 'Dec', count: 420, benchmark: 418 },
    ],
    subTeams: [
      { name: 'Frontend Eng', headcount: 95, attrition: 5.4 },
      { name: 'Backend Platform', headcount: 140, attrition: 6.8 },
      { name: 'Data & AI', headcount: 85, attrition: 4.9 },
      { name: 'DevOps & SRE', headcount: 50, attrition: 7.2 },
      { name: 'QA & Test', headcount: 50, attrition: 6.0 },
    ],
    demographics: [
      { name: 'IC Engineers', value: 74, color: '#0078D4' },
      { name: 'Tech Leads & Mgrs', value: 18, color: '#2B88D8' },
      { name: 'Leadership', value: 8, color: '#71AFE5' },
    ]
  },
  Sales: {
    name: 'Sales & Revenue',
    headcount: 310,
    attritionRate: 11.4,
    openReqs: 14,
    offerAcceptance: 84.5,
    growthQoQ: '+2.1%',
    trend: [
      { month: 'Jan', count: 292, benchmark: 290 },
      { month: 'Feb', count: 295, benchmark: 293 },
      { month: 'Mar', count: 298, benchmark: 295 },
      { month: 'Apr', count: 300, benchmark: 298 },
      { month: 'May', count: 302, benchmark: 300 },
      { month: 'Jun', count: 304, benchmark: 302 },
      { month: 'Jul', count: 305, benchmark: 304 },
      { month: 'Aug', count: 306, benchmark: 305 },
      { month: 'Sep', count: 307, benchmark: 306 },
      { month: 'Oct', count: 308, benchmark: 307 },
      { month: 'Nov', count: 309, benchmark: 308 },
      { month: 'Dec', count: 310, benchmark: 310 },
    ],
    subTeams: [
      { name: 'Enterprise Sales', headcount: 80, attrition: 9.2 },
      { name: 'Mid-Market', headcount: 105, attrition: 12.4 },
      { name: 'SMB & Inbound', headcount: 65, attrition: 14.1 },
      { name: 'Sales Enablement', headcount: 30, attrition: 7.5 },
      { name: 'SDRs', headcount: 30, attrition: 13.8 },
    ],
    demographics: [
      { name: 'Quota Bearers (AE/AM)', value: 70, color: '#0078D4' },
      { name: 'Sales Leadership', value: 15, color: '#2B88D8' },
      { name: 'Sales Support/Ops', value: 15, color: '#71AFE5' },
    ]
  },
  Operations: {
    name: 'Operations & Fulfillment',
    headcount: 280,
    attritionRate: 7.8,
    openReqs: 8,
    offerAcceptance: 88.0,
    growthQoQ: '+3.0%',
    trend: [
      { month: 'Jan', count: 265, benchmark: 265 },
      { month: 'Feb', count: 268, benchmark: 267 },
      { month: 'Mar', count: 270, benchmark: 269 },
      { month: 'Apr', count: 272, benchmark: 271 },
      { month: 'May', count: 273, benchmark: 272 },
      { month: 'Jun', count: 275, benchmark: 274 },
      { month: 'Jul', count: 276, benchmark: 275 },
      { month: 'Aug', count: 277, benchmark: 276 },
      { month: 'Sep', count: 278, benchmark: 277 },
      { month: 'Oct', count: 279, benchmark: 278 },
      { month: 'Nov', count: 280, benchmark: 280 },
      { month: 'Dec', count: 280, benchmark: 280 },
    ],
    subTeams: [
      { name: 'Supply Logistics', headcount: 90, attrition: 7.2 },
      { name: 'Client Services', headcount: 100, attrition: 8.5 },
      { name: 'Facilities & Security', headcount: 45, attrition: 6.8 },
      { name: 'Compliance & Risk', headcount: 45, attrition: 5.9 },
    ],
    demographics: [
      { name: 'Operations Staff', value: 75, color: '#0078D4' },
      { name: 'Supervisors', value: 16, color: '#2B88D8' },
      { name: 'Operations Directors', value: 9, color: '#71AFE5' },
    ]
  },
  HR: {
    name: 'Human Resources & People Operations',
    headcount: 95,
    attritionRate: 4.1,
    openReqs: 3,
    offerAcceptance: 95.5,
    growthQoQ: 'Stable',
    trend: [
      { month: 'Jan', count: 88, benchmark: 88 },
      { month: 'Feb', count: 89, benchmark: 89 },
      { month: 'Mar', count: 90, benchmark: 90 },
      { month: 'Apr', count: 91, benchmark: 91 },
      { month: 'May', count: 91, benchmark: 91 },
      { month: 'Jun', count: 92, benchmark: 92 },
      { month: 'Jul', count: 93, benchmark: 93 },
      { month: 'Aug', count: 93, benchmark: 93 },
      { month: 'Sep', count: 94, benchmark: 94 },
      { month: 'Oct', count: 94, benchmark: 94 },
      { month: 'Nov', count: 95, benchmark: 95 },
      { month: 'Dec', count: 95, benchmark: 95 },
    ],
    subTeams: [
      { name: 'Talent Acquisition', headcount: 32, attrition: 4.5 },
      { name: 'People Operations', headcount: 25, attrition: 3.8 },
      { name: 'Total Rewards / Comp', headcount: 15, attrition: 3.2 },
      { name: 'HRBP Strategic', headcount: 15, attrition: 4.0 },
      { name: 'Learning & Dev', headcount: 8, attrition: 4.4 },
    ],
    demographics: [
      { name: 'HR Specialists & Ops', value: 65, color: '#0078D4' },
      { name: 'Senior HRBPs', value: 25, color: '#2B88D8' },
      { name: 'People Leadership', value: 10, color: '#71AFE5' },
    ]
  }
};

export const PeopleAnalytics: React.FC<IPeopleAnalyticsProps> = ({
  userDisplayName,
  siteTitle = 'Workforce Transformation Test',
  hasTeamsContext = false
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const activeData = useMemo(() => DEPARTMENT_METRICS[selectedDept] || DEPARTMENT_METRICS.All, [selectedDept]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`[SPFx Export] Downloaded ${activeData.name} People Analytics Executive Summary (.xlsx)`);
    }, 800);
  };

  return (
    <div className="w-full bg-[#FAF9F8] text-slate-800 p-6 md:p-8 space-y-6">
      
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-[#0078D4]">
              <Sparkles className="w-3.5 h-3.5" />
              SPFx Enterprise Hub
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500">{siteTitle}</span>
            {hasTeamsContext && (
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded font-medium">Teams Tab</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Workforce Intelligence & People Analytics</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Logged in as <span className="font-semibold text-slate-700">{userDisplayName}</span> • Real-time Dataverse & Graph Sync
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4] cursor-pointer"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales & Revenue</option>
              <option value="Operations">Operations</option>
              <option value="HR">Human Resources</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#0078D4] hover:bg-[#005A9E] text-white text-xs font-semibold rounded-lg shadow-sm transition disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Headcount */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Active Headcount</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0078D4] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeData.headcount.toLocaleString()}
            </div>
            <div className="flex items-center text-xs font-semibold text-emerald-600 mt-1 space-x-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{activeData.growthQoQ} growth vs previous quarter</span>
            </div>
          </div>
        </div>

        {/* Card 2: Annualized Attrition */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Annualized Attrition</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeData.attritionRate}%
            </div>
            <div className={`flex items-center text-xs font-semibold mt-1 space-x-1 ${activeData.attritionRate > 10 ? 'text-amber-600' : 'text-emerald-600'}`}>
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>{activeData.attritionRate > 10 ? 'Above 10% target tolerance' : '1.1% below industry baseline'}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Open Requisitions */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Open Requisitions</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeData.openReqs}
            </div>
            <div className="flex items-center text-xs font-medium text-slate-500 mt-1">
              <span>Avg 28.5 days to candidate offer</span>
            </div>
          </div>
        </div>

        {/* Card 4: Offer Acceptance Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Offer Acceptance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeData.offerAcceptance}%
            </div>
            <div className="flex items-center text-xs font-semibold text-emerald-600 mt-1 space-x-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+3.2% candidate conversion MoM</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Headcount 12-Month Trajectory Area Chart (Span 2) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Headcount Trajectory & Growth (12 Months)</h2>
              <p className="text-xs text-slate-500">Actual headcount vs forecast headcount model</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
              {activeData.name}
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeData.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0078D4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0078D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 15', 'dataMax + 15']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#FFF',
                    fontSize: '12px'
                  }}
                  formatter={(val: number) => [`${val} Active Staff`, 'Headcount']}
                />
                <Area type="monotone" dataKey="count" stroke="#0078D4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sub-Discipline Distribution / Level Breakdown (Span 1) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Workforce Hierarchy</h2>
            <p className="text-xs text-slate-500 mb-4">Organizational role distribution</p>

            <div className="h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeData.demographics}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {activeData.demographics.map((entry, index) => (
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
                    formatter={(val: number) => [`${val}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100">
            {activeData.demographics.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sub-Teams Attrition & Headcount Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Sub-Team Attrition & Allocation Breakdown</h2>
            <p className="text-xs text-slate-500">Granular view of talent stability across functional pods</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">Auto-synced with Workday Core</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Functional Sub-Team</th>
                <th className="py-3 px-4 text-center">Active Headcount</th>
                <th className="py-3 px-4 text-center">Attrition Rate</th>
                <th className="py-3 px-4">Status & Health</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeData.subTeams.map((sub, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{sub.name}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-700">{sub.headcount}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full font-bold ${sub.attrition > 10 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {sub.attrition}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full ${sub.attrition > 10 ? 'bg-amber-500' : 'bg-[#0078D4]'}`}
                          style={{ width: `${Math.min(sub.attrition * 7, 100)}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {sub.attrition > 10 ? 'Elevated' : 'Optimal'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-[#0078D4] hover:text-[#005A9E] font-semibold inline-flex items-center space-x-1">
                      <span>View Org</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
