
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import StudyMaterials from '@/components/dashboard/StudyMaterials';

const defaultMaterials = [
  {
    id: '1',
    title: 'Complete Anatomy Guide',
    type: 'PDF',
    category: 'Anatomy',
    author: 'Dr. James Wilson',
    dateAdded: '2023-05-10',
    rating: 4.8,
    size: '15MB',
    downloads: 1243,
    thumbnail: '/placeholder.svg',
  },
  {
    id: '2',
    title: 'Pharmacology Flashcards',
    type: 'Flashcards',
    category: 'Pharmacology',
    author: 'Dr. Emily Chen',
    dateAdded: '2023-06-02',
    rating: 4.9,
    size: '8MB',
    downloads: 982,
    thumbnail: '/placeholder.svg',
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
