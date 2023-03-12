import { ErrorHandler } from "../../common/error.handler";
import { MessageModel } from "../models/message.model";

export class MessageRepository {
  private Message = MessageModel.Model;

  create = async (createModel) => {
    try {
      const record = await this.Message.create(createModel);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to create Message", error);
    }
  };
  search = async (searchModel) => {
    try {
      const records = await this.Message.findAndCountAll(searchModel);
      return records;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to search Messages", error);
    }
  };
  update = async (id: string, updateModel) => {
    try {
      const record = await this.Message.update(updateModel, {
        where: { id: id },
      });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to update Message", error);
    }
  };
  destroy = async (id: string) => {
    try {
      const record = await this.Message.destroy({ where: { id: id } });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to destroy Message", error);
    }
  };
  getById = async (id: string) => {
    try {
      const record = await this.Message.findByPk(id);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to find Message", error);
    }
  };
}
