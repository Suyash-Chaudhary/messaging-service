import * as db from "../database.connector";
import DataTypes from "sequelize";
import { ConversationModel } from "./conversation.model";
const sequelize = db.default.sequelize;

export class ThreadModel {
  static ModelName = "Thread";
  static TableName = "threads";
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
    NamespaceId: {
      type: DataTypes.UUID,
      foreignKey: true,
      unique: false,
      allowNull: false,
    },
    CreatedAt: DataTypes.DATE,
    UpdatedAt: DataTypes.DATE,
  };
  static Model = sequelize.define(ThreadModel.ModelName, ThreadModel.Schema, {
    timestamps: true,
    freezeTableName: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    tableName: ThreadModel.TableName,
    indexes: [
      {
        unique: true,
        fields: ["Name", "NamespaceId"],
      },
    ],
  });
  static associate = (models) => {
    // Thread belongs to a namespace.
    models.Thread.belongsTo(models.Namespace, {
      sourceKey: "NamespaceId",
      name: "Namespace",
      targetKey: "id",
    });

    // Thread belongs to many users.
    models.Thread.belongsToMany(models.User, {
      through: ConversationModel.Model,
      foreignKey: "ThreadId",
      otherKey: "UserId",
    });

    // Thread has many messages.
    models.Thread.hasMany(models.Message, {
      sourceKey: "id",
      foreignKey: "ThreadId",
    });
  };
}
