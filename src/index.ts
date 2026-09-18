import express from "express";
import vars from "./configs/vars";
import logger from "./configs/logs";

function startServer() {
  const app = express();

  app.listen(vars.api_port, () => {
    logger.info(`start_server - http://localhost:${vars.api_port}`);
  });
}

startServer();
