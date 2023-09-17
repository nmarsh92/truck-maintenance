/**
 * Response for a created resource.
 * @template T - The type of the resource identifier.
 */
export interface ResourceResponse {
  /**
    * The identifier of the resource.
    */
  id: string;

  /**
   * The version number of the resource.
   */
  version: number;

  /**
   * The creation date and time of the resource in UTC.
   */
  createdAt: Date;
}
