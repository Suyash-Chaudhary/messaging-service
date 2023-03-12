import { BaseSearchModel } from "./base.types";

export enum Privilege {
  CreateThread,
  AddUserToNamespace,
  RemoveUserFromNamespace,
  AddUserToThread,
  RemoveUserFromThread,
  DeleteMessagefromThread,
  SendMessageToThread,
  DeleteThread,
  DeleteNamespace,
}

export interface RoleCreateModel {
  Name: string;
  Privileges: [Privilege];
}

export interface RoleUpdateModel {
  Name?: string;
  Privileges?: [Privilege];
}

export interface RoleSearchModel extends BaseSearchModel {
  Name?: string;
}
