import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Download,
  Filter
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

// Professional Chart Components
const LineChart = ({ data, title, color = "#7C3AED" }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  
  const points = data.map((point, i) => {
    const x = (i / (data.length - 1)) * 280;
    const y = 120 - ((point.value - minValue) / range) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-gradient-to-br from-gray-950/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg shadow-purple-600/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
          <span>This month</span>
        </div>
      </div>
      <div className="relative">
        <svg width="100%" height="140" viewBox="0 0 300 140" className="w-full">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={20 + i * 25}
              x2="300"
              y2={20 + i * 25}
              stroke="#374151"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}
          {/* Line chart */}
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data points */}
          {data.map((point, i) => {
            const x = (i / (data.length - 1)) * 280;
            const y = 120 - ((point.value - minValue) / range) * 80;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                className="hover:r-6 transition-all"
              />
            );
          })}
          {/* X-axis labels */}
          {data.map((point, i) => {
            const x = (i / (data.length - 1)) * 280;
            return (
              <text
                key={i}
                x={x}
                y="135"
                textAnchor="middle"
                className="text-xs fill-gray-400"
              >
                {point.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

const BarChart = ({ data, title, color = "#7C3AED" }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-gradient-to-br from-gray-950/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg shadow-purple-600/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
          <span>Applications</span>
        </div>
      </div>
      <div className="flex items-end justify-between h-32 gap-2">
        {data.map((item, i) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className="w-full rounded-t-sm transition-all hover:opacity-80"
                style={{ 
                  height: `${height}%`,
                  backgroundColor: color,
                  minHeight: '8px'
                }}
              />
              <span className="text-xs text-gray-400 mt-2 text-center">
                {item.label}
              </span>
              <span className="text-xs font-medium text-white mt-1">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PieChart = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  const colors = ['#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];
  
  return (
    <div className="bg-gradient-to-br from-gray-950/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg shadow-purple-600/10">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="mb-4">
          {data.map((item, i) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const radius = 80;
            const x1 = 100 + radius * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = 100 + radius * Math.sin((currentAngle * Math.PI) / 180);
            const x2 = 100 + radius * Math.cos(((currentAngle + angle) * Math.PI) / 180);
            const y2 = 100 + radius * Math.sin(((currentAngle + angle) * Math.PI) / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <path
                key={i}
                d={pathData}
                fill={colors[i % colors.length]}
                className="hover:opacity-80 transition-opacity"
              />
            );
          })}
        </svg>
      </div>
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              <span className="text-white">{item.label}</span>
            </div>
            <span className="text-gray-400 font-medium">
              {Math.round((item.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-gradient-to-br from-purple-500/10 to-gray-600/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg shadow-purple-600/10"
  >
    <div className="flex items-center justify-between">
      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
        {React.cloneElement(icon, { size: 24, className: "text-white" })}
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${
        change.startsWith('+') ? 'text-white' : 'text-red-400'
      }`}>
        {change.startsWith('+') ? <TrendingUp size={16} /> : <TrendingUp size={16} className="rotate-180" />}
        {change}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
  </motion.div>
);

const Analytics = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState('30d');

  // Sample data
  const applicationTrend = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 38 },
    { label: 'Apr', value: 67 },
    { label: 'May', value: 73 },
    { label: 'Jun', value: 89 }
  ];

  const departmentData = [
    { label: 'Engineering', value: 45 },
    { label: 'Design', value: 28 },
    { label: 'Marketing', value: 32 },
    { label: 'Sales', value: 19 },
    { label: 'HR', value: 12 }
  ];

  const sourceData = [
    { label: 'LinkedIn', value: 35 },
    { label: 'Indeed', value: 28 },
    { label: 'Referrals', value: 22 },
    { label: 'Company Website', value: 15 }
  ];

  const metrics = [
    { title: 'Total Applications', value: '1,247', change: '+12%', icon: <Users />, color: 'text-blue-400' },
    { title: 'Pending Review', value: '42', change: '-3%', icon: <Clock />, color: 'text-orange-400' },
    { title: 'Interviewed', value: '89', change: '+8%', icon: <CheckCircle />, color: 'text-green-400' },
    { title: 'Time to Hire', value: '18 days', change: '-5%', icon: <Calendar />, color: 'text-purple-400' }
  ];

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(p => !p)} />
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <header className="flex justify-between items-center p-6 border-b border-gray-800">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Analytics</h1>
            <p className="text-gray-400 text-sm">Track your hiring performance and insights</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gradient-to-br from-gray-950/50 to-gray-900/30 border border-gray-800 rounded-lg p-1">
              {['7d', '30d', '90d'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    timeRange === range 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <Button variant="secondary">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, i) => (
              <MetricCard key={i} {...metric} />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <LineChart 
              data={applicationTrend} 
              title="Application Trend" 
              color="#7C3AED"
            />
            <BarChart 
              data={departmentData} 
              title="Applications by Department" 
              color="#10B981"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-950/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg shadow-purple-600/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Hiring Pipeline</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Activity size={16} />
                    <span>Real-time</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { stage: 'Applied', count: 1247, color: '#3B82F6' },
                    { stage: 'Screening', count: 892, color: '#F59E0B' },
                    { stage: 'Interview', count: 445, color: '#10B981' },
                    { stage: 'Offer', count: 156, color: '#7C3AED' },
                    { stage: 'Hired', count: 89, color: '#059669' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-400">{item.stage}</div>
                      <div className="flex-1 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${(item.count / 1247) * 100}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                      <div className="w-16 text-right text-sm font-medium text-white">
                        {item.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <PieChart data={sourceData} title="Source of Applications" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;