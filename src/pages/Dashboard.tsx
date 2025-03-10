
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '@/components/dashboard/ProjectCard';
import StatCard from '@/components/dashboard/StatCard';
import { AlertCircle } from 'lucide-react';
import { fetchProjects, fetchStatistics } from '@/services/api';
import { StrapiData, StrapiProject, StrapiStatistic } from '@/types/strapi';

const Dashboard = () => {
  // Fetch projects using React Query
  const { 
    data: projectsData, 
    isLoading: projectsLoading, 
    error: projectsError 
  } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  // Fetch statistics using React Query
  const { 
    data: statisticsData, 
    isLoading: statsLoading, 
    error: statsError 
  } = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics,
  });

  // Determine if we're in a loading state
  const isLoading = projectsLoading || statsLoading;
  
  // Determine if we have an error
  const error = projectsError || statsError;

  // Extract projects from Strapi format
  const projects = projectsData?.data.map(item => ({
    id: item.id,
    ...item.attributes,
    teamMembers: item.attributes.teamMembers.map(member => ({
      id: member.id,
      name: member.name,
      avatar: member.avatar
    }))
  })) || [];

  // Extract statistics from Strapi format
  const statistics = statisticsData?.data.map(item => ({
    id: item.id,
    ...item.attributes
  })) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-gray-200 mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
        <AlertCircle className="text-red-500 mr-3 flex-shrink-0" />
        <p className="text-red-700">Failed to load dashboard data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statistics.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Active Projects</h2>
          <button className="text-primary-blue font-medium text-sm hover:underline">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter((project) => project.status === 'active')
            .slice(0, 3)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <button className="text-primary-blue font-medium text-sm hover:underline">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .slice(3, 6)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
