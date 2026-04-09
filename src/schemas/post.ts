import z from "zod";

export const PostSchema = z
  .object({
    title: z
      .string()
      .max(100, "Maximum only 100 chars are allowed")
      .min(1, "One character is required"),
    description: z
      .string()
      .max(200, "Maximum only 200 characters are allowed")
      .optional(),
    code: z.string().nullable(),
    codefile: z.file().nullable(),
    language: z.string(),
    inlineFeedback: z.boolean(),
    requireReview: z.boolean(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).min(1, "Minimum one Tag is required"),
  })
  .superRefine((data, ctx) => {
    if (!data.code && !data.codefile) {
      ctx.addIssue({
        path: ["code"],
        message: "Either code or code file is required",
        code: "custom",
      });

      ctx.addIssue({
        path: ["codefile"],
        message: "Either code or code file is required",
        code: "custom",
      });
    }
  });
export type PostReview = z.infer<typeof PostSchema>;
