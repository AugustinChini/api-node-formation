import express from "express";
import {
  CommonRoutesConfig,
  configureRoutes,
} from "../common/common.routes.config";
import { TodoMiddleware } from "./middlewares/todo.middleware";
import { CommonMiddleware } from "../common/middleware/common.middleware";
import { TodoController } from "./controllers/todo.controller";

export class TodoRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, "TodoRoutes");
    this.configureRoutes();
  }

  configureRoutes() {
    // création des instances
    const todoController = new TodoController();
    const todoMiddleware = TodoMiddleware.getInstance();
    const commonMiddleware = CommonMiddleware.getInstance();

    // création des routes
    this.app.post(
      "/todo",
      todoMiddleware.checkCreateTodo(),
      commonMiddleware.handleValidationError,
      todoController.create
    );

    this.app.get(
      "/todo",
      todoMiddleware.checkReadTodo(),
      commonMiddleware.handleValidationError,
      todoController.readPagination
    );

    this.app.get(
      "/todo/:id",
      todoMiddleware.checkIdParam(),
      commonMiddleware.handleValidationError,
      todoController.readByID
    );

    this.app.put(
      "/todo/:id",
      todoMiddleware.checkIdParam(),
      commonMiddleware.handleValidationError,
      todoController.update
    );

    this.app.delete(
      "/todo/:id",
      todoMiddleware.checkIdParam(),
      commonMiddleware.handleValidationError,
      todoController.delete
    );
  }
}
