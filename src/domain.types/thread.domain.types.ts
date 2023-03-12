import { BaseSearchModel } from "./base.types";

export interface ThreadCreateModel {
  Name: string;
  NamespaceId: string;
}

export interface ThreadUpdateModel {
  Name?: string;
}

export interface ThreadSearchModel extends BaseSearchModel {
  NamespaceId?: string;
}
