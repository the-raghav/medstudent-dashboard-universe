
import { useState } from 'react';
import { Search, Filter, Star, Clock, Calendar, MessageCircle, Video, User, CalendarClock, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Doctor {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
  hospital: string;
  experience: string;
  rating: number;
  reviewCount: number;
  availableDays: string[];
  bio: string;
  expertise: string[];
  verified: boolean;
  recommended?: boolean;
}

const defaultDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Emily Chen',
    avatar: '/placeholder.svg',
    specialty: 'Neurologist',
    hospital: 'Boston Medical Center',
    experience: '12 years',
    rating: 4.9,
    reviewCount: 124,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    bio: 'Board-certified neurologist specializing in headache disorders and general neurology. Passionate about medical education and mentoring.',
    expertise: ['Headache Disorders', 'Multiple Sclerosis', 'Stroke Management'],
    verified: true,
    recommended: true,
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    avatar: '/placeholder.svg',
    specialty: 'Cardiologist',
    hospital: 'Chicago Heart Institute',
    experience: '15 years',
    rating: 4.8,
    reviewCount: 98,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    bio: 'Interventional cardiologist with expertise in cardiac imaging. Regular contributor to medical journals and mentor to cardiology fellows.',
    expertise: ['Cardiac Imaging', 'Interventional Cardiology', 'Heart Failure'],
    verified: true,
  },
  {
    id: '3',
    name: 'Dr. Sarah Johnson',
    avatar: '/placeholder.svg',
    specialty: 'General Surgeon',
    hospital: 'Memorial Surgical Center',
    experience: '8 years',
    rating: 4.7,
    reviewCount: 76,
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    bio: 'General surgeon with special interest in minimally invasive procedures. Enjoys teaching surgical techniques to medical students.',
    expertise: ['Laparoscopic Surgery', 'Hernia Repair', 'Appendectomy'],
    verified: true,
    recommended: true,
  },
  {
    id: '4',
    name: 'Dr. Robert Martinez',
    avatar: '/placeholder.svg',
    specialty: 'Pediatrician',
    hospital: 'Children's Medical Center',
    experience: '10 years',
    rating: 4.9,
    reviewCount: 112,
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    bio: 'Pediatrician with focus on developmental disorders and adolescent medicine. Passionate about preventive care education.',
    expertise: ['Developmental Pediatrics', 'Adolescent Medicine', 'Preventive Care'],
    verified: true,
  },
];

