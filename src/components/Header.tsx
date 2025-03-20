
import { useState } from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  studentName: string;
  notificationCount: number;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ 
  studentName = "Sarah", 
  notificationCount = 3,
  toggleSidebar,
  isSidebarOpen
}: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-6">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-slate-700 hover:text-bloomin-600 hover:bg-bloomin-50"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          <div className="flex items-center">
            <div className="font-bold text-xl text-bloomin-600">
              Bloomin
            </div>
          </div>
        </div>

        <div className={`
          ${isSearchOpen ? 'flex w-full absolute left-0 px-4 sm:px-6 transition-all duration-300 ease-in-out' : 'hidden md:flex md:w-1/3'}
        `}>
          <div className={`
            relative w-full flex items-center rounded-full bg-slate-50 border border-slate-200 overflow-hidden
            ${isSearchOpen ? 'animate-fade-in' : ''}
          `}>
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search resources, discussions..."
              className="border-0 h-9 bg-transparent pl-9 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {isSearchOpen && (
              <Button 
                variant="ghost" 
                className="h-9 w-9 p-0 text-slate-400" 
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden text-slate-700"
          >
            <Search size={20} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} className="text-slate-700" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-bloomin-500 hover:bg-bloomin-500">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <div className="px-4 py-3 font-medium border-b border-slate-100">Notifications</div>
              <DropdownMenuItem className="py-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="font-medium">New Study Group Invitation</div>
                  <div className="text-xs text-slate-500">Dr. Miller invited you to Cardiology Study Group</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Assignment Due Soon</div>
                  <div className="text-xs text-slate-500">Pathology Case Study due in 48 hours</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="font-medium">New Resource Available</div>
                  <div className="text-xs text-slate-500">Anatomy 3D interactive models now available</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 gap-2 pl-1.5 pr-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" alt={studentName} />
                  <AvatarFallback className="bg-bloomin-100 text-bloomin-700">
                    {studentName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium truncate">{studentName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Help Center</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-500">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
