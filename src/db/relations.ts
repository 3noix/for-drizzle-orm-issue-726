import {aircrafts, airlines, airports, flights} from "./schema";
import {relations} from "drizzle-orm";


export const relationAircrafts = relations(aircrafts, ({one}) => ({
	airline: one(airlines, {
		fields: [aircrafts.airlineId],
		references: [airlines.id]
	})
}));

export const relationFlights = relations(flights, ({one}) => ({
	aircraft: one(aircrafts, {
		fields: [flights.aircraftId],
		references: [aircrafts.id]
	}),
	from: one(airports, {
		fields: [flights.airportFromId],
		references: [airports.id]
	}),
	to: one(airports, {
		fields: [flights.airportToId],
		references: [airports.id]
	})
}));
