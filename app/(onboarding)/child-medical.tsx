import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ChildMedicalScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    medicalHistory: "",
    medications: "",
    allergies: "",
  });

  const handleNext = () => {
    router.push("/(onboarding)/child-diagnosis");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Information</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Medical History"
        value={formData.medicalHistory}
        onChangeText={(text) => setFormData({ ...formData, medicalHistory: text })}
        multiline
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Current Medications"
        value={formData.medications}
        onChangeText={(text) => setFormData({ ...formData, medications: text })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Allergies"
        value={formData.allergies}
        onChangeText={(text) => setFormData({ ...formData, allergies: text })}
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
  textArea: {
    height: 100,
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
