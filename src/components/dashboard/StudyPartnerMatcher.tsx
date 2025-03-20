
import { useState } from 'react';
import { Search, Users, User, Clock, Sparkles, BookOpen, Filter, MessageSquare, Video } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StudyPartner {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
  year: string;
  subjects: string[];
  studyHours: string;
  preferredMethod: 'solo' | 'group' | 'both';
  location: string;
  skills: string[];
  bio: string;
  matchPercentage: number;
}

const defaultPartners: StudyPartner[] = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: '/placeholder.svg',
    specialty: 'Cardiology',
    year: '2nd Year',
    subjects: ['Anatomy', 'Physiology', 'Biochemistry'],
    studyHours: 'Weekdays, 6-9 PM',
    preferredMethod: 'both',
    location: 'Boston, MA',
    skills: ['Flashcards', 'Case Studies', 'Group Discussions'],
    bio: 'Med student passionate about cardiovascular medicine. Looking for study partners for USMLE Step 1 preparation.',
    matchPercentage: 92,
  },
  {
    id: '2',
    name: 'Jordan Smith',
    avatar: '/placeholder.svg',
    specialty: 'Neurology',
    year: '3rd Year',
    subjects: ['Neuroscience', 'Pathology', 'Pharmacology'],
    studyHours: 'Weekends, 10 AM-4 PM',
    preferredMethod: 'group',
    location: 'Chicago, IL',
    skills: ['Mind Maps', 'Mnemonics', 'Teaching'],
    bio: 'Focused on neurology and neuro-pathology. I enjoy teaching complex topics and creating visual study aids.',
    matchPercentage: 85,
  },
  {
    id: '3',
    name: 'Morgan Lee',
    avatar: '/placeholder.svg',
    specialty: 'General Medicine',
    year: '2nd Year',
    subjects: ['Anatomy', 'Physiology', 'Histology'],
    studyHours: 'Daily, 8-10 PM',
    preferredMethod: 'solo',
    location: 'New York, NY',
    skills: ['Organization', 'Note-taking', 'Spaced Repetition'],
    bio: 'Methodical student looking for accountability partners. I prefer studying independently but enjoy discussing difficult concepts.',
    matchPercentage: 78,
  },
  {
    id: '4',
    name: 'Taylor Patel',
    avatar: '/placeholder.svg',
    specialty: 'Pediatrics',
    year: '2nd Year',
    subjects: ['Anatomy', 'Embryology', 'Genetics'],
    studyHours: 'Mornings, 6-9 AM',
    preferredMethod: 'both',
    location: 'Austin, TX',
    skills: ['Problem-based Learning', 'Clinical Correlations'],
    bio: 'Early bird with interest in pediatrics. Looking for morning study buddies who enjoy clinical case discussions.',
    matchPercentage: 74,
  },
];

