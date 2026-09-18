import { ValidationError } from "yup";
import logger from "../../configs/logs";
import UsersService from "../../services/users";
import { prisma } from "../../database/prisma";
import { UserRole } from "../../interfaces/users";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 3) {
      throw new Error(
        "uso: yarn role-user <org-slug> <user-email> <user-role>",
      );
    }

    const slug = args[0];
    const email = args[1];
    const role = args[2].toUpperCase() as UserRole;

    const user = await UsersService.role(slug, email, role);

    if (!user) {
      throw new Error(`User ${email} is not registered.`);
    }

    logger.debug(
      `scripts/users/role - id: ${user.id} email: ${user.email} active: ${user.active} role: ${user.role}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/users/role -", `${error.errors.join(" | ")}`);
    } else if (error instanceof Error) {
      logger.error("scripts/users/role -", error);
    } else {
      logger.error("scripts/users/role -", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
