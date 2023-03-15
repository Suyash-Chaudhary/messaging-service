import * as db from "../database.connector";
import DataTypes from "sequelize";
import { ParticipantModel } from "./participant.model";
import { ThreadModel } from "./thread.model";
const sequelize = db.default.sequelize;

export class MessageModel {
  static ModelName = "Message";
  static TableName = "messages";
  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ThreadId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      unique: false,
    },
    SenderId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      unique: false,
    },
    Payload: {
      type: DataTypes.JSONB,
      defaultValue: {},
      allowNull: false,
    },
    CreatedAt: DataTypes.DATE,
    UpdatedAt: DataTypes.DATE,
  };
  static Model = sequelize.define(MessageModel.ModelName, MessageModel.Schema, {
    timestamps: true,
    freezeTableName: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    tableName: MessageModel.TableName,
  });
  static associate = (models) => {
    // Message belongs to a sender.
    models.Message.belongsTo(models.Participant, {
      sourceKey: "SenderId",
      name: ParticipantModel.Model,
      targetKey: "id",
    });
    // Message belongs to a thread.
    models.Message.belongsTo(models.Thread, {
      sourceKey: "ThreadId",
      name: ThreadModel.Model,
      targetKey: "id",
    });
  };
}
