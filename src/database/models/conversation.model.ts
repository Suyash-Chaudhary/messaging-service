import * as db from "../database.connector";
import DataTypes from "sequelize";
const sequelize = db.default.sequelize;

export class ConversationModel {
  static ModelName = "Conversation";
  static TableName = "conversations";
  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
      foreignKey: true,
      allowNull: false,
      unique: false,
    },
    ThreadId: {
      type: DataTypes.UUID,
      foreignKey: true,
      allowNull: false,
      unique: false,
    },
    CreatedAt: DataTypes.DATE,
    UpdatedAt: DataTypes.DATE,
  };
  static Model = sequelize.define(
    ConversationModel.ModelName,
    ConversationModel.Schema,
    {
      timestamps: true,
      freezeTableName: true,
      createdAt: "CreatedAt",
      updatedAt: "UpdatedAt",
      tableName: ConversationModel.TableName,
      indexes: [
        {
          unique: true,
          fields: ["UserId", "ThreadId"],
        },
      ],
    }
  );
  static associate = (models) => {
    // Conversation belongs to a user.
    models.Conversation.belongsTo(models.User, {
      sourceKey: "UserId",
      name: "User",
      targetKey: "id",
    });
    // Conversation belongs to a thread.
    models.Conversation.belongsTo(models.Thread, {
      sourceKey: "ThreadId",
      name: "Thread",
      targetKey: "id",
    });
  };
}
