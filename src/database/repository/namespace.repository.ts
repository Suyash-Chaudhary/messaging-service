import { ErrorHandler } from "../../common/error.handler";
import { NamespaceModel } from "../models/namespace.model";

export class NamespaceRepository {
  private Namespace = NamespaceModel.Model;

  create = async (createModel) => {
    try {
      const record = await this.Namespace.create(createModel);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to create Namespace", error);
    }
  };
  search = async (searchModel) => {
    try {
      const records = await this.Namespace.findAndCountAll(searchModel);
      return records;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to search Namespaces", error);
    }
  };
  update = async (id: string, updateModel) => {
    try {
      const record = await this.Namespace.update(updateModel, {
        where: { id: id },
      });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to update Namespace", error);
    }
  };
  destroy = async (id: string) => {
    try {
      const record = await this.Namespace.destroy({ where: { id: id } });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to destroy Namespace", error);
    }
  };
  getById = async (id: string) => {
    try {
      const record = await this.Namespace.findByPk(id);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to find Namespace", error);
    }
  };
}
