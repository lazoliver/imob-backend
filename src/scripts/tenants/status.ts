import { ValidationError } from "yup";
import { prisma } from "../../database/prisma";
import TenantsService from "../../services/tenants";

void (async () => {
  try {
    const args = process.argv;

    if (args.length != 3) {
      throw new Error("uso: yarn status-tenant <tenant-slug>");
    }

    const tenantSlug = args[2];

    const tenant = await TenantsService.status(tenantSlug);

    console.log(
      `scripts/tenants/status - id: ${tenant.id} | name: ${tenant.name} | active: ${tenant.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("scripts/tenants/status - ", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      console.error("scripts/tenants/status - ", error.message);
    } else {
      console.error("scrips/tenants/status - ", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
