import { mixed, object, ref, string } from "yup";
import { UserRole } from "../interfaces/users";

export const checkUserSchema = object({
  slug: string().required("Slug é obrigatória."),
  email: string().required("Email é obrigatório."),
});

export const createUserSchema = object({
  email: string().required("Email do usuário é obrigatório."),
  name: string().required("Nome do usuário é obrigatório."),
  surname: string().required("Sobrenome do usuário é obrigatório."),
  orgName: string().required("Nome da organização é obrigatório."),
  password: string()
    .required("Senha do usuário é obrigatório.")
    .min(8, "A senha deve ter no mínimo 8 caracteres."),
  confirmPassword: string()
    .required("Confirmação de senha do usuário é obrigatório.")
    .oneOf([ref("password")], "As senhas não conferem."),
});

export const changeUserRoleSchema = object({
  email: string().required("Email do usuário é obrigatório."),
  orgName: string().required("Nome da organização é obrigatório."),
  role: mixed<UserRole>()
    .required("Tipo do usuário é obrigatório.")
    .oneOf(["ADMIN", "AGENT", "MANAGER"], "Tipo de usuário inválido."),
});

export const loginUserSchema = object({
  email: string().required("Email do usuário é obrigatório."),
  password: string()
    .required("Senha do usuário é obrigatório.")
    .min(8, "A senha deve ter no mínimo 8 caracteres."),
});
