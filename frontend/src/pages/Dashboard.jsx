import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, Clock, BarChart3, CheckCircle, Download, Plus, Filter, Search, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { useApplicants } from '../context/ApplicantContext';
import RecentApplicationsTable from '../components/RecentApplicationsTable';

const StatsCards = ({ applicants }) => {
  // Calculate stats dynamically from applicants
  const total = applicants.length;
  const pending = applicants.filter(a => (a['Stage'] || '').toLowerCase() === 'pending').length;
  const interviewed = applicants.filter(a => (a['Stage'] || '').toLowerCase() === 'interview').length;
  const hired = applicants.filter(a => (a['Stage'] || '').toLowerCase() === 'hired').length;

  const stats = [
    { label: 'Total Applications', value: total, change: '', icon: Users, color: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-500/10 to-purple-600/5' },
    { label: 'Pending Review', value: pending, change: '', icon: Clock, color: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-500/10 to-purple-600/5' },
    { label: 'Interviewed', value: interviewed, change: '', icon: BarChart3, color: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-500/10 to-purple-600/5' },
    { label: 'Hired', value: hired, change: '', icon: CheckCircle, color: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-500/10 to-purple-600/5' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group cursor-pointer hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
              <stat.icon size={24} className="text-white" />
            </div>
            {/* No change % for now */}
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white tracking-tight">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const { applicants } = useApplicants();
  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen p-4 sm:p-8 md:ml-64 transition-all duration-200 overflow-hidden">
        <div className="w-full h-full">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-gray-400 text-lg">
                  Welcome back, <span className="text-purple-400 font-semibold">Abhishek</span>! Here's your hiring overview.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-white font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  <div className="text-gray-400 text-sm">Last updated: just now</div>
                </div>
              </div>
            </div>
          </div>
          <StatsCards applicants={applicants} />
          <RecentApplicationsTable />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;