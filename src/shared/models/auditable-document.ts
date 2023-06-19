import { Document, Schema } from 'mongoose';

/**
 * Extends Document by adding audit properties
 * @interface
 * @extends {Document}
 */
interface AuditableDocument extends Document {
  /**
   * The creation date.
   * @type {date} 
   * @memberof AuditableDocument
   */
  createdAt: Date;
  /**
   * The last updated date.
   * @type {date} 
   * @memberof AuditableDocument
  */
  updatedAt: Date;
  /**
  * The current version.
  * @type {number} 
  * @memberof AuditableDocument
  */
  version: number;
}

const AuditableSchema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    version: { type: Number, default: 1 }
  },
  {
    versionKey: 'version'
  }
);

export { AuditableDocument, AuditableSchema };

