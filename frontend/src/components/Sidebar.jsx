import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Building,
  Briefcase
} from 'lucide-react';

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Overview and analytics'
    },
    {
      name: 'Form Builder',
      href: '/form-builder',
      icon: FileText,
      description: 'Create application forms'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Reports and insights'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Account configuration'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-gray-900 rounded-lg border border-purple-800/30 text-purple-400 hover:bg-purple-900/30 transition-colors"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
        isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-64 bg-gray-900 border-r border-purple-800/30 transform transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <SidebarContent 
            navigation={navigation} 
            isActive={isActive} 
            isCollapsed={false} 
            onToggleCollapse={() => {}} 
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:block fixed left-0 top-0 h-full bg-gray-900 border-r border-purple-800/30 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <SidebarContent 
          navigation={navigation} 
          isActive={isActive} 
          isCollapsed={isCollapsed}
          onToggleCollapse={onToggleCollapse}
        />
      </div>
    </>
  );
};

const SidebarContent = ({ navigation, isActive, isCollapsed, onToggleCollapse }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-purple-800/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">HireFlow</h1>
              <p className="text-xs text-purple-400">AI Recruitment</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                  : 'text-gray-300 hover:bg-purple-900/30 hover:text-purple-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive(item.href) ? 'text-white' : 'text-purple-400'}`} />
              {!isCollapsed && (
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              )}
              {!isCollapsed && isActive(item.href) && (
                <ChevronRight className="w-4 h-4" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-purple-800/30">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">Abhishek Gangwar</div>
              <div className="text-xs text-gray-400">HR Manager</div>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-purple-900/30 rounded-lg transition-colors text-gray-400"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 