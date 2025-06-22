import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useForms } from '../context/FormContext';
import Header from '../components/Header';
import { Briefcase, Loader, Send, FileText, Users, Building } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PublicForm = () => {
  const { id } = useParams();
  const { currentForm, getFormById, loading, error } = useForms();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getFormById(id);
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });
    if (file) {
      submissionData.append('cv', file);
    }

    try {
      await axios.post('/api/user/user-form', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Application submitted successfully!');
      setFormData({});
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-10">Loading Form...</div>;
  if (error || !currentForm) return <div className="text-center p-10 text-red-500">Error: Form not found.</div>;

  return (
    <>
      <ToastContainer theme="dark" position="bottom-right" />
      <div className="h-screen bg-gradient-to-br from-background via-sidebar to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <Header />
          <main className="flex-1 px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto h-full">
              <div className="grid lg:grid-cols-5 gap-8 h-full items-center">
                <div className="lg:col-span-3">
                  <div className="h-full flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 rounded-full px-3 py-1 mb-4 w-fit">
                        <FileText size={14} className="text-purple-400" />
                        <span className="text-purple-400 text-xs font-medium">Application Form</span>
                      </div>

                      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        {currentForm.formTitle}
                      </h1>

                      <p className="text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
                        {currentForm.description}
                      </p>

                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-purple-400">
                          <Building size={16} />
                          <span className="text-xs font-medium">Department: {currentForm.department}</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-400">
                          <Users size={16} />
                          <span className="text-xs font-medium">Open for applications</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="p-1.5 bg-purple-600/20 rounded-lg">
                          <FileText className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white mb-0.5">Complete Application</h3>
                          <p className="text-gray-400 text-xs">Fill out all required fields and upload your resume</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="p-1.5 bg-purple-600/20 rounded-lg">
                          <Briefcase className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white mb-0.5">Submit & Review</h3>
                          <p className="text-gray-400 text-xs">Our team will review your application and get back to you</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {currentForm.fields.map(field => (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="block text-xs font-medium text-purple-300 mb-1.5">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {field.type === 'file' ? (
                            <div className="w-full text-center py-4 bg-purple-950/20 border-2 border-dashed border-purple-700/50 rounded-lg text-purple-300 hover:border-purple-600/50 transition-colors cursor-pointer">
                              <input type="file" name={field.label.toLowerCase().replace(' ', '')} onChange={handleFileChange} required={field.required} className="hidden" id={field.id} />
                              <label htmlFor={field.id} className="cursor-pointer">
                                <Briefcase className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                                <p className="font-medium text-xs">{file ? file.name : 'Upload Resume/CV'}</p>
                                <p className="text-xs text-purple-400/70 mt-0.5">PDF, DOC, or DOCX formats</p>
                              </label>
                            </div>
                          ) : (
                            <input
                              type={field.type}
                              name={field.label.toLowerCase().replace(' ', '')}
                              id={field.id}
                              value={formData[field.label.toLowerCase().replace(' ', '')] || ''}
                              onChange={handleInputChange}
                              required={field.required}
                              className="w-full px-3 py-2 bg-black/50 border border-purple-800/50 rounded-lg text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none transition-colors text-sm"
                              placeholder={`Enter your ${field.label.toLowerCase()}`}
                            />
                          )}
                        </div>
                      ))}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center py-2.5 text-sm font-semibold bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:bg-gray-500"
                        >
                          {isSubmitting ? <Loader className="animate-spin mr-2 w-4 h-4" /> : <Send className="mr-2 w-4 h-4" />}
                          Submit Application
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PublicForm; 