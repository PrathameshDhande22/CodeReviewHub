import z from "zod";

export const OTP_EXPIRY_MINUTES = 5;

const passwordValidation = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    "Password must contain one special character, one number, one uppercase letter",
  );

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    email: z.email("Invalid email address"),
    otp: z
      .string()
      .length(6, "OTP must be 6 digits")
      .regex(/^\d{6}$/, "OTP must be 6 digits"),
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInputs = z.infer<typeof changePasswordSchema>;
