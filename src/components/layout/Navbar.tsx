
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Bookmark, Share2, Award } from 'lucide-react';
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <nav className="order-2 md:order-1">
            <ul className="flex space-x-4 overflow-x-auto pb-2 md:pb-0">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`navbar-link ${isActive ? 'active' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <link.icon size={16} />
                        <span>{link.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="order-1 md:order-2 w-full md:w-1/3">
            <SearchBar 
              onSearch={handleSearch} 
              onFocus={() => setActiveSearch(true)}
              onBlur={() => setActiveSearch(false)}
              isActive={activeSearch}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
