
import React from 'react';
import { StrapiData, StrapiInput } from '@/types/strapi';
import { AlertCircle, Calendar, FileText, List, Hash, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InputCardProps {
  input: StrapiData<StrapiInput>;
}

const InputCard: React.FC<InputCardProps> = ({ input }) => {
  const { attributes } = input;
  
  // Function to get the appropriate icon based on input type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'number':
        return <Hash className="h-4 w-4" />;
      case 'date':
        return <Calendar className="h-4 w-4" />;
      case 'file':
        return <FileText className="h-4 w-4" />;
      case 'select':
        return <List className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium">{attributes.name}</h3>
        <Badge variant="outline" className="flex items-center gap-1">
          {getTypeIcon(attributes.type)}
          <span className="capitalize">{attributes.type}</span>
        </Badge>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{attributes.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <span className="text-gray-500 w-24">Required:</span>
          {attributes.required ? 
            <Check className="h-4 w-4 text-green-500" /> : 
            <X className="h-4 w-4 text-red-500" />
          }
        </div>
        
        {attributes.placeholder && (
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Placeholder:</span>
            <span className="text-gray-700">{attributes.placeholder}</span>
          </div>
        )}
        
        {attributes.options && attributes.options.length > 0 && (
          <div className="text-sm">
            <span className="text-gray-500 block mb-1">Options:</span>
            <div className="flex flex-wrap gap-1">
              {attributes.options.map((option, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100">
                  {option}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
        Created: {new Date(attributes.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default InputCard;
