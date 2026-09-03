import { prisma } from "../database/prisma";
import { UserResponse } from "../interfaces/users";

const UsersRepository = {
  check(tenantId: string, email: string): Promise<UserResponse | null> {
    return prisma.user.findUnique({
      where: {
        tenantId_email: {
          tenantId,
          email,
        },
      },
    });
  },
  create(
    tenantId: string,
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
        tenant: {
          connect: {
            id: tenantId,
          },
        },
      },
    });
  },
  status(
    tenantId: string,
    email: string,
    status: boolean,
  ): Promise<UserResponse> {
    return prisma.user.update({
      where: {
        tenantId_email: {
          tenantId,
          email,
        },
      },
      data: {
        active: status,
      },
    });
  },
};

export default UsersRepository;
