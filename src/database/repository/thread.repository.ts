import { ErrorHandler } from "../../common/error.handler";
import { ThreadModel } from "../models/thread.model";

export class ThreadRepository {
  private Thread = ThreadModel.Model;

  create = async (createModel) => {
    try {
      const record = await this.Thread.create(createModel);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to create Thread", error);
    }
  };
  search = async (searchModel) => {
    try {
      const records = await this.Thread.findAndCountAll(searchModel);
      return records;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to search Threads", error);
    }
  };
  update = async (id: string, updateModel) => {
    try {
      const record = await this.Thread.update(updateModel, {
        where: { id: id },
      });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to update Thread", error);
    }
  };
  destroy = async (id: string) => {
    try {
      const record = await this.Thread.destroy({ where: { id: id } });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to destroy Thread", error);
    }
  };
  getById = async (id: string) => {
    try {
      const record = await this.Thread.findByPk(id);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to find Thread", error);
    }
  };
}
