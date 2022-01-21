import { CRUD } from "../../common/interfaces/crud.interface";
import { TodoDao } from "../daos/todo.dao";
export class TodoService implements CRUD {
  private static instance: TodoService;
  todo: TodoDao;

  constructor() {
    this.todo = TodoDao.getInstance();
  }

  static getInstance(): TodoService {
    if (!TodoService.instance) {
      TodoService.instance = new TodoService();
    }
    return TodoService.instance;
  }

  list(limit: number, page?: number) {
    return this.todo.readPagination(limit, page);
  }
  create(resource: any) {
    return this.todo.create(resource);
  }
  updateById(resourceId: any) {
    return this.todo.update(resourceId);
  }
  readById(resourceId: any) {
    return this.todo.readByID(resourceId);
  }
  deleteById(resourceId: any) {
    return this.todo.delete(resourceId);
  }
}
