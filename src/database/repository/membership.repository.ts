import { ErrorHandler } from "../../common/error.handler";
import { MembershipModel } from "../models/membership.model";

export class MembershipRepository {
  private Membership = MembershipModel.Model;

  create = async (createModel) => {
    try {
      const record = await this.Membership.create(createModel);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to create Membership", error);
    }
  };
  search = async (searchModel) => {
    try {
      const records = await this.Membership.findAndCountAll(searchModel);
      return records;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to search Memberships", error);
    }
  };
  update = async (id: string, updateModel) => {
    try {
      const record = await this.Membership.update(updateModel, {
        where: { id: id },
      });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to update Membership", error);
    }
  };
  destroy = async (id: string) => {
    try {
      const record = await this.Membership.destroy({ where: { id: id } });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to destroy Membership", error);
    }
  };
  getById = async (id: string) => {
    try {
      const record = await this.Membership.findByPk(id);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to find Membership", error);
    }
  };
}
