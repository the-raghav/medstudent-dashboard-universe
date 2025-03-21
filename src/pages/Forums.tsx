
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import DiscussionForums from '@/components/dashboard/DiscussionForums';

const defaultTopics = [
  {
    id: '1',
    title: 'Study strategies for USMLE Step 1',
    replies: 24,
    views: 152,
    lastActivity: '2 hours ago',
    category: 'Exam Prep',
    isTrending: true,
    participants: [
      { name: 'Alex', avatar: '/placeholder.svg' },
      { name: 'Morgan', avatar: '/placeholder.svg' },
      { name: 'Jamie', avatar: '/placeholder.svg' },
    ],
  },
  {
    id: '2',
    title: 'Understanding cardiac arrhythmias - help needed!',
    replies: 15,
    views: 89,
    lastActivity: '5 hours ago',
    category: 'Cardiology',
    participants: [
      { name: 'Taylor', avatar: '/placeholder.svg' },
      { name: 'Jordan', avatar: '/placeholder.svg' },
    ],
  },
];

const Forums = () => {
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
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Discussion Forums</h1>
            <DiscussionForums topics={defaultTopics} />
          </div>
          
          <Footer className="mt-8" />
        </main>
      </div>
    </div>
  );
};

export default Forums;
