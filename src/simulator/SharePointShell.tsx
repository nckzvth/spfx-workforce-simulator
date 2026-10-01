import React, { useState } from 'react';
import { PeopleAnalytics } from '../webparts/peopleAnalytics/components/PeopleAnalytics';
import {
  Layout,
  Maximize2,
  Minimize2,
  Monitor,
  Share2,
  Search,
  Bell,
  Settings,
  HelpCircle,
  Menu,
  ChevronDown,
  Layers,
  Sparkles,
  AppWindow
} from 'lucide-react';

export type ViewMode = 'fullpage' | 'standard' | 'teams';

export const SharePointShell: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('fullpage');
  const [mockUser, setMockUser] = useState<string>('Alex Johnson');
  const [mockSite, setMockSite] = useState<string>('Workforce Transformation Test');

  return (
    <div className="min-h-screen bg-[#F3F2F1] flex flex-col font-['Segoe_UI',sans-serif]">
      
      {/* 1. Simulator Control Bar (Dev Controls) */}
      <div className="bg-[#1E293B] text-white px-4 py-2 flex flex-wrap items-center justify-between border-b border-slate-700 text-xs shadow-md z-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-bold text-sky-400">
            <Sparkles className="w-4 h-4" />
            <span>SPFx Local Simulator</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Simulating M365 Environment</span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700 my-1 sm:my-0">
          <button
            onClick={() => setViewMode('fullpage')}
            className={`px-3 py-1 rounded-md font-semibold transition flex items-center space-x-1.5 ${
              viewMode === 'fullpage'
                ? 'bg-[#0078D4] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>SPFx Full-Page App (Target)</span>
          </button>

          <button
            onClick={() => setViewMode('standard')}
            className={`px-3 py-1 rounded-md font-semibold transition flex items-center space-x-1.5 ${
              viewMode === 'standard'
                ? 'bg-[#0078D4] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Standard SharePoint Page</span>
          </button>

          <button
            onClick={() => setViewMode('teams')}
            className={`px-3 py-1 rounded-md font-semibold transition flex items-center space-x-1.5 ${
              viewMode === 'teams'
                ? 'bg-[#6264A7] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AppWindow className="w-3.5 h-3.5" />
            <span>Microsoft Teams Tab</span>
          </button>
        </div>

        {/* Mock Context Settings */}
        <div className="flex items-center space-x-2 text-slate-300">
          <span>User:</span>
          <select
            value={mockUser}
            onChange={(e) => setMockUser(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-sky-300 rounded px-2 py-0.5 text-xs outline-none"
          >
            <option value="Alex Johnson (HR Director)">Alex Johnson (HR Director)</option>
            <option value="Sarah Miller (VP People)">Sarah Miller (VP People)</option>
            <option value="David Chen (Workforce Analyst)">David Chen (Workforce Analyst)</option>
          </select>
        </div>
      </div>

      {/* 2. Mode: Microsoft Teams Simulation */}
      {viewMode === 'teams' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Teams Left Rail */}
          <div className="w-16 bg-[#33344A] flex flex-col items-center py-3 space-y-5 text-[#C8C8DF] select-none">
            <div className="w-9 h-9 rounded-lg bg-[#6264A7] flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
            <div className="flex flex-col items-center space-y-1 text-[10px] cursor-pointer hover:text-white">
              <Bell className="w-5 h-5" />
              <span>Activity</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-[10px] cursor-pointer hover:text-white">
              <Search className="w-5 h-5" />
              <span>Chat</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-[10px] cursor-pointer hover:text-white">
              <Layout className="w-5 h-5" />
              <span>Teams</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-[10px] cursor-pointer text-white font-bold bg-[#44476A] w-14 py-1.5 rounded-md border-l-2 border-white">
              <Sparkles className="w-5 h-5 text-indigo-300" />
              <span>People Hub</span>
            </div>
          </div>

          {/* Teams Main Window */}
          <div className="flex-1 flex flex-col bg-white overflow-y-auto">
            <div className="h-10 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50 text-xs text-slate-500 font-semibold">
              <div className="flex items-center space-x-4">
                <span className="text-slate-900 font-bold">People Analytics & Workforce Intelligence</span>
                <span className="text-slate-400">|</span>
                <span className="text-[#6264A7] border-b-2 border-[#6264A7] pb-2 font-bold">Dashboard</span>
                <span className="hover:text-slate-800 cursor-pointer">Reports</span>
                <span className="hover:text-slate-800 cursor-pointer">Export Logs</span>
              </div>
            </div>

            {/* Embedded SPFx Component */}
            <div className="flex-1">
              <PeopleAnalytics
                description="Simulated SPFx inside Teams"
                userDisplayName={mockUser}
                siteTitle={mockSite}
                hasTeamsContext={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Mode: Standard SharePoint Page Simulation (With Template Frame) */}
      {viewMode === 'standard' && (
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* M365 Suite Bar */}
          <div className="h-12 bg-[#0078D4] text-white flex items-center justify-between px-4 select-none">
            <div className="flex items-center space-x-3">
              <Menu className="w-5 h-5 cursor-pointer" />
              <span className="font-bold text-sm">SharePoint</span>
            </div>
            <div className="flex items-center bg-white/20 rounded-md px-3 py-1.5 w-96 max-w-sm">
              <Search className="w-4 h-4 text-white/70 mr-2" />
              <input
                type="text"
                placeholder="Search in SharePoint"
                className="bg-transparent border-none text-xs text-white placeholder-white/70 focus:outline-none w-full"
                readOnly
              />
            </div>
            <div className="flex items-center space-x-3 text-white">
              <Bell className="w-4 h-4 cursor-pointer" />
              <Settings className="w-4 h-4 cursor-pointer" />
              <div className="w-7 h-7 rounded-full bg-white/30 text-white flex items-center justify-center font-bold text-xs">
                AJ
              </div>
            </div>
          </div>

          {/* SharePoint Site Header */}
          <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded bg-[#0078D4] text-white flex items-center justify-center font-bold text-base">
                WT
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">{mockSite}</h2>
                <p className="text-xs text-slate-500">Private group • 28 members</p>
              </div>
            </div>
          </div>

          {/* SharePoint Clunky Banner (The thing you hated!) */}
          <div className="max-w-7xl mx-auto w-full px-6 pt-6">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-xl p-8 shadow-sm relative overflow-hidden mb-6">
              <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Site Page</div>
              <h1 className="text-3xl font-extrabold mt-1">Workforce Intelligence Hub</h1>
              <p className="text-xs text-blue-100 mt-2">Published by People Analytics Operations • Yesterday at 4:12 PM</p>
            </div>

            {/* SPFx Web Part Box inside standard page */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-12">
              <div className="p-2 bg-slate-50 border-b border-slate-200 text-[11px] text-slate-400 font-semibold px-4 flex items-center justify-between">
                <span>SharePoint Web Part Container: PeopleAnalyticsWebPart</span>
                <span className="text-emerald-600">● Live Canvas</span>
              </div>
              <PeopleAnalytics
                description="Simulated standard web part"
                userDisplayName={mockUser}
                siteTitle={mockSite}
                hasTeamsContext={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Mode: SPFx Full-Page App (Target SaaS Architecture!) */}
      {viewMode === 'fullpage' && (
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#FAF9F8]">
          {/* Subtle M365 Suite Bar (Minimal) */}
          <div className="h-10 bg-[#0078D4] text-white flex items-center justify-between px-4 text-xs select-none">
            <div className="flex items-center space-x-2">
              <Menu className="w-4 h-4" />
              <span className="font-semibold">Microsoft 365</span>
              <span className="text-blue-200">/</span>
              <span className="font-bold">{mockSite}</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <span className="text-[11px]">SPFx Single-Part App Page (Edge-to-Edge)</span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[10px]">
                AJ
              </div>
            </div>
          </div>

          {/* Full Page SPFx App (Edge-to-edge, zero templates, zero clunk!) */}
          <div className="flex-1">
            <PeopleAnalytics
              description="SPFx Full-Page App"
              userDisplayName={mockUser}
              siteTitle={mockSite}
              hasTeamsContext={false}
            />
          </div>
        </div>
      )}

    </div>
  );
};
