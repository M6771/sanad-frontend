import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ChildGoalsScreen() {
  const router = useRouter();
  const [goals, setGoals] = useState("");

  const handleNext = () => {
    router.push("/(onboarding)/generate-plan");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals & Expectations</Text>
      <Text style={styles.subtitle}>
        What are your goals for your child's progress? What would you like to achieve?
      </Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter goals..."
        value={goals}
        onChangeText={setGoals}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Generate Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 200,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
