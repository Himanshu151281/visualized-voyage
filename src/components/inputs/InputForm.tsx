
import React, { useState } from 'react';
import { toast } from 'sonner';
import { createInput } from '@/services/api';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle } from 'lucide-react';

// Define the input type as a union type to ensure correct type comparison
type InputType = 'text' | 'number' | 'date' | 'file' | 'select';

const InputForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'text' as InputType, // Use the union type
    description: '',
    required: false,
    placeholder: '',
    options: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Process options if input type is select
      const processedOptions = formData.type === 'select' 
        ? formData.options.split(',').map(option => option.trim()).filter(Boolean)
        : undefined;
      
      await createInput({
        name: formData.name,
        type: formData.type as InputType,
        description: formData.description,
        required: formData.required,
        placeholder: formData.type === 'text' ? formData.placeholder : undefined,
        options: processedOptions
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        type: 'text' as InputType,
        description: '',
        required: false,
        placeholder: '',
        options: ''
      });
      
      toast.success("Input field created successfully!");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create input field");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Create New Input Field</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Field Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65525]"
              placeholder="Enter field name"
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Field Type <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65525]"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="file">File Upload</option>
              <option value="select">Select (Dropdown)</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65525]"
            placeholder="Enter field description"
          />
        </div>
        
        {formData.type === 'text' && (
          <div>
            <label htmlFor="placeholder" className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
            </label>
            <input
              type="text"
              id="placeholder"
              name="placeholder"
              value={formData.placeholder}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65525]"
              placeholder="Enter placeholder text"
            />
          </div>
        )}
        
        {formData.type === 'select' && (
          <div>
            <div className="flex items-center">
              <label htmlFor="options" className="block text-sm font-medium text-gray-700 mb-1">
                Options <span className="text-red-500">*</span>
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="h-4 w-4 text-gray-400 ml-1" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Enter options separated by commas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <input
              type="text"
              id="options"
              name="options"
              value={formData.options}
              onChange={handleChange}
              required={formData.type === 'select'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65525]"
              placeholder="Option 1, Option 2, Option 3"
            />
          </div>
        )}
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            name="required"
            checked={formData.required}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-[#E65525] focus:ring-[#E65525] border-gray-300 rounded"
          />
          <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
            Required field
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#E65525] text-white rounded-md hover:bg-[#D64C1B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E65525] focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Input Field'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
