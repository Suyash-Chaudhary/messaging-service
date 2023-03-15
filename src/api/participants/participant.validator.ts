import * as joi from "joi";
import { ErrorHandler } from "../../common/error.handler";
import {
  ParticipantCreateModel,
  ParticipantSearchModel,
  ParticipantUpdateModel,
} from "../../domain.types/participant.domain.types";

export class ParticipantValidator {
  static validateCreateRequest = async (body: any) => {
    try {
      const schema = joi.object<ParticipantCreateModel>({
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
      const schema = joi.object<ParticipantSearchModel>({
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
      const schema = joi.object<ParticipantUpdateModel>({
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
