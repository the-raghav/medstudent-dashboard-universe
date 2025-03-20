
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import MentorshipQA from '@/components/dashboard/MentorshipQA';

const defaultSessions = [
  {
    id: '1',
    mentorName: 'Dr. Smith',
    specialty: 'Cardiology',
    availableSlots: ['2024-03-15T10:00:00', '2024-03-16T15:30:00'],
    rating: 4.8,
  },
  {
    id: '2',
    mentorName: 'Dr. Johnson',
    specialty: 'Neurology',
    availableSlots: ['2024-03-17T11:00:00', '2024-03-18T14:30:00'],
    rating: 4.9,
  },
];

const Mentorship = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        studentName="Sarah Johnson" 
        notificationCount={3}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className={`transition-all duration-300 ease-in-out flex-1 min-h-[calc(100vh-4rem)] bg-slate-50 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-16'
        }`}>
          <div className="container px-4 py-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Mentorship & Q&A</h1>
            <MentorshipQA sessions={defaultSessions} />
          </div>
          
          <Footer className="mt-8" />
        </main>
      </div>
    </div>
  );
};

export default Mentorship;
