import { TenantResponse } from "../interfaces/tenants";
import TenantsRepository from "../repositories/tenants";
import { checkTenantSchema, createTenantSchema } from "../validations/tentants";

const TenantsService = {
  async check(slug: string): Promise<TenantResponse> {
    const validatedData = await checkTenantSchema.validate(
      { slug },
      { abortEarly: false },
    );

    const tenant = await TenantsRepository.check(validatedData.slug);

    if (!tenant) {
      throw new Error("Organização não cadastrada.");
    }

    return tenant;
  },
  async create(slug: string, name: string): Promise<TenantResponse> {
    const validatedData = await createTenantSchema.validate(
      { slug, name },
      { abortEarly: false },
    );

    const tenantExists = await TenantsRepository.check(validatedData.slug);

    if (tenantExists) {
      throw new Error("Organização já cadastrada.");
    }

    return await TenantsRepository.create(
      validatedData.slug,
      validatedData.name,
    );
  },
  async status(slug: string): Promise<TenantResponse> {
    const validatedData = await checkTenantSchema.validate(
      { slug },
      { abortEarly: false },
    );

    const tenant = await TenantsRepository.check(validatedData.slug);

    if (!tenant) {
      throw new Error("Organização não cadastrada.");
    }

    return await TenantsRepository.status(validatedData.slug, !tenant.active);
  },
};

export default TenantsService;
