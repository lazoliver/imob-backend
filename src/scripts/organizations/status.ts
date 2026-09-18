import { ValidationError } from "yup";
import logger from "../../configs/logs";
import OrganizationsService from "../../services/organizations";
import { prisma } from "../../database/prisma";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 1) {
      throw new Error("uso: yarn status-user <org-slug>");
    }

    const slug = args[0];

    const org = await OrganizationsService.status(slug);

    if (!org) {
      throw new Error(`Org ${slug} is not registered.`);
    }

    logger.debug(
      `scripts/organizations/status - id: ${org.id} slug: ${org.slug} active: ${org.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/organizations/status -", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      logger.error("scripts/organizations/status -", error);
    } else {
      logger.error("scripts/organizations/status -", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
