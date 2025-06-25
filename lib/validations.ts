import { z } from "zod";

export const authFormSchema = (type: string) =>
  z.object({
    firstName:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, { message: "First name is required." }),
    lastName:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, { message: "Last name is required." }),
    address1:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(20, {
            message: "Address must contain at least 20 characters long",
          }),
    city:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, {
              message: "City is required.",
            })
            .max(50, { message: "City cannot exceed 50 characters long." }),
    state:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, {
              message: "State is required.",
            })
            .max(2, { message: "State cannot exceed 2 characters long." }),
    postalCode:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, {
              message: "Postal is required.",
            })
            .max(6, { message: "Postal cannot exceed 10 characters long." }),
    dateOfBirth:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(1, {
            message: "Date of birth is required.",
          }),
    ssn:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(1, {
            message: "SSN is required.",
          }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please provide a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(100, { message: "Password cannot exceed 100 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
  });
