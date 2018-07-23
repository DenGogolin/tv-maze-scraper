import { IRepository } from "../database/interfaces";
import { IScraperConfig } from "../config";

export interface IScraper {
  getDataAsync: () => Promise<void>;
}
