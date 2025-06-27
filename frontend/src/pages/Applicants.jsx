import React from 'react';
import Sidebar from '../components/Sidebar';
import { useApplicants } from '../context/ApplicantContext';
import RecentApplicationsTable from '../components/RecentApplicationsTable';
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Applicants = () => {
  const { applicants } = useApplicants();
  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen p-2 sm:p-4 md:ml-64 transition-all duration-200 overflow-hidden">
        <div className="w-full h-full flex flex-col">
          {/* Attach Google Sheet Button and Update Data Button */}
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-4xl font-bold text-white ml-2">All Applicants</h2>
            <div className="flex gap-2">
              <Button
                variant="primary" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg hover:from-purple-600 hover:to-purple-800 border-none transition-all"
                as="a"
                href="https://sheets.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link to Google Sheets
              </Button>
              <Button
                variant="primary" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg hover:from-purple-600 hover:to-purple-800 border-none transition-all"
                onClick={async () => {
                  try {
                    await fetch('http://localhost:5678/webhook-test/sheetstosupabse2');
                    toast.success('Data update to Supabase triggered!');
                  } catch (err) {
                    toast.error('Failed to update data to Supabase');
                  }
                }}
              >
                Update Data to Supabase
              </Button>
              <Button
                variant="primary"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg hover:from-green-600 hover:to-green-800 border-none transition-all"
                onClick={async () => {
                  try {
                    await axios.post('http://localhost:5678/webhook-test/send-mail-to-hired-candidates');
                    toast.success('Mail sent to hired candidate!');
                  } catch (err) {
                    toast.error('Failed to send mail to hired candidate');
                  }
                }}
              >
                Send Mail to Hired Candidate
              </Button>
            </div>
          </div>
          <ToastContainer theme="dark" position="bottom-right" />
          
          
          <div className="flex-1 flex flex-col">
            <RecentApplicationsTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Applicants; 