import jwt from "jsonwebtoken";
import vars from "../configs/vars";

export default function createToken(
  userId: string,
  tentantId: string,
  role: string,
) {
  const token = jwt.sign({ userId, tentantId, role }, vars.jwt_secret_key, {
    expiresIn: "24h",
  });

  return token;
}
