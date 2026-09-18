import { ValidationError } from "yup";
import logger from "../../configs/logs";
import OrganizationsService from "../../services/organizations";
import { prisma } from "../../database/prisma";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 1) {
      throw new Error("uso: yarn check-user <org-slug>");
    }

    const slug = args[0];

    const org = await OrganizationsService.check(slug);

    if (!org) {
      throw new Error(`Org ${slug} is not registered.`);
    }

    logger.debug(
      `scripts/organizations/check - id: ${org.id} slug: ${org.slug} active: ${org.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/organizations/check -", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      logger.error("scripts/organizations/check -", error);
    } else {
      logger.error("scripts/organizations/check -", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
