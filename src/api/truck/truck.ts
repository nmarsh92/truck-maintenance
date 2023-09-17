import { AuditableResponse } from "../auditableResponse";

/**
 * Represents a Truck entity.
 * @interface
 */
export interface TruckResponse extends AuditableResponse {
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