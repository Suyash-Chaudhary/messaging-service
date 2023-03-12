import express from "express";
import {
  RoleSearchModel,
  RoleCreateModel,
  RoleUpdateModel,
} from "../../domain.types/role.domain.types";
import { RoleRepository } from "../../database/repository/role.repository";
import { RoleValidator } from "./role.validator";

export class RoleControllerDelegate {
  _service = new RoleRepository();

  create = async (req: express.Request) => {
    // Validate request.
    await RoleValidator.validateCreateRequest(req.body);
    const createModel = this.getCreateModel(req.body);
    const record = await this._service.create(createModel);
    return record;
  };

  update = async (req: express.Request) => {
    await RoleValidator.validateUpdateRequest(req.body);
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
    await RoleValidator.validateSearchRequest(req.body);
    const searchModel = this.getSearchModel(req.body);
    const records = await this._service.search(searchModel);
    return records;
  };

  private getSearchModel = (body: any): RoleSearchModel => {
    const searchModel: RoleSearchModel = {};
    if (body["Name"] !== null) searchModel.Name = body["Name"];
    if (body["id"] !== null) searchModel.id = body["id"];
    return searchModel;
  };

  private getCreateModel = (body: any): RoleCreateModel => {
    const createModel: RoleCreateModel = {
      Name: body["Name"],
      Privileges: body["Privileges"],
    };
    return createModel;
  };

  private getUpdateModel = (body: any): RoleUpdateModel => {
    const updateModel: RoleUpdateModel = {};
    if (body["Name"] !== null) updateModel.Name = body["Name"];
    if (body["Privileges"] !== null)
      updateModel.Privileges = body["Privileges"];
    return updateModel;
  };
}
