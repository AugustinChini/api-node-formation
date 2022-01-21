import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { TodoService } from "../services/todo.service";

export class TodoController {
  async create(req: Request, res: Response) {
    const id = uuidv4();
    const todoService = TodoService.getInstance();
    try {
      const record = await todoService.create({ ...req.body, id });
      return res.json({ record, msg: "Successfully create todo" });
    } catch (e) {
      return res.json({ msg: "fail to create", status: 500, route: "/create" });
    }
  }

  async readPagination(req: Request, res: Response) {
    try {
      const todoService = TodoService.getInstance();
      const limit = (req.query.limit as number | undefined) || 10;
      const offset = req.query.offset as number | undefined;

      const records = await todoService.list(limit, offset);
      return res.json(records);
    } catch (e) {
      return res.json({ msg: "fail to read", status: 500, route: "/read" });
    }
  }
  async readByID(req: Request, res: Response) {
    try {
      const todoService = TodoService.getInstance();
      const { id } = req.params;
      const record = await todoService.readById(id);
      return res.json(record);
    } catch (e) {
      return res.json({ msg: "fail to read", status: 500, route: "/read/:id" });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const todoService = TodoService.getInstance();
      const { id } = req.params;
      const updatedRecord = await todoService.updateById(id);
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
      const todoService = TodoService.getInstance();
      const { id } = req.params;

      const deletedRecord = todoService.deleteById(id);

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
