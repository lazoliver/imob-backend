import { Router, Request, Response } from "express";
import AuthController from "../controllers/auth";
import validateToken from "../middlewares/validate-token";

export interface LoginParams {
  slug: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

const router = Router({ mergeParams: true });

router.post(
  "/login",
  async (req: Request<LoginParams, unknown, LoginBody>, res: Response) =>
    await AuthController.login(req, res),
);
router.get("", validateToken, (_req: Request, res: Response) =>
  res.status(200).json({ status: "pass" }),
);

export default router;
