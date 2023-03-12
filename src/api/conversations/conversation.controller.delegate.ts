import express from "express";
import {
  ConversationSearchModel,
  ConversationCreateModel,
  ConversationUpdateModel,
} from "../../domain.types/conversation.domain.types";
import { ConversationRepository } from "../../database/repository/conversation.repository";
import { ConversationValidator } from "./conversation.validator";

export class ConversationControllerDelegate {
  _service = new ConversationRepository();

  create = async (req: express.Request) => {
    // Validate request.
    await ConversationValidator.validateCreateRequest(req.body);
    const createModel = this.getCreateModel(req.body);
    const record = await this._service.create(createModel);
    return record;
  };

  update = async (req: express.Request) => {
    await ConversationValidator.validateUpdateRequest(req.body);
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
    await ConversationValidator.validateSearchRequest(req.body);
    const searchModel = this.getSearchModel(req.body);
    const records = await this._service.search(searchModel);
    return records;
  };

  private getSearchModel = (body: any): ConversationSearchModel => {
    const searchModel: ConversationSearchModel = {};
    if (body["UserId"] !== null) searchModel.UserId = body["UserId"];
    if (body["ThreadId"] !== null) searchModel.ThreadId = body["ThreadId"];
    return searchModel;
  };

  private getCreateModel = (body: any): ConversationCreateModel => {
    const createModel: ConversationCreateModel = {
      UserId: body["UserId"],
      ThreadId: body["ThreadId"],
    };
    return createModel;
  };

  private getUpdateModel = (body: any): ConversationUpdateModel => {
    const searchModel: ConversationUpdateModel = {};
    return searchModel;
  };
}
