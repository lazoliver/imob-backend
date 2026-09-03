import express from "express";

function startServer() {
  const app = express();

  app.listen(4000, () => {
    console.log(`start_server - http://localhost:4000`);
  });
}

startServer();
