
import { CalendarClock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WelcomeBannerProps {
  studentName: string;
  stats?: {
    completedTasks: number;
    totalTasks: number;
    streak: number;
  };
}

const WelcomeBanner = ({ 
  studentName = "Sarah", 
  stats = { completedTasks: 12, totalTasks: 15, streak: 7 } 
}: WelcomeBannerProps) => {
  const progress = (stats.completedTasks / stats.totalTasks) * 100;
  
  return (
    <Card className="bg-gradient-to-r from-bloomin-50 to-blue-50 border-none overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
              Welcome back, {studentName}
            </h1>
            <p className="text-slate-600 max-w-md">
              Ready to continue your medical journey? Here's your progress at a glance.
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg p-3 w-full sm:w-32 shadow-sm border border-slate-100">
              <div className="text-2xl font-semibold text-bloomin-600">{stats.completedTasks}/{stats.totalTasks}</div>
              <div className="text-xs text-slate-500">Tasks Completed</div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-bloomin-500 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-white rounded-lg p-3 w-full sm:w-32 shadow-sm border border-slate-100">
              <div className="text-2xl font-semibold text-bloomin-600">{stats.streak}</div>
              <div className="text-xs text-slate-500">Day Streak</div>
              <div className="text-bloomin-500 flex items-center mt-1">
                <CalendarClock size={14} className="mr-1" />
                <span className="text-xs">Keep it up!</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
