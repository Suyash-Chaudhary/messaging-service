import * as db from "../database.connector";
import DataTypes from "sequelize";
import { ParticipantModel } from "./participant.model";
import { NamespaceModel } from "./namespace.model";
import { RoleModel } from "./role.model";
const sequelize = db.default.sequelize;

export class MembershipModel {
  static ModelName = "Membership";
  static TableName = "memberships";
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
    NamespaceId: {
      type: DataTypes.UUID,
      foreignKey: true,
      allowNull: false,
      unique: false,
    },
    RoleId: {
      type: DataTypes.UUID,
      foreignKey: true,
      allowNull: false,
      unique: false,
    },
    CreatedAt: DataTypes.DATE,
    UpdatedAt: DataTypes.DATE,
  };
  static Model = sequelize.define(
    MembershipModel.ModelName,
    MembershipModel.Schema,
    {
      timestamps: true,
      freezeTableName: true,
      createdAt: "CreatedAt",
      updatedAt: "UpdatedAt",
      tableName: MembershipModel.TableName,
      indexes: [
        {
          unique: true,
          fields: ["ParticipantId", "NamespaceId"],
        },
      ],
    }
  );
  static associate = (models) => {
    // Membership belongs to a user.
    models.Membership.belongsTo(models.Participant, {
      sourceKey: "ParticipantId",
      name: ParticipantModel.Model,
      targetKey: "id",
    });
    // Membership belongs to a namespace.
    models.Membership.belongsTo(models.Namespace, {
      sourceKey: "NamespaceId",
      name: NamespaceModel.Model,
      targetKey: "id",
    });
    // Membership belongs to a role.
    models.Membership.belongsTo(models.Role, {
      sourceKey: "RoleId",
      name: RoleModel.Model,
      targetKey: "id",
    });
  };
}
