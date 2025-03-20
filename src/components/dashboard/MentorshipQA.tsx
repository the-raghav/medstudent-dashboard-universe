
import { Calendar, Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MentorSession {
  id: string;
  mentorName: string;
  mentorAvatar?: string;
  mentorSpecialty: string;
  sessionTitle: string;
  sessionType: 'group' | 'one-on-one';
  date: string;
  time: string;
  duration: string;
  availableSpots?: number;
}

interface MentorshipQAProps {
  sessions: MentorSession[];
}

// Default sessions if none provided
const defaultSessions: MentorSession[] = [
  {
    id: '1',
    mentorName: 'Dr. Emily Chen',
    mentorAvatar: '/placeholder.svg',
    mentorSpecialty: 'Neurologist',
    sessionTitle: 'Neuroanatomy Deep Dive',
    sessionType: 'group',
    date: 'June 15, 2023',
    time: '4:00 PM',
    duration: '60 min',
    availableSpots: 8,
  },
  {
    id: '2',
    mentorName: 'Dr. James Wilson',
    mentorAvatar: '/placeholder.svg',
    mentorSpecialty: 'Cardiologist',
    sessionTitle: 'ECG Interpretation for Beginners',
    sessionType: 'group',
    date: 'June 18, 2023',
    time: '2:30 PM',
    duration: '45 min',
    availableSpots: 5,
  },
  {
    id: '3',
    mentorName: 'Dr. Sarah Johnson',
    mentorAvatar: '/placeholder.svg',
    mentorSpecialty: 'Surgeon',
    sessionTitle: 'Surgical Residency Preparation',
    sessionType: 'one-on-one',
    date: 'June 20, 2023',
    time: '5:15 PM',
    duration: '30 min',
  },
];

const MentorshipQA = ({ sessions = defaultSessions }: MentorshipQAProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Mentorship & Q&A</h2>
        <Button variant="outline" size="sm" className="gap-2 text-bloomin-600 border-bloomin-200 hover:bg-bloomin-50">
          <User size={16} />
          <span>Find a Mentor</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className="hover-scale">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session.mentorAvatar} alt={session.mentorName} />
                  <AvatarFallback className="bg-bloomin-100 text-bloomin-700">
                    {session.mentorName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-slate-800">{session.mentorName}</h3>
                  <p className="text-xs text-slate-500">{session.mentorSpecialty}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-slate-700">{session.sessionTitle}</h4>
                <Badge variant="outline" className={`mt-1 ${
                  session.sessionType === 'one-on-one' 
                    ? 'bg-purple-50 text-purple-600 border-purple-200' 
                    : 'bg-blue-50 text-blue-600 border-blue-200'
                }`}>
                  {session.sessionType === 'one-on-one' ? 'One-on-One' : 'Group Session'}
                </Badge>
              </div>
              
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center text-sm text-slate-600">
                  <Calendar size={15} className="mr-2 text-slate-500" />
                  {session.date}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Clock size={15} className="mr-2 text-slate-500" />
                  {session.time} • {session.duration}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                {session.availableSpots ? (
                  <span className="text-xs text-slate-500">
                    {session.availableSpots} spots remaining
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">
                    By appointment only
                  </span>
                )}
                <Button variant="default" size="sm" className="bg-bloomin-500 hover:bg-bloomin-600">
                  Register
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MentorshipQA;
