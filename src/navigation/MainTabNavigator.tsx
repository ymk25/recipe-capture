import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "@/screens/Home";
import ProfileScreen from "@/screens/Profile";
import SearchScreen from "@/screens/Search";
import YouTubeAnalysisScreen from "@/screens/YouTubeAnalysis";

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  YouTubeAnalysis: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Search":
              iconName = focused ? "search" : "search-outline";
              break;
            case "YouTubeAnalysis":
              iconName = focused ? "videocam" : "videocam-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff6b6b",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
        },
        headerTintColor: "#333",
        headerTitleStyle: {
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "ホーム",
          headerTitle: "Recipe Capture",
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "検索",
          headerTitle: "レシピを検索",
        }}
      />
      <Tab.Screen
        name="YouTubeAnalysis"
        component={YouTubeAnalysisScreen}
        options={{
          title: "YouTube",
          headerTitle: "YouTube解析",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "プロフィール",
          headerTitle: "マイページ",
        }}
      />
    </Tab.Navigator>
  );
}
