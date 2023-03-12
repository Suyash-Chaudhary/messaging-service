import express from "express";
import {
  UserSearchModel,
  UserCreateModel,
  UserUpdateModel,
} from "../../domain.types/user.domain.types";
import { UserRepository } from "../../database/repository/user.repository";
import { UserValidator } from "./user.validator";

export class UserControllerDelegate {
  _service = new UserRepository();

  create = async (req: express.Request) => {
    // Validate request.
    await UserValidator.validateCreateRequest(req.body);
    const createModel = this.getCreateModel(req.body);
    const record = await this._service.create(createModel);
    return record;
  };

  update = async (req: express.Request) => {
    await UserValidator.validateUpdateRequest(req.body);
    const updateModel = this.getUpdateModel(req.body);
    const record = await this._service.update(req.params["id"], updateModel);
    return record;
  };

  destroy = async (req: express.Request) => {
    const record = await this._service.destroy(req.params["id"]);
    return record;
  };

  getById = async (req: express.Request) => {
    const record = await this._service.getById(req.params["id"]);
    return record;
  };

  search = async (req: express.Request) => {
    await UserValidator.validateSearchRequest(req.body);
    const searchModel = this.getSearchModel(req.body);
    const records = await this._service.search(searchModel);
    return records;
  };

  private getSearchModel = (body: any): UserSearchModel => {
    const searchModel: UserSearchModel = {};
    if (body["Email"] !== null) searchModel.Email = body["Email"];
    if (body["Phone"] !== null) searchModel.Phone = body["Phone"];
    if (body["id"] !== null) searchModel.id = body["id"];
    return searchModel;
  };

  private getCreateModel = (body: any): UserCreateModel => {
    const createModel: UserCreateModel = {
      Name: body["Name"],
      Phone: body["Phone"],
    };
    if (body["Email"] !== null) createModel.Email = body["Email"];
    return createModel;
  };

  private getUpdateModel = (body: any): UserUpdateModel => {
    const searchModel: UserUpdateModel = {};
    if (body["Email"] !== null) searchModel.Email = body["Email"];
    if (body["Phone"] !== null) searchModel.Phone = body["Phone"];
    if (body["Name"] !== null) searchModel.Name = body["Name"];
    return searchModel;
  };
}
