import { ValidationError } from "yup";
import logger from "../../configs/logs";
import UsersService from "../../services/users";
import { prisma } from "../../database/prisma";
import vars from "../../configs/vars";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 4) {
      throw new Error(
        "uso: yarn create-user <org-slug> <user-email> <user-name> <user-surname>",
      );
    }

    const slug = args[0];
    const email = args[1];
    const name = args[2];
    const surname = args[3];
    const password = vars.default_password;
    const confirmPassword = vars.default_password;

    const user = await UsersService.create(
      slug,
      email,
      name,
      surname,
      password,
      confirmPassword,
    );

    logger.debug(
      `scripts/users/create - id: ${user.id} email: ${user.email} active: ${user.active} role: ${user.role}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/users/create -", `${error.errors.join(" | ")}`);
    } else if (error instanceof Error) {
      logger.error("scripts/users/create -", error);
    } else {
      logger.error("scripts/users/create -", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
