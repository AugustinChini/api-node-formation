import { DataTypes, Model } from "sequelize";
import db from "../../config/database.config";

export interface ColorAttributes {
  id: string;
  name: string;
  displayName: string;
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export class Color extends Model<ColorAttributes> {}

Color.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    red: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    green: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    blue: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    alpha: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "colors",
  }
);
