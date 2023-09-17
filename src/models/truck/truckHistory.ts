import { Schema, model } from "mongoose";
import { TruckHistory } from "../../domain/truck/truckHistory";
import { HistorySchemaFactory } from "../history";
import { TRUCK_HISTORY_SCHEMA, TRUCK_SCHEMA } from "../../constants/schemas";

/**
 * The truck history schema.
 * @type {Schema<TruckHistory>}
 */
export const TruckHistorySchema = new Schema<TruckHistory>({
  fleet: { type: String },
  driver: { type: String },
  totalMiles: { type: Number },
  truckName: { type: String },
  truckNo: { type: String },
}).add(HistorySchemaFactory.createChild(TRUCK_SCHEMA));

export const TruckHistoryModel = model<TruckHistory>(TRUCK_HISTORY_SCHEMA, TruckHistorySchema)