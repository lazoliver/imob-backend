import jwt from "jsonwebtoken";
import vars from "../configs/vars";

export default function createToken(
  userId: string,
  organizationId: string,
  role: string,
) {
  const token = jwt.sign(
    { userId, organizationId, role },
    vars.jwt_secret_key,
    { expiresIn: "24h" },
  );

  return token;
}
