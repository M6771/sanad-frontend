import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getCenterDetails } from "../../../api/directory.api";

export default function CenterDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: center, isLoading } = useQuery({
    queryKey: ["center", id],
    queryFn: () => getCenterDetails(id as string),
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
      <Text style={styles.title}>{center?.name}</Text>
      <Text style={styles.address}>{center?.address}</Text>
      <Text style={styles.phone}>{center?.phone}</Text>
      <Text style={styles.description}>{center?.description}</Text>
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
  address: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});
