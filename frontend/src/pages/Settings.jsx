import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Sliders, 
  Bell, 
  Shield, 
  User, 
  Mail, 
  Globe, 
  Briefcase,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const tabs = [
  { 
    label: 'Company Profile', 
    icon: Building,
    description: 'Manage your company information and branding'
  },
  { 
    label: 'Integrations', 
    icon: Sliders,
    description: 'Connect with your favorite tools and services'
  },
  { 
    label: 'Notifications', 
    icon: Bell,
    description: 'Configure your notification preferences'
  },
  { 
    label: 'Security', 
    icon: Shield,
    description: 'Manage your account security settings'
  },
];

const SettingsTabs = ({ activeTab, setActiveTab }) => (
  <div className="flex gap-1 p-1 bg-surface rounded-xl border border-border mb-8">
    {tabs.map((tab, idx) => (
      <button
        key={tab.label}
        onClick={() => setActiveTab(idx)}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm ${
          activeTab === idx 
            ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25' 
            : 'text-text-secondary hover:bg-purple-600/10 hover:text-purple-400'
        }`}
      >
        <tab.icon size={16} className={activeTab === idx ? 'text-white' : 'text-purple-400'} />
        {tab.label}
      </button>
    ))}
  </div>
);

const FormField = ({ label, children, required = false, error = null }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-1 text-sm font-semibold text-text-primary">
      {label}
      {required && <span className="text-purple-400">*</span>}
    </label>
    {children}
    {error && (
      <div className="flex items-center gap-1 text-xs text-red-400">
        <AlertCircle size={12} />
        {error}
      </div>
    )}
  </div>
);

const CompanyProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: 'Abhishek',
    lastName: 'Gangwar',
    companyName: 'HireFlow Inc.',
    website: 'https://hireflow.com',
    industry: 'Technology',
    description: 'Leading AI-powered recruitment platform that helps companies hire smarter and faster.',
    email: 'contact@hireflow.com',
    phone: '+1 (555) 123-4567',
    address: '123 Innovation Drive, Tech City, TC 12345'
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Company Profile</h2>
          <p className="text-text-muted text-sm">Update your company information and branding</p>
        </div>
        <div className="flex items-center gap-3">
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-green-400 text-sm"
            >
              <CheckCircle size={16} />
              Saved successfully
            </motion.div>
          )}
          <button
            onClick={() => setFormData({
              firstName: 'Abhishek',
              lastName: 'Gangwar',
              companyName: 'HireFlow Inc.',
              website: 'https://hireflow.com',
              industry: 'Technology',
              description: 'Leading AI-powered recruitment platform that helps companies hire smarter and faster.',
              email: 'contact@hireflow.com',
              phone: '+1 (555) 123-4567',
              address: '123 Innovation Drive, Tech City, TC 12345'
            })}
            className="flex items-center gap-2 px-4 py-2.5 bg-transparent border border-purple-600/50 text-purple-300 hover:bg-purple-600/20 hover:border-purple-500 hover:text-white rounded-lg font-medium transition-all duration-200 text-sm"
          >
            <X size={16} />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg font-semibold transition-all duration-200 text-sm shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:to-purple-700"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <User size={18} className="text-purple-400" />
              Personal Information
            </h3>
            <FormField label="First Name" required>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border-light rounded-lg text-text-primary placeholder-text-muted focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm"
                placeholder="Enter first name"
              />
            </FormField>
            <FormField label="Last Name" required>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border-light rounded-lg text-text-primary placeholder-text-muted focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm"
                placeholder="Enter last name"
              />
            </FormField>
            <FormField label="Email Address" required>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border-light rounded-lg text-text-primary placeholder-text-muted focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm"
                placeholder="Enter email address"
              />
            </FormField>
            <FormField label="Phone Number">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border-light rounded-lg text-text-primary placeholder-text-muted focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm"
                placeholder="Enter phone number"
              />
            </FormField>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <Building size={18} className="text-purple-400" />
              Company Information
            </h3>
            <FormField label="Company Name" required>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border-light rounded-lg text-text-primary placeholder-text-muted focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm"
                placeholder="Enter company name"
              />
            </FormField>
            <FormField label="Website">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={16} />
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-background border border-border-light rounded-lg text-text-primary placeholder-text-muted focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm"
                  placeholder="https://company.com"
                />
              </div>
            </FormField>
            <FormField label="Industry">
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={16} />
                <select
                  value={formData.industry}
                  onChange={(e) => updateField('industry', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-background border border-border-light rounded-lg text-text-primary focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm appearance-none"
                >
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </FormField>
            <FormField label="Company Address">
              <textarea
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                rows={2}
                className="w-full px-3 py-2.5 bg-background border border-border-light rounded-lg text-text-primary placeholder-text-muted resize-none focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm"
                placeholder="Enter company address"
              />
            </FormField>
          </div>
        </div>

        {/* Company Description */}
        <div className="mt-6">
          <FormField label="Company Description">
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 bg-background border border-border-light rounded-lg text-text-primary placeholder-text-muted resize-none focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm"
              placeholder="Brief description of your company, mission, and values..."
            />
          </FormField>
        </div>
      </div>
    </motion.div>
  );
};

const PlaceholderContent = ({ tab }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="text-center py-20"
  >
    <div className="w-20 h-20 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-600/20">
      <tab.icon size={32} className="text-purple-400" />
    </div>
    <h3 className="text-xl font-semibold text-text-primary mb-2">{tab.label}</h3>
    <p className="text-text-muted max-w-md mx-auto">{tab.description}</p>
    <div className="mt-6">
      <Button 
        variant="secondary"
        className="border-purple-600/30 text-purple-400 hover:bg-purple-600/10"
      >
        Coming Soon
      </Button>
    </div>
  </motion.div>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-black text-text-primary overflow-hidden">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(p => !p)} />
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <header className="flex justify-between items-center p-6 border-b border-border">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Settings</h1>
            <p className="text-text-muted text-sm">Manage your account and workspace preferences</p>
          </div>
        </header>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="w-full">
            <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="bg-black rounded-xl border border-border p-6 w-full">
              {activeTab === 0 && <CompanyProfileForm />}
              {activeTab !== 0 && <PlaceholderContent tab={tabs[activeTab]} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;