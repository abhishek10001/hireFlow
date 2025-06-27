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
    const selectedFile = e.target.files[0];
    console.log('File input change event triggered');
    console.log('Selected file:', selectedFile);
    
    if (selectedFile) {
      console.log('File selected:', {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Please select a valid file type (PDF, DOC, or DOCX)');
        e.target.value = '';
        setFile(null);
        return;
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (selectedFile.size > maxSize) {
        toast.error('File size must be less than 10MB');
        e.target.value = '';
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      toast.success(`File "${selectedFile.name}" selected successfully`);
    } else {
      console.log('No file selected');
      setFile(null);
    }
  };

  const getFieldName = label => label.toLowerCase().replace(/\s+/g, '_');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build FormData for n8n webhook
    const webhookFormData = new FormData();

    // Add form metadata
    webhookFormData.append('formId', id);
    webhookFormData.append('formTitle', currentForm.formTitle);
    webhookFormData.append('department', currentForm.department);
    webhookFormData.append('submittedAt', new Date().toISOString());

    // Add all form field data, using the exact field names n8n expects
    currentForm.fields.forEach(field => {
      let fieldName = field.label; // Use the label as the field name (e.g., 'Experience')
      let value = formData[getFieldName(field.label)];
      if (field.type === 'file') {
        // For file, use 'CV' as the field name
        if (file) {
          webhookFormData.append('CV', file, file.name);
        }
      } else if (value !== undefined) {
        webhookFormData.append(fieldName, value);
      }
    });

    // Add file info fields if needed
    if (file) {
      webhookFormData.append('hasFile', 'true');
      webhookFormData.append('fileName', file.name);
      webhookFormData.append('fileSize', file.size.toString());
      webhookFormData.append('fileType', file.type);
    } else {
      webhookFormData.append('hasFile', 'false');
    }

    // Send to n8n webhook
    try {
      await axios.post('http://localhost:5678/webhook-test/user-form', webhookFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });
      // Trigger sheetstosupabse webhook after successful submission
      try {
        await axios.get('http://localhost:5678/webhook-test/sheetstosupabse');
      } catch (fetchError) {
        toast.error('Failed to trigger Supabase update webhook.');
      }
      toast.success('Application submitted successfully!');
      setFormData({});
      setFile(null);
    } catch (webhookError) {
      toast.error('Failed to submit application to n8n webhook.');
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
              <div className="grid lg:grid-cols-5 gap-8 h-full items-start">
                <div className="lg:col-span-3">
                  <div className="h-full flex flex-col justify-start pt-4">
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

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 min-h-[120px]">
                        <div className="p-3 bg-purple-600/20 rounded-lg flex-shrink-0">
                          <FileText className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-white mb-2">Complete Application</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">Fill out all required fields and upload your resume to proceed with your application. Make sure all information is accurate and up-to-date.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 min-h-[120px]">
                        <div className="p-3 bg-purple-600/20 rounded-lg flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-white mb-2">Submit & Review</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">Our team will review your application and get back to you within 2-3 business days. We'll contact you via email with next steps.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {currentForm.fields.map(field => (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="block text-xs font-medium text-purple-300 mb-1.5">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {field.type === 'file' ? (
                            <div className="w-full space-y-2">
                              {/* Visible file input for debugging */}
                              <input 
                                type="file" 
                                name="CV"
                                onChange={handleFileChange} 
                                required={field.required} 
                                className="w-full px-3 py-2 bg-black/50 border border-purple-800/50 rounded-lg text-white text-sm"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              />
                              
                              {/* Custom styled upload area */}
                              <div 
                                className="w-full text-center py-4 bg-purple-950/20 border-2 border-dashed border-purple-700/50 rounded-lg text-purple-300 hover:border-purple-600/50 transition-colors cursor-pointer"
                                onClick={() => {
                                  console.log('Upload area clicked');
                                  document.querySelector('input[name=CV]').click();
                                }}
                              >
                                <Briefcase className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                                <p className="font-medium text-xs">
                                  {file ? file.name : 'Or click here to Upload Resume/CV'}
                                </p>
                                <p className="text-xs text-purple-400/70 mt-0.5">PDF, DOC, or DOCX formats</p>
                                {file && (
                                  <p className="text-xs text-green-400 mt-1">✓ File selected successfully</p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <input
                              type={field.type}
                              name={getFieldName(field.label)}
                              id={field.id}
                              value={formData[getFieldName(field.label)] || ''}
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