import express from "express";
import {
  CommonRoutesConfig,
  configureRoutes,
} from "../common/common.routes.config";
import { CommonMiddleware } from "../common/middleware/common.middleware";
import { ColorController } from "./controllers/color.controller";
import { ColorMiddleware } from "./middlewares/color.middleware";

export class ColorRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, "ColorRoutes");
    this.configureRoutes();
  }

  configureRoutes() {
    // création des instances
    const colorController = new ColorController();
    const commonMiddleware = CommonMiddleware.getInstance();
    const colorMiddleware = ColorMiddleware.getInstance();

    // création des routes
    this.app.post(
      "/color",
      commonMiddleware.handleValidationError,
      colorMiddleware.checkCreateColor,
      colorController.create
    );

    this.app.get(
      "/color",
      commonMiddleware.handleValidationError,
      colorController.readPagination
    );

    this.app.get(
      "/color/:id",
      commonMiddleware.handleValidationError,
      colorController.readByID
    );

    this.app.put(
      "/color/:id",
      commonMiddleware.handleValidationError,
      colorController.update
    );

    this.app.delete(
      "/color/:id",
      commonMiddleware.handleValidationError,
      colorController.delete
    );
  }
}
