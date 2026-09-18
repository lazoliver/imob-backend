import { mixed, object, ref, string } from "yup";
import { UserRole } from "../interfaces/users";

export const checkUserSchema = object({
  slug: string().required("Slug is mandatory."),
  email: string().email("Invalid email.").required("Email is mandatory."),
});

export const createUserSchema = object({
  slug: string().required("Slug is mandatory."),
  name: string().required("Name is mandatory."),
  surname: string().required("Surname is mandatory."),
  email: string().required("Email is mandatory."),
  password: string()
    .min(8, "The password must be at least 8 characters long.")
    .required("Password is mandatory."),
  confirmPassword: string()
    .min(8, "The password must be at least 8 characters long.")
    .required("Confirm password is mandatory.")
    .oneOf([ref("password")], "The passwords don't match."),
});

export const updateUserRoleSchema = object({
  slug: string().required("Slug is mandatory."),
  email: string().email("Invalid email.").required("Email is mandatory."),
  role: mixed<UserRole>()
    .oneOf(["ADMIN", "AGENT", "MANAGER"], "Invalid role.")
    .required("Role is mandatory."),
});

export const updateUserPasswordSchema = object({
  slug: string().required("Slug is mandatory."),
  email: string().email("Invalid email.").required("Email is mandatory."),
  password: string()
    .min(8, "The password must be at least 8 characters long.")
    .required("Password is mandatory."),
  confirmPassword: string()
    .min(8, "The password must be at least 8 characters long.")
    .required("Confirm password is mandatory.")
    .oneOf([ref("password")], "The passwords don't match."),
});

export const updateUserEmailSchema = object({
  slug: string().required("Slug is mandatory."),
  oldEmail: string()
    .email("Invalid email.")
    .required("Old email is mandatory."),
  newEmail: string()
    .email("Invalid email.")
    .required("New email is mandatory."),
});
