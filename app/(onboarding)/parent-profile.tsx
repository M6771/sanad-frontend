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
import { getParentProfile, updateParentProfile } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import { ParentProfile } from "../../types/auth.types";
import { validatePhone } from "../../utils/validators";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية (Arabic)" },
  { code: "fr", name: "Français (French)" },
  { code: "es", name: "Español (Spanish)" },
];

// Form state type with phone as string for input handling (to preserve +965 format for validation)
interface ParentProfileForm {
  name: string;
  phone: string; // Keep as string to preserve +965 format for Kuwait validation
  location: string;
  language: string;
}

export default function ParentProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ParentProfileForm>({
    name: "",
    phone: "",
    location: "",
    language: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ParentProfileForm, string>>>({});
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Load existing profile data if available
  const { data: existingProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["parentProfile"],
    queryFn: getParentProfile,
    enabled: !!user, // Only fetch if user is logged in
    retry: false, // Don't retry if profile doesn't exist yet (onboarding)
  });

  // Update form data when existing profile loads
  useEffect(() => {
    if (existingProfile) {
      setFormData({
        name: existingProfile.name || user?.name || "",
        phone: existingProfile.phone?.toString() || user?.phone?.toString() || "",
        location: existingProfile.location || user?.location || "",
        language: existingProfile.language || user?.language || "",
      });
    } else if (user) {
      // Pre-fill with user data if available
      setFormData({
        name: user.name || "",
        phone: user.phone?.toString() || "",
        location: user.location || "",
        language: user.language || "",
      });
    }
  }, [existingProfile, user]);

  // Mutation for saving profile
  const saveProfileMutation = useMutation({
    mutationFn: updateParentProfile,
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["parentProfile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      
      Alert.alert("Success", "Profile saved successfully!", [
        {
          text: "OK",
          onPress: () => router.push("/(onboarding)/child-basic"),
        },
      ]);
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to save profile. Please try again."
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

  const handleNext = () => {
    if (validateForm()) {
      // Convert phone string to number for API (remove country code +965 or 965)
      const cleanedPhone = formData.phone.replace(/[\s-]/g, "").replace(/^(\+965|965)/, "");
      const profileData: ParentProfile = {
        ...formData,
        phone: parseInt(cleanedPhone, 10),
      };
      // Save parent profile data to database
      saveProfileMutation.mutate(profileData);
    }
  };

  const handleLanguageSelect = (languageCode: string) => {
    setFormData({ ...formData, language: languageCode });
    setShowLanguageModal(false);
    // Clear language error if it exists
    if (errors.language) {
      setErrors({ ...errors, language: undefined });
    }
  };

  const getLanguageName = (code: string): string => {
    return LANGUAGES.find((lang) => lang.code === code)?.name || "Select Language";
  };

  if (isLoadingProfile) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Parent Profile</Text>
      <Text style={styles.subtitle}>
        Tell us about yourself so we can personalize your experience
      </Text>

      {/* Name Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Enter your full name"
          value={formData.name}
          onChangeText={(text) => {
            setFormData({ ...formData, name: text });
            if (errors.name) {
              setErrors({ ...errors, name: undefined });
            }
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
            // Keep as string to preserve +965 format for Kuwait validation
            setFormData({ ...formData, phone: text });
            if (errors.phone) {
              setErrors({ ...errors, phone: undefined });
            }
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
            if (errors.location) {
              setErrors({ ...errors, location: undefined });
            }
          }}
          autoCapitalize="words"
        />
        <Text style={styles.hintText}>
          This helps us show you local resources and professionals
        </Text>
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
        <Text style={styles.hintText}>
          This helps us provide content in your preferred language
        </Text>
        {errors.language && <Text style={styles.errorText}>{errors.language}</Text>}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.button, saveProfileMutation.isPending && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={saveProfileMutation.isPending}
      >
        {saveProfileMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Next</Text>
        )}
      </TouchableOpacity>

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
                  onPress={() => handleLanguageSelect(language.code)}
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
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    lineHeight: 22,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
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
    fontSize: 14,
    marginTop: 4,
  },
  hintText: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
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
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Modal Styles
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
