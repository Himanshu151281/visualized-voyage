
import React, { useState } from 'react';
import { FileInput, Search, Filter, AlertCircle, Plus, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchInputs } from '@/services/api';
import InputForm from '@/components/inputs/InputForm';
import InputCard from '@/components/inputs/InputCard';
import { Toaster } from 'sonner';

const Inputs = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: inputsData, isLoading, error, refetch } = useQuery({
    queryKey: ['inputs'],
    queryFn: fetchInputs,
  });
  
  // Filter inputs based on search query
  const filteredInputs = inputsData?.data.filter(input => 
    input.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    input.attributes.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Form Inputs</h1>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[#E65525] text-white rounded-md hover:bg-[#D64C1B] transition-colors"
        >
          {showForm ? 'Hide Form' : (
            <>
              <Plus size={18} />
              New Input Field
            </>
          )}
        </button>
      </div>
      
      {showForm && (
        <div className="mb-8">
          <InputForm />
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search input fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65525]"
            />
          </div>
          <button 
            onClick={() => refetch()} 
            className="p-2 text-gray-500 hover:text-[#E65525] hover:bg-gray-100 rounded-full transition-colors"
            title="Refresh inputs"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <FileInput size={20} />}
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-[#E65525]" size={36} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="mx-auto mb-3 text-red-500" size={36} />
          <h3 className="text-lg font-medium text-red-800 mb-1">Failed to load input fields</h3>
          <p className="text-red-600">There was an error loading your input fields. Please try again later.</p>
        </div>
      ) : filteredInputs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E65525] bg-opacity-10 rounded-full text-[#E65525] mb-4">
            <FileInput size={28} />
          </div>
          <h2 className="text-lg font-medium mb-2">No Input Fields Found</h2>
          <p className="text-text-secondary mb-6">
            {searchQuery ? `No input fields match '${searchQuery}'` : 'You haven\'t created any input fields yet.'}
          </p>
          <button 
            onClick={() => setShowForm(true)} 
            className="px-4 py-2 bg-[#E65525] text-white rounded-md hover:bg-[#D64C1B] transition-colors"
          >
            Create Your First Input
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInputs.map(input => (
            <InputCard key={input.id} input={input} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Inputs;
