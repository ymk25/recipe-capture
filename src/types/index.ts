export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  cookingTime: string;
  servings: string;
  ingredients: Ingredient[];
  steps: string[];
  category: string;
  difficulty?: "easy" | "medium" | "hard";
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  sourceUrl?: string;
  sourceType?: "manual" | "youtube";
  userId: string;
}

export interface YouTubeAnalysisRequest {
  url: string;
}

export interface YouTubeAnalysisProgress {
  step: "fetching" | "analyzing" | "extracting" | "structuring" | "completed";
  progress: number;
  message: string;
}

export interface YouTubeAnalysisResult {
  videoTitle: string;
  channelName: string;
  thumbnail: string;
  recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt" | "userId">;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
}
