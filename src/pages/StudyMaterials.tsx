
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import StudyMaterials from '@/components/dashboard/StudyMaterials';

const defaultMaterials = [
  {
    id: '1',
    title: 'Complete Anatomy Guide',
    description: 'A comprehensive guide to understanding human anatomy basics',
    type: 'document' as 'document' | 'video' | 'flashcard' | 'quiz',
    subject: 'Anatomy',
    lastUpdated: '2 days ago',
  },
  {
    id: '2',
    title: 'Pharmacology Flashcards',
    description: 'Study aids for memorizing drug classifications and mechanisms',
    type: 'flashcard' as 'document' | 'video' | 'flashcard' | 'quiz',
    subject: 'Pharmacology',
    lastUpdated: '3 days ago',
  },
  {
    id: '3',
    title: 'Cardiovascular System Lecture',
    description: 'Video lecture covering the structure and function of the heart',
    type: 'video' as 'document' | 'video' | 'flashcard' | 'quiz',
    subject: 'Physiology',
    lastUpdated: '1 week ago',
  },
  {
    id: '4',
    title: 'Neuroanatomy Quiz',
    description: 'Test your knowledge on brain structure and neural pathways',
    type: 'quiz' as 'document' | 'video' | 'flashcard' | 'quiz',
    subject: 'Neurology',
    lastUpdated: '5 days ago',
  },
];

const StudyMaterialsPage = () => {
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
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Study Materials</h1>
            <StudyMaterials materials={defaultMaterials} />
          </div>
          
          <Footer className="mt-8" />
        </main>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;
