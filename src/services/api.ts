
import { toast } from "sonner";
import { 
  StrapiResponse, 
  StrapiProject, 
  StrapiPortfolioItem, 
  StrapiStatistic 
} from "@/types/strapi";

// Configure the Strapi API URL - this should be your Strapi server URL
const STRAPI_API_URL = "http://localhost:1337/api";

// Check if we're in a browser environment that can't access localhost
const shouldUseMockData = () => {
  return window.location.hostname !== "localhost" && 
         window.location.hostname !== "127.0.0.1";
};

// Mock data for projects
const mockProjects: StrapiResponse<StrapiProject> = {
  data: [
    {
      id: 1,
      attributes: {
        title: "Website Redesign",
        status: "active",
        progress: 75,
        category: "Web Development",
        dueDate: "2025-06-01",
        description: "Redesigning the company website with modern UI/UX principles",
        teamMembers: [
          { id: 1, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
          { id: 2, name: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/2.jpg" }
        ],
        createdAt: "2025-01-15T00:00:00.000Z",
        updatedAt: "2025-03-10T00:00:00.000Z"
      }
    },
    {
      id: 2,
      attributes: {
        title: "Mobile App Development",
        status: "active",
        progress: 45,
        category: "Mobile",
        dueDate: "2025-07-15",
        description: "Building a cross-platform mobile application",
        teamMembers: [
          { id: 3, name: "Robert Johnson", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
          { id: 4, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/4.jpg" }
        ],
        createdAt: "2025-02-01T00:00:00.000Z",
        updatedAt: "2025-03-05T00:00:00.000Z"
      }
    },
    {
      id: 3,
      attributes: {
        title: "E-commerce Integration",
        status: "active",
        progress: 60,
        category: "E-commerce",
        dueDate: "2025-05-30",
        description: "Integrating payment gateways and shopping cart functionality",
        teamMembers: [
          { id: 5, name: "Michael Brown", avatar: "https://randomuser.me/api/portraits/men/5.jpg" }
        ],
        createdAt: "2025-01-20T00:00:00.000Z",
        updatedAt: "2025-03-01T00:00:00.000Z"
      }
    },
    {
      id: 4,
      attributes: {
        title: "Content Management System",
        status: "completed",
        progress: 100,
        category: "CMS",
        dueDate: "2025-02-28",
        description: "Developing a custom content management system",
        teamMembers: [
          { id: 6, name: "Sarah Wilson", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
          { id: 7, name: "David Lee", avatar: "https://randomuser.me/api/portraits/men/7.jpg" }
        ],
        createdAt: "2024-12-10T00:00:00.000Z",
        updatedAt: "2025-02-28T00:00:00.000Z"
      }
    },
    {
      id: 5,
      attributes: {
        title: "SEO Optimization",
        status: "on-hold",
        progress: 30,
        category: "Marketing",
        dueDate: "2025-08-15",
        description: "Improving search engine optimization strategies",
        teamMembers: [
          { id: 8, name: "Jennifer Taylor", avatar: "https://randomuser.me/api/portraits/women/8.jpg" }
        ],
        createdAt: "2025-02-15T00:00:00.000Z",
        updatedAt: "2025-03-07T00:00:00.000Z"
      }
    },
    {
      id: 6,
      attributes: {
        title: "Analytics Dashboard",
        status: "completed",
        progress: 100,
        category: "Analytics",
        dueDate: "2025-03-01",
        description: "Creating a real-time analytics dashboard",
        teamMembers: [
          { id: 9, name: "Kevin Clark", avatar: "https://randomuser.me/api/portraits/men/9.jpg" },
          { id: 10, name: "Amanda White", avatar: "https://randomuser.me/api/portraits/women/10.jpg" }
        ],
        createdAt: "2025-01-05T00:00:00.000Z",
        updatedAt: "2025-03-01T00:00:00.000Z"
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 6
    }
  }
};

// Mock data for portfolio items
const mockPortfolioItems: StrapiResponse<StrapiPortfolioItem> = {
  data: [
    {
      id: 1,
      attributes: {
        title: "E-commerce Website",
        description: "A fully functional e-commerce platform with payment integration and inventory management",
        language: "React & Node.js",
        author: "Web Solutions Inc.",
        image: {
          data: {
            id: 1,
            attributes: {
              url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=210&h=120",
              formats: {
                thumbnail: { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=210&h=120" },
                small: { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=210&h=120" }
              }
            }
          }
        },
        createdAt: "2025-01-10T00:00:00.000Z",
        updatedAt: "2025-03-01T00:00:00.000Z"
      }
    },
    {
      id: 2,
      attributes: {
        title: "Travel Booking App",
        description: "A mobile application for booking flights, hotels, and activities while traveling",
        language: "Flutter & Firebase",
        author: "Mobile Innovators",
        image: {
          data: {
            id: 2,
            attributes: {
              url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=210&h=120",
              formats: {
                thumbnail: { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=210&h=120" },
                small: { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=210&h=120" }
              }
            }
          }
        },
        createdAt: "2025-02-05T00:00:00.000Z",
        updatedAt: "2025-03-02T00:00:00.000Z"
      }
    },
    {
      id: 3,
      attributes: {
        title: "Healthcare Management System",
        description: "A comprehensive system for managing patient records, appointments, and billing",
        language: "Python & Django",
        author: "Health Tech Solutions",
        image: {
          data: {
            id: 3,
            attributes: {
              url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=210&h=120",
              formats: {
                thumbnail: { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=210&h=120" },
                small: { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=210&h=120" }
              }
            }
          }
        },
        createdAt: "2025-01-20T00:00:00.000Z",
        updatedAt: "2025-02-28T00:00:00.000Z"
      }
    },
    {
      id: 4,
      attributes: {
        title: "Learning Management System",
        description: "An interactive platform for online education with course management and assessment tools",
        language: "Vue.js & Laravel",
        author: "Education Innovators",
        image: {
          data: {
            id: 4,
            attributes: {
              url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=210&h=120",
              formats: {
                thumbnail: { url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=210&h=120" },
                small: { url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=210&h=120" }
              }
            }
          }
        },
        createdAt: "2025-02-10T00:00:00.000Z",
        updatedAt: "2025-03-05T00:00:00.000Z"
      }
    },
    {
      id: 5,
      attributes: {
        title: "Financial Dashboard",
        description: "A real-time dashboard for monitoring financial metrics and generating reports",
        language: "Angular & .NET",
        author: "Fintech Solutions Ltd.",
        image: {
          data: {
            id: 5,
            attributes: {
              url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=210&h=120",
              formats: {
                thumbnail: { url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=210&h=120" },
                small: { url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=210&h=120" }
              }
            }
          }
        },
        createdAt: "2025-01-15T00:00:00.000Z",
        updatedAt: "2025-02-20T00:00:00.000Z"
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 5
    }
  }
};

// Mock data for statistics
const mockStatistics: StrapiResponse<StrapiStatistic> = {
  data: [
    {
      id: 1,
      attributes: {
        title: "Total Projects",
        value: "45",
        change: 12.5,
        icon: "briefcase",
        color: "blue",
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-03-01T00:00:00.000Z"
      }
    },
    {
      id: 2,
      attributes: {
        title: "Monthly Revenue",
        value: "$35,650",
        change: 8.2,
        icon: "trending-up",
        color: "green",
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-03-01T00:00:00.000Z"
      }
    },
    {
      id: 3,
      attributes: {
        title: "Task Completion",
        value: "95.4%",
        change: 4.6,
        icon: "check-circle",
        color: "purple",
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-03-01T00:00:00.000Z"
      }
    },
    {
      id: 4,
      attributes: {
        title: "Active Users",
        value: "1,257",
        change: -2.3,
        icon: "users",
        color: "orange",
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-03-01T00:00:00.000Z"
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 4
    }
  }
};

// Generic fetch function with error handling and mock data support
async function fetchFromStrapi<T>(endpoint: string): Promise<T> {
  // Use mock data if we're in a browser environment that can't access localhost
  if (shouldUseMockData()) {
    console.log(`Using mock data for: ${endpoint}`);
    
    // Return the appropriate mock data based on the endpoint
    if (endpoint.startsWith("projects")) {
      return mockProjects as any as T;
    } else if (endpoint.startsWith("portfolio-items")) {
      return mockPortfolioItems as any as T;
    } else if (endpoint.startsWith("statistics")) {
      return mockStatistics as any as T;
    }
  }
  
  // If we're in a local environment, make the actual API call
  try {
    const response = await fetch(`${STRAPI_API_URL}/${endpoint}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "An error occurred while fetching data");
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error("Strapi API error:", error);
    
    // Show user-friendly error message with toast
    toast.error("Failed to load data. Please try again later.");
    
    // If API call fails, fall back to mock data
    console.log(`Falling back to mock data for: ${endpoint}`);
    if (endpoint.startsWith("projects")) {
      return mockProjects as any as T;
    } else if (endpoint.startsWith("portfolio-items")) {
      return mockPortfolioItems as any as T;
    } else if (endpoint.startsWith("statistics")) {
      return mockStatistics as any as T;
    }
    
    throw error;
  }
}

// Projects API
export async function fetchProjects(): Promise<StrapiResponse<StrapiProject>> {
  return fetchFromStrapi<StrapiResponse<StrapiProject>>("projects?populate=teamMembers");
}

// Portfolio API
export async function fetchPortfolioItems(): Promise<StrapiResponse<StrapiPortfolioItem>> {
  return fetchFromStrapi<StrapiResponse<StrapiPortfolioItem>>("portfolio-items?populate=image");
}

// Statistics API
export async function fetchStatistics(): Promise<StrapiResponse<StrapiStatistic>> {
  return fetchFromStrapi<StrapiResponse<StrapiStatistic>>("statistics");
}

// Search API
export async function searchProjects(query: string): Promise<StrapiResponse<StrapiProject>> {
  // If using mock data, filter the mock projects
  if (shouldUseMockData()) {
    const filteredProjects = mockProjects.data.filter(project => 
      project.attributes.title.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      data: filteredProjects,
      meta: {
        pagination: {
          page: 1,
          pageSize: filteredProjects.length,
          pageCount: 1,
          total: filteredProjects.length
        }
      }
    };
  }
  
  // If not using mock data, make the actual API call
  return fetchFromStrapi<StrapiResponse<StrapiProject>>(
    `projects?filters[title][$containsi]=${query}&populate=teamMembers`
  );
}
