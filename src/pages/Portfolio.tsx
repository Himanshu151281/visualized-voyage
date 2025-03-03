
import { Folder } from 'lucide-react';

const Portfolio = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Portfolio</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-primary-blue mb-4">
          <Folder size={28} />
        </div>
        <h2 className="text-lg font-medium mb-2">Your Portfolio</h2>
        <p className="text-text-secondary mb-6">
          This is where you'll manage and showcase your portfolio projects.
        </p>
        <button className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600 transition-colors">
          Create New Portfolio
        </button>
      </div>
    </div>
  );
};

export default Portfolio;
