import { Schema } from 'mongoose';

/**
 * Extends Document by adding audit properties
 * @interface
 * @extends {Document}
 */
interface IAuditableDocument {
  /**
   * The creation date.
   * @type {date} 
   * @memberof AuditableDocument
   */
  createdAt: Date;

  /**
   * The creation date.
   * @type {date} 
   * @memberof AuditableDocument
  */
  updatedAt: Date;

  /**
   * Is record deleted.
   * @type {boolean} 
   * @memberof AuditableDocument
   */
  isDeleted: boolean;
}

const AuditableSchema = new Schema(
  {
    isDeleted: { type: Boolean, default: false }
  },
  { optimisticConcurrency: true, timestamps: true }
);

export { IAuditableDocument, AuditableSchema };

