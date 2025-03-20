
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import MentorshipQA from '@/components/dashboard/MentorshipQA';

const defaultSessions = [
  {
    id: '1',
    mentorName: 'Dr. Emily Chen',
    mentorAvatar: '/placeholder.svg',
    mentorSpecialty: 'Neurologist',
    sessionTitle: 'Neuroanatomy Deep Dive',
    sessionType: 'group' as const,
    date: 'June 15, 2023',
    time: '4:00 PM',
    duration: '60 min',
    availableSpots: 8,
  },
  {
    id: '2',
    mentorName: 'Dr. James Wilson',
    mentorAvatar: '/placeholder.svg',
    mentorSpecialty: 'Cardiologist',
    sessionTitle: 'ECG Interpretation for Beginners',
    sessionType: 'group' as const,
    date: 'June 18, 2023',
    time: '2:30 PM',
    duration: '45 min',
    availableSpots: 5,
  },
  {
    id: '3',
    mentorName: 'Dr. Sarah Johnson',
    mentorAvatar: '/placeholder.svg',
    mentorSpecialty: 'Surgeon',
    sessionTitle: 'Surgical Residency Preparation',
    sessionType: 'one-on-one' as const,
    date: 'June 20, 2023',
    time: '5:15 PM',
    duration: '30 min',
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
