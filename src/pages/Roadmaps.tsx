
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
    duration: '4 weeks',
    difficulty: 'Beginner',
    completed: true,
    milestones: [
      { id: 'm1', title: 'Skeletal System', completed: true },
      { id: 'm2', title: 'Muscular System', completed: true },
      { id: 'm3', title: 'Nervous System', completed: true },
      { id: 'm4', title: 'Cardiovascular System', completed: true },
    ]
  },
  {
    id: '2',
    title: 'Physiology Deep Dive',
    description: 'Understand how the human body functions',
    duration: '6 weeks',
    difficulty: 'Intermediate',
    completed: false,
    milestones: [
      { id: 'm1', title: 'Cell Physiology', completed: true },
      { id: 'm2', title: 'Neurophysiology', completed: true },
      { id: 'm3', title: 'Cardiovascular Physiology', completed: false },
      { id: 'm4', title: 'Respiratory Physiology', completed: false },
      { id: 'm5', title: 'Renal Physiology', completed: false },
    ]
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
