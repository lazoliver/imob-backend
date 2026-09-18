export type UserRole = "ADMIN" | "AGENT" | "MANAGER";

export interface UserResponse {
  name: string;
  id: string;
  active: boolean;
  surname: string;
  email: string;
  password: string;
  role: UserRole;
  firstLogon: boolean;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
}
