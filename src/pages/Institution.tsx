
import { useState } from 'react';
import { Megaphone, Bell, Pin, Calendar, User, Book, Message } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  category: 'general' | 'academic' | 'event' | 'important';
  isPinned?: boolean;
}

const defaultAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Important Changes to USMLE Step 1 Scheduling',
    content: 'Due to high demand, additional test dates for USMLE Step 1 have been added in June and July. Please log in to the scheduling system to view available dates. Priority will be given to students graduating this year.',
    date: '2023-05-12T09:30:00',
    author: 'Dr. Maria Reynolds',
    authorRole: 'Academic Dean',
    category: 'important',
    isPinned: true,
  },
  {
    id: '2',
    title: 'Medical Research Symposium - Call for Papers',
    content: 'The annual Medical Research Symposium is now accepting submissions from students. This is an excellent opportunity to showcase your research and receive feedback from faculty. Submission deadline is August 15th.',
    date: '2023-05-10T14:15:00',
    author: 'Dr. James Wilson',
    authorRole: 'Research Director',
    category: 'academic',
  },
  {
    id: '3',
    title: 'Library Hours Extended During Finals Week',
    content: 'The medical library will extend its opening hours from 7 AM to midnight during finals week (June 1-10). Additional study rooms will be available for reservation through the online portal.',
    date: '2023-05-08T11:20:00',
    author: 'Susan Thompson',
    authorRole: 'Library Services',
    category: 'general',
  },
  {
    id: '4',
    title: 'Virtual Clinical Skills Workshop',
    content: 'A virtual workshop on clinical examination skills will be held next Wednesday at 3 PM. The session will focus on cardiovascular examination techniques and will include interactive demonstrations. Registration is required through the student portal.',
    date: '2023-05-05T15:45:00',
    author: 'Dr. Robert Chen',
    authorRole: 'Clinical Skills Coordinator',
    category: 'event',
  },
  {
    id: '5',
    title: 'Curriculum Committee Student Representatives Needed',
    content: 'The Medical Education Program is seeking two student representatives to join the Curriculum Committee for the upcoming academic year. This is an excellent opportunity to participate in educational decision-making. Applications due by May 25th.',
    date: '2023-05-03T10:00:00',
    author: 'Dr. Samantha Davis',
    authorRole: 'Curriculum Director',
    category: 'general',
  },
];

const Institution = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [announcements] = useState<Announcement[]>(defaultAnnouncements);
  const [activeTab, setActiveTab] = useState('all');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getFilteredAnnouncements = () => {
    if (activeTab === 'all') return announcements;
    if (activeTab === 'pinned') return announcements.filter(a => a.isPinned);
    return announcements.filter(a => a.category === activeTab);
  };

  const getCategoryIcon = (category: Announcement['category']) => {
    switch(category) {
      case 'academic': return <Book className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'important': return <Bell className="h-4 w-4" />;
      default: return <Message className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: Announcement['category']) => {
    switch(category) {
      case 'academic': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'event': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'important': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                  <Megaphone className="h-7 w-7 text-bloomin-600" />
                  Institution Announcements
                </h1>
                <p className="text-slate-500 mt-1">Stay updated with the latest news, events, and important information from your medical institution</p>
              </div>
              
              <Button variant="default" className="bg-bloomin-500 hover:bg-bloomin-600">
                <Bell className="mr-2 h-4 w-4" />
                Subscribe to Notifications
              </Button>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-slate-100 mb-4">
                <TabsTrigger value="all">All Announcements</TabsTrigger>
                <TabsTrigger value="important">Important</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="event">Events</TabsTrigger>
                <TabsTrigger value="pinned">Pinned</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="space-y-4">
                  {getFilteredAnnouncements().map((announcement) => (
                    <Card key={announcement.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-1 mb-1.5">
                              <Badge variant="outline" className={getCategoryColor(announcement.category)}>
                                <span className="flex items-center gap-1">
                                  {getCategoryIcon(announcement.category)}
                                  {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                                </span>
                              </Badge>
                              
                              {announcement.isPinned && (
                                <Badge variant="outline" className="ml-1 bg-yellow-50 text-yellow-600 border-yellow-200">
                                  <span className="flex items-center gap-1">
                                    <Pin className="h-3 w-3" />
                                    Pinned
                                  </span>
                                </Badge>
                              )}
                              
                              <span className="ml-auto text-sm text-slate-500">
                                {formatDate(announcement.date)}
                              </span>
                            </div>
                            
                            <CardTitle className="text-xl">{announcement.title}</CardTitle>
                            <CardDescription className="mt-1 line-clamp-2">{announcement.content}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-slate-700">{announcement.content}</p>
                      </CardContent>
                      
                      <CardFooter className="pt-3 border-t flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={announcement.authorAvatar} />
                            <AvatarFallback className="bg-bloomin-100 text-bloomin-700">
                              {announcement.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{announcement.author}</p>
                            <p className="text-xs text-slate-500">{announcement.authorRole}</p>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="text-bloomin-600">
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <Footer className="mt-8" />
        </main>
      </div>
    </div>
  );
};

export default Institution;
