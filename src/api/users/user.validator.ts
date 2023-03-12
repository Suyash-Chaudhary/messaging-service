import * as joi from "joi";
import { ErrorHandler } from "../../common/error.handler";
import {
  UserCreateModel,
  UserSearchModel,
  UserUpdateModel,
} from "../../domain.types/user.domain.types";

export class UserValidator {
  static validateCreateRequest = async (body: any) => {
    try {
      const schema = joi.object<UserCreateModel>({
        Name: joi.string().required(),
        Phone: joi.string().required(),
        Email: joi.string().email().optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateSearchRequest = async (body: any) => {
    try {
      const schema = joi.object<UserSearchModel>({
        id: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .optional(),
        Phone: joi.string().optional(),
        Email: joi.string().email().optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateUpdateRequest = async (body: any) => {
    try {
      const schema = joi.object<UserUpdateModel>({
        Name: joi.string().optional(),
        Phone: joi.string().optional(),
        Email: joi.string().email().optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };
}
