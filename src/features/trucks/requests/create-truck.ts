/**
 *  Create Truck Request.
 */
export interface CreateTruckRequest {
  fleet?: string;
  driver?: string;
  totalMiles?: number;
  truckName?: string;
  truckNo?: string;
}