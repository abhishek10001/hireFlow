import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const FormContext = createContext();

export const useForms = () => useContext(FormContext);

const API_BASE_URL = '/api/hr'; // Adjust if your proxy is different

export const FormProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [currentForm, setCurrentForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all admin forms
  const getForms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin-forms`);
      setForms(res.data.forms || []);
      return res.data.forms || [];
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch forms');
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  // Create a new form
  const createForm = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/admin-form`, formData);
      setForms([...forms, res.data.form]);
      return res.data.form;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create form');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a form
  const updateForm = async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${API_BASE_URL}/admin-form/${id}`, formData);
      const updatedForms = forms.map((form) =>
        form._id === id ? { ...form, ...formData } : form
      );
      setForms(updatedForms);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update form');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a form
  const deleteForm = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/admin-form/${id}`);
      setForms(forms.filter((form) => form._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete form');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single admin form by ID
  const getFormById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin-form/${id}`);
      setCurrentForm(res.data.form);
      return res.data.form;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch form');
      setCurrentForm(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    forms,
    currentForm,
    loading,
    error,
    getForms,
    getFormById,
    createForm,
    updateForm,
    deleteForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}; 