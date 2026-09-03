import { ValidationError } from "yup";
import { prisma } from "../../database/prisma";
import TenantsService from "../../services/tenants";
import logger from "../../configs/logger";

void (async () => {
  try {
    const args = process.argv;

    if (args.length != 3) {
      throw new Error("uso: yarn check-tenant <tenant-slug>");
    }

    const tenantSlug = args[2];

    const tenant = await TenantsService.check(tenantSlug);

    logger.debug(
      `scripts/tenants/check - id: ${tenant.id} | name: ${tenant.name} | active: ${tenant.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/tenants/check - ", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      logger.error("scripts/tenants/check - ", error);
    } else {
      logger.error("scrips/tenants/check - ", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
