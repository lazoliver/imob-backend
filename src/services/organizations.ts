import { OrganizationResponse } from "../interfaces/organizations";
import OrganizationsRepository from "../repositories/organizations";
import { checkOrgSchema, createOrgSchema } from "../validations/organizations";

const OrganizationsService = {
  async check(slug: string): Promise<OrganizationResponse | null> {
    const validatedData = await checkOrgSchema.validate(
      { slug },
      { abortEarly: false },
    );

    const orgExists = await OrganizationsRepository.check(validatedData.slug);

    if (!orgExists) {
      return null;
    }

    return orgExists;
  },
  async create(slug: string, name: string): Promise<OrganizationResponse> {
    const validatedData = await createOrgSchema.validate(
      { slug, name },
      { abortEarly: false },
    );

    const orgExists = await this.check(validatedData.slug);

    if (orgExists) {
      throw new Error(`Org ${validatedData.slug} is already in use.`);
    }

    return await OrganizationsRepository.create(
      validatedData.slug,
      validatedData.name,
    );
  },
  async status(slug: string): Promise<OrganizationResponse> {
    const validatedData = await checkOrgSchema.validate(
      { slug },
      { abortEarly: false },
    );

    const orgExists = await this.check(validatedData.slug);

    if (!orgExists) {
      throw new Error(`Org ${validatedData.slug} is not registered.`);
    }

    return await OrganizationsRepository.status(
      validatedData.slug,
      !orgExists.active,
    );
  },
};

export default OrganizationsService;
