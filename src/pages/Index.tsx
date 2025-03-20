
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import FeedContainer from '@/components/dashboard/FeedContainer';
import ProgressTracker from '@/components/dashboard/ProgressTracker';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import AIAssistant from '@/components/dashboard/AIAssistant';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Default props for components
  const progressData = {
    progress: [
      { subject: 'Anatomy', completedTopics: 85, totalTopics: 100 },
      { subject: 'Physiology', completedTopics: 70, totalTopics: 100 },
      { subject: 'Biochemistry', completedTopics: 60, totalTopics: 100 },
      { subject: 'Pathology', completedTopics: 45, totalTopics: 100 },
    ],
    totalCompleted: 13,
    totalRequired: 20,
  };

  const defaultEvents = [
    {
      id: '1',
      title: 'USMLE Step 1 Study Group',
      description: 'Join fellow students preparing for the USMLE exam',
      date: '2024-03-15T10:00:00',
      time: '10:00 AM',
      location: 'Virtual Room A',
      type: 'webinar' as 'webinar' | 'workshop' | 'lecture' | 'exam',
    },
    {
      id: '2',
      title: 'Cardiology Case Discussion',
      description: 'Analysis of interesting cardiac cases with Dr. Wilson',
      date: '2024-03-16T15:30:00',
      time: '3:30 PM',
      location: 'Virtual Room B',
      type: 'lecture' as 'webinar' | 'workshop' | 'lecture' | 'exam',
    },
  ];

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content - 2/3 width on large screens */}
              <div className="lg:col-span-2 space-y-8">
                <WelcomeBanner studentName="Sarah" />
                <FeedContainer />
                <AIAssistant />
              </div>
              
              {/* Right sidebar - 1/3 width on large screens */}
              <div className="lg:col-span-1 space-y-6">
                <ProgressTracker 
                  progress={progressData.progress}
                  totalCompleted={progressData.totalCompleted}
                  totalRequired={progressData.totalRequired}
                />
                <UpcomingEvents events={defaultEvents} />
              </div>
            </div>
          </div>
          
          <Footer className="mt-8" />
        </main>
      </div>
    </div>
  );
};

export default Index;
