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
  name: z.string().min(1, 'Name is required'),
  retailer: z.string().min(1, 'Retailer is required'),
  retailerId: z.string().min(1, 'Retailer ID is required'),
  retailCost: z.number().min(0, 'Retail cost must be greater than 0'),
  wholesaleCost: z.number().min(0, 'Wholesale cost must be greater than 0'),
  quantityWanted: z.number().int().min(0, 'Quantity wanted must be a non-negative integer'),
  userId: z.string().optional(),
});