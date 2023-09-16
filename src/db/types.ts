import {Prettify, Rename} from "../types";
import {aircrafts, airlines, airports, flights} from "./schema";
import {InferSelectModel} from "drizzle-orm";


// @1: types infered from SQL tables
// "static data"
export type SqlAircraft = InferSelectModel<typeof aircrafts>;
export type SqlAirline = InferSelectModel<typeof airlines>;
export type SqlAirport = InferSelectModel<typeof airports>;
export type SqlFlight = InferSelectModel<typeof flights>;


// @1: types used with reformatting for easier use in application
export type Aircraft = Prettify<Omit<SqlAircraft, "airlineId"> & {airline: Airline | null}>;
export type Airline = SqlAirline;
export type Airport = SqlAirport;

export type Flight = Prettify<Rename<{numberStr: "number"}, Omit<SqlFlight, "aircraftId" | "airportFromId" | "airportToId">> & {
	aircraft: Aircraft | null;
	from: Airport | null;
	to: Airport | null;
}>;

