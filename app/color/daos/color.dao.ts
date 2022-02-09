import { v4 as uuidv4 } from "uuid";
import { Color, ColorAttributes } from "../model/color";

export class ColorDao {
  private static instance: ColorDao;
  public static getInstance() {
    if (!this.instance) {
      this.instance = new ColorDao();
    }
    return this.instance;
  }

  async create(attr: ColorAttributes) {
    const id = uuidv4();
    return Color.create({ ...attr, id });
  }

  async readPagination(limit: number, page?: number) {
    return Color.findAll({ where: {}, limit, offset: page });
  }

  async readByID(id: string) {
    return Color.findOne({ where: { id } });
  }

  async update(attr: any) {
    const record: any = await this.readByID(attr.id);

    if (record) {
      for (const key in attr) {
        record[key] = attr[key];
      }

      record.update(record);
    }

    return record;
  }

  async delete(id: string) {
    const record = await Color.findOne({ where: { id } });

    if (!record) {
      throw Error("Can not find existing record");
    }

    return record.destroy();
  }
}
