/**
 * Represents a Truck entity.
 * @interface
 */
export interface Truck {
  /**
   * The truck's fleet.
   */
  fleet?: string;

  /**
   * The truck's driver.
   */
  driver?: string;
  /**
   * The truck's total miles.
   */
  totalMiles?: number;

  /**
   * The truck's name.
   */
  truckName?: string;

  /**
   * The truck's number.
   */
  truckNo?: string;
}