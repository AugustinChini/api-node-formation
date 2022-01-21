import { v4 as uuidv4 } from "uuid";
import { Todo } from "../model/todo";

interface TodoAttributes {
  id: string;
  title: string;
  completed: boolean;
}

export class TodoDao {
  private static instance: TodoDao;
  public static getInstance() {
    if (!this.instance) {
      this.instance = new TodoDao();
    }
    return this.instance;
  }

  async create(attr: TodoAttributes) {
    const id = uuidv4();
    return Todo.create({ ...attr, id });
  }

  async readPagination(limit: number, page?: number) {
    return Todo.findAll({ where: {}, limit, offset: page });
  }

  async readByID(id: string) {
    return Todo.findOne({ where: { id } });
  }

  async update(id: number) {
    const record = await Todo.findOne({ where: { id } });

    if (!record) {
      throw Error("Can not find existing record");
    }

    return record.update({
      completed: !record.getDataValue("completed"),
    });
  }

  async delete(id: number) {
    const record = await Todo.findOne({ where: { id } });

    if (!record) {
      throw Error("Can not find existing record");
    }

    return record.destroy();
  }
}
