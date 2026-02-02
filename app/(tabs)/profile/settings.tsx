import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getParentProfile, updateParentProfile } from "../../../api/auth.api";
import { useAuth } from "../../../context/AuthContext";
import { ParentProfile } from "../../../types/auth.types";
import { validatePhone } from "../../../utils/validators";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية (Arabic)" },
  { code: "fr", name: "Français (French)" },
  { code: "es", name: "Español (Spanish)" },
];

// Form state type with phone as string for input handling
interface ParentProfileForm {
  name: string;
  phone: string;
  location: string;
  language: string;
}

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ParentProfileForm>({
    name: "",
    phone: "",
    location: "",
    language: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ParentProfileForm, string>>>({});
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Load existing profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ["parentProfile"],
    queryFn: getParentProfile,
    enabled: !!user,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || user?.name || "",
        phone: profile.phone?.toString() || user?.phone?.toString() || "",
        location: profile.location || user?.location || "",
        language: profile.language || user?.language || "",
      });
    } else if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone?.toString() || "",
        location: user.location || "",
        language: user.language || "",
      });
    }
  }, [profile, user]);

  const saveProfileMutation = useMutation({
    mutationFn: updateParentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parentProfile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to update profile. Please try again."
      );
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ParentProfileForm, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid Kuwait phone number (e.g., 51234567 or +96551234567)";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.language) {
      newErrors.language = "Please select a language";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Convert phone string to number for API
      // Remove country code (+965 or 965) and keep only the 8-digit number
      const cleanedPhone = formData.phone.replace(/[\s-]/g, "").replace(/^(\+965|965)/, "");
      const profileData: ParentProfile = {
        ...formData,
        phone: parseInt(cleanedPhone, 10),
      };
      saveProfileMutation.mutate(profileData);
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    if (profile) {
      setFormData({
        name: profile.name || user?.name || "",
        phone: profile.phone?.toString() || user?.phone?.toString() || "",
        location: profile.location || user?.location || "",
        language: profile.language || user?.language || "",
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  const getLanguageName = (code: string): string => {
    return LANGUAGES.find((lang) => lang.code === code)?.name || "Select Language";
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parent Profile</Text>

        {!isEditing ? (
          <>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Name</Text>
              <Text style={styles.settingValue}>{formData.name || "Not set"}</Text>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Phone</Text>
              <Text style={styles.settingValue}>{formData.phone || "Not set"}</Text>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Location</Text>
              <Text style={styles.settingValue}>{formData.location || "Not set"}</Text>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingValue}>
                {formData.language ? getLanguageName(formData.language) : "Not set"}
              </Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(text) => {
                  setFormData({ ...formData, name: text });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                autoCapitalize="words"
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Phone Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChangeText={(text) => {
                  setFormData({ ...formData, phone: text });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                keyboardType="phone-pad"
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            {/* Location Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Location (City/Region) *</Text>
              <TextInput
                style={[styles.input, errors.location && styles.inputError]}
                placeholder="Enter your city or region"
                value={formData.location}
                onChangeText={(text) => {
                  setFormData({ ...formData, location: text });
                  if (errors.location) setErrors({ ...errors, location: undefined });
                }}
                autoCapitalize="words"
              />
              {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
            </View>

            {/* Language Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Preferred Language *</Text>
              <TouchableOpacity
                style={[styles.languageSelector, errors.language && styles.inputError]}
                onPress={() => setShowLanguageModal(true)}
              >
                <Text
                  style={[
                    styles.languageSelectorText,
                    !formData.language && styles.placeholderText,
                  ]}
                >
                  {formData.language ? getLanguageName(formData.language) : "Select Language"}
                </Text>
                <Text style={styles.languageSelectorArrow}>▼</Text>
              </TouchableOpacity>
              {errors.language && <Text style={styles.errorText}>{errors.language}</Text>}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
                disabled={saveProfileMutation.isPending}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
                disabled={saveProfileMutation.isPending}
              >
                {saveProfileMutation.isPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Other Settings */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Text style={styles.settingValue}>On</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Privacy</Text>
          <Text style={styles.settingValue}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity
                onPress={() => setShowLanguageModal(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {LANGUAGES.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    formData.language === language.code && styles.languageOptionSelected,
                  ]}
                  onPress={() => {
                    setFormData({ ...formData, language: language.code });
                    setShowLanguageModal(false);
                    if (errors.language) setErrors({ ...errors, language: undefined });
                  }}
                >
                  <Text
                    style={[
                      styles.languageOptionText,
                      formData.language === language.code && styles.languageOptionTextSelected,
                    ]}
                  >
                    {language.name}
                  </Text>
                  {formData.language === language.code && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#000",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingValue: {
    fontSize: 16,
    color: "#666",
  },
  editButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
  },
  languageSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  languageSelectorText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  placeholderText: {
    color: "#999",
  },
  languageSelectorArrow: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  modalCloseButton: {
    padding: 4,
  },
  modalCloseText: {
    fontSize: 24,
    color: "#666",
  },
  modalScrollView: {
    maxHeight: 400,
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  languageOptionSelected: {
    backgroundColor: "#F0F8FF",
  },
  languageOptionText: {
    fontSize: 16,
    color: "#000",
  },
  languageOptionTextSelected: {
    fontWeight: "600",
    color: "#007AFF",
  },
  checkmark: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "bold",
  },
});
