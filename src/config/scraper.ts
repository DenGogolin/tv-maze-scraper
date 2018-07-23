import { config, IScraperConfig } from ".";

export const getScraperConfig = () => config.get(`scraper`) as IScraperConfig;
