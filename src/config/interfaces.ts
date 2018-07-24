interface IDict {
  [T: string]: number;
}

export interface IDBConfig {
  connectionString: string;
  pathToJson: string;
  baseProject: IDict;
}

export interface IServerConfig {
  port: number;
}

export interface IScraperConfig {
  baseApiUrl: string;
  showApiRoute: string;
  castApiRoute: string;
  coolDownTime: number;
  attemptNumber: number;
  requestsPerTime: number;
  apiErrorCode: number;
}

export interface ILoggerConfig {
  pathToFile: string;
}

export interface IConfig {
  dbSettings: IDBConfig;
  serverSettings: IServerConfig;
  scraperSettings: IScraperConfig;
  loggerSettings: ILoggerConfig;
}
