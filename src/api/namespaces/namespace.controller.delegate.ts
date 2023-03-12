import express from "express";
import {
  NamespaceSearchModel,
  NamespaceCreateModel,
  NamespaceUpdateModel,
} from "../../domain.types/namespace.domain.types";
import { NamespaceRepository } from "../../database/repository/namespace.repository";
import { NamespaceValidator } from "./namespace.validator";

export class NamespaceControllerDelegate {
  _service = new NamespaceRepository();

  create = async (req: express.Request) => {
    // Validate request.
    await NamespaceValidator.validateCreateRequest(req.body);
    const createModel = this.getCreateModel(req.body);
    const record = await this._service.create(createModel);
    return record;
  };

  update = async (req: express.Request) => {
    await NamespaceValidator.validateUpdateRequest(req.body);
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
    await NamespaceValidator.validateSearchRequest(req.body);
    const searchModel = this.getSearchModel(req.body);
    const records = await this._service.search(searchModel);
    return records;
  };

  private getSearchModel = (body: any): NamespaceSearchModel => {
    const searchModel: NamespaceSearchModel = {};
    if (body["Name"] !== null) searchModel.Name = body["Name"];
    if (body["id"] !== null) searchModel.id = body["id"];
    return searchModel;
  };

  private getCreateModel = (body: any): NamespaceCreateModel => {
    const createModel: NamespaceCreateModel = {
      Name: body["Name"],
    };
    return createModel;
  };

  private getUpdateModel = (body: any): NamespaceUpdateModel => {
    const updateModel: NamespaceUpdateModel = {};
    if (body["Name"] !== null) updateModel.Name = body["Name"];
    return updateModel;
  };
}
