import express from "express";
import { getPagingRoute, getBaseRouter } from "./routes";
import { config } from "../config";
import { IRepository } from "../database/interfaces";

export function runServer(repo: IRepository) {
  const server = express();
  const port = config.get(`server:port`);

  server.use("/", getBaseRouter(repo));
  server.use("/limit", getPagingRoute(repo));

  server.listen(port, () => console.log(`App listening on port ${port}!`));

  process.on("unhandledRejection", err => {
    console.error(err);
    process.exit(1);
  });
  return server;
}
