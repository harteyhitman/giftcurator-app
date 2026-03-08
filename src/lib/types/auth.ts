import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginData = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  mobileNumber: z.string().min(10),
  password: z.string().min(8),
});

export type SignupData = z.infer<typeof SignupSchema>;

export const RequestPasswordResetSchema = z.object({
  email: z.string().email(),
});

export type RequestPasswordResetData = z.infer<typeof RequestPasswordResetSchema>;

export const OTPSchema = z.object({
  otp: z.string().length(6),
});

export type OTPData = z.infer<typeof OTPSchema>;

export const ResetPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
