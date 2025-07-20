import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const menuItems = [
    { icon: "bookmark-outline", label: "お気に入り", badge: "12" },
    { icon: "time-outline", label: "履歴" },
    { icon: "settings-outline", label: "設定" },
    { icon: "help-circle-outline", label: "ヘルプ" },
    { icon: "log-out-outline", label: "ログアウト", danger: true },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#666" />
        </View>
        <Text style={styles.userName}>ゲストユーザー</Text>
        <Text style={styles.userEmail}>guest@example.com</Text>

        <View style={styles.planBadge}>
          <Text style={styles.planText}>無料プラン</Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>23</Text>
          <Text style={styles.statLabel}>レシピ</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>YouTube解析</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>お気に入り</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={24}
                color={item.danger ? "#ff4444" : "#666"}
              />
              <Text
                style={[
                  styles.menuItemText,
                  item.danger && styles.menuItemTextDanger,
                ]}
              >
                {item.label}
              </Text>
            </View>
            {item.badge ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            ) : (
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.premiumButton}>
        <Ionicons name="star" size={20} color="white" />
        <Text style={styles.premiumButtonText}>
          プレミアムプランにアップグレード
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileSection: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  planBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
  },
  planText: {
    fontSize: 12,
    color: "#666",
  },
  statsSection: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 20,
    marginTop: 1,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  menuSection: {
    backgroundColor: "white",
    marginTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  menuItemTextDanger: {
    color: "#ff4444",
  },
  badge: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  premiumButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff6b6b",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  premiumButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
