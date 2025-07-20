import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
}

interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  sortBy: "recent" | "favorite" | "alphabetical";
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
  isLoading: false,
  error: null,
  searchQuery: "",
  selectedCategory: null,
  sortBy: "recent",
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.unshift(action.payload);
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
      if (state.selectedRecipe?.id === action.payload.id) {
        state.selectedRecipe = action.payload;
      }
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      if (state.selectedRecipe?.id === action.payload) {
        state.selectedRecipe = null;
      }
    },
    selectRecipe: (state, action: PayloadAction<Recipe>) => {
      state.selectedRecipe = action.payload;
    },
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const recipe = state.recipes.find((r) => r.id === action.payload);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
      }
      if (state.selectedRecipe?.id === action.payload && state.selectedRecipe) {
        state.selectedRecipe.isFavorite = !state.selectedRecipe.isFavorite;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action: PayloadAction<RecipeState["sortBy"]>) => {
      state.sortBy = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  selectRecipe,
  clearSelectedRecipe,
  toggleFavorite,
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  setLoading,
  setError,
} = recipeSlice.actions;

export default recipeSlice.reducer;
