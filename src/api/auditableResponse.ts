/**
 * Represents an object that has audit information.
 * @interface
 */
export interface AuditableResponse {
  /**
   * The unique identifier of the object.
   * @type {string}
   */
  id: string;

  /**
   * The date and time when the object was created.
   * @type {Date}
   */
  createdAt: Date;

  /**
   * The date and time when the object was last updated.
   * @type {Date}
   */
  updatedAt: Date;

  /**
   * The version number of the object.
   * @type {number}
   */
  version: number;
}