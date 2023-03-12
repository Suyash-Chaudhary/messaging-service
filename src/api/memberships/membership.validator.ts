import * as joi from "joi";
import { ErrorHandler } from "../../common/error.handler";
import {
  MembershipCreateModel,
  MembershipSearchModel,
  MembershipUpdateModel,
} from "../../domain.types/membership.domain.types";

export class MembershipValidator {
  static validateCreateRequest = async (body: any) => {
    try {
      const schema = joi.object<MembershipCreateModel>({
        UserId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .required(),
        RoleId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .required(),
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
      const schema = joi.object<MembershipSearchModel>({
        UserId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .optional(),
        RoleId: joi
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
      const schema = joi.object<MembershipUpdateModel>({
        RoleId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };
}
