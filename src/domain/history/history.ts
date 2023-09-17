import { Types } from "mongoose";

/**
 * Required fields for a historic child.
 * @interface
 */
export interface History<T> {
  /**
   * The ID of the parent document.
   * @type {date} 
   * @memberof History
   */
  parent: Types.ObjectId | T

  /**
 * When the this revision expired.
 * @type {date} 
 * @memberof History
*/
  expiredAt: Date | number;

  /**
  * When the this revision expired.
  * @type {date} 
  * @memberof History
  */
  createdAt: Date;

  /**
   * Version of the revision.
   */
  version: number;
}