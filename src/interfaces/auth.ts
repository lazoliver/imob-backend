import { UserRole } from "./users";

export interface LoginRequest {
  slug: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: UserRole;
    tenantId: string;
  };
}
