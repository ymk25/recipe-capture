import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigationProp } from "@react-navigation/stack";

import { type RootStackParamList } from "@/navigation/RootNavigator";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>最近のレシピ</Text>
        <TouchableOpacity
          style={styles.recipeCard}
          onPress={() => navigation.navigate("RecipeDetail", { recipeId: "1" })}
        >
          <Text style={styles.recipeTitle}>サンプルレシピ</Text>
          <Text style={styles.recipeDescription}>
            これはサンプルのレシピです
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RecipeEdit", {})}
      >
        <Text style={styles.addButtonText}>新しいレシピを追加</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  recipeCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#ff6b6b",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
