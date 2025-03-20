
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Bell, Shield } from 'lucide-react';

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <div className="container px-4 py-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Profile & Settings</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg" alt="Sarah Johnson" />
                      <AvatarFallback className="bg-bloomin-100 text-bloomin-700 text-xl">SJ</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold text-slate-800">Sarah Johnson</h2>
                    <p className="text-sm text-slate-500">3rd Year Medical Student</p>
                    <Button className="mt-4 w-full bg-bloomin-500 hover:bg-bloomin-600">Edit Profile</Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <Tabs defaultValue="account">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="account" className="flex items-center gap-2">
                      <User size={16} />
                      <span className="hidden sm:inline">Account</span>
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="flex items-center gap-2">
                      <Settings size={16} />
                      <span className="hidden sm:inline">Preferences</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                      <Bell size={16} />
                      <span className="hidden sm:inline">Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="flex items-center gap-2">
                      <Shield size={16} />
                      <span className="hidden sm:inline">Privacy</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="account">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="Sarah" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Johnson" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="sarah.johnson@example.com" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="school">Medical School</Label>
                            <Input id="school" defaultValue="University Medical Center" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="year">Year of Study</Label>
                            <Input id="year" defaultValue="3rd Year" />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-bloomin-500 hover:bg-bloomin-600">Save Changes</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="preferences">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Preferences</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-500">Preferences settings will be available soon.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notifications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-500">Notification settings will be available soon.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="privacy">
                    <Card>
                      <CardHeader>
                        <CardTitle>Privacy & Security</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-500">Privacy settings will be available soon.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          
          <Footer className="mt-8" />
        </main>
      </div>
    </div>
  );
};

export default Profile;
