import express from "express";
import logger from "./configs/logger";
import router from "./routes/router";

function startServer() {
  const app = express();

  app.use(express.json());
  app.use("/api/:slug", router);

  app.listen(4000, () => {
    logger.info(`start_server - http://localhost:4000`);
  });
}

startServer();
