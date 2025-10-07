import { z } from 'zod';

export const nameSchema = z.string().min(3).max(50).trim();
export const emailSchema = z.email().trim().toLowerCase();
export const passwordSchema = z.string().min(8).max(20).trim();
export const userIdSchema = z.string().min(1).max(50);
export const secretSchema = z.string().min(128).max(256);
export const phoneSchema = z.string().regex(/^\+[0-9]{1,15}$/);
export const phoneOTPSchema = z.string().regex(/^[0-9]{6}$/);

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const updatePasswordSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
});

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
  userId: userIdSchema,
  secret: secretSchema,
});

export const updateNameSchema = z.object({
  name: nameSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const updatePhoneSchema = z.object({
  phone: phoneSchema,
  password: passwordSchema,
});

export const verifyPhoneOTPSchema = z.object({
  otp: phoneOTPSchema,
});
