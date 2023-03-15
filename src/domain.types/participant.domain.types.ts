import { BaseSearchModel } from "./base.types";

export interface ParticipantCreateModel {
  Name: string;
  Phone: string;
  Email?: string;
}

export interface ParticipantUpdateModel {
  Name?: string;
  Phone?: string;
  Email?: string;
}

export interface ParticipantSearchModel extends BaseSearchModel {
  Phone?: string;
  Email?: string;
}
