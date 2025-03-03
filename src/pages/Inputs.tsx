
import { FileInput, Search, Filter } from 'lucide-react';

const Inputs = () => {
  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Inputs</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E65525] bg-opacity-10 rounded-full text-[#E65525] mb-4">
          <FileInput size={28} />
        </div>
        <h2 className="text-lg font-medium mb-2">Manage Your Inputs</h2>
        <p className="text-text-secondary mb-6">
          This page will allow you to manage various inputs for your projects.
        </p>
        <button className="px-4 py-2 bg-[#E65525] text-white rounded-md hover:bg-[#D64C1B] transition-colors">
          Add New Input
        </button>
      </div>
    </div>
  );
};

export default Inputs;
