import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getResources } from "../../../api/content.api";

export default function ResourcesScreen() {
  const router = useRouter();
  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading resources...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resources</Text>
      {resources?.map((resource: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.resourceCard}
          onPress={() => router.push(`/(tabs)/resources/content-details?id=${resource.id}`)}
        >
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Text style={styles.resourceDescription}>{resource.description}</Text>
        </TouchableOpacity>
      ))}
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
  resourceCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 14,
    color: "#666",
  },
});
