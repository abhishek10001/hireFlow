import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Settings = lazy(() => import("./pages/Settings"));
const FormBuilder = lazy(() => import("./pages/FormBuilder"));
const PublicForm = lazy(() => import("./pages/PublicForm"));
const Login = lazy(() => import("./pages/Login"));

import Loader from "./components/Loader"; // Simple spinner component

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/form/:id" element={<PublicForm />} />
          {/* Redirect any unknown paths to the landing page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;