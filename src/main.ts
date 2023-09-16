import {db} from "./db/db";


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
