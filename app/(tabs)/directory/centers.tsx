import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getCenters } from "../../../api/directory.api";

export default function CentersScreen() {
  const router = useRouter();
  const { data: centers, isLoading } = useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading centers...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Centers</Text>
      {centers?.map((center: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.centerCard}
          onPress={() => router.push(`/(tabs)/directory/center-details?id=${center.id}`)}
        >
          <Text style={styles.centerName}>{center.name}</Text>
          <Text style={styles.centerAddress}>{center.address}</Text>
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
  centerCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  centerName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  centerAddress: {
    fontSize: 14,
    color: "#666",
  },
});
