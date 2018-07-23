import { Router } from "express";
import { IRepository } from "../../database/interfaces";

export const getPagingRoute = (repo: IRepository) => {
  const paging = Router();
  paging.get("/:l(\\d+)/", async (req, res) => {
    const l = Number(req.params.l);
    const items = await repo.getlimitSkipAsync(l);
    if (items && items.length) {
      res.send(items);
    } else {
      res.status(404).json({
        code: 404,
        message: "Items not found"
      });
    }
  });

  paging.get("/:l(\\d+)/skip/:s(\\d+)/", async (req, res) => {
    const l = Number(req.params.l);
    const s = Number(req.params.s);
    const items = await repo.getlimitSkipAsync(l, s);
    if (items && items.length) {
      res.send(items);
    } else {
      res.status(404).json({
        code: 404,
        message: "Items not found"
      });
    }
  });
  return paging;
};
