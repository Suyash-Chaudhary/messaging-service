import express from "express";
import {
  ThreadSearchModel,
  ThreadCreateModel,
  ThreadUpdateModel,
} from "../../domain.types/thread.domain.types";
import { ThreadRepository } from "../../database/repository/thread.repository";
import { ThreadValidator } from "./thread.validator";

export class ThreadControllerDelegate {
  _service = new ThreadRepository();

  create = async (req: express.Request) => {
    // Validate request.
    await ThreadValidator.validateCreateRequest(req.body);
    const createModel = this.getCreateModel(req.body);
    const record = await this._service.create(createModel);
    return record;
  };

  update = async (req: express.Request) => {
    await ThreadValidator.validateUpdateRequest(req.body);
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
    await ThreadValidator.validateSearchRequest(req.body);
    const searchModel = this.getSearchModel(req.body);
    const records = await this._service.search(searchModel);
    return records;
  };

  private getSearchModel = (body: any): ThreadSearchModel => {
    const searchModel: ThreadSearchModel = {};
    if (body["NamespaceId"] !== null)
      searchModel.NamespaceId = body["NamespaceId"];
    return searchModel;
  };

  private getCreateModel = (body: any): ThreadCreateModel => {
    const createModel: ThreadCreateModel = {
      Name: body["Name"],
      NamespaceId: body["NamespaceId"],
    };
    return createModel;
  };

  private getUpdateModel = (body: any): ThreadUpdateModel => {
    const searchModel: ThreadUpdateModel = {};
    if (body["Name"] !== null) searchModel.Name = body["Name"];
    return searchModel;
  };
}
