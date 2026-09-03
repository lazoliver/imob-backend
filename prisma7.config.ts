import { defineConfig } from "prisma/config";
import vars from "./src/config/vars";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: vars.database_url,
  },
});
