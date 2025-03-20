
import { MessageCircle, Sparkles, Users } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ForumTopic {
  id: string;
  title: string;
  replies: number;
  views: number;
  lastActivity: string;
  category: string;
  isTrending?: boolean;
  participants: {
    name: string;
    avatar?: string;
  }[];
}

interface DiscussionForumsProps {
  topics: ForumTopic[];
}

// Default topics if none provided
const defaultTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'Study strategies for USMLE Step 1',
    replies: 24,
    views: 152,
    lastActivity: '2 hours ago',
    category: 'Exam Prep',
    isTrending: true,
    participants: [
      { name: 'Alex', avatar: '/placeholder.svg' },
      { name: 'Morgan', avatar: '/placeholder.svg' },
      { name: 'Jamie', avatar: '/placeholder.svg' },
    ],
  },
  {
    id: '2',
    title: 'Understanding cardiac arrhythmias - help needed!',
    replies: 15,
    views: 89,
    lastActivity: '5 hours ago',
    category: 'Cardiology',
    participants: [
      { name: 'Taylor', avatar: '/placeholder.svg' },
      { name: 'Jordan', avatar: '/placeholder.svg' },
    ],
  },
  {
    id: '3',
    title: 'Resources for clinical rotation preparation',
    replies: 31,
    views: 210,
    lastActivity: '1 day ago',
    category: 'Clinical Skills',
    isTrending: true,
    participants: [
      { name: 'Casey', avatar: '/placeholder.svg' },
      { name: 'Riley', avatar: '/placeholder.svg' },
      { name: 'Drew', avatar: '/placeholder.svg' },
    ],
  },
];

const DiscussionForums = ({ topics = defaultTopics }: DiscussionForumsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Discussion Forums</h2>
        <Button variant="outline" size="sm" className="gap-2 text-bloomin-600 border-bloomin-200 hover:bg-bloomin-50">
          <MessageCircle size={16} />
          <span>New Discussion</span>
        </Button>
      </div>
      
      <div className="space-y-3">
        {topics.map((topic) => (
          <Card key={topic.id} className="overflow-hidden hover-scale">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {topic.isTrending && (
                      <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 px-2 py-0 h-5 gap-1">
                        <Sparkles size={12} />
                        <span>Trending</span>
                      </Badge>
                    )}
                    <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 px-2 py-0 h-5">
                      {topic.category}
                    </Badge>
                  </div>
                  
                  <h3 className="mt-2 font-medium text-slate-800 line-clamp-1">{topic.title}</h3>
                  
                  <div className="mt-3 flex items-center text-xs text-slate-500 gap-3">
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>{topic.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{topic.views} views</span>
                    </div>
                    <div>
                      <span>Updated {topic.lastActivity}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex -space-x-2">
                  {topic.participants.map((participant, i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-white">
                      <AvatarImage src={participant.avatar} alt={participant.name} />
                      <AvatarFallback className="bg-bloomin-100 text-bloomin-700 text-xs">
                        {participant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-4 py-2 border-t bg-slate-50/50 flex justify-end">
              <a href="#" className="text-xs font-medium text-bloomin-600 hover:text-bloomin-700">
                Join Discussion →
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForums;