const StudyPartnerMatcher = () => {
  const [partners, setPartners] = useState<StudyPartner[]>(defaultPartners);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<StudyPartner | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filterPartners = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'all') return defaultPartners;
    if (tab === 'best-match') return defaultPartners.filter(p => p.matchPercentage > 80);
    if (tab === 'online') return defaultPartners.filter((_, index) => index % 2 === 0); // Mock online status
    if (tab === 'same-subjects') return defaultPartners.filter(p => p.subjects.includes('Anatomy'));
    return defaultPartners;
  };

  const handleTabChange = (value: string) => {
    setPartners(filterPartners(value));
  };

  const handleContactPartner = (partner: StudyPartner) => {
    setSelectedPartner(partner);
    setShowContactDialog(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setPartners(filterPartners(activeTab));
    } else {
      const filtered = partners.filter(
        p => p.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
             p.subjects.some(s => s.toLowerCase().includes(e.target.value.toLowerCase())) ||
             p.specialty.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setPartners(filtered);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-800">Study Partner Matcher</h2>
            <p className="text-slate-500 mt-1">Find the perfect study partner based on your preferences</p>
          </div>
          <Button 
            onClick={() => setShowPreferencesDialog(true)}
            variant="default" 
            className="bg-bloomin-500 hover:bg-bloomin-600 gap-2"
          >
            <Sparkles size={16} />
            Set Study Preferences
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name, subject, or specialty..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="bg-slate-100">
              <TabsTrigger value="all">All Partners</TabsTrigger>
              <TabsTrigger value="best-match">Best Matches</TabsTrigger>
              <TabsTrigger value="online">Currently Online</TabsTrigger>
              <TabsTrigger value="same-subjects">Same Subjects</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {partners.map((partner) => (
          <Card key={partner.id} className="hover-scale overflow-hidden">
            <CardContent className="p-5">
              <div className="flex gap-4 mb-4">
                <Avatar className="h-14 w-14 border-2 border-bloomin-100">
                  <AvatarImage src={partner.avatar} alt={partner.name} />
                  <AvatarFallback className="bg-bloomin-100 text-bloomin-700">
                    {partner.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-medium text-slate-800">{partner.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={`ml-1 ${
                        partner.matchPercentage > 90 
                          ? 'bg-green-50 text-green-600 border-green-200' 
                          : partner.matchPercentage > 80 
                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {partner.matchPercentage}% Match
                    </Badge>
                  </div>
                  <p className="text-slate-500 text-sm">{partner.specialty} • {partner.year}</p>
                  <p className="text-slate-500 text-sm">{partner.location}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1.5">Subjects</div>
                  <div className="flex flex-wrap gap-1">
                    {partner.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline" className="bg-slate-50 border-slate-200 text-slate-600">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-5 text-sm">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock size={14} className="text-slate-400" />
                    <span>{partner.studyHours}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Users size={14} className="text-slate-400" />
                    <span>{partner.preferredMethod === 'solo' ? 'Solo' : partner.preferredMethod === 'group' ? 'Group' : 'Solo & Group'}</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 line-clamp-2">{partner.bio}</p>
              </div>
            </CardContent>
            
            <CardFooter className="bg-slate-50 border-t p-3 flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-slate-600 border-slate-200 gap-1"
                onClick={() => {}}
              >
                <BookOpen size={14} />
                View Profile
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-bloomin-500 hover:bg-bloomin-600 gap-1"
                onClick={() => handleContactPartner(partner)}
              >
                <MessageSquare size={14} />
                Connect
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Set Study Preferences Dialog */}
      <Dialog open={showPreferencesDialog} onOpenChange={setShowPreferencesDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Set Your Study Preferences</DialogTitle>
            <DialogDescription>
              Customize your preferences to find the perfect study match.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subjects">Subjects You're Studying</Label>
              <Input id="subjects" placeholder="e.g., Anatomy, Physiology, Biochemistry" />
              <p className="text-xs text-slate-500">Separate multiple subjects with commas</p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="hours">Preferred Study Hours</Label>
              <Input id="hours" placeholder="e.g., Weekday evenings, Weekend mornings" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="method">Study Method</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Solo</Button>
                <Button variant="outline" className="flex-1">Group</Button>
                <Button variant="default" className="flex-1 bg-bloomin-500 hover:bg-bloomin-600">Both</Button>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell potential study partners about yourself, your goals, and what you're looking for..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreferencesDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => setShowPreferencesDialog(false)}
              className="bg-bloomin-500 hover:bg-bloomin-600"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Contact Partner Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Connect with {selectedPartner?.name}</DialogTitle>
            <DialogDescription>
              Send a message to introduce yourself and start collaborating.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex gap-3 items-center">
              {selectedPartner && (
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedPartner.avatar} alt={selectedPartner.name} />
                  <AvatarFallback className="bg-bloomin-100 text-bloomin-700">
                    {selectedPartner.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <p className="font-medium">{selectedPartner?.name}</p>
                <p className="text-sm text-slate-500">{selectedPartner?.specialty} • {selectedPartner?.year}</p>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea 
                id="message" 
                placeholder="Hi! I'm also studying for USMLE Step 1 and would love to collaborate on Anatomy and Physiology..."
                className="min-h-[120px]"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Connection Methods</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <MessageSquare size={16} />
                  Chat
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Video size={16} />
                  Video Call
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => setShowContactDialog(false)}
              className="bg-bloomin-500 hover:bg-bloomin-600"
            >
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudyPartnerMatcher;
