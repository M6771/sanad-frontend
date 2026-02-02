import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { submitCheckIn } from "../../../api/care-path.api";

export default function CheckInScreen() {
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);

  const checkInMutation = useMutation({
    mutationFn: submitCheckIn,
    onSuccess: () => {
      // Handle success
    },
  });

  const handleSubmit = () => {
    checkInMutation.mutate({
      notes,
      rating,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Check-In</Text>
      <Text style={styles.label}>How did today go?</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter your notes..."
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
