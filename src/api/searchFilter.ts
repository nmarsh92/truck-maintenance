export interface SearchFilter {
  /**
   * The search filter key.
   * @type {string}
   * @memberof SearchFilter
   */
  key: string;

  /**
   * The filter.
   * @type {string}
   * @memberof SearchFilter
   * @example
   */
  value: string;

  /**
   * The fuzzy search.
   * @type {boolean}
   */
  fuzzy: boolean;
}