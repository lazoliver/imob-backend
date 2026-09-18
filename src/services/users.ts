import bcrypt from "bcryptjs";
import { UserResponse, UserRole } from "../interfaces/users";
import UsersRepository from "../repositories/users";
import {
  checkUserSchema,
  createUserSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
  updateUserRoleSchema,
} from "../validations/users";
import OrganizationsService from "./organizations";

const UsersService = {
  async check(slug: string, email: string): Promise<UserResponse | null> {
    const validatedData = await checkUserSchema.validate(
      { slug, email },
      { abortEarly: false },
    );

    const orgExists = await OrganizationsService.check(validatedData.slug);

    if (!orgExists) {
      throw new Error(`Org ${validatedData.slug} is not registered.`);
    }

    if (!orgExists.active) {
      throw new Error(`Org ${orgExists.slug} is not active.`);
    }

    const userExists = await UsersRepository.check(
      orgExists.id,
      validatedData.email,
    );

    if (!userExists) {
      return null;
    }

    return userExists;
  },
  async create(
    slug: string,
    email: string,
    name: string,
    surname: string,
    password: string,
    confirmPassword: string,
  ): Promise<UserResponse> {
    const validatedData = await createUserSchema.validate(
      { slug, name, surname, email, password, confirmPassword },
      { abortEarly: false },
    );

    const orgExists = await OrganizationsService.check(validatedData.slug);

    if (!orgExists) {
      throw new Error(`Org ${validatedData.slug} is not registered.`);
    }

    if (!orgExists.active) {
      throw new Error(`Org ${orgExists.slug} is not active.`);
    }

    const userExists = await this.check(
      validatedData.slug,
      validatedData.email,
    );

    if (userExists) {
      throw new Error(`User ${validatedData.email} is already in use.`);
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    return await UsersRepository.create(
      orgExists.id,
      validatedData.email,
      validatedData.surname,
      validatedData.email,
      hashedPassword,
    );
  },
  async status(slug: string, email: string): Promise<UserResponse> {
    const validatedData = await checkUserSchema.validate(
      { slug, email },
      { abortEarly: false },
    );

    const userExists = await this.check(
      validatedData.slug,
      validatedData.email,
    );

    if (!userExists) {
      throw new Error(`User ${validatedData.email} is not registered.`);
    }

    return UsersRepository.status(
      userExists.organizationId,
      userExists.email,
      !userExists.active,
    );
  },
  async role(
    slug: string,
    email: string,
    role: UserRole,
  ): Promise<UserResponse> {
    const validatedData = await updateUserRoleSchema.validate(
      { slug, email, role },
      { abortEarly: false },
    );

    const userExists = await this.check(
      validatedData.slug,
      validatedData.email,
    );

    if (!userExists) {
      throw new Error(`User ${validatedData.email} is not registered.`);
    }

    if (!userExists.active) {
      throw new Error(`User ${userExists.email} is inactive.`);
    }

    return UsersRepository.role(
      userExists.organizationId,
      userExists.email,
      validatedData.role,
    );
  },
  async password(
    slug: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    const validatedData = await updateUserPasswordSchema.validate(
      { slug, email, password, confirmPassword },
      { abortEarly: false },
    );

    const userExists = await this.check(
      validatedData.slug,
      validatedData.email,
    );

    if (!userExists) {
      throw new Error(`User ${validatedData.email} is not registered.`);
    }

    if (!userExists.active) {
      throw new Error(`User ${userExists.email} is inactive.`);
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    return UsersRepository.password(
      userExists.organizationId,
      userExists.email,
      hashedPassword,
    );
  },
  async email(
    slug: string,
    oldEmail: string,
    newEmail: string,
  ): Promise<UserResponse> {
    const validatedData = await updateUserEmailSchema.validate(
      { slug, oldEmail, newEmail },
      { abortEarly: false },
    );

    const userExists = await this.check(
      validatedData.slug,
      validatedData.oldEmail,
    );

    if (!userExists) {
      throw new Error(`User ${validatedData.oldEmail} is not registered.`);
    }

    if (!userExists.active) {
      throw new Error(`User ${userExists.email} is inactive.`);
    }

    return await UsersRepository.email(
      userExists.organizationId,
      userExists.email,
      validatedData.newEmail,
    );
  },
};

export default UsersService;
