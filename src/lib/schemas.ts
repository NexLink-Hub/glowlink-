import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export const registerArtistSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(7, { message: "Please enter a valid phone number" }).regex(/[\d]/, { message: "Phone number must contain at least one digit" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters" }),
  specialty: z.enum(["makeup", "hair", "nails", "braids", "barber", "skincare"], {
    errorMap: () => ({ message: "Please select a valid specialty" }),
  }),
  location: z.string().min(2, { message: "Location must be at least 2 characters" }),
  experience: z.enum(["1-2", "3-5", "5-10", "10+"], {
    errorMap: () => ({ message: "Please select valid experience" }),
  }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }).max(500, { message: "Bio must be less than 500 characters" }),
  instagram: z.string().optional().refine((val) => !val || /^[a-zA-Z0-9_.]{1,30}$/.test(val), {
    message: "Invalid Instagram handle format",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterArtistSchema = z.infer<typeof registerArtistSchema>;
