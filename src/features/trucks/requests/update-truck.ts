/**
 * Represents a request to update a truck.
 */
export interface UpdateTruckRequest {
  /**
   * The fleet associated with the truck (optional).
   */
  fleet?: string;

  /**
   * The driver assigned to the truck (optional).
   */
  driver?: string;

  /**
   * The total miles driven by the truck (optional).
   */
  totalMiles?: number;

  /**
   * The name of the truck (optional).
   */
  truckName?: string;

  /**
   * The truck number (optional).
   */
  truckNo?: string;

  /**
   * The version number of the truck.
   */
  version: number;
}