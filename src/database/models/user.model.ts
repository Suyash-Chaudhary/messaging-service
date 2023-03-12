import * as db from "../database.connector";
import DataTypes from "sequelize";
import { MembershipModel } from "./membership.model";
import { ConversationModel } from "./conversation.model";
const sequelize = db.default.sequelize;

export class UserModel {
  static ModelName = "User";
  static TableName = "users";
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
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    CreatedAt: DataTypes.DATE,
    UpdatedAt: DataTypes.DATE,
  };
  static Model = sequelize.define(UserModel.ModelName, UserModel.Schema, {
    timestamps: true,
    freezeTableName: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    tableName: UserModel.TableName,
  });
  static associate = (models) => {
    // User has many messages.
    models.User.hasMany(models.Message, {
      sourceKey: "id",
      foreignKey: "SenderId",
    });
    // User belongs to many namespaces.
    models.User.belongsToMany(models.Namespace, {
      through: MembershipModel.Model,
      foreignKey: "UserId",
      otherKey: "NamespaceId",
    });
    // User belongs to many threads.
    models.User.belongsToMany(models.Thread, {
      through: ConversationModel.Model,
      foreignKey: "UserId",
      otherKey: "ThreadId",
    });
  };
}
