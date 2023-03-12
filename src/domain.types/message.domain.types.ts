import { BaseSearchModel } from "./base.types";

export interface MessageCreateModel {
  Payload: {
    Type: string;
    Text?: string;
    Html?: string;
    Options?: string[];
    Actions?: string[];
  };
  ThreadId: string;
  SenderId: string;
}

export interface MessageUpdateModel {
  Payload?: {
    Type?: string;
    Text?: string;
    Html?: string;
    Options?: string[];
    Actions?: string[];
  };
}

export interface MessageSearchModel extends BaseSearchModel {
  ThreadId?: string;
  SenderId?: string;
}
