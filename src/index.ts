import { IRepository, Repository } from "./database";
import { IScraper, Scraper } from "./scraper";
import { runServer } from "./server";
import { Config, IConfig } from "./config";

async function startAsync(repo: IRepository, scraper: IScraper, config: IConfig) {
  await repo.initDB();
  runServer(repo, config.serverSettings);
  scraper.getDataAsync();
}

const _config = new Config();
const _repository = new Repository(_config.dbSettings);
const _scraper = new Scraper(_repository, _config.scraperSettings);

startAsync(_repository, _scraper, _config);
