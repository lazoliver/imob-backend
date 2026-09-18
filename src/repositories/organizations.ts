import { prisma } from "../database/prisma";
import { OrganizationResponse } from "../interfaces/organizations";

const OrganizationsRepository = {
  check(slug: string): Promise<OrganizationResponse | null> {
    return prisma.organization.findUnique({ where: { slug } });
  },
  create(slug: string, name: string): Promise<OrganizationResponse> {
    return prisma.organization.create({ data: { slug, name } });
  },
  status(slug: string, status: boolean): Promise<OrganizationResponse> {
    return prisma.organization.update({
      where: { slug },
      data: { active: status },
    });
  },
};

export default OrganizationsRepository;
