import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getChildren } from "../../../api/care-path.api";

export default function ManageChildrenScreen() {
  const { data: children, isLoading } = useQuery({
    queryKey: ["children"],
    queryFn: getChildren,
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
      <Text style={styles.title}>Manage Children</Text>
      {children?.map((child: any, index: number) => (
        <View key={index} style={styles.childCard}>
          <Text style={styles.childName}>{child.name}</Text>
          <Text style={styles.childAge}>Age: {child.age}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Child</Text>
      </TouchableOpacity>
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
  childCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  childName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  childAge: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
