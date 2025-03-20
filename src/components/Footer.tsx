
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("w-full border-t border-slate-200 bg-white/50 backdrop-blur-sm py-6", className)}>
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Bloomin. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-bloomin-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-bloomin-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-bloomin-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
