import { Types } from "mongoose";

export interface HasId {
  _id: Types.ObjectId | string;
}