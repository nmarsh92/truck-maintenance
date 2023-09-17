import { Model } from "mongoose";
import { NotFoundError } from "../domain/error/not-found";
import { Auditable } from "../domain/auditable";
import { ArgumentNullError } from "../domain/error/argument-null-error";
import { PagedResult } from "../domain/pagedResult";
import { PagedQuery } from "../domain/pagedQuery";
import { History } from "../domain/history/history";
import { HistoryParent } from "../domain/history/historyParent";
import { HasId } from "../domain/hasId";
import { ConflictError } from "../domain/error/conflict";

export class RepositoryBase<TModel extends Model<TBase & Auditable & HistoryParent<History<TBase>>>, TBase> {

  protected model: TModel;
  protected historyModel: Model<TBase & History<TBase>>;

  constructor(model: TModel, historyModel: Model<TBase & History<TBase>>) {
    this.model = model;
    this.historyModel = historyModel;
  }

  /**
   * Create a new item.
   * @param item 
   * @throws ArgumentNullError if item is falsy.
   * @returns 
   */
  public async create(item: TBase): Promise<TBase & Auditable & HistoryParent<TBase & History<TBase>>> {
    if (!item) throw new ArgumentNullError('item');
    const createdItem = await this.model.create(item);
    return createdItem.toObject();
  }

  /**
   * Get an item by id.
   * @param id 
   * @throws ArgumentNullError if the truck with the specified ID is not found.
   * @throws NotFoundError if the truck with the specified ID is not found.
   * @returns 
   */
  public async get(id: string, populate?: string[]): Promise<TBase & Auditable & HistoryParent<TBase & History<TBase>>> {
    if (!id) throw new ArgumentNullError('id');
    const get = this.model.findById(id);
    if (populate?.length) {
      get.populate(populate);
    }
    const item = await get.exec();
    if (!item || item.isDeleted) throw NotFoundError.CreateWithId(id);
    return item.toObject();
  }

  /**
   * Updates an item by its ID.
   * @param id 
   * @param item 
   */
  public async update(id: string, item: Omit<TBase, "_id" | "createdAt" | "__v" | "updatedAt">): Promise<void> {
    if (!id) throw new ArgumentNullError('id');
    console.log(item);
    const previous = await this.model.findById(id);
    if (!previous || previous.isDeleted) throw NotFoundError.CreateWithId(id);

    const historyItem = new this.historyModel({
      ...item,
      expiredAt: Date.now(),
      createdAt: previous.createdAt,
      parent: previous.id,
      version: previous.__v
    });
    await historyItem.save();
    Object.assign(previous, item);
    previous.history.push(historyItem);
    await previous.save();
    // const historyItem = await this.historyModel.create({
    //   ...item,
    //   expiredAt: Date.now(),
    //   parent: previous,
    //   version: previous.__v
    // });
    // item.history.push(historyItem);

    // await this.model.updateOne({ _id: id }, item);
  }

  /**
   * Deletes an item by its ID.
   * @param id 
   */
  public async delete(id: string): Promise<void> {
    if (!id) throw new ArgumentNullError('id');
    await this.model.deleteOne({ _id: id });
  }

  /**
   *  Soft deletes and entity by setting isDeleted to true.
   * @param id 
   */
  public async softDelete(id: string): Promise<void> {
    if (!id) throw new ArgumentNullError('id');
    await this.model.updateOne({ _id: id }, { isDeleted: true });
  }

  /**
   * 
   * @param request 
   * @returns 
   */
  public async find(request: PagedQuery): Promise<PagedResult<TBase & Auditable>> {
    if (!request) throw new ArgumentNullError('request');

    let query = this.model.find({ isDeleted: false });
    query = query.skip(request.page * request.pageSize).limit(request.pageSize);

    if (request.filters && request.filters.length > 0) {
      request.filters.forEach(filter => {
        if (!filter.fuzzy) { query = query.where(filter.key).equals(filter.value); }
        else {
          query = query.where(filter.key).regex(filter.value);
        }
      });

    }
    const results = await query.exec();
    const count = await this.model.countDocuments(query);
    return {
      records: results.map(r => r.toObject()),
      page: request.page,
      pageSize: request.pageSize,
      total: count
    }
  }

  /**
   * Ensures that the item exists.
   * @param id
   * @throws ArgumentNullError if id is falsy.
   * @throws NotFoundError if the item with the specified ID is not found.
   */
  public async ensureExists(id: string): Promise<void> {
    if (!id) throw new ArgumentNullError('id');
    const exists = await this.model.exists({ _id: id, isDeleted: false });
    if (!exists) throw NotFoundError.CreateWithId(id);
  }

  /**
   * Ensures that the version of the item matches the version passed in.
   * @param id 
   * @param version 
   * @throws ArgumentNullError if id is falsy.
   * @throws NotFoundError if the item with the specified ID is not found.
   * @throws ConflictError if the version of the item does not match the version passed in.
   */
  public async ensureVersion(id: string, version: number): Promise<void> {
    if (!id) throw new ArgumentNullError('id');
    const item = await this.model.findOne({ _id: id, isDeleted: false });
    if (!item) throw NotFoundError.CreateWithId(id);
    if (item.__v !== version) throw new ConflictError();
  }
}