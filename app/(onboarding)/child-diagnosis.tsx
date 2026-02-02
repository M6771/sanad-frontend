import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ChildDiagnosisScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    diagnosis: "",
    diagnosisDate: "",
    severity: "",
  });

  const handleNext = () => {
    router.push("/(onboarding)/child-challenges");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnosis Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Primary Diagnosis"
        value={formData.diagnosis}
        onChangeText={(text) => setFormData({ ...formData, diagnosis: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Diagnosis"
        value={formData.diagnosisDate}
        onChangeText={(text) => setFormData({ ...formData, diagnosisDate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Severity Level"
        value={formData.severity}
        onChangeText={(text) => setFormData({ ...formData, severity: text })}
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
