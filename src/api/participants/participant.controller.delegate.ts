import express from "express";
import {
  ParticipantSearchModel,
  ParticipantCreateModel,
  ParticipantUpdateModel,
} from "../../domain.types/participant.domain.types";
import { ParticipantRepository } from "../../database/repository/participant.repository";
import { ParticipantValidator } from "./participant.validator";

export class ParticipantControllerDelegate {
  _service = new ParticipantRepository();

  create = async (req: express.Request) => {
    // Validate request.
    await ParticipantValidator.validateCreateRequest(req.body);
    const createModel = this.getCreateModel(req.body);
    const record = await this._service.create(createModel);
    return record;
  };

  update = async (req: express.Request) => {
    await ParticipantValidator.validateUpdateRequest(req.body);
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
    await ParticipantValidator.validateSearchRequest(req.body);
    const searchModel = this.getSearchModel(req.body);
    const records = await this._service.search(searchModel);
    return records;
  };

  private getSearchModel = (body: any): ParticipantSearchModel => {
    const searchModel: ParticipantSearchModel = {};
    if (body["Email"] !== null) searchModel.Email = body["Email"];
    if (body["Phone"] !== null) searchModel.Phone = body["Phone"];
    if (body["id"] !== null) searchModel.id = body["id"];
    return searchModel;
  };

  private getCreateModel = (body: any): ParticipantCreateModel => {
    const createModel: ParticipantCreateModel = {
      Name: body["Name"],
      Phone: body["Phone"],
    };
    if (body["Email"] !== null) createModel.Email = body["Email"];
    return createModel;
  };

  private getUpdateModel = (body: any): ParticipantUpdateModel => {
    const searchModel: ParticipantUpdateModel = {};
    if (body["Email"] !== null) searchModel.Email = body["Email"];
    if (body["Phone"] !== null) searchModel.Phone = body["Phone"];
    if (body["Name"] !== null) searchModel.Name = body["Name"];
    return searchModel;
  };
}
