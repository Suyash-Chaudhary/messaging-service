import * as joi from "joi";
import { ErrorHandler } from "../../common/error.handler";
import {
  MessageCreateModel,
  MessageSearchModel,
  MessageUpdateModel,
} from "../../domain.types/message.domain.types";

export class MessageValidator {
  static validateCreateRequest = async (body: any) => {
    try {
      const schema = joi.object<MessageCreateModel>({
        ThreadId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .required(),
        SenderId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .required(),
        Payload: joi
          .object({
            Type: joi.string().required(),
            Text: joi.string().optional(),
            Html: joi.string().optional(),
            Options: joi.array().items(joi.string()).optional(),
            Actions: joi.array().items(joi.string()).optional(),
          })
          .required(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateSearchRequest = async (body: any) => {
    try {
      const schema = joi.object<MessageSearchModel>({
        ThreadId: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .optional(),
        SenderId: joi
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
      const schema = joi.object<MessageUpdateModel>({
        Payload: joi
          .object({
            Type: joi.string().required(),
            Text: joi.string().optional(),
            Html: joi.string().optional(),
            Options: joi.array().items(joi.string()).optional(),
            Actions: joi.array().items(joi.string()).optional(),
          })
          .optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };
}
