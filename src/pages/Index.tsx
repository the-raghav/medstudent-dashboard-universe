
import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import StudyMaterials from '@/components/dashboard/StudyMaterials';
import DiscussionForums from '@/components/dashboard/DiscussionForums';
import StudyRoadmap from '@/components/dashboard/StudyRoadmap';
import MentorshipQA from '@/components/dashboard/MentorshipQA';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import ProgressTracker from '@/components/dashboard/ProgressTracker';

const Index = () => {
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content - 2/3 width on large screens */}
              <div className="lg:col-span-2 space-y-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {/* Welcome banner with key stats */}
                <WelcomeBanner studentName="Sarah" />
                
                {/* Study materials section */}
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <StudyMaterials />
                </div>
                
                {/* Discussion forums section */}
                <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <DiscussionForums />
                </div>
                
                {/* Roadmap section */}
                <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <StudyRoadmap />
                </div>
                
                {/* Mentorship & Q&A section */}
                <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <MentorshipQA />
                </div>
              </div>
              
              {/* Right sidebar - 1/3 width on large screens */}
              <div className="lg:col-span-1 space-y-6">
                {/* Progress tracker */}
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <ProgressTracker />
                </div>
                
                {/* Upcoming events */}
                <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <UpcomingEvents />
                </div>
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
