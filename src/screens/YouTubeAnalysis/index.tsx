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

export default function YouTubeAnalysisScreen() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = () => {
    if (!url) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Mock analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 20;
      });
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputSection}>
        <Text style={styles.label}>YouTube URL</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.pasteButton}>
            <Ionicons name="clipboard-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.analyzeButton, !url && styles.analyzeButtonDisabled]}
          onPress={handleAnalyze}
          disabled={!url || isAnalyzing}
        >
          <Text style={styles.analyzeButtonText}>
            {isAnalyzing ? "解析中..." : "解析開始"}
          </Text>
        </TouchableOpacity>
      </View>

      {isAnalyzing && (
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>解析進行状況</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>

          <View style={styles.steps}>
            <View style={styles.step}>
              <Ionicons
                name={progress >= 20 ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={progress >= 20 ? "#4CAF50" : "#ccc"}
              />
              <Text style={styles.stepText}>動画情報取得</Text>
            </View>
            <View style={styles.step}>
              <Ionicons
                name={progress >= 40 ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={progress >= 40 ? "#4CAF50" : "#ccc"}
              />
              <Text style={styles.stepText}>音声解析</Text>
            </View>
            <View style={styles.step}>
              <Ionicons
                name={progress >= 60 ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={progress >= 60 ? "#4CAF50" : "#ccc"}
              />
              <Text style={styles.stepText}>レシピ抽出</Text>
            </View>
            <View style={styles.step}>
              <Ionicons
                name={progress >= 80 ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={progress >= 80 ? "#4CAF50" : "#ccc"}
              />
              <Text style={styles.stepText}>データ構造化</Text>
            </View>
            <View style={styles.step}>
              <Ionicons
                name={progress >= 100 ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={progress >= 100 ? "#4CAF50" : "#ccc"}
              />
              <Text style={styles.stepText}>完了</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>最近の解析</Text>
        <View style={styles.historyItem}>
          <Ionicons name="time-outline" size={20} color="#666" />
          <View style={styles.historyContent}>
            <Text style={styles.historyTitle}>
              簡単！本格カルボナーラの作り方
            </Text>
            <Text style={styles.historyDate}>2024年1月15日</Text>
          </View>
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
  inputSection: {
    padding: 16,
    backgroundColor: "white",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  pasteButton: {
    padding: 12,
  },
  analyzeButton: {
    backgroundColor: "#ff6b6b",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  analyzeButtonDisabled: {
    backgroundColor: "#ccc",
  },
  analyzeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  progressSection: {
    padding: 16,
    backgroundColor: "white",
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  steps: {
    gap: 12,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepText: {
    fontSize: 14,
    color: "#666",
  },
  historySection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    color: "#666",
  },
});
