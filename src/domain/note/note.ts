import { Types } from "mongoose";
import { Auditable } from "../auditable";

/**
 * Represents a Note entity.
 * @interface
 * @extends {Auditable}
 */
export interface Note extends Auditable {
  forUser: Types.ObjectId;
  message: string;
  title: string;
  truck: Types.ObjectId;
  user: Types.ObjectId;
}
