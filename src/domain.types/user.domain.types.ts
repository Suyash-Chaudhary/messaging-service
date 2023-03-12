import { BaseSearchModel } from "./base.types";

export interface UserCreateModel {
  Name: string;
  Phone: string;
  Email?: string;
}

export interface UserUpdateModel {
  Name?: string;
  Phone?: string;
  Email?: string;
}

export interface UserSearchModel extends BaseSearchModel {
  Phone?: string;
  Email?: string;
}
