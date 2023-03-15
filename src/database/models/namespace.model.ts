import * as db from "../database.connector";
import DataTypes from "sequelize";
import { MembershipModel } from "./membership.model";
const sequelize = db.default.sequelize;

export class NamespaceModel {
  static ModelName = "Namespace";
  static TableName = "namespaces";
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
    CreatedAt: DataTypes.DATE,
    UpdatedAt: DataTypes.DATE,
  };
  static Model = sequelize.define(
    NamespaceModel.ModelName,
    NamespaceModel.Schema,
    {
      timestamps: true,
      freezeTableName: true,
      createdAt: "CreatedAt",
      updatedAt: "UpdatedAt",
      tableName: NamespaceModel.TableName,
    }
  );
  static associate = (models) => {
    // Namespace has many threads.
    models.Namespace.hasMany(models.Thread, {
      sourceKey: "id",
      foreignKey: "NamespaceId",
    });

    // Namespace belongs to many users.
    models.Namespace.belongsToMany(models.Participant, {
      through: MembershipModel.Model,
      foreignKey: "NamespaceId",
      otherKey: "ParticipantId",
    });
  };
}
