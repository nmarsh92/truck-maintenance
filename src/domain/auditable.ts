import { HasId } from "./hasId";
/**
 * Audit properties for an entity.
 * @interface
 */
export interface Auditable extends HasId {
  /**
   * The creation date.
   * @type {date} 
   * @memberof Auditable
   */
  createdAt: Date;

  /**
   * The creation date.
   * @type {date} 
   * @memberof Auditable
  */
  updatedAt: Date;

  /**
   * Is record deleted.
   * @type {boolean} 
   * @memberof Auditable
   */
  isDeleted: boolean;

  /**
   * The version of the record.
   * @type {number}
   * @memberof Auditable
   * @example
   * 1
   */
  __v: number;
}
