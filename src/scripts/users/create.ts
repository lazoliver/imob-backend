import { ValidationError } from "yup";
import { prisma } from "../../database/prisma";
import UsersService from "../../services/users";
import vars from "../../configs/vars";
import logger from "../../configs/logger";

void (async () => {
  try {
    const args = process.argv;

    if (args.length != 6) {
      throw new Error(
        "uso: yarn create-user <tenant-slug> <user-email> <user-name> <user-surname>",
      );
    }

    const orgName = args[2];
    const userEmail = args[3];
    const name = args[4];
    const surname = args[5];
    const password = vars.default_password;
    const confirmPassword = vars.default_password;

    const user = await UsersService.create({
      email: userEmail,
      name,
      surname,
      orgName,
      password,
      confirmPassword,
    });

    logger.debug(
      `scripts/users/create - id: ${user.id} email: ${user.email} active: ${user.active} role: ${user.role}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/users/create - ", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      logger.error("scripts/users/create - ", error);
    } else {
      logger.error("scripts/users/create - ", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
