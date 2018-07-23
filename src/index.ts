import { IRepository } from "./database/interfaces";
import { getDBConfig } from "./config";
import { Repository } from "./database";
import { Scraper } from "./scraper";
import { getScraperConfig } from "./config/scraper";
import { IScraper } from "./scraper/interfaces";
import { runServer } from "./server";

const _repository = new Repository(getDBConfig());
const _scraper = new Scraper(_repository, getScraperConfig());

startAsync(_repository, _scraper);

async function startAsync(repo: IRepository, scraper: IScraper) {
  await repo.initDB();
  runServer(repo);
  scraper.getDataAsync();
}
