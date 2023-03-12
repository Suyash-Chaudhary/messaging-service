import { BaseSearchModel } from "./base.types";

export interface ConversationCreateModel {
  UserId: string;
  ThreadId: string;
}

export interface ConversationUpdateModel {}

export interface ConversationSearchModel extends BaseSearchModel {
  UserId?: string;
  ThreadId?: string;
}
