import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProfessionalDetails } from "../../../api/directory.api";

export default function ProfessionalDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: professional, isLoading } = useQuery({
    queryKey: ["professional", id],
    queryFn: () => getProfessionalDetails(id as string),
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
      <Text style={styles.title}>{professional?.name}</Text>
      <Text style={styles.specialty}>{professional?.specialty}</Text>
      <Text style={styles.description}>{professional?.description}</Text>
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
    marginBottom: 8,
  },
  specialty: {
    fontSize: 18,
    color: "#666",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});
