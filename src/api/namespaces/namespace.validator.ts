import * as joi from "joi";
import { ErrorHandler } from "../../common/error.handler";
import {
  NamespaceCreateModel,
  NamespaceSearchModel,
  NamespaceUpdateModel,
} from "../../domain.types/namespace.domain.types";

export class NamespaceValidator {
  static validateCreateRequest = async (body: any) => {
    try {
      const schema = joi.object<NamespaceCreateModel>({
        Name: joi.string().required(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateSearchRequest = async (body: any) => {
    try {
      const schema = joi.object<NamespaceSearchModel>({
        id: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .optional(),
        Name: joi.string().optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateUpdateRequest = async (body: any) => {
    try {
      const schema = joi.object<NamespaceUpdateModel>({
        Name: joi.string().optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };
}
