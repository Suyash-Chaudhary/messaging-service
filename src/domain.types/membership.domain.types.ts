import { BaseSearchModel } from "./base.types";

export interface MembershipCreateModel {
  UserId: string;
  RoleId: string;
  NamespaceId: string;
}

export interface MembershipUpdateModel {
  RoleId?: string;
}

export interface MembershipSearchModel extends BaseSearchModel {
  UserId?: string;
  NamespaceId?: string;
  RoleId?: string;
}
