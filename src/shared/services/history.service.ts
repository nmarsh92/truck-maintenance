import { HydratedDocument, Model } from "mongoose";
import { IHistoryDocument } from "../models/history-document";
import { IAuditableDocument } from "../models/auditable-document";

/**
 * Service for creating history items.
 */
export class HistoryService<T extends IAuditableDocument, THistory extends IHistoryDocument<T>> {

  /**
  * Creates a history item for the provided document.
  * @param item - The document to create history for.
  * @param historyClass - The history model class.
  * @returns The created history item.
  */
  public async createHistory(item: HydratedDocument<T>, historyClass: Model<THistory>): Promise<THistory> {
    const historyItem: THistory = {
      ...item.toObject(),
      _id: undefined, //todo find a better way
      expiredAt: Date.now(),
      createdAt: item.createdAt,
      parent: item._id,
      version: item.__v
    };
    const history = new historyClass(historyItem);

    await history.save();
    return history;
  }
}