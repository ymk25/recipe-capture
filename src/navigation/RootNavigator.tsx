import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import RecipeDetailScreen from "@/screens/RecipeDetail";
import RecipeEditScreen from "@/screens/RecipeEdit";
import { store } from "@/store";
import { lightTheme } from "@/theme";
import MainTabNavigator from "./MainTabNavigator";

export type RootStackParamList = {
  MainTabs: undefined;
  RecipeDetail: { recipeId: string };
  RecipeEdit: { recipeId?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Provider store={store}>
      <PaperProvider theme={lightTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: "#f5f5f5",
                  },
                  headerTintColor: "#333",
                  headerTitleStyle: {
                    fontWeight: "600",
                  },
                }}
              >
                <Stack.Screen
                  name="MainTabs"
                  component={MainTabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RecipeDetail"
                  component={RecipeDetailScreen}
                  options={{ title: "レシピ詳細" }}
                />
                <Stack.Screen
                  name="RecipeEdit"
                  component={RecipeEditScreen}
                  options={({ route }) => ({
                    title: route.params?.recipeId
                      ? "レシピを編集"
                      : "新しいレシピ",
                  })}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}
