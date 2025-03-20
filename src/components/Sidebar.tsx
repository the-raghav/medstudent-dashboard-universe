
import { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageCircle, 
  Map, 
  Users, 
  User, 
  ChevronRight,
  ChevronLeft,
  Graduation,
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: string | number;
  active?: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  // Main navigation items
  const navItems: NavItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '#', active: true },
    { title: 'Study Materials', icon: BookOpen, href: '#', badge: 'New' },
    { title: 'Discussion Forums', icon: MessageCircle, href: '#' },
    { title: 'Study Roadmaps', icon: Map, href: '#' },
    { title: 'Mentorship & Q&A', icon: Users, href: '#' },
    { title: 'Profile & Settings', icon: User, href: '#' },
  ];

  // Resource links
  const resourceLinks: NavItem[] = [
    { title: 'Study Tips', icon: Graduation, href: '#' },
    { title: 'Help Center', icon: HelpCircle, href: '#' },
    { title: 'Settings', icon: Settings, href: '#' },
  ];

  return (
    <div
      className={cn(
        "min-h-screen bg-white border-r border-slate-200 fixed left-0 top-0 pt-16 transition-all duration-300 ease-in-out z-30",
        isOpen ? "w-64" : "w-0 -translate-x-full md:translate-x-0 md:w-16"
      )}
    >
      <div className="h-full flex flex-col p-3">
        {/* Main navigation */}
        <nav className="space-y-1 py-4">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                item.active
                  ? "bg-bloomin-50 text-bloomin-700"
                  : "text-slate-700 hover:bg-slate-50 hover:text-bloomin-600",
                !isOpen && "justify-center"
              )}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {isOpen && (
                <span className="transition-opacity duration-200">{item.title}</span>
              )}
              {isOpen && item.badge && (
                <span className="ml-auto bg-bloomin-100 text-bloomin-600 text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-1 py-4 border-t border-slate-100">
          {resourceLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 hover:text-bloomin-600",
                !isOpen && "justify-center"
              )}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {isOpen && (
                <span className="transition-opacity duration-200">{item.title}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
