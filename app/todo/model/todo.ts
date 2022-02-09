import { DataTypes, Model } from "sequelize";
import db from "../../config/database.config";

export interface TodoAttributes {
  id: string;
  title: string;
  completed: boolean;
  color: string;
}

export class Todo extends Model<TodoAttributes> {}

Todo.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    color: {
      type: DataTypes.UUIDV4,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "todos",
  }
);
