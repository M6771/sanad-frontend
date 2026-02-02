export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" };
  }
  return { valid: true };
};

export const validatePhone = (phone: string): boolean => {
  // Kuwait phone number validation
  // Format: +965 or 965 (optional) followed by 5, 6, or 9, then 7 more digits
  // Examples: +96551234567, 96551234567, 51234567
  const kuwaitPhoneRegex = /^(?:\+965|965)?[569]\d{7}$/;
  // Remove all non-digit characters except + for validation
  const cleanedPhone = phone.replace(/[\s-]/g, "");
  return kuwaitPhoneRegex.test(cleanedPhone);
};
