import { HydratedDocument, Model } from "mongoose";
import { IHistory } from "../models/history";
import { IAuditable } from "../models/auditable";

/**
 * Service for creating history items.
 */
export class HistoryService<T, THistory extends IHistory<T>> {

  /**
  * Creates a history item for the provided document.
  * @param item - The document to create history for.
  * @param historyClass - The history model class.
  * @returns The created history item.
  */
  public async createHistory(item: HydratedDocument<T>, historyClass: Model<THistory>): Promise<THistory> {
    const historyItem: THistory = {
      ...item.toObject(),
      expiredAt: Date.now(),
      parent: item._id,
      version: item.__v
    };
    const history = new historyClass(historyItem);

    await history.save();
    return history;
  }
}