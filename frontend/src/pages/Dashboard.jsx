import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, Clock, BarChart3, CheckCircle, Download, Plus, Filter, Search, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';


const StatsCards = () => {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const stats = [
    { label: 'Total Applications', value: 247, change: '+12%', icon: Users, color: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-500/10 to-purple-600/5' },
    { label: 'Pending Review', value: 42, change: '-3%', icon: Clock, color: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-500/10 to-purple-600/5' },
    { label: 'Interviewed', value: 89, change: '+8%', icon: BarChart3, color: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-500/10 to-purple-600/5' },
    { label: 'Hired', value: 23, change: '+15%', icon: CheckCircle, color: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-500/10 to-purple-600/5' },
  ];

  useEffect(() => {
    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.value / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.floor(current);
          return newValues;
        });
      }, 30);
    });
  }, []);

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
            <div className={`flex items-center gap-1 text-sm font-medium ${
              stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
            }`}>
              {stat.change.startsWith('+') ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {stat.change}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white tracking-tight">
              {animatedValues[index].toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
          </div>
          
          <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`}
              style={{ width: `${(animatedValues[index] / Math.max(...stats.map(s => s.value))) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const RecentApplicationsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const mockData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      position: 'Senior Developer',
      experience: '5 years',
      aiScore: 92,
      status: 'Pending',
      applied: '2 days ago',
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      position: 'UX Designer',
      experience: '3 years',
      aiScore: 88,
      status: 'Interviewed',
      applied: '1 week ago',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.d@email.com',
      position: 'Product Manager',
      experience: '7 years',
      aiScore: 95,
      status: 'Hired',
      applied: '3 days ago',
      avatar: 'ED'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Interviewed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Hired': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-purple-400';
    if (score >= 70) return 'text-purple-400';
    if (score >= 50) return 'text-purple-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-950/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Recent Applications</h2>
          <p className="text-gray-400">Manage and review candidate applications</p>
        </div>
        
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="interviewed">Interviewed</option>
            <option value="hired">Hired</option>
          </select>
          
          <Button variant="secondary" className="border-purple-600/30 text-purple-400 hover:bg-purple-600/10">
            <Download size={16} />
            Export
          </Button>
          <Button variant="primary" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/25">
            <Plus size={16} />
            New Form
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">Candidate</th>
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">Position</th>
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">Experience</th>
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">AI Score</th>
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">Status</th>
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">Applied</th>
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((candidate, index) => (
              <tr key={candidate.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors group">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {candidate.avatar}
                    </div>
                    <div>
                      <div className="text-white font-medium">{candidate.name}</div>
                      <div className="text-gray-400 text-sm">{candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">{candidate.position}</td>
                <td className="py-4 px-4 text-gray-300">{candidate.experience}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${getScoreColor(candidate.aiScore)}`}>
                      {candidate.aiScore}
                    </span>
                    <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          candidate.aiScore >= 90 ? 'bg-purple-500' :
                          candidate.aiScore >= 70 ? 'bg-purple-500' :
                          candidate.aiScore >= 50 ? 'bg-purple-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${candidate.aiScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidate.status)}`}>
                    {candidate.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-400">{candidate.applied}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {mockData.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No applications yet</h3>
          <p className="text-gray-400 mb-6">Applications will appear here once candidates start applying to your job forms.</p>
          <Button variant="primary" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/25">
            <Plus size={16} />
            Create Your First Form
          </Button>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen p-4 sm:p-8 md:ml-64 transition-all duration-200">
        <div className="max-w-7xl mx-auto">
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
          
          <StatsCards />
          <RecentApplicationsTable />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;