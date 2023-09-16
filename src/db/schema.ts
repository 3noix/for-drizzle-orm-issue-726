import {sqliteTable, text, integer, real, index, uniqueIndex} from "drizzle-orm/sqlite-core";


export const airports = sqliteTable("airports", {
	id: integer("id").primaryKey().notNull(),
	name: text("name", { length: 100 }).notNull(),
	icao: text("icao", { length: 4 }).notNull(),
	iata: text("iata", { length: 3 }),
	latitude: real("latitude").notNull(),
	longitude: real("longitude").notNull(),
	altitude: real("altitude").notNull(),
	city: text("city", { length: 50 }),
	country: text("country", { length: 50 }),
},
(table) => {
	return {
		idxAirportIcao: uniqueIndex("idx_airport_icao").on(table.icao),
	}
});

export const airlines = sqliteTable("airlines", {
	id: integer("id").primaryKey().notNull(),
	name: text("name", { length: 100 }).notNull(),
	icao: text("icao", { length: 3 }),
	iata: text("iata", { length: 2 }),
	callsign: text("callsign", { length: 50 }),
	country: text("country", { length: 50 }).notNull(),
	isActive: integer("isActive").notNull(),
},
(table) => {
	return {
		idxAirlineIcao: index("idx_airline_icao").on(table.icao),
	}
});

export const aircrafts = sqliteTable("aircrafts", {
	id: integer("id").primaryKey().notNull(),
	prgm: text("prgm", { length: 6 }).notNull(),
	acType: text("acType", { length: 10 }).notNull(),
	msn: integer("msn").notNull(),
	model: text("model", { length: 10 }).notNull(),
	actail: text("actail", { length: 10 }),
	engMnf: text("eng_mnf", { length: 6 }),
	engMdl: text("eng_mdl", { length: 20 }),
	airlineId: integer("airline_id").references(() => airlines.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		idxAircraftPrgmmsn: uniqueIndex("idx_aircraft_prgmmsn").on(table.prgm, table.msn),
		fkAcAl: index("fk_ac_al").on(table.airlineId),
	}
});

export const flights = sqliteTable("flights", {
	id: integer("id").primaryKey().notNull(),
	aircraftId: integer("aircraft_id").references(() => aircrafts.id, { onDelete: "set null" } ),
	date: text("date"),
	numberStr: text("numberStr", { length: 8 }),
	airportFromId: integer("airport_from_id").references(() => airports.id, { onDelete: "set null" } ),
	airportToId: integer("airport_to_id").references(() => airports.id, { onDelete: "set null" } )
},
(table) => {
	return {
		fkFrom: index("fk_from").on(table.airportFromId),
		fkTo: index("fk_to").on(table.airportToId),
		fkFlightsAc: index("fk_flights_ac").on(table.aircraftId),
	}
});
