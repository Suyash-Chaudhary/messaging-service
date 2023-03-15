import { ErrorHandler } from "../../common/error.handler";
import { ParticipantModel } from "../models/participant.model";

export class ParticipantRepository {
  private Participant = ParticipantModel.Model;

  create = async (createModel) => {
    try {
      const record = await this.Participant.create(createModel);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to create Participant", error);
    }
  };
  search = async (searchModel) => {
    try {
      const records = await this.Participant.findAndCountAll(searchModel);
      return records;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to search Participants", error);
    }
  };
  update = async (id: string, updateModel) => {
    try {
      const record = await this.Participant.update(updateModel, {
        where: { id: id },
      });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to update Participant", error);
    }
  };
  destroy = async (id: string) => {
    try {
      const record = await this.Participant.destroy({ where: { id: id } });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to destroy Participant", error);
    }
  };
  getById = async (id: string) => {
    try {
      const record = await this.Participant.findByPk(id);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to find Participant", error);
    }
  };
}
