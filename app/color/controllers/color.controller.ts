import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ColorService } from "../services/color.service";

export class ColorController {
  async create(req: Request, res: Response) {
    const id = uuidv4();
    const colorService = ColorService.getInstance();
    try {
      const newColor = {
        id: id,
        name: req.body.name,
        displayName: req.body.displayName,
        red: req.body.red,
        green: req.body.green,
        blue: req.body.blue,
        alpha: req.body.alpha,
      };
      const record = await colorService.create(newColor);
      return res.json({ record, msg: "Successfully create color" });
    } catch (e) {
      return res.status(500).send("Impossible to create color");
    }
  }

  async readPagination(req: Request, res: Response) {
    try {
      const colorService = ColorService.getInstance();
      const limit = (req.query.limit as number | undefined) || 10;
      const offset = req.query.offset as number | undefined;

      const records = await colorService.list(limit, offset);
      return res.json(records);
    } catch (e) {
      return res.json({ msg: "fail to read", status: 500, route: "/read" });
    }
  }

  async readByID(req: Request, res: Response) {
    try {
      const colorService = ColorService.getInstance();
      const id = req.params.id;
      const record = await colorService.readById(id);
      return res.json(record);
    } catch (e) {
      return res.json({ msg: "fail to read", status: 500, route: "/read/:id" });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const colorService = ColorService.getInstance();
      const updatedColor = req.body;
      const updatedRecord = await colorService.updateById(updatedColor);
      return res.json({ record: updatedRecord });
    } catch (e) {
      return res.json({
        msg: "fail to read",
        status: 500,
        route: "/update/:id",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const colorService = ColorService.getInstance();
      const id = req.params.id;

      const deletedRecord = colorService.deleteById(id);

      return res.json({ record: deletedRecord });
    } catch (e) {
      return res.json({
        msg: "fail to read",
        status: 500,
        route: "/delete/:id",
      });
    }
  }
}
