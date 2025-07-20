import {
  type ApiResponse,
  type PaginatedResponse,
  type Recipe,
  type User,
  type YouTubeAnalysisProgress,
  type YouTubeAnalysisResult,
} from "@/types";
import { mockRecipes, mockUsers } from "./data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  auth: {
    async login(email: string, _password: string): Promise<ApiResponse<User>> {
      await delay(1000);

      const user = mockUsers.find((u) => u.email === email);
      if (user) {
        return { success: true, data: user };
      }

      return { success: false, error: "Invalid credentials" };
    },

    async logout(): Promise<ApiResponse<null>> {
      await delay(500);
      return { success: true, data: null };
    },

    async getCurrentUser(): Promise<ApiResponse<User>> {
      await delay(500);
      return { success: true, data: mockUsers[0] };
    },
  },

  recipes: {
    async getAll(
      page = 1,
      pageSize = 10,
      category?: string,
      search?: string,
    ): Promise<PaginatedResponse<Recipe>> {
      await delay(800);

      let filtered = [...mockRecipes];

      if (category) {
        filtered = filtered.filter((r) => r.category === category);
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.title.toLowerCase().includes(searchLower) ||
            (r.description?.toLowerCase().includes(searchLower) ?? false) ||
            r.ingredients.some((i) =>
              i.name.toLowerCase().includes(searchLower),
            ),
        );
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = filtered.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        page,
        pageSize,
        totalCount: filtered.length,
        hasMore: endIndex < filtered.length,
      };
    },

    async getById(id: string): Promise<ApiResponse<Recipe>> {
      await delay(600);

      const recipe = mockRecipes.find((r) => r.id === id);
      if (recipe) {
        return { success: true, data: recipe };
      }

      return { success: false, error: "Recipe not found" };
    },

    async create(
      recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt" | "userId">,
    ): Promise<ApiResponse<Recipe>> {
      await delay(1000);

      const newRecipe: Recipe = {
        ...recipe,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: mockUsers[0].id,
      };

      mockRecipes.unshift(newRecipe);
      return { success: true, data: newRecipe };
    },

    async update(
      id: string,
      updates: Partial<Recipe>,
    ): Promise<ApiResponse<Recipe>> {
      await delay(800);

      const index = mockRecipes.findIndex((r) => r.id === id);
      if (index !== -1) {
        mockRecipes[index] = {
          ...mockRecipes[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        return { success: true, data: mockRecipes[index] };
      }

      return { success: false, error: "Recipe not found" };
    },

    async delete(id: string): Promise<ApiResponse<null>> {
      await delay(600);

      const index = mockRecipes.findIndex((r) => r.id === id);
      if (index !== -1) {
        mockRecipes.splice(index, 1);
        return { success: true, data: null };
      }

      return { success: false, error: "Recipe not found" };
    },

    async toggleFavorite(id: string): Promise<ApiResponse<Recipe>> {
      await delay(400);

      const recipe = mockRecipes.find((r) => r.id === id);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
        recipe.updatedAt = new Date().toISOString();
        return { success: true, data: recipe };
      }

      return { success: false, error: "Recipe not found" };
    },
  },

  youtube: {
    async analyzeVideo(
      url: string,
      onProgress: (progress: YouTubeAnalysisProgress) => void,
    ): Promise<ApiResponse<YouTubeAnalysisResult>> {
      const steps: YouTubeAnalysisProgress[] = [
        { step: "fetching", progress: 20, message: "動画情報を取得中..." },
        { step: "analyzing", progress: 40, message: "音声を解析中..." },
        { step: "extracting", progress: 60, message: "レシピを抽出中..." },
        { step: "structuring", progress: 80, message: "データを構造化中..." },
        { step: "completed", progress: 100, message: "解析完了！" },
      ];

      for (const step of steps) {
        await delay(1500);
        onProgress(step);
      }

      const result: YouTubeAnalysisResult = {
        videoTitle: "簡単！本格カルボナーラの作り方",
        channelName: "クッキングチャンネル",
        thumbnail: "https://via.placeholder.com/480x360",
        recipe: {
          title: "本格カルボナーラ",
          description: "YouTubeから抽出したレシピです",
          imageUrl: "https://via.placeholder.com/400x300",
          cookingTime: "20分",
          servings: "2人分",
          ingredients: [
            { name: "パスタ", amount: "200g" },
            { name: "ベーコン", amount: "80g" },
            { name: "卵", amount: "2個" },
            { name: "パルメザンチーズ", amount: "40g" },
            { name: "黒胡椒", amount: "適量" },
          ],
          steps: [
            "パスタを茹でる",
            "ベーコンを炒める",
            "卵とチーズを混ぜる",
            "パスタと和える",
            "完成",
          ],
          category: "洋食",
          difficulty: "medium",
          isFavorite: false,
          sourceUrl: url,
          sourceType: "youtube",
        },
      };

      return { success: true, data: result };
    },
  },
};
