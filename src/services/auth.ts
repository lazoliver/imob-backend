import { LoginRequest, LoginResponse } from "../interfaces/auth";
import createToken from "../middlewares/create-token";
import { loginUserSchema } from "../validations/users";
import UsersService from "./users";
import bcrypt from "bcrypt";

const AuthService = {
  async login(userData: LoginRequest): Promise<LoginResponse> {
    const { slug, email, password } = await loginUserSchema.validate(userData, {
      abortEarly: false,
    });

    const userExists = await UsersService.check(slug, email);

    const passwordMatches = await bcrypt.compare(password, userExists.password);

    if (!passwordMatches) {
      throw new Error("Credenciais inválidas.");
    }

    const token = createToken(
      userExists.id,
      userExists.tenantId,
      userExists.role,
    );

    return {
      token,
      user: {
        id: userExists.id,
        name: userExists.name,
        surname: userExists.surname,
        email: userExists.email,
        role: userExists.role,
        tenantId: userExists.tenantId,
      },
    };
  },
};

export default AuthService;
