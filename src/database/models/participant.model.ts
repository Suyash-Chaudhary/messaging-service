import * as db from "../database.connector";
import DataTypes from "sequelize";
import { MembershipModel } from "./membership.model";
import { ConversationModel } from "./conversation.model";
const sequelize = db.default.sequelize;

export class ParticipantModel {
  static ModelName = "Participant";
  static TableName = "participants";
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
  static Model = sequelize.define(
    ParticipantModel.ModelName,
    ParticipantModel.Schema,
    {
      timestamps: true,
      freezeTableName: true,
      createdAt: "CreatedAt",
      updatedAt: "UpdatedAt",
      tableName: ParticipantModel.TableName,
    }
  );
  static associate = (models) => {
    // Participant has many messages.
    models.Participant.hasMany(models.Message, {
      sourceKey: "id",
      foreignKey: "SenderId",
    });
    // Participant belongs to many namespaces.
    models.Participant.belongsToMany(models.Namespace, {
      through: MembershipModel.Model,
      foreignKey: "ParticipantId",
      otherKey: "NamespaceId",
    });
    // Participant belongs to many threads.
    models.Participant.belongsToMany(models.Thread, {
      through: ConversationModel.Model,
      foreignKey: "ParticipantId",
      otherKey: "ThreadId",
    });
  };
}
