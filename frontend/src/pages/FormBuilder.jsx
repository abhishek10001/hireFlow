import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Hash,
  Briefcase,
  Link,
  Check,
  X,
  Loader,
} from "lucide-react";
import { useForms } from "../context/FormContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fieldTypes = [
  { id: "text", icon: FileText },
  { id: "number", icon: Hash },
  { id: "file", icon: Briefcase },
];

const EditorPanel = ({ formData, onUpdateForm, fields, onUpdateFields }) => {
  const [selectedField, setSelectedField] = useState(null);

  const updateField = (index, updates) => {
    onUpdateFields(
      fields.map((field, i) => (i === index ? { ...field, ...updates } : field))
    );
  };

  return (
    <div className="bg-black rounded-xl p-6 h-full flex flex-col border border-purple-900/30 shadow-2xl">
      {/* Form Settings Section (Non-scrollable) */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4 pb-2 border-b border-purple-900/30">
          Form Configuration
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-2">
                Form Title
              </label>
              <input
                value={formData.formTitle || ""}
                onChange={(e) =>
                  onUpdateForm({ ...formData, formTitle: e.target.value })
                }
                className="w-full px-3 py-3 bg-purple-950/20 border border-purple-800/50 rounded-lg text-white placeholder-purple-400/50 focus:border-purple-600 focus:outline-none transition-colors text-sm"
                placeholder="Enter form title"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-300 mb-2">
                Department
              </label>
              <select
                value={formData.department || "engineering"}
                onChange={(e) =>
                  onUpdateForm({ ...formData, department: e.target.value })
                }
                className="w-full px-3 py-3 bg-purple-950/20 border border-purple-800/50 rounded-lg text-white focus:border-purple-600 focus:outline-none transition-colors text-sm"
              >
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-2">
              Job Description
            </label>
            <textarea
              value={formData.description || ""}
              onChange={(e) =>
                onUpdateForm({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-3 bg-purple-950/20 border border-purple-800/50 rounded-lg text-white placeholder-purple-400/50 resize-none focus:border-purple-600 focus:outline-none transition-colors text-sm"
              rows={3}
              placeholder="Enter job description and instructions"
            />
          </div>
        </div>
      </div>

      {/* Form Fields Section (Scrollable) */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-purple-900/30">
          <h2 className="text-lg font-bold text-white">Form Fields</h2>
          <span className="text-xs text-purple-400 bg-purple-950/30 px-2 py-1 rounded-full">
            {fields.length} fields
          </span>
        </div>

        <div className="space-y-3 overflow-y-auto no-scrollbar flex-1">
          {fields.map((field, index) => {
            const FieldIcon =
              fieldTypes.find((f) => f.id === field.type)?.icon || FileText;
            return (
              <div
                key={field.id}
                className="bg-purple-950/10 border border-purple-900/20 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-600/20 rounded-lg">
                        <FieldIcon className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium text-sm">
                          {field.label}
                        </span>
                        {field.required && (
                          <span className="ml-2 text-xs text-purple-300 bg-purple-600/20 px-2 py-0.5 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setSelectedField(
                            selectedField === index ? null : index
                          )
                        }
                        className="p-1.5 text-purple-400 hover:text-white hover:bg-purple-600/20 rounded-lg transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {selectedField === index && (
                  <div className="px-4 pb-4 border-t border-purple-900/20 bg-purple-950/20">
                    <div className="pt-3 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-purple-300 mb-1">
                          Field Label
                        </label>
                        <input
                          value={field.label}
                          onChange={(e) =>
                            updateField(index, { label: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-black border border-purple-800/50 rounded-lg text-white focus:border-purple-600 focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <label className="flex items-center gap-2 text-xs text-purple-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) =>
                            updateField(index, { required: e.target.checked })
                          }
                          className="w-3 h-3 text-purple-600 bg-black border-purple-800 rounded focus:ring-purple-600"
                        />
                        <span className="font-medium">
                          Mark as required field
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FormPreview = ({ formData, fields }) => {
  const [mode, setMode] = useState("Desktop");
  return (
    <div className="bg-black rounded-xl p-4 h-full flex flex-col border border-purple-900/30 shadow-2xl">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-purple-900/30">
        <h3 className="text-lg font-bold text-white">Live Preview</h3>
        <div className="flex items-center bg-purple-950/20 p-1 rounded-lg border border-purple-800/30">
          <button
            onClick={() => setMode("Desktop")}
            className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
              mode === "Desktop"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-purple-300 hover:text-white hover:bg-purple-700/30"
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => setMode("Mobile")}
            className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
              mode === "Mobile"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-purple-300 hover:text-white hover:bg-purple-700/30"
            }`}
          >
            Mobile
          </button>
        </div>
      </div>

      <div
        className={`flex-1 overflow-y-auto no-scrollbar bg-purple-950/10 p-6 rounded-lg border border-purple-900/10 ${
          mode === "Mobile" ? "max-w-sm mx-auto" : ""
        }`}
      >
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-white mb-2">
            {formData.title}
          </h4>
          <p className="text-purple-300 text-sm leading-relaxed">
            {formData.description}
          </p>
        </div>

        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="block text-xs font-semibold text-purple-300 mb-2">
                {field.label}
                {field.required && (
                  <span className="text-purple-400 ml-1">*</span>
                )}
              </label>
              {field.type === "file" ? (
                <div className="w-full text-center py-6 bg-purple-950/20 border-2 border-dashed border-purple-700/50 rounded-lg text-purple-300 hover:border-purple-600/50 transition-colors cursor-pointer">
                  <Briefcase className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <p className="font-medium text-sm">Upload Resume/CV</p>
                  <p className="text-xs text-purple-400/70 mt-1">
                    PDF, DOC, or DOCX formats
                  </p>
                </div>
              ) : (
                <input
                  type={field.type}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full px-3 py-3 bg-purple-950/20 border border-purple-800/50 rounded-lg text-white placeholder-purple-400/50 focus:border-purple-600 focus:outline-none transition-colors text-sm"
                  readOnly
                />
              )}
            </div>
          ))}
          {fields.length > 0 && (
            <div className="pt-4">
              <Button
                variant="primary"
                className="w-full py-3 text-sm font-semibold"
              >
                Submit Application
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CreatedFormsList = ({ onEdit }) => {
  const { forms, getForms, deleteForm, loading, error } = useForms();

  useEffect(() => {
    getForms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      await deleteForm(id);
      toast.success("Form deleted successfully!");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!");
  };

  if (loading && forms.length === 0) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-black rounded-xl p-6 border border-purple-900/30 shadow-2xl h-full flex flex-col">
      <h2 className="text-lg font-bold text-white mb-4 pb-2 border-b border-purple-900/30">
        Created Forms
      </h2>
      <div className="space-y-3 overflow-y-auto no-scrollbar flex-1">
        {Array.isArray(forms) &&
          forms.map((form) => (
            <div
              key={form._id}
              className="bg-purple-950/20 p-4 rounded-lg border border-purple-900/30"
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{form.formTitle}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${window.location.origin}/form/${form._id}`
                      )
                    }
                    className="p-1.5 text-purple-400 hover:text-white hover:bg-purple-600/20 rounded-lg"
                    title="Copy public link"
                  >
                    <Link size={14} />
                  </button>
                  <button
                    onClick={() => onEdit(form)}
                    className="p-1.5 text-purple-400 hover:text-white hover:bg-purple-600/20 rounded-lg"
                    title="Edit form"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="p-1.5 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg"
                    title="Delete form"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const FormBuilder = () => {
  const { createForm, updateForm, loading } = useForms();
  const [currentForm, setCurrentForm] = useState(null);
  const [formData, setFormData] = useState({
    formTitle: "New Job Application",
    department: "engineering",
    description: "Please fill out this form to apply.",
  });

  const [fields, setFields] = useState([
    { id: "1", type: "text", label: "Full Name", required: true },
    { id: "2", type: "text", label: "Email Address", required: true },
    { id: "3", type: "number", label: "Phone Number", required: false },
    { id: "4", type: "number", label: "Year Of Experience", required: true },
    { id: "6", type: "text", label: "Applying For", required: true },
    { id: "5", type: "file", label: "Resume/CV", required: true },
  ]);

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleEdit = (form) => {
    setCurrentForm(form);
    setFormData({
      formTitle: form.formTitle,
      description: form.description,
      department: form.department,
    });
    setFields(form.fields);
  };

  const handleClear = () => {
    setCurrentForm(null);
    setFormData({
      formTitle: "New Job Application",
      department: "engineering",
      description: "Please fill out this form to apply.",
    });
    setFields([
      { id: "1", type: "text", label: "Full Name", required: true },
      { id: "2", type: "text", label: "Email Address", required: true },
      { id: "3", type: "number", label: "Phone Number", required: false },
      { id: "4", type: "number", label: "Year Of Experience", required: true },
      { id: "5", type: "file", label: "Resume/CV", required: true },
      { id: "6", type: "text", label: "Applying For", required: true },
    ]);
  };

  const handleSave = async () => {
    const payload = { ...formData, fields };
    try {
      if (currentForm) {
        await updateForm(currentForm._id, payload);
        toast.success("Form updated successfully!");
      } else {
        await createForm(payload);
        toast.success("Form created successfully!");
      }
      handleClear();
    } catch (err) {
      toast.error(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <>
      <ToastContainer theme="dark" position="bottom-right" />
      <div className="flex h-screen bg-black text-white overflow-hidden">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((p) => !p)}
        />
        <main
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
          }`}
        >
          <header className="flex justify-between items-center p-6 border-b border-purple-900/30">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                {currentForm ? "Edit Form" : "Create New Form"}
              </h1>
              <p className="text-purple-300 text-sm">
                Create and customize AI-powered job application forms
              </p>
            </div>
            <div className="flex items-center gap-3 h-14 w-auto">
              {currentForm && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-4 py-2.5 bg-transparent border border-purple-600/50 text-purple-300 hover:bg-purple-600/20 hover:border-purple-500 hover:text-white rounded-lg font-medium transition-all duration-200 text-sm"
                >
                  <X size={16} />
                  Cancel Edit
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg font-semibold transition-all duration-200 text-sm shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:to-purple-700"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={16} />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    {currentForm ? "Save Changes" : "Publish Form"}
                  </>
                )}
              </button>
            </div>
          </header>

          <div className="flex-1 flex gap-6 p-6 overflow-hidden">
            <div className="w-1/3 flex-shrink-0">
              <CreatedFormsList onEdit={handleEdit} />
            </div>
            <div className="flex-1 min-w-0">
              <EditorPanel
                formData={formData}
                onUpdateForm={setFormData}
                fields={fields}
                onUpdateFields={setFields}
              />
            </div>
            <div className="w-1/3 flex-shrink-0 overflow-y-auto no-scrollbar">
              <FormPreview formData={formData} fields={fields} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FormBuilder;
