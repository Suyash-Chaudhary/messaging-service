import * as db from "../database.connector";
import DataTypes from "sequelize";
import { ParticipantModel } from "./participant.model";
import { ThreadModel } from "./thread.model";
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
    ParticipantId: {
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
          fields: ["ParticipantId", "ThreadId"],
        },
      ],
    }
  );
  static associate = (models) => {
    // Conversation belongs to a user.
    models.Conversation.belongsTo(models.Participant, {
      sourceKey: "ParticipantId",
      name: ParticipantModel.Model,
      targetKey: "id",
    });
    // Conversation belongs to a thread.
    models.Conversation.belongsTo(models.Thread, {
      sourceKey: "ThreadId",
      name: ThreadModel.Model,
      targetKey: "id",
    });
  };
}
