import { configDotenv } from "dotenv";

interface EnvVariables {
  api_port: string;
  release_mode: string;
  logfile: string | null;
  database_url: string;
  jwt_secret_key: string;
  default_password: string;
}

const dotenv = configDotenv();

if (dotenv.error) {
  throw new Error("Couldn't find .env file");
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY environment variable is not defined");
}

if (!process.env.DEFAULT_PASSWORD) {
  throw new Error("DEFAULT_PASSWORD environment variable is not defined");
}

const vars: EnvVariables = {
  api_port: process.env.API_PORT || "4001",
  release_mode: process.env.RELEASE_MODE || "dev",
  logfile: process.env.LOGFILE || null,
  database_url: process.env.DATABASE_URL,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  default_password: process.env.DEFAULT_PASSWORD,
};

export default vars;
