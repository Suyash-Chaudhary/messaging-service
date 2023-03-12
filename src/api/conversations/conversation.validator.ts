import * as joi from "joi";
import { ErrorHandler } from "../../common/error.handler";
import {
  ConversationCreateModel,
  ConversationSearchModel,
  ConversationUpdateModel,
} from "../../domain.types/conversation.domain.types";

export class ConversationValidator {
  static validateCreateRequest = async (body: any) => {
    try {
      const schema = joi.object<ConversationCreateModel>({
        UserId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .required(),
        ThreadId: joi
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
      const schema = joi.object<ConversationSearchModel>({
        UserId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .optional(),
        ThreadId: joi
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
      const schema = joi.object<ConversationUpdateModel>({});
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };
}
