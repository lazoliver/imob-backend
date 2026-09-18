import { object, string } from "yup";

export const checkOrgSchema = object({
  slug: string().required("Slug is mandatory."),
});

export const createOrgSchema = object({
  slug: string().required("Slug is mandatory."),
  name: string().required("Name is mandatory."),
});
