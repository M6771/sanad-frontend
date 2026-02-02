import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ChildChallengesScreen() {
  const router = useRouter();
  const [challenges, setChallenges] = useState("");

  const handleNext = () => {
    router.push("/(onboarding)/child-goals");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Challenges & Needs</Text>
      <Text style={styles.subtitle}>
        Describe the main challenges your child faces and areas where they need support
      </Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter challenges..."
        value={challenges}
        onChangeText={setChallenges}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
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
