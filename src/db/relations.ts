import {aircrafts, airlines, airports, flights} from "./schema";
import {relations} from "drizzle-orm";


export const relationAircraftAirline = relations(aircrafts, ({one}) => ({
	airline: one(airlines, {
		fields: [aircrafts.airlineId],
		references: [airlines.id]
	})
}));

export const relationFlightAircraft = relations(flights, ({one}) => ({
	aircraft: one(aircrafts, {
		fields: [flights.aircraftId],
		references: [aircrafts.id]
	})
}));

export const relationFlightAirportFrom = relations(flights, ({one}) => ({
	from: one(airports, {
		fields: [flights.airportFromId],
		references: [airports.id]
	})
}));

export const relationFlightAirportTo = relations(flights, ({one}) => ({
	to: one(airports, {
		fields: [flights.airportToId],
		references: [airports.id]
	})
}));
