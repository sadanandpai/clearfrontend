'use server';

import {
  updateSessionPassword,
  updateFullName,
  updateUserEmail,
  sendVerificationEmail,
  sendPasswordRecoveryEmail,
  resetPassword,
  updatePhoneNumber,
  verifyPhoneNumber,
  sendPhoneVerification,
} from '@/server/data-access/session';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateEmailPassword,
  validateResetPassword,
  validatePhone,
  validatePhoneOTP,
} from '@/server/utils/parser';
import { GlobalResponse, respondWithError, respondWithSuccess } from '@/server/handlers/action';
import { getLoggedInUser } from './auth';

export async function updatePassword(_prev: GlobalResponse, formData: FormData) {
  try {
    const { currentPassword, newPassword } = validatePassword(formData);
    await updateSessionPassword(newPassword, currentPassword);
    return respondWithSuccess('Password updated successfully');
  } catch (error) {
    return respondWithError(error);
  }
}

export async function updateName(_prev: GlobalResponse, formData: FormData) {
  try {
    const { name } = validateName(formData);
    await updateFullName(name);
    return respondWithSuccess('Name updated successfully');
  } catch (error) {
    return respondWithError(error);
  }
}

export async function updatePhone(_prev: GlobalResponse, formData: FormData) {
  try {
    const { phone, password } = validatePhone(formData);
    await updatePhoneNumber(phone, password);
    await sendPhoneVerification();
    return respondWithSuccess('Phone updated & verification code sent');
  } catch (error) {
    return respondWithError(error);
  }
}

export async function verifyPhone(otp: string) {
  const { otp: phoneOTP } = validatePhoneOTP(otp);
  await verifyPhoneNumber(phoneOTP);
  return respondWithSuccess('Phone verified successfully');
}

export async function updateEmail(_prev: GlobalResponse, formData: FormData) {
  try {
    const { email, password } = validateEmailPassword(formData);
    await updateUserEmail(email, password);
    await sendVerificationEmail();
    return respondWithSuccess('Email updated & verification email sent');
  } catch (error) {
    return respondWithError(error);
  }
}

export async function forgotPassword(_prev: GlobalResponse, formData: FormData) {
  try {
    const { email } = validateEmail(formData);
    await sendPasswordRecoveryEmail(email);
    return respondWithSuccess('Reset link sent to your email');
  } catch (error) {
    return respondWithError(error);
  }
}

export async function resetForgotPassword(_prev: GlobalResponse, formData: FormData) {
  try {
    const { userId, secret, newPassword, confirmPassword } = validateResetPassword(formData);
    if (newPassword !== confirmPassword) {
      return respondWithError(Error('Passwords do not match'));
    }

    await resetPassword(userId, secret, newPassword);
    return respondWithSuccess('Password reset successfully');
  } catch (error) {
    return respondWithError(error);
  }
}

export async function sendVerificationEmailAction() {
  const user = await getLoggedInUser();

  if (!user) {
    throw 'User not logged in';
  }

  if (user.emailVerification) {
    throw 'Email already verified. Please refresh the page';
  }

  await sendVerificationEmail();
  return respondWithSuccess('Verification email sent');
}

export async function sendPhoneVerificationAction() {
  await sendPhoneVerification();
  return respondWithSuccess('Verification code sent to your phone');
}
