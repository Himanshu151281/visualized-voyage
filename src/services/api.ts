
import { toast } from "sonner";
import { 
  StrapiResponse, 
  StrapiProject, 
  StrapiPortfolioItem, 
  StrapiStatistic 
} from "@/types/strapi";

// Configure the Strapi API URL - this should be your Strapi server URL
const STRAPI_API_URL = "http://localhost:1337/api";

// Generic fetch function with error handling
async function fetchFromStrapi<T>(endpoint: string): Promise<T> {
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
  return fetchFromStrapi<StrapiResponse<StrapiProject>>(
    `projects?filters[title][$containsi]=${query}&populate=teamMembers`
  );
}
