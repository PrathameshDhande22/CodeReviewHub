import z from "zod";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "Maximum 50 characters allowed"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Maximum 50 characters allowed"),
  image: z
    .file()
    .refine((file) => file.type === "image/png", "Only PNG images are allowed")
    .refine((file) => file.size <= MAX_IMAGE_SIZE, "Image must not exceed 2MB")
    .nullable(),
});

export type UpdateProfileInputs = z.infer<typeof updateProfileSchema>;
