import { NewUserRequest, UserResponse } from "../interfaces/users";
import UsersRepository from "../repositories/users";
import { checkUserSchema, createUserSchema } from "../validations/users";
import TenantsService from "./tenants";
import bcrypt from "bcrypt";

const UsersService = {
  async check(slug: string, email: string): Promise<UserResponse> {
    const validatedData = await checkUserSchema.validate(
      {
        slug,
        email,
      },
      { abortEarly: false },
    );

    const tenantExists = await TenantsService.check(validatedData.slug);

    if (!tenantExists.active) {
      throw new Error("Organização inativa.");
    }

    const userExists = await UsersRepository.check(
      tenantExists.id,
      validatedData.email,
    );

    if (!userExists) {
      throw new Error("Usuário indisponível.");
    }

    if (!userExists.active) {
      throw new Error("Usuário inativo.");
    }

    return userExists;
  },
  async create(userData: NewUserRequest): Promise<UserResponse> {
    const { email, name, surname, orgName, password } =
      await createUserSchema.validate(userData, { abortEarly: false });

    const tenantExists = await TenantsService.check(orgName);

    if (!tenantExists.active) {
      throw new Error(`Organização inativa.`);
    }

    const userExists = await UsersRepository.check(tenantExists.id, email);

    if (userExists) {
      throw new Error(`Usuário já cadastrado nesta organização.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return UsersRepository.create(
      tenantExists.id,
      name,
      surname,
      email,
      hashedPassword,
    );
  },
  async status(slug: string, email: string): Promise<UserResponse> {
    const validatedData = await checkUserSchema.validate(
      { slug, email },
      { abortEarly: false },
    );

    const tenantExists = await TenantsService.check(validatedData.slug);

    if (!tenantExists.active) {
      throw new Error(`Organização inativa.`);
    }

    const userExists = await UsersRepository.check(
      tenantExists.id,
      validatedData.email,
    );

    if (!userExists) {
      throw new Error(`Usuário não cadastrado nesta organização.`);
    }

    return UsersRepository.status(
      tenantExists.id,
      userExists.email,
      !userExists.active,
    );
  },
};

export default UsersService;
