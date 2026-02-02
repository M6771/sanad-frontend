import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getProgress } from "../../../api/care-path.api";

export default function ProgressScreen() {
  const { data: progress, isLoading } = useQuery({
    queryKey: ["progress"],
    queryFn: getProgress,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading progress...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Progress Overview</Text>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{progress?.completedTasks || 0}</Text>
        <Text style={styles.statLabel}>Completed Tasks</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{progress?.totalTasks || 0}</Text>
        <Text style={styles.statLabel}>Total Tasks</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{progress?.completionRate || 0}%</Text>
        <Text style={styles.statLabel}>Completion Rate</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
});
