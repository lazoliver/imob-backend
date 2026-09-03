import { ValidationError } from "yup";
import { prisma } from "../../database/prisma";
import UsersService from "../../services/users";
import logger from "../../configs/logger";

void (async () => {
  try {
    const args = process.argv;

    if (args.length != 4) {
      throw new Error("Usage: yarn check-user <tenant-slug> <user-email>");
    }

    const tenantSlug = args[2];
    const email = args[3];

    const user = await UsersService.status(tenantSlug, email);

    logger.debug(
      `scripts/users/status - User: ${user.email} Status: ${user.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/users/status - ", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      logger.error("scripts/users/status - ", error);
    } else {
      logger.error("scripts/users/status - ", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
