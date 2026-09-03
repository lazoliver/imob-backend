import { ValidationError } from "yup";
import { prisma } from "../../database/prisma";
import UsersService from "../../services/users";
import logger from "../../configs/logger";

void (async () => {
  try {
    const args = process.argv;

    if (args.length != 4) {
      throw new Error("uso: yarn check-user <tenant-slug> <user-email>");
    }

    const tenantSlug = args[2];
    const email = args[3];

    const user = await UsersService.check(tenantSlug, email);

    logger.debug(
      `scripts/users/check - id: ${user.id} email: ${user.email} active: ${user.active} role: ${user.role}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/users/check - ", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      logger.error("scripts/users/check - ", error);
    } else {
      logger.error("scripts/users/check - ", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
