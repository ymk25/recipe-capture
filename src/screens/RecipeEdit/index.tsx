import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

type RecipeEditRouteProp = RouteProp<RootStackParamList, "RecipeEdit">;
type RecipeEditNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecipeEdit"
>;

export default function RecipeEditScreen() {
  const route = useRoute<RecipeEditRouteProp>();
  const navigation = useNavigation<RecipeEditNavigationProp>();
  const { recipeId } = route.params; // eslint-disable-line @typescript-eslint/no-unused-vars

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [steps, setSteps] = useState([""]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const updateIngredient = (
    index: number,
    field: "name" | "amount",
    value: string,
  ) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            // TODO: 保存処理を実装
          }}
        >
          <Text style={styles.saveButtonText}>保存</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>レシピ名 *</Text>
        <TextInput
          style={styles.input}
          placeholder="例: 親子丼"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.label}>調理時間</Text>
          <TextInput
            style={styles.input}
            placeholder="例: 20分"
            value={time}
            onChangeText={setTime}
          />
        </View>
        <View style={[styles.section, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>人数</Text>
          <TextInput
            style={styles.input}
            placeholder="例: 2人分"
            value={servings}
            onChangeText={setServings}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>材料</Text>
          <TouchableOpacity onPress={addIngredient}>
            <Ionicons name="add-circle-outline" size={24} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientRow}>
            <TextInput
              style={[styles.input, { flex: 2 }]}
              placeholder="材料名"
              value={ingredient.name}
              onChangeText={(value) => updateIngredient(index, "name", value)}
            />
            <TextInput
              style={[styles.input, { flex: 1, marginLeft: 8 }]}
              placeholder="分量"
              value={ingredient.amount}
              onChangeText={(value) => updateIngredient(index, "amount", value)}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeIngredient(index)}
            >
              <Ionicons name="close-circle-outline" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>作り方</Text>
          <TouchableOpacity onPress={addStep}>
            <Ionicons name="add-circle-outline" size={24} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <TextInput
              style={[styles.input, styles.stepInput]}
              placeholder="手順を入力"
              value={step}
              onChangeText={(value) => updateStep(index, value)}
              multiline
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeStep(index)}
            >
              <Ionicons name="close-circle-outline" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.imageSection}>
        <Text style={styles.sectionTitle}>写真</Text>
        <TouchableOpacity style={styles.imageUploadButton}>
          <Ionicons name="camera-outline" size={32} color="#666" />
          <Text style={styles.imageUploadText}>写真を追加</Text>
        </TouchableOpacity>
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
  saveButtonText: {
    color: "#ff6b6b",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 1,
  },
  row: {
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  deleteButton: {
    marginLeft: 8,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ff6b6b",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  stepNumberText: {
    color: "white",
    fontWeight: "600",
  },
  stepInput: {
    flex: 1,
    minHeight: 60,
    textAlignVertical: "top",
  },
  imageSection: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 32,
  },
  imageUploadButton: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
    marginTop: 12,
  },
  imageUploadText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
});
