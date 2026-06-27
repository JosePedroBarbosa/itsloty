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

export const bookingSchema = z.object({
  fullName: z.string().min(1, "Please enter your full name").max(80, "Name is too long"),
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
  phone: z.string().max(30, "Phone number is too long").optional().or(z.literal("")),
  notes: z.string().max(500, "Note is too long (max 500 characters)").optional().or(z.literal("")),
});

export type EmailFormData = z.infer<typeof emailSchema>;
export type NameFormData = z.infer<typeof nameSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
