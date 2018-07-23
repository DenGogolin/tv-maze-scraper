import Mongoose from "mongoose";
import { IDBConfig } from "../config";
import { IShow, showModel, ICast } from "./model";
import { IRepository } from "./interfaces";

export interface IDatabase {
  showModel: Mongoose.Model<IShow>;
}

export class Repository implements IRepository {
  private _db: IDatabase;
  private _proj = {};
  private _baseRequest = {
    cast: { $exists: true }
  };
  constructor(private config: IDBConfig) {
    this._proj = config.baseProject;
  }

  public async importBulkInitAync(data: Promise<object[]>): Promise<void> {
    await this.db.showModel.remove({});
    await this.db.showModel.collection.insertMany(await data);
  }
  public async addCastsToShow(show: IShow, cast: ICast[]): Promise<void> {
    show.cast = cast;
    await show.save();
  }
  public async getAllCastlessAsync(): Promise<IShow[]> {
    return this.db.showModel.find({ cast: undefined });
  }

  public async getAllAsync(): Promise<IShow[]> {
    return this.db.showModel.find({ ...this._baseRequest }, this._proj);
  }
  public async findByIdAsync(id: number): Promise<IShow> {
    return this.db.showModel.findOne({ id, ...this._baseRequest }, this._proj);
  }
  public async getlimitSkipAsync(
    limit: number,
    skip: number = 0
  ): Promise<IShow[]> {
    return this.db.showModel
      .find({ ...this._baseRequest }, this._proj)
      .limit(limit)
      .skip(skip * limit);
  }

  public async initDB() {
    (Mongoose as any).Promise = Promise;
    try {
      await Mongoose.connect(this.conStr);
    } catch (error) {
      console.error(`Unable to connect to database: ${this.conStr}`);
      throw new Error(error);
    }
    console.info(`Connected to database: ${this.conStr}`);
    this._db = { showModel };
  }

  private get db() {
    if (!this._db) {
      throw new Error(`Database model does not exist.`);
    }
    return this._db;
  }
  private get conStr() {
    return this.config.connectionString;
  }
}
