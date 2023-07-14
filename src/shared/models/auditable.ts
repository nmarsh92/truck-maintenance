import { Schema } from 'mongoose';

/**
 * Audit properties for an entity.
 * @interface
 */
interface IAuditable {
  /**
   * The creation date.
   * @type {date} 
   * @memberof IAuditable
   */
  createdAt: Date;

  /**
   * The creation date.
   * @type {date} 
   * @memberof IAuditable
  */
  updatedAt: Date;

  /**
   * Is record deleted.
   * @type {boolean} 
   * @memberof IAuditable
   */
  isDeleted: boolean;
}

const AuditableSchema = new Schema(
  {
    isDeleted: { type: Boolean, default: false }
  },
  { optimisticConcurrency: true, timestamps: true }
);

export { IAuditable, AuditableSchema };