const DoctorDirectory = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(defaultDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filterDoctors = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'all') return defaultDoctors;
    if (tab === 'recommended') return defaultDoctors.filter(d => d.recommended);
    if (tab === 'available-today') return defaultDoctors.filter(d => d.availableDays.includes('Monday')); // Just an example
    if (tab === 'neurology') return defaultDoctors.filter(d => d.specialty === 'Neurologist');
    if (tab === 'cardiology') return defaultDoctors.filter(d => d.specialty === 'Cardiologist');
    return defaultDoctors;
  };

  const handleTabChange = (value: string) => {
    setDoctors(filterDoctors(value));
  };

  const handleBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingDialog(true);
  };

  const handleMessage = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowMessageDialog(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setDoctors(filterDoctors(activeTab));
    } else {
      const filtered = doctors.filter(
        d => d.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
             d.specialty.toLowerCase().includes(e.target.value.toLowerCase()) ||
             d.expertise.some(e => e.toLowerCase().includes(e.target.value.toLowerCase()))
      );
      setDoctors(filtered);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-800">Doctor Directory</h2>
            <p className="text-slate-500 mt-1">Connect with verified medical professionals for mentorship and advice</p>
          </div>
          <Button 
            variant="outline" 
            className="gap-2 border-slate-200"
          >
            <Filter size={16} />
            Advanced Filters
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name, specialty, or expertise..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="bg-slate-100">
              <TabsTrigger value="all">All Doctors</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="available-today">Available Today</TabsTrigger>
              <TabsTrigger value="neurology">Neurology</TabsTrigger>
              <TabsTrigger value="cardiology">Cardiology</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="hover-scale overflow-hidden">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16 border-2 border-bloomin-100">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback className="bg-bloomin-100 text-bloomin-700">
                    {doctor.name.split(' ')[1][0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-slate-800">{doctor.name}</h3>
                        {doctor.verified && (
                          <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm">{doctor.specialty}</p>
                    </div>
                    
                    {doctor.recommended && (
                      <Badge variant="outline" className="bg-bloomin-50 text-bloomin-600 border-bloomin-200">
                        Recommended for You
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center mt-1 text-sm">
                    <div className="flex items-center text-amber-500">
                      <Star size={14} className="fill-amber-500" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                    </div>
                    <span className="mx-2 text-slate-300">•</span>
                    <span className="text-slate-500">{doctor.reviewCount} reviews</span>
                    <span className="mx-2 text-slate-300">•</span>
                    <span className="text-slate-500">{doctor.experience} exp</span>
                  </div>
                  
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                    {doctor.bio}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1.5">Expertise</div>
                <div className="flex flex-wrap gap-1">
                  {doctor.expertise.map((item, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-50 border-slate-200 text-slate-600">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1.5">Available</div>
                <div className="flex flex-wrap gap-1">
                  {doctor.availableDays.map((day, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200 text-blue-600">
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-slate-50 border-t p-3 flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-bloomin-600 border-slate-200 gap-1 hover:bg-bloomin-50"
                onClick={() => handleMessage(doctor)}
              >
                <MessageCircle size={14} />
                Message
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-bloomin-500 hover:bg-bloomin-600 gap-1"
                onClick={() => handleBooking(doctor)}
              >
                <Calendar size={14} />
                Book Session
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Book Session Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Book a Session with {selectedDoctor?.name}</DialogTitle>
            <DialogDescription>
              Schedule a mentorship session or consultation with the doctor.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex gap-3 items-center pb-2 border-b border-slate-100">
              {selectedDoctor && (
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} />
                  <AvatarFallback className="bg-bloomin-100 text-bloomin-700">
                    {selectedDoctor.name.split(' ')[1][0]}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <p className="font-medium">{selectedDoctor?.name}</p>
                <p className="text-sm text-slate-500">{selectedDoctor?.specialty} • {selectedDoctor?.hospital}</p>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Session Type</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2 justify-center">
                  <User size={16} />
                  One-on-One
                </Button>
                <Button variant="outline" className="flex-1 gap-2 justify-center">
                  <Stethoscope size={16} />
                  Case Discussion
                </Button>
                <Button variant="default" className="flex-1 gap-2 justify-center bg-bloomin-500 hover:bg-bloomin-600">
                  <MessageCircle size={16} />
                  Q&A Session
                </Button>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Select Date & Time</Label>
              <div className="grid grid-cols-3 gap-2">
                {selectedDoctor?.availableDays.map((day, index) => (
                  <Button key={index} variant="outline" className={index === 0 ? "bg-bloomin-50 border-bloomin-200 text-bloomin-700" : ""}>
                    {day}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button variant="outline" className="bg-bloomin-50 border-bloomin-200 text-bloomin-700">10:00 AM</Button>
                <Button variant="outline">11:30 AM</Button>
                <Button variant="outline">2:00 PM</Button>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="topic">Discussion Topic</Label>
              <Input id="topic" placeholder="e.g., Career guidance in neurology" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Include any specific questions or topics you'd like to discuss"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => setShowBookingDialog(false)}
              className="bg-bloomin-500 hover:bg-bloomin-600"
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Message Doctor Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Message {selectedDoctor?.name}</DialogTitle>
            <DialogDescription>
              Send a direct message to the doctor for quick questions or follow-ups.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex gap-3 items-center pb-2 border-b border-slate-100">
              {selectedDoctor && (
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} />
                  <AvatarFallback className="bg-bloomin-100 text-bloomin-700">
                    {selectedDoctor.name.split(' ')[1][0]}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <p className="font-medium">{selectedDoctor?.name}</p>
                <p className="text-sm text-slate-500">{selectedDoctor?.specialty} • {selectedDoctor?.hospital}</p>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message-subject">Subject</Label>
              <Input id="message-subject" placeholder="e.g., Question about neurology residency" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message-content">Your Message</Label>
              <Textarea 
                id="message-content" 
                placeholder="Type your message here..."
                className="min-h-[150px]"
              />
            </div>
            
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>Typical response time: 24-48 hours</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => setShowMessageDialog(false)}
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

export default DoctorDirectory;
