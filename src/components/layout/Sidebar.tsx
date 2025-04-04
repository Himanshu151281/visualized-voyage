
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Folder, FileInput, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const links = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/portfolio', label: 'Portfolio', icon: Folder },
    { path: '/inputs', label: 'Inputs', icon: FileInput },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
      
      <aside 
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen bg-[#E65525] text-white transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0 lg:w-20",
          "flex flex-col overflow-hidden"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className={cn("flex items-center", !isOpen && "lg:hidden")}>
            <div className="w-8 h-8 rounded-md bg-white text-[#E65525] flex items-center justify-center mr-3">
              <span className="font-bold">L</span>
            </div>
            <h1 className="font-semibold text-xl">LOGO</h1>
          </div>
          
          <div className={cn("lg:hidden", !isOpen && "hidden")}>
            <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-[#D64C1B]">
              <X size={20} />
            </button>
          </div>
          
          <div className={cn("hidden lg:block", isOpen && "lg:hidden")}>
            <div className="w-8 h-8 rounded-md bg-white text-[#E65525] flex items-center justify-center">
              <span className="font-bold">L</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md text-white font-medium transition-all duration-200",
                      isActive && "bg-white text-[#E65525]",
                      !isActive && "hover:bg-[#D64C1B]",
                      !isOpen && "lg:justify-center"
                    )}
                  >
                    <link.icon size={20} />
                    <span className={cn(!isOpen && "lg:hidden")}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 mt-auto">
          <div className={cn(
            "flex items-center",
            !isOpen ? "lg:justify-center" : "justify-between"
          )}>
            <div className="flex items-center">
              <img 
                src="https://i.pravatar.cc/150?img=3" 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full mr-3"
              />
              <div className={cn(!isOpen && "lg:hidden")}>
                <p className="font-medium text-sm">Lorem Ips</p>
                <p className="text-white text-opacity-80 text-xs">Manager</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile toggle button */}
      {isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-[#E65525] text-white shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
