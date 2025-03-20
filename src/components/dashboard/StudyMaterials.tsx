
import { BookOpen, FileText, Video, FileQuestion } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'flashcard' | 'quiz';
  subject: string;
  lastUpdated: string;
}

interface StudyMaterialsProps {
  materials: StudyMaterial[];
}

const materialIcons = {
  document: FileText,
  video: Video,
  flashcard: BookOpen,
  quiz: FileQuestion,
};

const materialColors = {
  document: 'bg-blue-50 text-blue-500',
  video: 'bg-red-50 text-red-500',
  flashcard: 'bg-green-50 text-green-500',
  quiz: 'bg-purple-50 text-purple-500',
};

// Default materials if none provided
const defaultMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Introduction to Human Anatomy',
    description: 'A comprehensive guide to understanding human anatomy basics',
    type: 'document',
    subject: 'Anatomy',
    lastUpdated: '2 days ago',
  },
  {
    id: '2',
    title: 'Cardiovascular System Lecture',
    description: 'Video lecture covering the structure and function of the heart',
    type: 'video',
    subject: 'Physiology',
    lastUpdated: '1 week ago',
  },
  {
    id: '3',
    title: 'Pharmacology Flashcards',
    description: 'Study aids for memorizing drug classifications and mechanisms',
    type: 'flashcard',
    subject: 'Pharmacology',
    lastUpdated: '3 days ago',
  },
  {
    id: '4',
    title: 'Neuroanatomy Quiz',
    description: 'Test your knowledge on brain structure and neural pathways',
    type: 'quiz',
    subject: 'Neurology',
    lastUpdated: '5 days ago',
  },
];

const StudyMaterials = ({ materials = defaultMaterials }: StudyMaterialsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Study Materials</h2>
        <a href="#" className="text-sm font-medium text-bloomin-600 hover:text-bloomin-700 transition-colors">
          View All
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {materials.map((material) => {
          const Icon = materialIcons[material.type];
          const colorClass = materialColors[material.type];
          
          return (
            <Card key={material.id} className="hover-scale">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div className={cn("p-2 rounded-md", colorClass)}>
                    <Icon size={18} />
                  </div>
                  <span className="text-xs text-slate-500">{material.lastUpdated}</span>
                </div>
                
                <h3 className="mt-4 font-medium text-slate-800 line-clamp-1">{material.title}</h3>
                <p className="mt-1 text-sm text-slate-500 line-clamp-2">{material.description}</p>
              </CardContent>
              
              <CardFooter className="px-5 py-3 border-t bg-slate-50/50 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">{material.subject}</span>
                <a href="#" className="text-xs font-medium text-bloomin-600 hover:text-bloomin-700">
                  Open
                </a>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StudyMaterials;
