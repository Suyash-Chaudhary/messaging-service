import { DataTypes } from "sequelize";
import * as db from "../database.connector";
const sequelize = db.default.sequelize;

export class RoleModel {
  static ModelName = "Role";
  static TableName = "roles";
  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Privileges: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  };
  static Model = sequelize.define(RoleModel.ModelName, RoleModel.Schema, {
    freezeTableName: true,
    tableName: RoleModel.TableName,
  });
  static associate = (models) => {};
}
