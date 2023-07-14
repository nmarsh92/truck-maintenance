/**
 * Represents the request payload for creating a truck.
 */
export interface CreateTruckRequest {
  /**
   * The fleet of the truck.
   */
  fleet?: string;

  /**
   * The driver of the truck.
   */
  driver?: string;

  /**
   * The total miles of the truck.
   */
  totalMiles?: number;

  /**
   * The name of the truck.
   */
  truckName?: string;

  /**
   * The truck number.
   */
  truckNo?: string;
}