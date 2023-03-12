import mongoose from "mongoose";
import { BaseSearchModel } from "./base.types";

export interface NamespaceCreateModel {
  Name: string;
}

export interface NamespaceUpdateModel {
  Name?: string;
}

export interface NamespaceSearchModel extends BaseSearchModel {
  Name?: string;
}
