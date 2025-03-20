
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import StudyRoadmap from '@/components/dashboard/StudyRoadmap';

const defaultRoadmapItems = [
  {
    id: '1',
    title: 'Anatomy Fundamentals',
    description: 'Master the basics of human anatomy',
    status: 'completed' as 'completed' | 'in-progress' | 'locked',
    completionPercentage: 100,
  },
  {
    id: '2',
    title: 'Physiology Deep Dive',
    description: 'Understand how the human body functions',
    status: 'in-progress' as 'completed' | 'in-progress' | 'locked',
    completionPercentage: 60,
  },
  {
    id: '3',
    title: 'Biochemistry & Molecular Biology',
    description: 'Learn the chemical foundations of biological systems',
    status: 'in-progress' as 'completed' | 'in-progress' | 'locked',
    completionPercentage: 30,
  },
  {
    id: '4',
    title: 'Pathology & Disease Mechanisms',
    description: 'Study the mechanisms of disease development',
    status: 'locked' as 'completed' | 'in-progress' | 'locked',
  },
];

const Roadmaps = () => {
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
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Study Roadmaps</h1>
            <StudyRoadmap items={defaultRoadmapItems} />
          </div>
          
          <Footer className="mt-8" />
        </main>
      </div>
    </div>
  );
};

export default Roadmaps;
