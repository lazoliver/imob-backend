import { prisma } from "../database/prisma";
import { UserResponse, UserRole } from "../interfaces/users";

const UsersRepository = {
  check(organizationId: string, email: string): Promise<UserResponse | null> {
    return prisma.user.findUnique({
      where: { organizationId_email: { organizationId, email } },
    });
  },
  create(
    organizationId: string,
    name: string,
    surname: string,
    email: string,
    password: string,
  ): Promise<UserResponse> {
    return prisma.user.create({
      data: {
        name,
        surname,
        email,
        password,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });
  },
  status(
    organizationId: string,
    email: string,
    status: boolean,
  ): Promise<UserResponse> {
    return prisma.user.update({
      where: { organizationId_email: { organizationId, email } },
      data: { active: status },
    });
  },
  role(
    organizationId: string,
    email: string,
    role: UserRole,
  ): Promise<UserResponse> {
    return prisma.user.update({
      where: { organizationId_email: { organizationId, email } },
      data: { role },
    });
  },
  password(
    organizationId: string,
    email: string,
    password: string,
  ): Promise<UserResponse> {
    return prisma.user.update({
      where: { organizationId_email: { organizationId, email } },
      data: { password },
    });
  },
  email(
    organizationId: string,
    oldEmail: string,
    newEmail: string,
  ): Promise<UserResponse> {
    return prisma.user.update({
      where: { organizationId_email: { organizationId, email: oldEmail } },
      data: { email: newEmail },
    });
  },
};

export default UsersRepository;
