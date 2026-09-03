import { defineConfig } from "prisma/config";
import vars from "./src/configs/vars";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: vars.database_url,
  },
});
