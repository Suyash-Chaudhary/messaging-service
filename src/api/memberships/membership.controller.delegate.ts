import express from "express";
import {
  MembershipSearchModel,
  MembershipCreateModel,
  MembershipUpdateModel,
} from "../../domain.types/membership.domain.types";
import { MembershipRepository } from "../../database/repository/membership.repository";
import { MembershipValidator } from "./membership.validator";

export class MembershipControllerDelegate {
  _service = new MembershipRepository();

  create = async (req: express.Request) => {
    // Validate request.
    await MembershipValidator.validateCreateRequest(req.body);
    const createModel = this.getCreateModel(req.body);
    const record = await this._service.create(createModel);
    return record;
  };

  update = async (req: express.Request) => {
    await MembershipValidator.validateUpdateRequest(req.body);
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
    await MembershipValidator.validateSearchRequest(req.body);
    const searchModel = this.getSearchModel(req.body);
    const records = await this._service.search(searchModel);
    return records;
  };

  private getSearchModel = (body: any): MembershipSearchModel => {
    const searchModel: MembershipSearchModel = {};
    if (body["UserId"] !== null) searchModel.UserId = body["UserId"];
    if (body["NamespaceId"] !== null)
      searchModel.NamespaceId = body["NamespaceId"];
    if (body["RoleId"] !== null) searchModel.RoleId = body["RoleId"];
    return searchModel;
  };

  private getCreateModel = (body: any): MembershipCreateModel => {
    const createModel: MembershipCreateModel = {
      UserId: body["UserId"],
      RoleId: body["RoleId"],
      NamespaceId: body["NamespaceId"],
    };
    return createModel;
  };

  private getUpdateModel = (body: any): MembershipUpdateModel => {
    const searchModel: MembershipUpdateModel = {};
    if (body["RoleId"] !== null) searchModel.RoleId = body["RoleId"];
    return searchModel;
  };
}
