import { initConfig } from "./init";
import { IDBConfig } from "./interfaces";

export * from "./interfaces";

export const config = initConfig();

export const getDBConfig = () => config.get(`database`) as IDBConfig;
