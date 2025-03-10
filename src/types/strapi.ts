
// Strapi common response types
export interface StrapiResponse<T> {
  data: StrapiData<T>[];
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: StrapiData<T>;
  meta: StrapiMeta;
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Project related types
export interface StrapiProject {
  title: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  category: string;
  dueDate: string;
  description: string;
  teamMembers: StrapiTeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface StrapiTeamMember {
  id: number;
  name: string;
  avatar: string;
}

// Portfolio related types
export interface StrapiPortfolioItem {
  title: string;
  description: string;
  language: string;
  author: string;
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
        formats: {
          thumbnail: { url: string };
          small: { url: string };
        };
      };
    };
  };
  createdAt: string;
  updatedAt: string;
}

// Statistics related types
export interface StrapiStatistic {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}
