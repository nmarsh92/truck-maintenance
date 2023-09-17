import { SearchFilter } from "./searchFilter";

export interface PagedRequest {
  /**
   * The current page number.
   * @type {number}
   */
  page: number;

  /**
   * The number of records per page.
   * @type {number}
   */
  pageSize: number;

  /**
   * The sort column.
   * @type {string}
   * @memberof PagedRequest
   */
  sortColumn?: string;

  /**
   * The sort direction.
   * @type {string}
   */
  sortDirection?: "asc" | "desc";

  /**
   * The filter.
   * @type {string}
   */
  filters?: SearchFilter[];
}