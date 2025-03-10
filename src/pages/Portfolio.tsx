
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search, ShoppingCart, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchPortfolioItems } from '@/services/api';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  language: string;
  author: string;
  image: string;
}

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Project');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Fetch portfolio items from Strapi
  const { 
    data: portfolioData, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['portfolio-items'],
    queryFn: fetchPortfolioItems,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const tabs = ['Project', 'Saved', 'Shared', 'Achievement'];
  
  // Transform Strapi data to the format our component expects
  const portfolioItems: PortfolioItem[] = portfolioData?.data.map(item => ({
    id: item.id,
    title: item.attributes.title,
    description: item.attributes.description,
    language: item.attributes.language,
    author: item.attributes.author,
    image: item.attributes.image.data?.attributes.url || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=210&h=120',
  })) || [];

  // Show loading state
  if (isLoading) {
    return (
      <div className="animate-fade-in bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 md:mb-2">Portfolio</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="animate-fade-in bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 md:mb-2">Portfolio</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="text-red-500 mr-3 flex-shrink-0" />
          <p className="text-red-700">Failed to load portfolio data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 md:mb-2">Portfolio</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={cn(
                "px-4 py-2 font-medium whitespace-nowrap",
                activeTab === tab 
                  ? "text-[#E65525] border-b-2 border-[#E65525]" 
                  : "text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="flex justify-between items-center gap-2 mb-6">
        <div className="hidden md:block">
          <button 
            className="flex items-center p-2 gap-2 text-gray-700 border border-gray-200 rounded-md"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
        
        <div className="relative w-full md:w-1/3 ml-auto">
          <input
            type="text"
            placeholder="Search a project"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E65525]"
          />
          <button className="absolute right-0 top-0 h-full px-3 text-white bg-[#E65525] rounded-r-md">
            <Search size={20} />
          </button>
        </div>
      </div>
      
      {/* Portfolio Items */}
      <div className="space-y-4">
        {portfolioItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-[210px] h-[120px] md:h-auto">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4 md:p-6 flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-medium mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 md:line-clamp-3">
                  {item.description}
                </p>
                
                <div className="mt-auto flex flex-col xs:flex-row items-start xs:items-center justify-between">
                  <div>
                    <div className="text-gray-700 text-xs font-semibold">{item.language}</div>
                    <div className="text-gray-500 text-xs">{item.author}</div>
                  </div>
                  
                  <button className="mt-2 xs:mt-0 px-4 py-2 bg-[#F5A623] hover:bg-[#E69612] text-white rounded-md flex items-center gap-1">
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile Filter Button */}
      {isMobile && (
        <div className="fixed bottom-16 right-4">
          <button className="w-12 h-12 rounded-full bg-[#E65525] text-white flex items-center justify-center shadow-lg">
            <Filter size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
