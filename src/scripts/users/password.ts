import { ValidationError } from "yup";
import logger from "../../configs/logs";
import UsersService from "../../services/users";
import { prisma } from "../../database/prisma";
import vars from "../../configs/vars";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 2) {
      throw new Error("uso: yarn password-user <org-slug> <user-email>");
    }

    const slug = args[0];
    const email = args[1];
    const password = vars.default_password;
    const confirmPassword = vars.default_password;

    const user = await UsersService.password(
      slug,
      email,
      password,
      confirmPassword,
    );

    if (!user) {
      throw new Error(`User ${email} is not registered.`);
    }

    logger.debug(
      `scripts/users/password - id: ${user.id} email: ${user.email} active: ${user.active} role: ${user.role}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/users/password -", {
        message: error.message,
        error: error.errors,
      });
    } else if (error instanceof Error) {
      logger.error("scripts/users/password -", error);
    } else {
      logger.error("scripts/users/password -", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
