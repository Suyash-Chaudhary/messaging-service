import * as joi from "joi";
import { ErrorHandler } from "../../common/error.handler";
import {
  ThreadCreateModel,
  ThreadSearchModel,
  ThreadUpdateModel,
} from "../../domain.types/thread.domain.types";

export class ThreadValidator {
  static validateCreateRequest = async (body: any) => {
    try {
      const schema = joi.object<ThreadCreateModel>({
        Name: joi.string().required(),
        NamespaceId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .required(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateSearchRequest = async (body: any) => {
    try {
      const schema = joi.object<ThreadSearchModel>({
        id: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .optional(),
        NamespaceId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateUpdateRequest = async (body: any) => {
    try {
      const schema = joi.object<ThreadUpdateModel>({
        Name: joi.string().optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };
}
