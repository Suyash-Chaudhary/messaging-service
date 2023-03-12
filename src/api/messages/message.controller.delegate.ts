import express from "express";
import {
  MessageSearchModel,
  MessageCreateModel,
  MessageUpdateModel,
} from "../../domain.types/message.domain.types";
import { MessageRepository } from "../../database/repository/message.repository";
import { MessageValidator } from "./message.validator";

export class MessageControllerDelegate {
  _service = new MessageRepository();

  create = async (req: express.Request) => {
    // Validate request.
    await MessageValidator.validateCreateRequest(req.body);
    const createModel = this.getCreateModel(req.body);
    const record = await this._service.create(createModel);
    return record;
  };

  update = async (req: express.Request) => {
    await MessageValidator.validateUpdateRequest(req.body);
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
    await MessageValidator.validateSearchRequest(req.body);
    const searchModel = this.getSearchModel(req.body);
    const records = await this._service.search(searchModel);
    return records;
  };

  private getSearchModel = (body: any): MessageSearchModel => {
    const searchModel: MessageSearchModel = {};
    if (body["ThreadId"] !== null) searchModel.ThreadId = body["ThreadId"];
    if (body["SenderId"] !== null) searchModel.SenderId = body["SenderId"];
    return searchModel;
  };

  private getCreateModel = (body: any): MessageCreateModel => {
    const createModel: MessageCreateModel = {
      Payload: body["Payload"],
      ThreadId: body["ThreadId"],
      SenderId: body["SenderId"],
    };
    return createModel;
  };

  private getUpdateModel = (body: any): MessageUpdateModel => {
    const searchModel: MessageUpdateModel = {};
    if (body["Payload"] !== null) searchModel.Payload = body["Payload"];
    return searchModel;
  };
}
