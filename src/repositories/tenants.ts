import { prisma } from "../database/prisma";
import { TenantResponse } from "../interfaces/tenants";

const TenantsRepository = {
  check(slug: string): Promise<TenantResponse | null> {
    return prisma.tenant.findUnique({ where: { slug } });
  },
  create(slug: string, name: string): Promise<TenantResponse> {
    return prisma.tenant.create({ data: { slug, name } });
  },
  status(slug: string, status: boolean): Promise<TenantResponse> {
    return prisma.tenant.update({ where: { slug }, data: { active: status } });
  },
};

export default TenantsRepository;
