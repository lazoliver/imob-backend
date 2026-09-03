import { ValidationError } from "yup";
import { prisma } from "../../database/prisma";
import TenantsService from "../../services/tenants";

void (async () => {
  try {
    const args = process.argv;

    if (args.length != 3) {
      throw new Error("uso: yarn check-tenant <tenant-slug>");
    }

    const tenantSlug = args[2];

    const tenant = await TenantsService.check(tenantSlug);

    console.log(
      `scripts/tenants/check - id: ${tenant.id} | name: ${tenant.name} | active: ${tenant.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("scripts/tenants/check - ", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      console.error("scripts/tenants/check - ", error.message);
    } else {
      console.error("scrips/tenants/check - ", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
