import { object, string } from "yup";

export const checkTenantSchema = object({
  slug: string().required("Slug é obrigatória."),
});

export const createTenantSchema = object({
  slug: string().required("Slug é obrigatória."),
  name: string().required("Nome é obrigatório."),
});
