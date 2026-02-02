import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyPlan } from "../../../api/care-path.api";

export default function PlanScreen() {
  const router = useRouter();
  const { data: plan, isLoading } = useQuery({
    queryKey: ["weeklyPlan"],
    queryFn: getWeeklyPlan,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading plan...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weekly Care Plan</Text>
      {plan?.tasks?.map((task: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.taskCard}
          onPress={() => router.push(`/(tabs)/plan/task-details?id=${task.id}`)}
        >
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/plan/progress")}
      >
        <Text style={styles.buttonText}>View Progress</Text>
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
  taskCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
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
