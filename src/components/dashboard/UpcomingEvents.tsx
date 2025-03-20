
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'webinar' | 'workshop' | 'lecture' | 'exam';
  isRegistered?: boolean;
}

interface UpcomingEventsProps {
  events: Event[];
}

// Default events if none provided
const defaultEvents: Event[] = [
  {
    id: '1',
    title: 'Pathology Exam Preparation',
    description: 'Interactive session covering high-yield pathology concepts for upcoming exams',
    date: 'June 12, 2023',
    time: '3:00 PM - 5:00 PM',
    location: 'Online (Zoom)',
    type: 'webinar',
  },
  {
    id: '2',
    title: 'Clinical Skills Workshop',
    description: 'Hands-on practice of essential clinical examination techniques',
    date: 'June 17, 2023',
    time: '10:00 AM - 2:00 PM',
    location: 'Simulation Center, Room 302',
    type: 'workshop',
    isRegistered: true,
  },
  {
    id: '3',
    title: 'Pharmacology Master Class',
    description: 'Special lecture on drug mechanisms and clinical applications',
    date: 'June 21, 2023',
    time: '4:30 PM - 6:00 PM',
    location: 'Lecture Hall B',
    type: 'lecture',
  },
];

const eventTypeStyles = {
  webinar: {
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  workshop: {
    color: 'bg-green-50 text-green-600 border-green-200',
  },
  lecture: {
    color: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  exam: {
    color: 'bg-red-50 text-red-600 border-red-200',
  },
};

const UpcomingEvents = ({ events = defaultEvents }: UpcomingEventsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Upcoming Events</h2>
        <a href="#" className="text-sm font-medium text-bloomin-600 hover:text-bloomin-700 transition-colors">
          View Calendar
        </a>
      </div>
      
      <div className="space-y-3">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden hover-scale">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className={cn("px-2 py-0 h-5", eventTypeStyles[event.type].color)}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                    {event.isRegistered && (
                      <Badge variant="outline" className="bg-bloomin-50 text-bloomin-600 border-bloomin-200 px-2 py-0 h-5">
                        Registered
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-medium text-slate-800">{event.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{event.description}</p>
                  
                  <div className="mt-3 flex flex-wrap items-center text-xs text-slate-500 gap-x-4 gap-y-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end lg:justify-center">
                  {event.isRegistered ? (
                    <Button variant="outline" size="sm" className="min-w-[100px]">
                      Details
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="bg-bloomin-500 hover:bg-bloomin-600 min-w-[100px]"
                    >
                      Register
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
