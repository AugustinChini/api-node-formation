import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export class CommonMiddleware {
  private static instance: CommonMiddleware;

  static getInstance() {
    if (!CommonMiddleware.instance) {
      CommonMiddleware.instance = new CommonMiddleware();
    }
    return CommonMiddleware.instance;
  }

  handleValidationError(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json(error.array()[0]);
    }
    next();
  }
}
