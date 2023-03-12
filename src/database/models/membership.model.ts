import * as db from "../database.connector";
import DataTypes from "sequelize";
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
    UserId: {
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
          fields: ["UserId", "NamespaceId"],
        },
      ],
    }
  );
  static associate = (models) => {
    // Membership belongs to a user.
    models.Membership.belongsTo(models.User, {
      sourceKey: "UserId",
      name: "User",
      targetKey: "id",
    });
    // Membership belongs to a namespace.
    models.Membership.belongsTo(models.Namespace, {
      sourceKey: "NamespaceId",
      name: "Namespace",
      targetKey: "id",
    });
    // Membership belongs to a role.
    models.Membership.belongsTo(models.Role, {
      sourceKey: "RoleId",
      name: "Role",
      targetKey: "id",
    });
  };
}
