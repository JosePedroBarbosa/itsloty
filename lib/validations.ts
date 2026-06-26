import * as z from "zod";

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
});

export const nameSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Name must be under 30 characters")
    .regex(/^[a-z0-9_-]+$/, "Only letters, numbers, hyphens, and underscores are allowed"),
});

export type EmailFormData = z.infer<typeof emailSchema>;
export type NameFormData = z.infer<typeof nameSchema>;
