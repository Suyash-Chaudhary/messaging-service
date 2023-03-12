import { ErrorHandler } from "../../common/error.handler";
import { RoleModel } from "../models/role.model";

export class RoleRepository {
  private Role = RoleModel.Model;

  create = async (createModel) => {
    try {
      const record = await this.Role.create(createModel);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to create Role", error);
    }
  };
  search = async (searchModel) => {
    try {
      const records = await this.Role.findAndCountAll(searchModel);
      return records;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to search Roles", error);
    }
  };
  update = async (id: string, updateModel) => {
    try {
      const record = await this.Role.update(updateModel, { where: { id: id } });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to update Role", error);
    }
  };
  destroy = async (id: string) => {
    try {
      const record = await this.Role.destroy({ where: { id: id } });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to destroy Role", error);
    }
  };
  getById = async (id: string) => {
    try {
      const record = await this.Role.findByPk(id);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to find Role", error);
    }
  };
}
