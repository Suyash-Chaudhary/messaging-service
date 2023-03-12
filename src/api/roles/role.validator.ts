import * as joi from "joi";
import { ErrorHandler } from "../../common/error.handler";
import {
  Privilege,
  RoleCreateModel,
  RoleSearchModel,
  RoleUpdateModel,
} from "../../domain.types/role.domain.types";

export class RoleValidator {
  static validateCreateRequest = async (body: any) => {
    try {
      const schema = joi.object<RoleCreateModel>({
        Name: joi.string().required(),
        Privileges: joi
          .array()
          .items(joi.string().valid(...Object.values(Privilege)))
          .required()
          .min(1),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateSearchRequest = async (body: any) => {
    try {
      const schema = joi.object<RoleSearchModel>({
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
      const schema = joi.object<RoleUpdateModel>({
        Name: joi.string().optional(),
        Privileges: joi
          .array()
          .items(joi.string().valid(...Object.values(Privilege)))
          .required()
          .min(1),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };
}
