import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getProfessionals } from "../../../api/directory.api";
import { useAuth } from "../../../context/AuthContext";

export default function ProfessionalsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: professionals, isLoading } = useQuery({
    queryKey: ["professionals", user?.location],
    queryFn: () => getProfessionals(user?.location),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading professionals...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Healthcare Professionals</Text>
      {professionals?.map((professional: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.professionalCard}
          onPress={() =>
            router.push(`/(tabs)/directory/professional-details?id=${professional.id}`)
          }
        >
          <Text style={styles.professionalName}>{professional.name}</Text>
          <Text style={styles.professionalSpecialty}>{professional.specialty}</Text>
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
  professionalCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  professionalSpecialty: {
    fontSize: 14,
    color: "#666",
  },
});
