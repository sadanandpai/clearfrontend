import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  updateNameSchema,
  updatePasswordSchema,
  updatePhoneSchema,
  verifyPhoneOTPSchema,
} from "@/server/definitions/auth";

export function validateEmailPassword(formData: FormData) {
  return signInSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
}

export function validateSignUp(formData: FormData) {
  return signUpSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
}

export function validatePassword(formData: FormData) {
  return updatePasswordSchema.parse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });
}

export function validateResetPassword(formData: FormData) {
  return resetPasswordSchema.parse({
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
    userId: formData.get("userId"),
    secret: formData.get("secret"),
  });
}

export function validateName(formData: FormData) {
  return updateNameSchema.parse({
    name: formData.get("name"),
  });
}

export function validateEmail(formData: FormData) {
  return forgotPasswordSchema.parse({
    email: formData.get("email"),
  });
}

export function validatePhone(formData: FormData) {
  return updatePhoneSchema.parse({
    phone: formData.get("phone"),
    password: formData.get("userPassword"),
  });
}

export function validatePhoneOTP(otp: string) {
  return verifyPhoneOTPSchema.parse({
    otp,
  });
}
