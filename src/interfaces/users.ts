export type UserRole = "ADMIN" | "AGENT" | "MANAGER";

export interface NewUserRequest {
  email: string;
  name: string;
  surname: string;
  orgName: string;
  password: string;
  confirmPassword?: string;
}

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
  tenantId: string;
}
