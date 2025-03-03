
export interface Project {
  id: number;
  title: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  category: string;
  dueDate: string;
  teamMembers: Array<{
    id: number;
    name: string;
    avatar: string;
  }>;
  description: string;
}

export interface Statistic {
  id: number;
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Mobile App Redesign",
    status: "active",
    progress: 75,
    category: "Design",
    dueDate: "2023-06-30",
    teamMembers: [
      { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=5" },
      { id: 3, name: "Mark Johnson", avatar: "https://i.pravatar.cc/150?img=8" }
    ],
    description: "Redesigning the mobile app interface for better user experience and conversion rates."
  },
  {
    id: 2,
    title: "Website Development",
    status: "active",
    progress: 50,
    category: "Development",
    dueDate: "2023-07-15",
    teamMembers: [
      { id: 4, name: "Emily Brown", avatar: "https://i.pravatar.cc/150?img=9" },
      { id: 5, name: "Alex Wilson", avatar: "https://i.pravatar.cc/150?img=3" }
    ],
    description: "Building a responsive website with modern technologies focusing on performance and SEO."
  },
  {
    id: 3,
    title: "Marketing Campaign",
    status: "on-hold",
    progress: 30,
    category: "Marketing",
    dueDate: "2023-08-01",
    teamMembers: [
      { id: 6, name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=4" },
      { id: 7, name: "Michael Davis", avatar: "https://i.pravatar.cc/150?img=2" },
      { id: 8, name: "Lisa Garcia", avatar: "https://i.pravatar.cc/150?img=6" }
    ],
    description: "Planning and executing a comprehensive digital marketing campaign across multiple channels."
  },
  {
    id: 4,
    title: "Product Launch",
    status: "completed",
    progress: 100,
    category: "Marketing",
    dueDate: "2023-05-15",
    teamMembers: [
      { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: 5, name: "Alex Wilson", avatar: "https://i.pravatar.cc/150?img=3" },
      { id: 6, name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=4" }
    ],
    description: "Successfully launched the new product version with integrated marketing and PR efforts."
  },
  {
    id: 5,
    title: "User Research",
    status: "active",
    progress: 60,
    category: "Research",
    dueDate: "2023-07-10",
    teamMembers: [
      { id: 9, name: "Ryan Miller", avatar: "https://i.pravatar.cc/150?img=7" },
      { id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=5" }
    ],
    description: "Conducting comprehensive user research to gather insights for product development."
  },
  {
    id: 6,
    title: "Database Migration",
    status: "active",
    progress: 40,
    category: "Development",
    dueDate: "2023-08-15",
    teamMembers: [
      { id: 4, name: "Emily Brown", avatar: "https://i.pravatar.cc/150?img=9" },
      { id: 10, name: "David Lee", avatar: "https://i.pravatar.cc/150?img=10" }
    ],
    description: "Migrating the existing database to a newer, more scalable infrastructure with minimal downtime."
  }
];

export const statistics: Statistic[] = [
  {
    id: 1,
    title: "Total Projects",
    value: 42,
    change: 8.5,
    icon: "briefcase",
    color: "blue"
  },
  {
    id: 2,
    title: "Active Projects",
    value: 18,
    change: 12.3,
    icon: "trending-up",
    color: "green"
  },
  {
    id: 3,
    title: "Completed Tasks",
    value: 327,
    change: 6.2,
    icon: "check-circle",
    color: "purple"
  },
  {
    id: 4,
    title: "Team Members",
    value: 24,
    change: -2.8,
    icon: "users",
    color: "orange"
  }
];

// Function to simulate API calls with a delay
export const fetchProjects = () => {
  return new Promise<Project[]>((resolve) => {
    setTimeout(() => {
      resolve(projects);
    }, 500);
  });
};

export const fetchStatistics = () => {
  return new Promise<Statistic[]>((resolve) => {
    setTimeout(() => {
      resolve(statistics);
    }, 300);
  });
};

export const searchProjects = (query: string) => {
  return new Promise<Project[]>((resolve) => {
    setTimeout(() => {
      const filteredProjects = projects.filter(project => 
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.category.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filteredProjects);
    }, 300);
  });
};
