
import { CheckCircle2, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StudyProgress {
  subject: string;
  completedTopics: number;
  totalTopics: number;
}

interface ProgressTrackerProps {
  progress: StudyProgress[];
  totalCompleted: number;
  totalRequired: number;
}

// Default progress data if none provided
const defaultProgress: StudyProgress[] = [
  {
    subject: 'Anatomy',
    completedTopics: 14,
    totalTopics: 18,
  },
  {
    subject: 'Physiology',
    completedTopics: 12,
    totalTopics: 15,
  },
  {
    subject: 'Biochemistry',
    completedTopics: 8,
    totalTopics: 12,
  },
  {
    subject: 'Pathology',
    completedTopics: 5,
    totalTopics: 20,
  },
];

const ProgressTracker = ({ 
  progress = defaultProgress,
  totalCompleted = 39,
  totalRequired = 65
}: ProgressTrackerProps) => {
  const overallPercentage = Math.round((totalCompleted / totalRequired) * 100);
  
  return (
    <Card className="border-bloomin-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-slate-800">
          <Target size={18} className="mr-2 text-bloomin-600" />
          Study Progress
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Overall Progress</span>
              <span className="text-sm font-medium text-bloomin-600">{overallPercentage}%</span>
            </div>
            <Progress value={overallPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-slate-500">
              <div className="flex items-center">
                <CheckCircle2 size={12} className="mr-1 text-green-500" />
                <span>{totalCompleted} topics completed</span>
              </div>
              <div className="flex items-center">
                <BookOpen size={12} className="mr-1" />
                <span>{totalRequired} total topics</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 pt-2">
            {progress.map((item, index) => {
              const percentage = Math.round((item.completedTopics / item.totalTopics) * 100);
              
              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{item.subject}</span>
                    <span className="text-xs text-slate-500">{item.completedTopics}/{item.totalTopics}</span>
                  </div>
                  <Progress value={percentage} className="h-1" />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
