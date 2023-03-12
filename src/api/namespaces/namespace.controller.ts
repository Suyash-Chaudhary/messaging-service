import express from "express";
import { ResponseHandler } from "../../common/response.handler";
import { NamespaceControllerDelegate } from "./namespace.controller.delegate";

export class NamespaceController {
  _delegate = new NamespaceControllerDelegate();

  create = async (req: express.Request, res: express.Response) => {
    try {
      // Authorize request.
      const record = await this._delegate.create(req);
      const message = "Successfully created Namespace";
      ResponseHandler.success(req, res, message, 200, record);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  update = async (req: express.Request, res: express.Response) => {
    try {
      // Authorize request.
      const record = await this._delegate.update(req);
      const message = "Successfully updated Namespace";
      ResponseHandler.success(req, res, message, 200, record);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  search = async (req: express.Request, res: express.Response) => {
    try {
      // Authorize request.
      const records = await this._delegate.search(req);
      const message = "Successfully found Namespaces";
      ResponseHandler.success(req, res, message, 200, records);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  destroy = async (req: express.Request, res: express.Response) => {
    try {
      // Authorize request.
      const record = await this._delegate.destroy(req);
      const message = "Successfully destroyed Namespace";
      ResponseHandler.success(req, res, message, 200, record);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  getById = async (req: express.Request, res: express.Response) => {
    try {
      // Authorize request.
      const record = await this._delegate.getById(req);
      const message = "Successfully found Namespace";
      ResponseHandler.success(req, res, message, 200, record);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };
}
