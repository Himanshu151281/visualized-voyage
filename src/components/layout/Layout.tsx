
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Project } from '@/api/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchResults, setSearchResults] = useState<Project[]>([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (results: Project[]) => {
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 overflow-hidden">
        <Navbar onSearch={handleSearch} />
        
        <main className="flex-1 p-6">
          {searchResults.length > 0 ? (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-text-secondary text-sm mt-1">{project.category}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
