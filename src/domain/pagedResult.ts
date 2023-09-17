export interface PagedResult<T> {
  /**
   * The total number of records.
   * @type {number}
   * @memberof Paged
   */
  total: number;

  /**
   * The current page number.
   * @type {number}
   * @memberof Paged
   */
  page: number;

  /**
   * The number of records per page.
   * @type {number}
   * @memberof Paged
   */
  pageSize: number;

  /**
   * The records for the current page.
   * @type {T[]}
   * @memberof Paged
   */
  records: T[];
}