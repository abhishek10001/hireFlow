import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { FormProvider } from "./context/FormContext.jsx";
import { ApplicantProvider } from './context/ApplicantContext';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormProvider>
      <ApplicantProvider>
        <App />
      </ApplicantProvider>
    </FormProvider>
  </React.StrictMode>
);
