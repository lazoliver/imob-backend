import { ValidationError } from "yup";
import logger from "../../configs/logs";
import UsersService from "../../services/users";
import { prisma } from "../../database/prisma";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 3) {
      throw new Error(
        "uso: yarn email-user <org-slug> <user-old-email> <user-new-email>",
      );
    }

    const slug = args[0];
    const oldEmail = args[1];
    const newEmail = args[2];

    const user = await UsersService.email(slug, oldEmail, newEmail);

    if (!user) {
      throw new Error(`User ${oldEmail} is not registered.`);
    }

    logger.debug(
      `scripts/users/email - id: ${user.id} email: ${user.email} active: ${user.active} role: ${user.role}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/users/email -", `${error.errors.join(" | ")}`);
    } else if (error instanceof Error) {
      logger.error("scripts/users/email -", error);
    } else {
      logger.error("scripts/users/email -", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
