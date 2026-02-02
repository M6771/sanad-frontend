import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { generateCarePath } from "../../api/care-path.api";

export default function GeneratePlanScreen() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMutation = useMutation({
    mutationFn: generateCarePath,
    onSuccess: () => {
      router.replace("/(tabs)/plan");
    },
    onError: (error: any) => {
      console.error("Error generating plan:", error);
    },
  });

  const handleGenerate = () => {
    generateMutation.mutate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generating Your Care Path</Text>
      <Text style={styles.subtitle}>
        We're creating a personalized care plan based on your child's information.
      </Text>
      {generateMutation.isPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Generating your plan...</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleGenerate}>
          <Text style={styles.buttonText}>Generate Plan</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 48,
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
