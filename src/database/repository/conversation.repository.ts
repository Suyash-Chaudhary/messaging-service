import { ErrorHandler } from "../../common/error.handler";
import { ConversationModel } from "../models/conversation.model";

export class ConversationRepository {
  private Conversation = ConversationModel.Model;

  create = async (createModel) => {
    try {
      const record = await this.Conversation.create(createModel);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to create Conversation", error);
    }
  };
  search = async (searchModel) => {
    try {
      const records = await this.Conversation.findAndCountAll(searchModel);
      return records;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to search Conversations", error);
    }
  };
  update = async (id: string, updateModel) => {
    try {
      const record = await this.Conversation.update(updateModel, {
        where: { id: id },
      });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to update Conversation", error);
    }
  };
  destroy = async (id: string) => {
    try {
      const record = await this.Conversation.destroy({ where: { id: id } });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to destroy Conversation", error);
    }
  };
  getById = async (id: string) => {
    try {
      const record = await this.Conversation.findByPk(id);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to find Conversation", error);
    }
  };
}
