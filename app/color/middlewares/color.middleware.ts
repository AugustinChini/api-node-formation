import { Response } from "express";

export class ColorMiddleware {
  private static instance: ColorMiddleware;

  static getInstance() {
    if (!ColorMiddleware.instance) {
      ColorMiddleware.instance = new ColorMiddleware();
    }
    return ColorMiddleware.instance;
  }
  checkCreateColor(req: any, res: Response, next: any) {
    if (
      req.body &&
      req.body.red &&
      typeof req.body.red === "number" &&
      req.body.red > -1 &&
      req.body.red < 256 &&
      parseInt(req.body.red)
    ) {
      req.isOK = true;
      next();
    } else {
      res.status(401).send("Red is not correctly formated");
    }
  }
}
