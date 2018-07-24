import { IScraper } from "./interfaces";
import { IRepository } from "../database/interfaces";
import { IShow, ICast } from "../database/model";
import { getAsync, coolDown } from "../utils/promisified";
import { IScraperConfig } from "../config";
import * as _ from "lodash";
import { resolve } from "url";

export * from "./interfaces";

export class Scraper implements IScraper {
  constructor(private repo: IRepository, private config: IScraperConfig) {}

  public async getDataAsync() {
    await this.getInitialData();
    console.info(`Cast data uploading has started`);
    this.initCastLoading();
  }

  private async getInitialData() {
    await this.repo.importBulkInitAync(this.getShowCollection());
  }

  private async initCastLoading() {
    const items = await this.repo.getAllCastlessAsync();
    if (items.length > 0) {
      const result = await Promise.all(_.chain(items)
          .take(this.config.requestsPerTime)
          .map(x => this.addCastsToShow(x))
          .value());
      if (_.some(result, false)) {
        console.log(
          `Scraper exceeded API call limitation. Cooldown is required.`
        );
        await coolDown(this.config.coolDownTime);
      }
      await this.initCastLoading();
    } else {
      console.info(`Cast data is uploaded.`);
    }
  }

  private async addCastsToShow(item: IShow): Promise<boolean> {
    try {
      const casts = JSON.parse(await getAsync(this.getCastURL(item.id)));
      await this.repo.addCastsToShow(item, _.chain(casts)
        .map(x => _.pick(x.person, ["id", "name", "birthday"]))
        .orderBy(["birthday"], ["desc"])
        .value() as ICast[]);
    } catch (error) {
      return false;
    }
    return true;
  }

  private getCastURL(id: number) {
    return resolve(`${this.showURL}/`, `${id}/${this.config.castApiRoute}`);
  }
  private get showURL(): string {
    return resolve(this.config.baseApiUrl, this.config.showApiRoute);
  }

  private async getShowCollection() {
    return _.map(JSON.parse(await getAsync(this.showURL)), x => ({
      id: x.id,
      name: x.name
    })) as IShow[];
  }
}
