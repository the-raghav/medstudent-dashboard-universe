
import { Check, Clock, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  completionPercentage?: number;
}

interface StudyRoadmapProps {
  items: RoadmapItem[];
}

// Default roadmap items if none provided
const defaultItems: RoadmapItem[] = [
  {
    id: '1',
    title: 'Medical Foundations',
    description: 'Core concepts in anatomy, physiology, and biochemistry',
    status: 'completed',
    completionPercentage: 100,
  },
  {
    id: '2',
    title: 'Systems Biology',
    description: 'Integrated study of cardiovascular, respiratory, and nervous systems',
    status: 'in-progress',
    completionPercentage: 65,
  },
  {
    id: '3',
    title: 'Pathology & Disease',
    description: 'Understanding disease mechanisms and pathological processes',
    status: 'in-progress',
    completionPercentage: 30,
  },
  {
    id: '4',
    title: 'Clinical Skills',
    description: 'Patient assessment, diagnosis, and treatment planning',
    status: 'locked',
  },
  {
    id: '5',
    title: 'Specialization Paths',
    description: 'Focused study in selected medical specialty',
    status: 'locked',
  },
];

const StudyRoadmap = ({ items = defaultItems }: StudyRoadmapProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Study Roadmap</h2>
        <a href="#" className="text-sm font-medium text-bloomin-600 hover:text-bloomin-700 transition-colors">
          View Details
        </a>
      </div>
      
      <div className="relative mt-8">
        {/* Progress timeline connector */}
        <div className="absolute top-0 bottom-0 left-[22px] w-0.5 bg-slate-200 z-0"></div>
        
        <div className="space-y-6 relative z-10">
          {items.map((item, index) => {
            // Status-specific styles
            const statusStyles = {
              'completed': {
                icon: Check,
                iconBg: 'bg-green-500',
                textColor: 'text-green-600',
                borderColor: 'border-green-200',
                bgColor: 'bg-green-50',
              },
              'in-progress': {
                icon: Clock,
                iconBg: 'bg-blue-500',
                textColor: 'text-blue-600',
                borderColor: 'border-blue-200',
                bgColor: 'bg-blue-50',
              },
              'locked': {
                icon: Lock,
                iconBg: 'bg-slate-400',
                textColor: 'text-slate-500',
                borderColor: 'border-slate-200',
                bgColor: 'bg-slate-50',
              },
            };
            
            const { icon: Icon, iconBg, textColor, borderColor, bgColor } = statusStyles[item.status];
            
            return (
              <div key={item.id} className="flex group">
                {/* Status icon */}
                <div className={cn(
                  "h-11 w-11 rounded-full flex items-center justify-center z-10",
                  iconBg,
                  item.status === 'locked' ? 'opacity-60' : ''
                )}>
                  <Icon size={18} className="text-white" />
                </div>
                
                {/* Content */}
                <div className={cn(
                  "ml-4 flex-1 p-4 rounded-lg border transition-all duration-300",
                  borderColor,
                  bgColor,
                  item.status === 'locked' ? 'opacity-70' : 'hover-scale'
                )}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className={cn(
                        "font-medium",
                        item.status === 'locked' ? 'text-slate-500' : 'text-slate-800'
                      )}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                    
                    {item.status !== 'locked' && (
                      <div className="sm:w-32 mt-2 sm:mt-0">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={textColor}>Progress</span>
                          <span className={textColor}>{item.completionPercentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-500 ease-out",
                              item.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                            )}
                            style={{ width: `${item.completionPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {item.status === 'locked' && (
                      <span className="text-xs text-slate-500 flex items-center">
                        <Lock size={12} className="mr-1" />
                        Complete previous modules first
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudyRoadmap;
