import { Router } from "express";
import { IRepository } from "../../database/interfaces";

export * from "./paging";

export const getBaseRouter = (repo: IRepository) => {
  const baseRouter = Router();
  baseRouter.get(`/`, async (req, res) => {
    const items = await repo.getAllAsync();
    if (items && items.length) {
      res.send(items);
    } else {
      res.status(404).json({
        code: 404,
        message: "Items not found"
      });
    }
  });
  baseRouter.get(`/:id(\\d+)/`, async (req, res) => {
    const id = Number(req.params.id);
    const item = await repo.findByIdAsync(id);
    if (item) {
      res.send(item);
    } else {
      res.status(404).json({
        code: 404,
        message: `Item #${id} not found`
      });
    }
  });
  return baseRouter;
};
