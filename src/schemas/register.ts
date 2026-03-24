import z from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      "Password must contain one special Character,One Number, One Uppercase Letter",
    ),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be less than 20 characters long"),
});
