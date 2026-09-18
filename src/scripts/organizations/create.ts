import { ValidationError } from "yup";
import logger from "../../configs/logs";
import OrganizationsService from "../../services/organizations";
import { prisma } from "../../database/prisma";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 2) {
      throw new Error("uso: yarn create-org <org-slug> <org-name>");
    }

    const slug = args[0];
    const name = args[1];

    const org = await OrganizationsService.create(slug, name);

    logger.debug(
      `scripts/organizations/create - id: ${org.id} slug: ${org.slug} active: ${org.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/organizations/create -", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      logger.error("scripts/organizations/create -", error);
    } else {
      logger.error("scripts/organizations/create -", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
