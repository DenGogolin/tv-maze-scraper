import express from "express";
import { getPagingRoute, getBaseRouter } from "./routes";
import { IServerConfig } from "../config";
import { IRepository } from "../database/interfaces";

export function runServer(repo: IRepository, config: IServerConfig) {
  const server = express();

  server.use("/", getBaseRouter(repo));
  server.use("/limit", getPagingRoute(repo));

  server.listen(config.port, () => console.log(`App listening on port ${config.port}!`));

  process.on("unhandledRejection", err => {
    console.error(err);
    process.exit(1);
  });
  return server;
}
