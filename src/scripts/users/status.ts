import { ValidationError } from "yup";
import logger from "../../configs/logs";
import UsersService from "../../services/users";
import { prisma } from "../../database/prisma";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 2) {
      throw new Error("uso: yarn status-user <org-slug> <user-email>");
    }

    const slug = args[0];
    const email = args[1];

    const user = await UsersService.status(slug, email);

    if (!user) {
      throw new Error(`User ${email} is not registered.`);
    }

    logger.debug(
      `scripts/users/status - id: ${user.id} email: ${user.email} active: ${user.active} role: ${user.role}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/users/status -", `${error.errors.join(" | ")}`);
    } else if (error instanceof Error) {
      logger.error("scripts/users/status -", error);
    } else {
      logger.error("scripts/users/status -", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
