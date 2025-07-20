import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from "@react-navigation/native";
import { type StackNavigationProp } from "@react-navigation/stack";

import { type RootStackParamList } from "@/navigation/RootNavigator";

type RecipeDetailRouteProp = RouteProp<RootStackParamList, "RecipeDetail">;
type RecipeDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecipeDetail"
>;

export default function RecipeDetailScreen() {
  const route = useRoute<RecipeDetailRouteProp>();
  const navigation = useNavigation<RecipeDetailNavigationProp>();
  const { recipeId } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("RecipeEdit", { recipeId })}
        >
          <Ionicons name="create-outline" size={24} color="#333" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, recipeId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={80} color="#ccc" />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>親子丼</Text>

        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.metaText}>調理時間: 20分</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={20} color="#666" />
            <Text style={styles.metaText}>2人分</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>材料</Text>
          <View style={styles.ingredientsList}>
            <View style={styles.ingredientItem}>
              <Text style={styles.ingredientName}>鶏もも肉</Text>
              <Text style={styles.ingredientAmount}>200g</Text>
            </View>
            <View style={styles.ingredientItem}>
              <Text style={styles.ingredientName}>玉ねぎ</Text>
              <Text style={styles.ingredientAmount}>1/2個</Text>
            </View>
            <View style={styles.ingredientItem}>
              <Text style={styles.ingredientName}>卵</Text>
              <Text style={styles.ingredientAmount}>3個</Text>
            </View>
            <View style={styles.ingredientItem}>
              <Text style={styles.ingredientName}>だし汁</Text>
              <Text style={styles.ingredientAmount}>150ml</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>作り方</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>
                鶏もも肉を一口大に切り、玉ねぎは薄切りにする。
              </Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>
                フライパンにだし汁を入れて中火で加熱し、鶏肉と玉ねぎを加える。
              </Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>
                鶏肉に火が通ったら、溶き卵を回し入れ、半熟状態で火を止める。
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="#ff6b6b" />
            <Text style={styles.favoriteButtonText}>お気に入り</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#666" />
            <Text style={styles.shareButtonText}>共有</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerButton: {
    marginRight: 16,
  },
  imageContainer: {
    height: 250,
    backgroundColor: "white",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  ingredientsList: {
    gap: 8,
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  ingredientName: {
    fontSize: 16,
    color: "#333",
  },
  ingredientAmount: {
    fontSize: 16,
    color: "#666",
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: "row",
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ff6b6b",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    color: "white",
    fontWeight: "600",
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  favoriteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ff6b6b",
  },
  favoriteButtonText: {
    color: "#ff6b6b",
    fontSize: 16,
    fontWeight: "500",
  },
  shareButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  shareButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
});
