import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getTaskDetails } from "../../../api/care-path.api";

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskDetails(id as string),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{task?.title}</Text>
      <Text style={styles.description}>{task?.description}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.sectionContent}>{task?.instructions}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expected Outcome</Text>
        <Text style={styles.sectionContent}>{task?.expectedOutcome}</Text>
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
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: "#333",
  },
});
