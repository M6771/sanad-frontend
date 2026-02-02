import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getContentDetails } from "../../../api/content.api";

export default function ContentDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: content, isLoading } = useQuery({
    queryKey: ["content", id],
    queryFn: () => getContentDetails(id as string),
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
      <Text style={styles.title}>{content?.title}</Text>
      <Text style={styles.content}>{content?.content}</Text>
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
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});
