
import { useState } from 'react';
import { MoreHorizontal, CalendarDays } from 'lucide-react';
import { Project } from '@/api/mockData';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [showOptions, setShowOptions] = useState(false);
  
  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-600',
    completed: 'bg-blue-100 text-blue-600',
    'on-hold': 'bg-orange-100 text-orange-600',
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            statusColors[project.status]
          )}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <MoreHorizontal size={18} className="text-gray-500" />
            </button>
            
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100 animate-fade-in">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Project</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share Project</a>
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete Project</a>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{project.title}</h3>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1 text-sm">
            <span>Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-primary-blue transition-all duration-500 ease-out"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.teamMembers.slice(0, 3).map((member) => (
              <img 
                key={member.id}
                src={member.avatar} 
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white"
                title={member.name}
              />
            ))}
            {project.teamMembers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                +{project.teamMembers.length - 3}
              </div>
            )}
          </div>
          
          <div className="flex items-center text-text-secondary text-sm">
            <CalendarDays size={16} className="mr-1" />
            <span>{formatDate(project.dueDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
