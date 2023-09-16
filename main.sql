DROP TABLE IF EXISTS Airports;
DROP TABLE IF EXISTS Airlines;
DROP TABLE IF EXISTS Aircrafts;
DROP TABLE IF EXISTS Flights;


/*AIRPORTS ------------------------------------------------------------------*/
CREATE TABLE Airports (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	name TEXT NOT NULL,
	icao TEXT NOT NULL,
	iata TEXT DEFAULT NULL,
	latitude REAL NOT NULL,
	longitude REAL NOT NULL,
	altitude REAL NOT NULL,
	city TEXT,
	country TEXT,
	UNIQUE (icao)
);

INSERT INTO Airports VALUES
(1247,'Valladolid Airport','LEVD','VLL',41.70610046,-4.851940155,2776,'Valladolid','Spain'),
(1249,'Vitoria/Foronda Airport','LEVT','VIT',42.88280106,-2.7244699,1682,'Vitoria','Spain'),
(1250,'Vigo Airport','LEVX','VGO',42.23180008,-8.62677002,856,'Vigo','Spain'),
(1251,'Santander Airport','LEXJ','SDR',43.42710114,-3.820009947,16,'Santander','Spain'),
(1252,'Zaragoza Air Base','LEZG','ZAZ',41.66619873,-1.04155004,863,'Zaragoza','Spain'),
(1253,'Sevilla Airport','LEZL','SVQ',37.41799927,-5.893109798,112,'Sevilla','Spain'),
(1254,'Calais-Dunkerque Airport','LFAC','CQF',50.96210098,1.954759955,12,'Calais','France'),
(1255,'Péronne-Saint-Quentin Airport','LFAG',NULL,49.8685,3.02958,295,'Peronne','France'),
(1256,'Nangis-Les Loges Airport','LFAI',NULL,48.59619904,3.006789923,428,'Nangis','France'),
(1257,'Bagnoles-de-l Orne-Couterne Airport','LFAO',NULL,48.54579926,-0.38744399,718,'Bagnole-de-l Orne','France'),
(1258,'Albert-Bray Airport','LFAQ','BYF',49.9715004,2.697659969,364,'Albert','France'),
(1259,'Le Touquet-Côte d Opale Airport','LFAT','LTQ',50.51739883,1.620589972,36,'Le Tourquet','France');


/*AIRLINES ------------------------------------------------------------------*/
CREATE TABLE Airlines (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	name TEXT NOT NULL,
	icao TEXT DEFAULT NULL,
	iata TEXT DEFAULT NULL,
	callsign TEXT DEFAULT NULL,
	country TEXT NOT NULL,
	isActive INTEGER NOT NULL
);

INSERT INTO Airlines VALUES
(2009,'Delta Air Lines','DAL','DL','DELTA','United States',1),
(2010,'Delta Engineering Aviation','KMB','','KEMBLEJET','United Kingdom',0),
(2011,'Delta Express International','DLI','','DELTA EXPRESS','Ukraine',0),
(2012,'Delta State University','DSU','','DELTA STATE','United States',0),
(2013,'Denim Air','DNM','','DENIM','Netherlands',1),
(2353,'Firefly','FFM','FY','FIREFLY','Malaysia',1),
(2354,'First Air','FAB','7F','','Canada',1),
(2355,'First Air Transport','JRF','','','Japan',0);


/*AIRCRAFTS -----------------------------------------------------------------*/
CREATE TABLE Aircrafts (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	prgm TEXT NOT NULL,
	acType TEXT NOT NULL,
	msn INTEGER NOT NULL,
	model TEXT NOT NULL,
	actail TEXT DEFAULT NULL,
	eng_mnf TEXT DEFAULT NULL,
	eng_mdl TEXT DEFAULT NULL,
	airline_id INTEGER DEFAULT NULL,
	UNIQUE (prgm,msn),
	CONSTRAINT fk_aircrafts_airline FOREIGN KEY (airline_id) REFERENCES Airlines(id) ON DELETE SET NULL
);

INSERT INTO Aircrafts VALUES
(1,'SA','A320',7856,'320-214','EF-KIG','CFM','CFM5B-6',2009),
(2,'LR','A330',1203,'330-333','EZ-GCS','IAE','V2005-B',NULL),
(3,'A350','A350',113,'350-941','AF-MFK','RR','TRENT5075',2354);


/*FLIGHTS -------------------------------------------------------------------*/
CREATE TABLE Flights (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	aircraft_id INTEGER DEFAULT NULL,
	date TEXT DEFAULT NULL,
	numberStr TEXT DEFAULT NULL,
	airport_from_id INTEGER DEFAULT NULL,
	airport_to_id   INTEGER DEFAULT NULL,
	CONSTRAINT fk_flights_ac   FOREIGN KEY (aircraft_id)     REFERENCES Aircrafts(id) ON DELETE SET NULL,
	CONSTRAINT fk_flights_from FOREIGN KEY (airport_from_id) REFERENCES Airports(id)  ON DELETE SET NULL,
	CONSTRAINT fk_flights_to   FOREIGN KEY (airport_to_id)   REFERENCES Airports(id)  ON DELETE SET NULL
);

INSERT INTO Flights VALUES
(1, 1, '2022-05-28', 'DAL503', 1247, 1259),
(2, 3, '2023-04-01', 'CA36', 1255, 1251);

