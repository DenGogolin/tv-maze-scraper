import {
  IConfig,
  IDBConfig,
  IServerConfig,
  IScraperConfig,
  ILoggerConfig
} from "./interfaces";
import * as nconf from "nconf";
import { join } from "path";
export * from "./interfaces";

export class Config implements IConfig {
  private _config: nconf.Provider;
  constructor() {
    this._config = new nconf.Provider({
      env: true,
      argv: true
    });
    const basePats = join(process.cwd(), `/config`);
    const env = this._config.get(`NODE_ENV`) || `development`;
    this._config.file(env, join(basePats, `${env.toLowerCase()}.json`));
    this._config.file(`default`, join(basePats, `./default.json`));
  }
  public get dbSettings(): IDBConfig {
    return this._config.get(`database`);
  }
  public get serverSettings(): IServerConfig {
    return this._config.get(`server`);
  }
  public get scraperSettings(): IScraperConfig {
    return this._config.get(`scraper`);
  }
  public get loggerSettings(): ILoggerConfig {
    return this._config.get(`logger`);
  }
}
