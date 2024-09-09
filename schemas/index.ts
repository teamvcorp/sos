import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is Required" }),
  password: z.string().min(1, { message: "Password is Required" }),
});
export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is Required" }),
  password: z.string().min(6, { message: "Minimum 6 Chartacters" }),
  name: z.string().min(1, { message: "Name is Required" }),
});
export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is Required" }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Min of 6 charaters" }),
});

export const PresentSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"), // Name validation
  imageId: z
    .string(),
  retailer: z
    .string()
    .min(1, "Retailer is required")
    .max(255, "Retailer must be less than 255 characters"), // Retailer validation
  retailerId: z
    .string()
    .min(1, "Retailer ID is required")
    .max(255, "Retailer ID must be less than 255 characters"), // Retailer ID validation
  retailCost: z
    .number()
    .min(0, "Retail cost must be at least 0")
    .positive("Retail cost must be a positive number"), // Retail cost validation
  wholesaleCost: z
    .number()
    .min(0, "Wholesale cost must be at least 0")
    .positive("Wholesale cost must be a positive number"), // Wholesale cost validation
  onHand: z
    .number()
    .min(0, "On hand quantity must be at least 0") // On hand quantity validation
    .positive("On hand quantity must be a positive number"), // Ensure positive quantity
});
