import { IShow, ICast } from "./model";

export interface IRepository {
  initDB: () => Promise<void>;
  importBulkInitAync: (data: Promise<object[]>) => Promise<void>;
  addCastsToShow: (show: IShow, casts: ICast[]) => Promise<void>;
  getAllCastlessAsync: () => Promise<IShow[]>;
  getAllAsync: () => Promise<IShow[]>;
  findByIdAsync: (id: number) => Promise<IShow>;
  getlimitSkipAsync: (limit: number, skip?: number) => Promise<IShow[]>;
}
