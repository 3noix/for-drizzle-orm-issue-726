import {db} from "./db/db";
import {RelationalQueryBuilder} from "drizzle-orm/sqlite-core/query-builders/query";
import {DBQueryConfig, TablesRelationalConfig, TableRelationalConfig, FindTableByDBName, One} from "drizzle-orm";
import {Prettify} from "./types";


main();
async function main() {
	testOk();
	testKo();
}

async function testOk() {
	// Works fine
	const resultAircraft = await db.query.aircrafts.findFirst({
		columns: {airlineId: false},
		with: {airline: true}
	}).execute();
	console.log("----------------------------------------");
	console.log("aircraft = ", resultAircraft);
}

async function testKo() {
	// No auto-completion in "with" and wrong typing for "resultFlight".
	// But at runtime "resultFlight" content is ok
	const resultFlight = await db.query.flights.findFirst({
		columns: {aircraftId: false, airportFromId: false, airportToId: false},
		with: {
			aircraft: {
				columns: {airlineId: false},
				with: {airline: true}
			},
			from: true,
			to: true
		}
	}).execute();
	console.log("----------------------------------------");
	console.log("flight = ", resultFlight);
}


// utility types
type Keys<T> = {[K in keyof T]: K}[keyof T];
type ExtractFullSchema<TRelationalQueryBuilder> = TRelationalQueryBuilder extends RelationalQueryBuilder<infer TMode, infer TFullSchema, infer TSchema, infer TFields> ? TSchema : never;
type ExtractRelationConfig<TRelationalQueryBuilder> = TRelationalQueryBuilder extends RelationalQueryBuilder<infer TMode, infer TFullSchema, infer TSchema, infer TFields> ? TFields : never;

// trying to debug the types (i.e. why the "with" field of the config shows no relation)
type FullSchema1 = ExtractFullSchema<typeof db.query.flights>;
type AircraftsRelations1 = FullSchema1["aircrafts"]["relations"];
type FlightsRelations1 = FullSchema1["flights"]["relations"];

type FlightsRelations2 = ExtractRelationConfig<typeof db.query.flights>["relations"];
type Test1 = DBQueryConfig<
	"many",
	true,
	ExtractFullSchema<typeof db.query.flights>,
	ExtractRelationConfig<typeof db.query.flights>
>;
type Test2 = Test1["with"]


type TTSchema = ExtractFullSchema<typeof db.query.flights>;
type TTTableConfig = ExtractRelationConfig<typeof db.query.flights>;
type aze1 = TTTableConfig["relations"]
type aze2 = Keys<aze1>;

type DBQueryConfig2 = {
	with: {
		[K in keyof TTTableConfig["relations"]]?:
			true |
			DBQueryConfig<
				TTTableConfig["relations"][K] extends One ? 'one' : 'many',
				false,
				TTSchema,
				FindTableByDBName<TTSchema, TTTableConfig['relations'][K]['referencedTableName']>
			>;
	};
};

