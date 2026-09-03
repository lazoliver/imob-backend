import express from "express";
import logger from "./configs/logger";

function startServer() {
  const app = express();

  app.listen(4000, () => {
    logger.info(`start_server - http://localhost:4000`);
  });
}

startServer();
