import { Router } from "express";
import authRoutes from "./auth";

const router = Router({ mergeParams: true });

router.use("/users", authRoutes);

export default router;
