import React, { useState, useEffect } from 'react';
import { Users, Download, Plus, Search, Eye, Edit, Trash2, MoreHorizontal, Send, Loader } from 'lucide-react';
import Button from './Button';
import { useApplicants } from '../context/ApplicantContext';
import axios from 'axios';

const RecentApplicationsTable = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { applicants, loading, error, fetchApplicants } = useApplicants();
  const [expandedRows, setExpandedRows] = useState({});
  const [isSendingCredentials, setIsSendingCredentials] = useState(false);

  useEffect(() => {
    fetchApplicants();
    // eslint-disable-next-line
  }, []);

  // TEMP: Show all applicants, ignore search/filter for debugging
  const filteredData = applicants;

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSendCredentials = async () => {
    setIsSendingCredentials(true);
    try {
      // Get shortlisted candidates (you can modify this logic based on your criteria)
      const shortlistedCandidates = filteredData.filter(app => 
        app['Phone interview'] === 'Yes' || app['Stage'] === 'Shortlisted'
      );
      
      const response = await axios.post('http://localhost:5678/webhook-test/send-cred', {
        candidates: shortlistedCandidates,
        timestamp: new Date().toISOString(),
        action: 'send_credentials_to_shortlisted'
      });
      
      console.log('Credentials sent successfully:', response.data);
      // You can add a toast notification here if needed
    } catch (error) {
      console.error('Error sending credentials:', error);
      // You can add error handling here
    } finally {
      setIsSendingCredentials(false);
    }
  };

  return (
    <div className="bg-gray-950/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 flex-1 flex flex-col">
      {/* Removed title and subtitle for cleaner look on Applicants page */}
      {/* Improved Buttons OUTSIDE the scroll area */}
      <div className="flex gap-3 flex-wrap mb-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-900 border border-purple-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-gray-900 border border-purple-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="interviewed">Interviewed</option>
          <option value="hired">Hired</option>
        </select>
        <Button variant="primary" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg hover:from-purple-600 hover:to-purple-800 border-none transition-all">
          <Download size={16} />
          <span>Export</span>
        </Button>
        <Button variant="primary" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg hover:from-purple-600 hover:to-purple-800 border-none transition-all">
          <Plus size={16} />
          <span>New Form</span>
        </Button>
        
        {/* Send Credentials Button with Tooltip */}
        <div className="relative group">
          <Button 
            variant="primary" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:from-green-700 hover:to-green-600 border-none transition-all"
            onClick={handleSendCredentials}
            disabled={isSendingCredentials}
          >
            {isSendingCredentials ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            <span>Send Credentials</span>
          </Button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 border border-gray-700">
            Send credentials to the shortlisted candidates of telephonic interview
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
      {/* Only the table scrolls horizontally, not the card or buttons */}
      <div className="w-full overflow-x-auto border border-gray-800/30 rounded-xl flex-1">
        {loading ? (
          <div className="text-center py-16 text-white">Loading...</div>
        ) : error ? (
          <div className="text-center py-16 text-red-400">{error}</div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No applications yet</h3>
            <p className="text-gray-400 mb-6">Applications will appear here once candidates start applying to your job forms.</p>
            
          </div>
        ) : (
          <table className="w-full text-sm min-w-[1200px]">
            <thead className="bg-gray-900/50 sticky top-0">
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">ID</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Name</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Email Address</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Phone</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Applying For</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">CV Link</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Experience</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">CV Score Notes</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">JD CV Score</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Stage</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Phone interview</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Time slot for phone interview</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Phone interviewer</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Phone interview score</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Onsite Interview</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Onsite interview score </th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Time slot for onsite interview</th>
                
                <th className="text-left py-4 px-4 text-gray-400 font-semibold whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((app, index) => (
                <tr key={app.id || index} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors group">
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[100px] truncate" title={app.id || ''}>
                      {app.id || '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white font-medium">
                    <div className="max-w-[150px] truncate" title={app['Name'] || ''}>
                      {app['Name'] || '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[200px] truncate" title={app['Email address'] || ''}>
                      {app['Email address'] || '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[120px] truncate" title={app['Phone'] || ''}>
                      {app['Phone'] || '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[150px] truncate">{app['Applying For']}</div>
                  </td>
                  <td className="py-4 px-4 text-blue-400 underline">
                    <div className="max-w-[100px] truncate">
                      <a href={app['CV Link']} target="_blank" rel="noopener noreferrer">CV</a>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[100px] truncate">{app['Experience']}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[300px]">
                      {app['CV Score Notes'] && (
                        <>
                          {!expandedRows[app.id] ? (
                            <>
                              <div className="truncate">
                                {app['CV Score Notes'].split('\n')[0].slice(0, 80)}
                                {app['CV Score Notes'].length > 80 && '...'}
                              </div>
                              {app['CV Score Notes'].length > 80 && (
                                <button
                                  className="text-purple-400 underline text-xs mt-1 block"
                                  onClick={() => toggleExpand(app.id)}
                                >
                                  Show More
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="whitespace-pre-wrap break-words">
                                {app['CV Score Notes']}
                              </div>
                              <button
                                className="text-purple-400 underline text-xs mt-1 block"
                                onClick={() => toggleExpand(app.id)}
                              >
                                Show Less
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[100px] truncate">{app['JD CV Score']}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[120px] truncate">{app['Stage']}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[150px] truncate" title={app['Phone interview'] || ''}>
                      {app['Phone interview'] || '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[150px] truncate" title={app['Time slot for phone interview'] || ''}>
                      {app['Time slot for phone interview'] || '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[150px] truncate">{app['Phone interviewer']}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[100px] truncate">{app['Phone interview score']}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[150px] truncate">
                      {app['Onsite Interview'] === true && 'Yes'}
                      {app['Onsite Interview'] === false && 'No'}
                      {(app['Onsite Interview'] !== true && app['Onsite Interview'] !== false) && '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[100px] truncate">{app['Onsite interview score']}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="max-w-[150px] truncate" title={app['Time slot for onsite interview'] || ''}>
                      {app['Time slot for onsite interview'] || '-'}
                    </div>
                  </td>
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
        )}
      </div>
    </div>
  );
};

export default RecentApplicationsTable; 