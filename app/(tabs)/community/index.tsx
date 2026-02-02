import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getCommunityPosts } from "../../../api/community.api";

export default function CommunityScreen() {
  const router = useRouter();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["communityPosts"],
    queryFn: getCommunityPosts,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading posts...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push("/(tabs)/community/create-post")}
        >
          <Text style={styles.createButtonText}>+ Create Post</Text>
        </TouchableOpacity>
      </View>
      {posts?.map((post: any, index: number) => (
        <View key={index} style={styles.postCard}>
          <Text style={styles.postAuthor}>{post.author}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 16,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  postCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: "#333",
  },
});
