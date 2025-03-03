
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Bookmark, Share2, Award, Bell, ChevronDown } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import { Project, searchProjects } from '@/api/mockData';

interface NavbarProps {
  onSearch: (results: Project[]) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const location = useLocation();
  const [activeSearch, setActiveSearch] = useState(false);

  const links = [
    { path: '/', label: 'Project', icon: Briefcase },
    { path: '/saved', label: 'Saved', icon: Bookmark },
    { path: '/shared', label: 'Shared', icon: Share2 },
    { path: '/achievement', label: 'Achievement', icon: Award },
  ];

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      onSearch([]);
      return;
    }
    try {
      const results = await searchProjects(query);
      onSearch(results);
    } catch (error) {
      console.error('Search error:', error);
      onSearch([]);
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="hidden md:block"></div>
          
          <div className="flex items-center ml-auto">
            <div className="relative mr-4">
              <Bell size={20} className="text-[#E65525]" />
              <span className="absolute -top-1 -right-1 bg-[#E65525] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">1</span>
            </div>
            
            <div className="flex items-center">
              <img 
                src="https://i.pravatar.cc/150?img=3" 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="hidden md:block">
                <div className="flex items-center">
                  <p className="font-medium text-sm">Lorem Ips</p>
                  <ChevronDown size={16} className="ml-1" />
                </div>
                <p className="text-gray-500 text-xs">Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
