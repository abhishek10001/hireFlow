import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const ApplicantContext = createContext();

export const useApplicants = () => useContext(ApplicantContext);

export const ApplicantProvider = ({ children }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Always use a function for API calls
  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:4000/api/hr/applicants');
      setApplicants(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch applicants');
      setApplicants([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch applicants only once on mount
  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  return (
    <ApplicantContext.Provider value={{ applicants, loading, error, fetchApplicants }}>
      {children}
    </ApplicantContext.Provider>
  );
}; 