import { Schema, Types } from 'mongoose';

/**
 * Extends Document by adding audit properties
 * @interface
 * @extends {Document}
 */
interface IHistoryDocument<T> {
  /**
   * The ID of the parent document.
   * @type {date} 
   * @memberof HistoryDocument
   */
  parent: Types.ObjectId | T

  /**
 * When the this revision expired.
 * @type {date} 
 * @memberof HistoryDocument
*/
  expiredAt: Date | number;

  /**
* When the this revision expired.
* @type {date} 
* @memberof HistoryDocument
*/
  createdAt: Date;

  /**
   * Version of the revision.
   */
  version: number;
}

/**
 *  Factory for creating a history schema.
 */
class HistorySchemaFactory {
  /**
   * 
   * @param parentSchema - Name of the parent schema.
   * @returns {Schema} Schema
   */
  static create(parentSchema: string): Schema {
    return new Schema(
      {
        parent: { type: Types.ObjectId, ref: parentSchema },
        createdAt: { type: Date, required: true },
        expiredAt: { type: Date, required: true },
        version: { type: Number, required: true }
      }
    );
  }
}

export { IHistoryDocument, HistorySchemaFactory };

