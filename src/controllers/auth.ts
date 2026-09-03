import { Request, Response } from "express";
import AuthService from "../services/auth";
import { LoginBody, LoginParams } from "../routes/auth";

const AuthController = {
  async login(req: Request<LoginParams, unknown, LoginBody>, res: Response) {
    try {
      const { slug } = req.params;
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Credenciais inválidas.");
      }

      const result = await AuthService.login({
        slug,
        email,
        password,
      });

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(422).json({ message: `${error.message}` });
      }

      return res.status(500).json({ message: "internal server error" });
    }
  },
};

export default AuthController;
