import { ValidationError } from "yup";
import { prisma } from "../../database/prisma";
import TenantsService from "../../services/tenants";
import logger from "../../configs/logger";

void (async () => {
  try {
    const args = process.argv;

    if (args.length != 4) {
      throw new Error("uso: yarn create-tenant <tenant-slug> <tenant-name>");
    }

    const tenantSlug = args[2];
    const tenantName = args[3];

    const tenant = await TenantsService.create(tenantSlug, tenantName);

    logger.debug(
      `scripts/tenants/create - id: ${tenant.id} | name: ${tenant.name} | active: ${tenant.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/tenants/create - ", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      logger.error("scripts/tenants/create - ", error);
    } else {
      logger.error("scrips/tenants/create - ", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
