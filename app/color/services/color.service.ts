import { CRUD } from "../../common/interfaces/crud.interface";
import { ColorDao } from "../daos/color.dao";

export class ColorService implements CRUD {
  private static instance: ColorService;
  color: ColorDao;

  constructor() {
    this.color = ColorDao.getInstance();
  }

  static getInstance(): ColorService {
    if (!ColorService.instance) {
      ColorService.instance = new ColorService();
    }
    return ColorService.instance;
  }

  list(limit: number, page?: number) {
    return this.color.readPagination(limit, page);
  }
  create(resource: any) {
    return this.color.create(resource);
  }
  updateById(resourceId: any) {
    return this.color.update(resourceId);
  }
  readById(resourceId: any) {
    return this.color.readByID(resourceId);
  }
  deleteById(resourceId: any) {
    return this.color.delete(resourceId);
  }
}
