import { Schema, Types } from 'mongoose';

/**
 *  Factory for creating a history schema.
 */
class HistorySchemaFactory {
  /**
   * 
   * @param parentSchema - Name of the parent schema.
   * @returns {Schema} Schema
   */
  static createChild(parentSchema: string): Schema {
    return new Schema(
      {
        parent: { type: Types.ObjectId, ref: parentSchema },
        createdAt: { type: Date, required: true },
        expiredAt: { type: Date, required: true },
        version: { type: Number, required: true }
      }
    );
  }

  static createParent(childSchema: string): Schema {
    return new Schema({
      history: [{ type: Schema.Types.ObjectId, ref: childSchema }]
    })
  }
}

export { HistorySchemaFactory };

