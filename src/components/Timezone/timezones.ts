/*
This data is scraped from gogole calender settings: https://calendar.google.com/calendar/u/0/r/settings

Date scraped: "Tue Jan 26 2021 21:40:25 GMT-0800 (Pacific Standard Time)"
*/
const timezones = [
	{ ianaName: 'Pacific/Niue', text: '(GMT-11:00) Niue Time' },
	{ ianaName: 'Pacific/Pago_Pago', text: '(GMT-11:00) Samoa Standard Time' },
	{
		ianaName: 'Pacific/Rarotonga',
		text: '(GMT-10:00) Cook Islands Standard Time'
	},
	{
		ianaName: 'Pacific/Honolulu',
		text: '(GMT-10:00) Hawaii-Aleutian Standard Time'
	},
	{ ianaName: 'America/Adak', text: '(GMT-10:00) Hawaii-Aleutian Time' },
	{ ianaName: 'Pacific/Tahiti', text: '(GMT-10:00) Tahiti Time' },
	{ ianaName: 'Pacific/Marquesas', text: '(GMT-09:30) Marquesas Time' },
	{
		ianaName: 'America/Anchorage',
		text: '(GMT-09:00) Alaska Time - Anchorage'
	},
	{ ianaName: 'America/Juneau', text: '(GMT-09:00) Alaska Time - Juneau' },
	{
		ianaName: 'America/Metlakatla',
		text: '(GMT-09:00) Alaska Time - Metlakatla'
	},
	{ ianaName: 'America/Nome', text: '(GMT-09:00) Alaska Time - Nome' },
	{ ianaName: 'America/Sitka', text: '(GMT-09:00) Alaska Time - Sitka' },
	{ ianaName: 'America/Yakutat', text: '(GMT-09:00) Alaska Time - Yakutat' },
	{ ianaName: 'Pacific/Gambier', text: '(GMT-09:00) Gambier Time' },
	{
		ianaName: 'America/Los_Angeles',
		text: '(GMT-08:00) Pacific Time - Los Angeles'
	},
	{ ianaName: 'America/Tijuana', text: '(GMT-08:00) Pacific Time - Tijuana' },
	{
		ianaName: 'America/Vancouver',
		text: '(GMT-08:00) Pacific Time - Vancouver'
	},
	{ ianaName: 'Pacific/Pitcairn', text: '(GMT-08:00) Pitcairn Time' },
	{
		ianaName: 'America/Hermosillo',
		text: '(GMT-07:00) Mexican Pacific Standard Time'
	},
	{
		ianaName: 'America/Chihuahua',
		text: '(GMT-07:00) Mexican Pacific Time - Chihuahua'
	},
	{
		ianaName: 'America/Mazatlan',
		text: '(GMT-07:00) Mexican Pacific Time - Mazatlan'
	},
	{
		ianaName: 'America/Creston',
		text: '(GMT-07:00) Mountain Standard Time - Creston'
	},
	{
		ianaName: 'America/Dawson_Creek',
		text: '(GMT-07:00) Mountain Standard Time - Dawson Creek'
	},
	{
		ianaName: 'America/Fort_Nelson',
		text: '(GMT-07:00) Mountain Standard Time - Fort Nelson'
	},
	{
		ianaName: 'America/Phoenix',
		text: '(GMT-07:00) Mountain Standard Time - Phoenix'
	},
	{ ianaName: 'America/Boise', text: '(GMT-07:00) Mountain Time - Boise' },
	{
		ianaName: 'America/Cambridge_Bay',
		text: '(GMT-07:00) Mountain Time - Cambridge Bay'
	},
	{ ianaName: 'America/Dawson', text: '(GMT-07:00) Mountain Time - Dawson' },
	{ ianaName: 'America/Denver', text: '(GMT-07:00) Mountain Time - Denver' },
	{
		ianaName: 'America/Edmonton',
		text: '(GMT-07:00) Mountain Time - Edmonton'
	},
	{ ianaName: 'America/Inuvik', text: '(GMT-07:00) Mountain Time - Inuvik' },
	{
		ianaName: 'America/Ojinaga',
		text: '(GMT-07:00) Mountain Time - Ojinaga'
	},
	{
		ianaName: 'America/Whitehorse',
		text: '(GMT-07:00) Mountain Time - Whitehorse'
	},
	{
		ianaName: 'America/Yellowknife',
		text: '(GMT-07:00) Mountain Time - Yellowknife'
	},
	{
		ianaName: 'America/Belize',
		text: '(GMT-06:00) Central Standard Time - Belize'
	},
	{
		ianaName: 'America/Costa_Rica',
		text: '(GMT-06:00) Central Standard Time - Costa Rica'
	},
	{
		ianaName: 'America/El_Salvador',
		text: '(GMT-06:00) Central Standard Time - El Salvador'
	},
	{
		ianaName: 'America/Guatemala',
		text: '(GMT-06:00) Central Standard Time - Guatemala'
	},
	{
		ianaName: 'America/Managua',
		text: '(GMT-06:00) Central Standard Time - Managua'
	},
	{
		ianaName: 'America/Regina',
		text: '(GMT-06:00) Central Standard Time - Regina'
	},
	{
		ianaName: 'America/Swift_Current',
		text: '(GMT-06:00) Central Standard Time - Swift Current'
	},
	{
		ianaName: 'America/Tegucigalpa',
		text: '(GMT-06:00) Central Standard Time - Tegucigalpa'
	},
	{
		ianaName: 'America/Bahia_Banderas',
		text: '(GMT-06:00) Central Time - Bahia Banderas'
	},
	{
		ianaName: 'America/North_Dakota/Beulah',
		text: '(GMT-06:00) Central Time - Beulah, North Dakota'
	},
	{
		ianaName: 'America/North_Dakota/Center',
		text: '(GMT-06:00) Central Time - Center, North Dakota'
	},
	{ ianaName: 'America/Chicago', text: '(GMT-06:00) Central Time - Chicago' },
	{
		ianaName: 'America/Indiana/Knox',
		text: '(GMT-06:00) Central Time - Knox, Indiana'
	},
	{
		ianaName: 'America/Matamoros',
		text: '(GMT-06:00) Central Time - Matamoros'
	},
	{
		ianaName: 'America/Menominee',
		text: '(GMT-06:00) Central Time - Menominee'
	},
	{ ianaName: 'America/Merida', text: '(GMT-06:00) Central Time - Merida' },
	{
		ianaName: 'America/Mexico_City',
		text: '(GMT-06:00) Central Time - Mexico City'
	},
	{
		ianaName: 'America/Monterrey',
		text: '(GMT-06:00) Central Time - Monterrey'
	},
	{
		ianaName: 'America/North_Dakota/New_Salem',
		text: '(GMT-06:00) Central Time - New Salem, North Dakota'
	},
	{
		ianaName: 'America/Rainy_River',
		text: '(GMT-06:00) Central Time - Rainy River'
	},
	{
		ianaName: 'America/Rankin_Inlet',
		text: '(GMT-06:00) Central Time - Rankin Inlet'
	},
	{
		ianaName: 'America/Resolute',
		text: '(GMT-06:00) Central Time - Resolute'
	},
	{
		ianaName: 'America/Indiana/Tell_City',
		text: '(GMT-06:00) Central Time - Tell City, Indiana'
	},
	{
		ianaName: 'America/Winnipeg',
		text: '(GMT-06:00) Central Time - Winnipeg'
	},
	{ ianaName: 'Pacific/Galapagos', text: '(GMT-06:00) Galapagos Time' },
	{
		ianaName: 'America/Eirunepe',
		text: '(GMT-05:00) Acre Standard Time - Eirunepe'
	},
	{
		ianaName: 'America/Rio_Branco',
		text: '(GMT-05:00) Acre Standard Time - Rio Branco'
	},
	{ ianaName: 'America/Bogota', text: '(GMT-05:00) Colombia Standard Time' },
	{ ianaName: 'America/Havana', text: '(GMT-05:00) Cuba Time' },
	{ ianaName: 'Pacific/Easter', text: '(GMT-05:00) Easter Island Time' },
	{
		ianaName: 'America/Atikokan',
		text: '(GMT-05:00) Eastern Standard Time - Atikokan'
	},
	{
		ianaName: 'America/Cancun',
		text: '(GMT-05:00) Eastern Standard Time - Cancun'
	},
	{
		ianaName: 'America/Jamaica',
		text: '(GMT-05:00) Eastern Standard Time - Jamaica'
	},
	{
		ianaName: 'America/Panama',
		text: '(GMT-05:00) Eastern Standard Time - Panama'
	},
	{ ianaName: 'America/Detroit', text: '(GMT-05:00) Eastern Time - Detroit' },
	{
		ianaName: 'America/Grand_Turk',
		text: '(GMT-05:00) Eastern Time - Grand Turk'
	},
	{
		ianaName: 'America/Indiana/Indianapolis',
		text: '(GMT-05:00) Eastern Time - Indianapolis'
	},
	{ ianaName: 'America/Iqaluit', text: '(GMT-05:00) Eastern Time - Iqaluit' },
	{
		ianaName: 'America/Kentucky/Louisville',
		text: '(GMT-05:00) Eastern Time - Louisville'
	},
	{
		ianaName: 'America/Indiana/Marengo',
		text: '(GMT-05:00) Eastern Time - Marengo, Indiana'
	},
	{
		ianaName: 'America/Kentucky/Monticello',
		text: '(GMT-05:00) Eastern Time - Monticello, Kentucky'
	},
	{ ianaName: 'America/Nassau', text: '(GMT-05:00) Eastern Time - Nassau' },
	{
		ianaName: 'America/New_York',
		text: '(GMT-05:00) Eastern Time - New York'
	},
	{ ianaName: 'America/Nipigon', text: '(GMT-05:00) Eastern Time - Nipigon' },
	{
		ianaName: 'America/Pangnirtung',
		text: '(GMT-05:00) Eastern Time - Pangnirtung'
	},
	{
		ianaName: 'America/Indiana/Petersburg',
		text: '(GMT-05:00) Eastern Time - Petersburg, Indiana'
	},
	{
		ianaName: 'America/Port-au-Prince',
		text: '(GMT-05:00) Eastern Time - Port-au-Prince'
	},
	{
		ianaName: 'America/Thunder_Bay',
		text: '(GMT-05:00) Eastern Time - Thunder Bay'
	},
	{ ianaName: 'America/Toronto', text: '(GMT-05:00) Eastern Time - Toronto' },
	{
		ianaName: 'America/Indiana/Vevay',
		text: '(GMT-05:00) Eastern Time - Vevay, Indiana'
	},
	{
		ianaName: 'America/Indiana/Vincennes',
		text: '(GMT-05:00) Eastern Time - Vincennes, Indiana'
	},
	{
		ianaName: 'America/Indiana/Winamac',
		text: '(GMT-05:00) Eastern Time - Winamac, Indiana'
	},
	{ ianaName: 'America/Guayaquil', text: '(GMT-05:00) Ecuador Time' },
	{ ianaName: 'America/Lima', text: '(GMT-05:00) Peru Standard Time' },
	{
		ianaName: 'America/Boa_Vista',
		text: '(GMT-04:00) Amazon Standard Time - Boa Vista'
	},
	{
		ianaName: 'America/Campo_Grande',
		text: '(GMT-04:00) Amazon Standard Time - Campo Grande'
	},
	{
		ianaName: 'America/Cuiaba',
		text: '(GMT-04:00) Amazon Standard Time - Cuiaba'
	},
	{
		ianaName: 'America/Manaus',
		text: '(GMT-04:00) Amazon Standard Time - Manaus'
	},
	{
		ianaName: 'America/Porto_Velho',
		text: '(GMT-04:00) Amazon Standard Time - Porto Velho'
	},
	{
		ianaName: 'America/Barbados',
		text: '(GMT-04:00) Atlantic Standard Time - Barbados'
	},
	{
		ianaName: 'America/Blanc-Sablon',
		text: '(GMT-04:00) Atlantic Standard Time - Blanc-Sablon'
	},
	{
		ianaName: 'America/Curacao',
		text: '(GMT-04:00) Atlantic Standard Time - Curaçao'
	},
	{
		ianaName: 'America/Martinique',
		text: '(GMT-04:00) Atlantic Standard Time - Martinique'
	},
	{
		ianaName: 'America/Port_of_Spain',
		text: '(GMT-04:00) Atlantic Standard Time - Port of Spain'
	},
	{
		ianaName: 'America/Puerto_Rico',
		text: '(GMT-04:00) Atlantic Standard Time - Puerto Rico'
	},
	{
		ianaName: 'America/Santo_Domingo',
		text: '(GMT-04:00) Atlantic Standard Time - Santo Domingo'
	},
	{
		ianaName: 'Atlantic/Bermuda',
		text: '(GMT-04:00) Atlantic Time - Bermuda'
	},
	{
		ianaName: 'America/Glace_Bay',
		text: '(GMT-04:00) Atlantic Time - Glace Bay'
	},
	{
		ianaName: 'America/Goose_Bay',
		text: '(GMT-04:00) Atlantic Time - Goose Bay'
	},
	{
		ianaName: 'America/Halifax',
		text: '(GMT-04:00) Atlantic Time - Halifax'
	},
	{
		ianaName: 'America/Moncton',
		text: '(GMT-04:00) Atlantic Time - Moncton'
	},
	{ ianaName: 'America/Thule', text: '(GMT-04:00) Atlantic Time - Thule' },
	{ ianaName: 'America/La_Paz', text: '(GMT-04:00) Bolivia Time' },
	{ ianaName: 'America/Guyana', text: '(GMT-04:00) Guyana Time' },
	{ ianaName: 'America/Caracas', text: '(GMT-04:00) Venezuela Time' },
	{ ianaName: 'America/St_Johns', text: '(GMT-03:30) Newfoundland Time' },
	{
		ianaName: 'America/Argentina/Buenos_Aires',
		text: '(GMT-03:00) Argentina Standard Time - Buenos Aires'
	},
	{
		ianaName: 'America/Argentina/Catamarca',
		text: '(GMT-03:00) Argentina Standard Time - Catamarca'
	},
	{
		ianaName: 'America/Argentina/Cordoba',
		text: '(GMT-03:00) Argentina Standard Time - Cordoba'
	},
	{
		ianaName: 'America/Argentina/Jujuy',
		text: '(GMT-03:00) Argentina Standard Time - Jujuy'
	},
	{
		ianaName: 'America/Argentina/La_Rioja',
		text: '(GMT-03:00) Argentina Standard Time - La Rioja'
	},
	{
		ianaName: 'America/Argentina/Mendoza',
		text: '(GMT-03:00) Argentina Standard Time - Mendoza'
	},
	{
		ianaName: 'America/Argentina/Rio_Gallegos',
		text: '(GMT-03:00) Argentina Standard Time - Rio Gallegos'
	},
	{
		ianaName: 'America/Argentina/Salta',
		text: '(GMT-03:00) Argentina Standard Time - Salta'
	},
	{
		ianaName: 'America/Argentina/San_Juan',
		text: '(GMT-03:00) Argentina Standard Time - San Juan'
	},
	{
		ianaName: 'America/Argentina/San_Luis',
		text: '(GMT-03:00) Argentina Standard Time - San Luis'
	},
	{
		ianaName: 'America/Argentina/Tucuman',
		text: '(GMT-03:00) Argentina Standard Time - Tucuman'
	},
	{
		ianaName: 'America/Argentina/Ushuaia',
		text: '(GMT-03:00) Argentina Standard Time - Ushuaia'
	},
	{
		ianaName: 'America/Araguaina',
		text: '(GMT-03:00) Brasilia Standard Time - Araguaina'
	},
	{
		ianaName: 'America/Bahia',
		text: '(GMT-03:00) Brasilia Standard Time - Bahia'
	},
	{
		ianaName: 'America/Belem',
		text: '(GMT-03:00) Brasilia Standard Time - Belem'
	},
	{
		ianaName: 'America/Fortaleza',
		text: '(GMT-03:00) Brasilia Standard Time - Fortaleza'
	},
	{
		ianaName: 'America/Maceio',
		text: '(GMT-03:00) Brasilia Standard Time - Maceio'
	},
	{
		ianaName: 'America/Recife',
		text: '(GMT-03:00) Brasilia Standard Time - Recife'
	},
	{
		ianaName: 'America/Santarem',
		text: '(GMT-03:00) Brasilia Standard Time - Santarem'
	},
	{
		ianaName: 'America/Sao_Paulo',
		text: '(GMT-03:00) Brasilia Standard Time - Sao Paulo'
	},
	{ ianaName: 'America/Santiago', text: '(GMT-03:00) Chile Time' },
	{
		ianaName: 'Atlantic/Stanley',
		text: '(GMT-03:00) Falkland Islands Standard Time'
	},
	{ ianaName: 'America/Cayenne', text: '(GMT-03:00) French Guiana Time' },
	{ ianaName: 'Antarctica/Palmer', text: '(GMT-03:00) Palmer Time' },
	{ ianaName: 'America/Asuncion', text: '(GMT-03:00) Paraguay Time' },
	{ ianaName: 'America/Punta_Arenas', text: '(GMT-03:00) Punta Arenas Time' },
	{ ianaName: 'Antarctica/Rothera', text: '(GMT-03:00) Rothera Time' },
	{
		ianaName: 'America/Miquelon',
		text: '(GMT-03:00) St. Pierre & Miquelon Time'
	},
	{ ianaName: 'America/Paramaribo', text: '(GMT-03:00) Suriname Time' },
	{
		ianaName: 'America/Montevideo',
		text: '(GMT-03:00) Uruguay Standard Time'
	},
	{ ianaName: 'America/Nuuk', text: '(GMT-03:00) West Greenland Time' },
	{
		ianaName: 'America/Noronha',
		text: '(GMT-02:00) Fernando de Noronha Standard Time'
	},
	{
		ianaName: 'Atlantic/South_Georgia',
		text: '(GMT-02:00) South Georgia Time'
	},
	{ ianaName: 'Atlantic/Azores', text: '(GMT-01:00) Azores Time' },
	{
		ianaName: 'Atlantic/Cape_Verde',
		text: '(GMT-01:00) Cape Verde Standard Time'
	},
	{
		ianaName: 'America/Scoresbysund',
		text: '(GMT-01:00) East Greenland Time'
	},
	{ ianaName: 'UTC', text: '(GMT+00:00) Coordinated Universal Time' },
	{ ianaName: 'Etc/GMT', text: '(GMT+00:00) Greenwich Mean Time' },
	{
		ianaName: 'Africa/Abidjan',
		text: '(GMT+00:00) Greenwich Mean Time - Abidjan'
	},
	{
		ianaName: 'Africa/Accra',
		text: '(GMT+00:00) Greenwich Mean Time - Accra'
	},
	{
		ianaName: 'Africa/Bissau',
		text: '(GMT+00:00) Greenwich Mean Time - Bissau'
	},
	{
		ianaName: 'America/Danmarkshavn',
		text: '(GMT+00:00) Greenwich Mean Time - Danmarkshavn'
	},
	{
		ianaName: 'Africa/Monrovia',
		text: '(GMT+00:00) Greenwich Mean Time - Monrovia'
	},
	{
		ianaName: 'Atlantic/Reykjavik',
		text: '(GMT+00:00) Greenwich Mean Time - Reykjavik'
	},
	{
		ianaName: 'Africa/Sao_Tome',
		text: '(GMT+00:00) Greenwich Mean Time - São Tomé'
	},
	{ ianaName: 'Europe/Dublin', text: '(GMT+00:00) Ireland Time' },
	{ ianaName: 'Antarctica/Troll', text: '(GMT+00:00) Troll Time' },
	{ ianaName: 'Europe/London', text: '(GMT+00:00) United Kingdom Time' },
	{
		ianaName: 'Atlantic/Canary',
		text: '(GMT+00:00) Western European Time - Canary'
	},
	{
		ianaName: 'Atlantic/Faroe',
		text: '(GMT+00:00) Western European Time - Faroe'
	},
	{
		ianaName: 'Europe/Lisbon',
		text: '(GMT+00:00) Western European Time - Lisbon'
	},
	{
		ianaName: 'Atlantic/Madeira',
		text: '(GMT+00:00) Western European Time - Madeira'
	},
	{
		ianaName: 'Africa/Algiers',
		text: '(GMT+01:00) Central European Standard Time - Algiers'
	},
	{
		ianaName: 'Africa/Tunis',
		text: '(GMT+01:00) Central European Standard Time - Tunis'
	},
	{
		ianaName: 'Europe/Amsterdam',
		text: '(GMT+01:00) Central European Time - Amsterdam'
	},
	{
		ianaName: 'Europe/Andorra',
		text: '(GMT+01:00) Central European Time - Andorra'
	},
	{
		ianaName: 'Europe/Belgrade',
		text: '(GMT+01:00) Central European Time - Belgrade'
	},
	{
		ianaName: 'Europe/Berlin',
		text: '(GMT+01:00) Central European Time - Berlin'
	},
	{
		ianaName: 'Europe/Brussels',
		text: '(GMT+01:00) Central European Time - Brussels'
	},
	{
		ianaName: 'Europe/Budapest',
		text: '(GMT+01:00) Central European Time - Budapest'
	},
	{
		ianaName: 'Africa/Ceuta',
		text: '(GMT+01:00) Central European Time - Ceuta'
	},
	{
		ianaName: 'Europe/Copenhagen',
		text: '(GMT+01:00) Central European Time - Copenhagen'
	},
	{
		ianaName: 'Europe/Gibraltar',
		text: '(GMT+01:00) Central European Time - Gibraltar'
	},
	{
		ianaName: 'Europe/Luxembourg',
		text: '(GMT+01:00) Central European Time - Luxembourg'
	},
	{
		ianaName: 'Europe/Madrid',
		text: '(GMT+01:00) Central European Time - Madrid'
	},
	{
		ianaName: 'Europe/Malta',
		text: '(GMT+01:00) Central European Time - Malta'
	},
	{
		ianaName: 'Europe/Monaco',
		text: '(GMT+01:00) Central European Time - Monaco'
	},
	{
		ianaName: 'Europe/Oslo',
		text: '(GMT+01:00) Central European Time - Oslo'
	},
	{
		ianaName: 'Europe/Paris',
		text: '(GMT+01:00) Central European Time - Paris'
	},
	{
		ianaName: 'Europe/Prague',
		text: '(GMT+01:00) Central European Time - Prague'
	},
	{
		ianaName: 'Europe/Rome',
		text: '(GMT+01:00) Central European Time - Rome'
	},
	{
		ianaName: 'Europe/Stockholm',
		text: '(GMT+01:00) Central European Time - Stockholm'
	},
	{
		ianaName: 'Europe/Tirane',
		text: '(GMT+01:00) Central European Time - Tirane'
	},
	{
		ianaName: 'Europe/Vienna',
		text: '(GMT+01:00) Central European Time - Vienna'
	},
	{
		ianaName: 'Europe/Warsaw',
		text: '(GMT+01:00) Central European Time - Warsaw'
	},
	{
		ianaName: 'Europe/Zurich',
		text: '(GMT+01:00) Central European Time - Zurich'
	},
	{ ianaName: 'Africa/Casablanca', text: '(GMT+01:00) Morocco Time' },
	{
		ianaName: 'Africa/Lagos',
		text: '(GMT+01:00) West Africa Standard Time - Lagos'
	},
	{
		ianaName: 'Africa/Ndjamena',
		text: '(GMT+01:00) West Africa Standard Time - Ndjamena'
	},
	{ ianaName: 'Africa/El_Aaiun', text: '(GMT+01:00) Western Sahara Time' },
	{
		ianaName: 'Africa/Khartoum',
		text: '(GMT+02:00) Central Africa Time - Khartoum'
	},
	{
		ianaName: 'Africa/Maputo',
		text: '(GMT+02:00) Central Africa Time - Maputo'
	},
	{
		ianaName: 'Africa/Windhoek',
		text: '(GMT+02:00) Central Africa Time - Windhoek'
	},
	{
		ianaName: 'Africa/Cairo',
		text: '(GMT+02:00) Eastern European Standard Time - Cairo'
	},
	{
		ianaName: 'Europe/Kaliningrad',
		text: '(GMT+02:00) Eastern European Standard Time - Kaliningrad'
	},
	{
		ianaName: 'Africa/Tripoli',
		text: '(GMT+02:00) Eastern European Standard Time - Tripoli'
	},
	{
		ianaName: 'Asia/Amman',
		text: '(GMT+02:00) Eastern European Time - Amman'
	},
	{
		ianaName: 'Europe/Athens',
		text: '(GMT+02:00) Eastern European Time - Athens'
	},
	{
		ianaName: 'Asia/Beirut',
		text: '(GMT+02:00) Eastern European Time - Beirut'
	},
	{
		ianaName: 'Europe/Bucharest',
		text: '(GMT+02:00) Eastern European Time - Bucharest'
	},
	{
		ianaName: 'Europe/Chisinau',
		text: '(GMT+02:00) Eastern European Time - Chisinau'
	},
	{
		ianaName: 'Asia/Damascus',
		text: '(GMT+02:00) Eastern European Time - Damascus'
	},
	{ ianaName: 'Asia/Gaza', text: '(GMT+02:00) Eastern European Time - Gaza' },
	{
		ianaName: 'Asia/Hebron',
		text: '(GMT+02:00) Eastern European Time - Hebron'
	},
	{
		ianaName: 'Europe/Helsinki',
		text: '(GMT+02:00) Eastern European Time - Helsinki'
	},
	{
		ianaName: 'Europe/Kiev',
		text: '(GMT+02:00) Eastern European Time - Kiev'
	},
	{
		ianaName: 'Asia/Nicosia',
		text: '(GMT+02:00) Eastern European Time - Nicosia'
	},
	{
		ianaName: 'Europe/Riga',
		text: '(GMT+02:00) Eastern European Time - Riga'
	},
	{
		ianaName: 'Europe/Sofia',
		text: '(GMT+02:00) Eastern European Time - Sofia'
	},
	{
		ianaName: 'Europe/Tallinn',
		text: '(GMT+02:00) Eastern European Time - Tallinn'
	},
	{
		ianaName: 'Europe/Uzhgorod',
		text: '(GMT+02:00) Eastern European Time - Uzhhorod'
	},
	{
		ianaName: 'Europe/Vilnius',
		text: '(GMT+02:00) Eastern European Time - Vilnius'
	},
	{
		ianaName: 'Europe/Zaporozhye',
		text: '(GMT+02:00) Eastern European Time - Zaporozhye'
	},
	{ ianaName: 'Asia/Famagusta', text: '(GMT+02:00) Famagusta Time' },
	{ ianaName: 'Asia/Jerusalem', text: '(GMT+02:00) Israel Time' },
	{
		ianaName: 'Africa/Johannesburg',
		text: '(GMT+02:00) South Africa Standard Time'
	},
	{
		ianaName: 'Asia/Baghdad',
		text: '(GMT+03:00) Arabian Standard Time - Baghdad'
	},
	{
		ianaName: 'Asia/Qatar',
		text: '(GMT+03:00) Arabian Standard Time - Qatar'
	},
	{
		ianaName: 'Asia/Riyadh',
		text: '(GMT+03:00) Arabian Standard Time - Riyadh'
	},
	{ ianaName: 'Africa/Juba', text: '(GMT+03:00) East Africa Time - Juba' },
	{
		ianaName: 'Africa/Nairobi',
		text: '(GMT+03:00) East Africa Time - Nairobi'
	},
	{ ianaName: 'Europe/Kirov', text: '(GMT+03:00) Kirov Time' },
	{
		ianaName: 'Europe/Minsk',
		text: '(GMT+03:00) Moscow Standard Time - Minsk'
	},
	{
		ianaName: 'Europe/Moscow',
		text: '(GMT+03:00) Moscow Standard Time - Moscow'
	},
	{
		ianaName: 'Europe/Simferopol',
		text: '(GMT+03:00) Moscow Standard Time - Simferopol'
	},
	{ ianaName: 'Antarctica/Syowa', text: '(GMT+03:00) Syowa Time' },
	{ ianaName: 'Europe/Istanbul', text: '(GMT+03:00) Turkey Time' },
	{
		ianaName: 'Europe/Volgograd',
		text: '(GMT+04:00) Volgograd Standard Time'
	},
	{ ianaName: 'Asia/Tehran', text: '(GMT+03:30) Iran Time' },
	{ ianaName: 'Asia/Yerevan', text: '(GMT+04:00) Armenia Standard Time' },
	{ ianaName: 'Europe/Astrakhan', text: '(GMT+04:00) Astrakhan Time' },
	{ ianaName: 'Asia/Baku', text: '(GMT+04:00) Azerbaijan Standard Time' },
	{ ianaName: 'Asia/Tbilisi', text: '(GMT+04:00) Georgia Standard Time' },
	{ ianaName: 'Asia/Dubai', text: '(GMT+04:00) Gulf Standard Time' },
	{
		ianaName: 'Indian/Mauritius',
		text: '(GMT+04:00) Mauritius Standard Time'
	},
	{ ianaName: 'Indian/Reunion', text: '(GMT+04:00) Réunion Time' },
	{ ianaName: 'Europe/Samara', text: '(GMT+04:00) Samara Standard Time' },
	{ ianaName: 'Europe/Saratov', text: '(GMT+04:00) Saratov Time' },
	{ ianaName: 'Indian/Mahe', text: '(GMT+04:00) Seychelles Time' },
	{ ianaName: 'Europe/Ulyanovsk', text: '(GMT+04:00) Ulyanovsk Time' },
	{ ianaName: 'Asia/Kabul', text: '(GMT+04:30) Afghanistan Time' },
	{
		ianaName: 'Indian/Kerguelen',
		text: '(GMT+05:00) French Southern & Antarctic Time'
	},
	{ ianaName: 'Indian/Maldives', text: '(GMT+05:00) Maldives Time' },
	{ ianaName: 'Antarctica/Mawson', text: '(GMT+05:00) Mawson Time' },
	{ ianaName: 'Asia/Karachi', text: '(GMT+05:00) Pakistan Standard Time' },
	{ ianaName: 'Asia/Dushanbe', text: '(GMT+05:00) Tajikistan Time' },
	{
		ianaName: 'Asia/Ashgabat',
		text: '(GMT+05:00) Turkmenistan Standard Time'
	},
	{
		ianaName: 'Asia/Samarkand',
		text: '(GMT+05:00) Uzbekistan Standard Time - Samarkand'
	},
	{
		ianaName: 'Asia/Tashkent',
		text: '(GMT+05:00) Uzbekistan Standard Time - Tashkent'
	},
	{
		ianaName: 'Asia/Aqtau',
		text: '(GMT+05:00) West Kazakhstan Time - Aqtau'
	},
	{
		ianaName: 'Asia/Aqtobe',
		text: '(GMT+05:00) West Kazakhstan Time - Aqtobe'
	},
	{
		ianaName: 'Asia/Atyrau',
		text: '(GMT+05:00) West Kazakhstan Time - Atyrau'
	},
	{ ianaName: 'Asia/Oral', text: '(GMT+05:00) West Kazakhstan Time - Oral' },
	{
		ianaName: 'Asia/Qyzylorda',
		text: '(GMT+05:00) West Kazakhstan Time - Qyzylorda'
	},
	{
		ianaName: 'Asia/Yekaterinburg',
		text: '(GMT+05:00) Yekaterinburg Standard Time'
	},
	{
		ianaName: 'Asia/Colombo',
		text: '(GMT+05:30) India Standard Time - Colombo'
	},
	{
		ianaName: 'Asia/Kolkata',
		text: '(GMT+05:30) India Standard Time - Kolkata'
	},
	{ ianaName: 'Asia/Kathmandu', text: '(GMT+05:45) Nepal Time' },
	{ ianaName: 'Asia/Dhaka', text: '(GMT+06:00) Bangladesh Standard Time' },
	{ ianaName: 'Asia/Thimphu', text: '(GMT+06:00) Bhutan Time' },
	{
		ianaName: 'Asia/Almaty',
		text: '(GMT+06:00) East Kazakhstan Time - Almaty'
	},
	{
		ianaName: 'Asia/Qostanay',
		text: '(GMT+06:00) East Kazakhstan Time - Kostanay'
	},
	{ ianaName: 'Indian/Chagos', text: '(GMT+06:00) Indian Ocean Time' },
	{ ianaName: 'Asia/Bishkek', text: '(GMT+06:00) Kyrgyzstan Time' },
	{ ianaName: 'Asia/Omsk', text: '(GMT+06:00) Omsk Standard Time' },
	{ ianaName: 'Asia/Urumqi', text: '(GMT+06:00) Urumqi Time' },
	{ ianaName: 'Antarctica/Vostok', text: '(GMT+06:00) Vostok Time' },
	{ ianaName: 'Indian/Cocos', text: '(GMT+06:30) Cocos Islands Time' },
	{ ianaName: 'Asia/Yangon', text: '(GMT+06:30) Myanmar Time' },
	{ ianaName: 'Asia/Barnaul', text: '(GMT+07:00) Barnaul Time' },
	{ ianaName: 'Indian/Christmas', text: '(GMT+07:00) Christmas Island Time' },
	{ ianaName: 'Antarctica/Davis', text: '(GMT+07:00) Davis Time' },
	{ ianaName: 'Asia/Hovd', text: '(GMT+07:00) Hovd Standard Time' },
	{ ianaName: 'Asia/Bangkok', text: '(GMT+07:00) Indochina Time - Bangkok' },
	{
		ianaName: 'Asia/Ho_Chi_Minh',
		text: '(GMT+07:00) Indochina Time - Ho Chi Minh City'
	},
	{
		ianaName: 'Asia/Krasnoyarsk',
		text: '(GMT+07:00) Krasnoyarsk Standard Time - Krasnoyarsk'
	},
	{
		ianaName: 'Asia/Novokuznetsk',
		text: '(GMT+07:00) Krasnoyarsk Standard Time - Novokuznetsk'
	},
	{
		ianaName: 'Asia/Novosibirsk',
		text: '(GMT+07:00) Novosibirsk Standard Time'
	},
	{ ianaName: 'Asia/Tomsk', text: '(GMT+07:00) Tomsk Time' },
	{
		ianaName: 'Asia/Jakarta',
		text: '(GMT+07:00) Western Indonesia Time - Jakarta'
	},
	{
		ianaName: 'Asia/Pontianak',
		text: '(GMT+07:00) Western Indonesia Time - Pontianak'
	},
	{
		ianaName: 'Australia/Perth',
		text: '(GMT+08:00) Australian Western Standard Time'
	},
	{ ianaName: 'Asia/Brunei', text: '(GMT+08:00) Brunei Darussalam Time' },
	{ ianaName: 'Asia/Makassar', text: '(GMT+08:00) Central Indonesia Time' },
	{ ianaName: 'Asia/Macau', text: '(GMT+08:00) China Standard Time - Macao' },
	{
		ianaName: 'Asia/Shanghai',
		text: '(GMT+08:00) China Standard Time - Shanghai'
	},
	{ ianaName: 'Asia/Hong_Kong', text: '(GMT+08:00) Hong Kong Standard Time' },
	{ ianaName: 'Asia/Irkutsk', text: '(GMT+08:00) Irkutsk Standard Time' },
	{
		ianaName: 'Asia/Kuala_Lumpur',
		text: '(GMT+08:00) Malaysia Time - Kuala Lumpur'
	},
	{ ianaName: 'Asia/Kuching', text: '(GMT+08:00) Malaysia Time - Kuching' },
	{ ianaName: 'Asia/Manila', text: '(GMT+08:00) Philippine Standard Time' },
	{ ianaName: 'Asia/Singapore', text: '(GMT+08:00) Singapore Standard Time' },
	{ ianaName: 'Asia/Taipei', text: '(GMT+08:00) Taipei Standard Time' },
	{
		ianaName: 'Asia/Choibalsan',
		text: '(GMT+08:00) Ulaanbaatar Standard Time - Choibalsan'
	},
	{
		ianaName: 'Asia/Ulaanbaatar',
		text: '(GMT+08:00) Ulaanbaatar Standard Time - Ulaanbaatar'
	},
	{
		ianaName: 'Australia/Eucla',
		text: '(GMT+08:45) Australian Central Western Standard Time'
	},
	{ ianaName: 'Asia/Dili', text: '(GMT+09:00) East Timor Time' },
	{ ianaName: 'Asia/Jayapura', text: '(GMT+09:00) Eastern Indonesia Time' },
	{ ianaName: 'Asia/Tokyo', text: '(GMT+09:00) Japan Standard Time' },
	{
		ianaName: 'Asia/Pyongyang',
		text: '(GMT+09:00) Korean Standard Time - Pyongyang'
	},
	{
		ianaName: 'Asia/Seoul',
		text: '(GMT+09:00) Korean Standard Time - Seoul'
	},
	{ ianaName: 'Pacific/Palau', text: '(GMT+09:00) Palau Time' },
	{
		ianaName: 'Asia/Chita',
		text: '(GMT+09:00) Yakutsk Standard Time - Chita'
	},
	{
		ianaName: 'Asia/Khandyga',
		text: '(GMT+09:00) Yakutsk Standard Time - Khandyga'
	},
	{
		ianaName: 'Asia/Yakutsk',
		text: '(GMT+09:00) Yakutsk Standard Time - Yakutsk'
	},
	{
		ianaName: 'Australia/Darwin',
		text: '(GMT+09:30) Australian Central Standard Time'
	},
	{
		ianaName: 'Australia/Brisbane',
		text: '(GMT+10:00) Australian Eastern Standard Time - Brisbane'
	},
	{
		ianaName: 'Australia/Lindeman',
		text: '(GMT+10:00) Australian Eastern Standard Time - Lindeman'
	},
	{ ianaName: 'Pacific/Guam', text: '(GMT+10:00) Chamorro Standard Time' },
	{ ianaName: 'Pacific/Chuuk', text: '(GMT+10:00) Chuuk Time' },
	{
		ianaName: 'Antarctica/DumontDUrville',
		text: '(GMT+10:00) Dumont-d’Urville Time'
	},
	{
		ianaName: 'Pacific/Port_Moresby',
		text: '(GMT+10:00) Papua New Guinea Time'
	},
	{
		ianaName: 'Asia/Ust-Nera',
		text: '(GMT+10:00) Vladivostok Standard Time - Ust-Nera'
	},
	{
		ianaName: 'Asia/Vladivostok',
		text: '(GMT+10:00) Vladivostok Standard Time - Vladivostok'
	},
	{
		ianaName: 'Australia/Adelaide',
		text: '(GMT+10:30) Central Australia Time - Adelaide'
	},
	{
		ianaName: 'Australia/Broken_Hill',
		text: '(GMT+10:30) Central Australia Time - Broken Hill'
	},
	{ ianaName: 'Pacific/Bougainville', text: '(GMT+11:00) Bougainville Time' },
	{ ianaName: 'Antarctica/Casey', text: '(GMT+11:00) Casey Time' },
	{
		ianaName: 'Australia/Hobart',
		text: '(GMT+11:00) Eastern Australia Time - Hobart'
	},
	{
		ianaName: 'Antarctica/Macquarie',
		text: '(GMT+11:00) Eastern Australia Time - Macquarie'
	},
	{
		ianaName: 'Australia/Melbourne',
		text: '(GMT+11:00) Eastern Australia Time - Melbourne'
	},
	{
		ianaName: 'Australia/Sydney',
		text: '(GMT+11:00) Eastern Australia Time - Sydney'
	},
	{ ianaName: 'Pacific/Kosrae', text: '(GMT+11:00) Kosrae Time' },
	{ ianaName: 'Australia/Lord_Howe', text: '(GMT+11:00) Lord Howe Time' },
	{ ianaName: 'Asia/Magadan', text: '(GMT+11:00) Magadan Standard Time' },
	{
		ianaName: 'Pacific/Noumea',
		text: '(GMT+11:00) New Caledonia Standard Time'
	},
	{ ianaName: 'Pacific/Pohnpei', text: '(GMT+11:00) Ponape Time' },
	{ ianaName: 'Asia/Sakhalin', text: '(GMT+11:00) Sakhalin Standard Time' },
	{
		ianaName: 'Pacific/Guadalcanal',
		text: '(GMT+11:00) Solomon Islands Time'
	},
	{ ianaName: 'Asia/Srednekolymsk', text: '(GMT+11:00) Srednekolymsk Time' },
	{ ianaName: 'Pacific/Efate', text: '(GMT+11:00) Vanuatu Standard Time' },
	{ ianaName: 'Asia/Anadyr', text: '(GMT+12:00) Anadyr Standard Time' },
	{ ianaName: 'Pacific/Fiji', text: '(GMT+12:00) Fiji Time' },
	{ ianaName: 'Pacific/Tarawa', text: '(GMT+12:00) Gilbert Islands Time' },
	{
		ianaName: 'Pacific/Kwajalein',
		text: '(GMT+12:00) Marshall Islands Time - Kwajalein'
	},
	{
		ianaName: 'Pacific/Majuro',
		text: '(GMT+12:00) Marshall Islands Time - Majuro'
	},
	{ ianaName: 'Pacific/Nauru', text: '(GMT+12:00) Nauru Time' },
	{ ianaName: 'Pacific/Norfolk', text: '(GMT+12:00) Norfolk Island Time' },
	{
		ianaName: 'Asia/Kamchatka',
		text: '(GMT+12:00) Petropavlovsk-Kamchatski Standard Time'
	},
	{ ianaName: 'Pacific/Funafuti', text: '(GMT+12:00) Tuvalu Time' },
	{ ianaName: 'Pacific/Wake', text: '(GMT+12:00) Wake Island Time' },
	{ ianaName: 'Pacific/Wallis', text: '(GMT+12:00) Wallis & Futuna Time' },
	{ ianaName: 'Pacific/Auckland', text: '(GMT+13:00) New Zealand Time' },
	{ ianaName: 'Pacific/Enderbury', text: '(GMT+13:00) Phoenix Islands Time' },
	{ ianaName: 'Pacific/Fakaofo', text: '(GMT+13:00) Tokelau Time' },
	{ ianaName: 'Pacific/Tongatapu', text: '(GMT+13:00) Tonga Standard Time' },
	{ ianaName: 'Pacific/Chatham', text: '(GMT+13:45) Chatham Time' },
	{ ianaName: 'Pacific/Apia', text: '(GMT+14:00) Apia Time' },
	{ ianaName: 'Pacific/Kiritimati', text: '(GMT+14:00) Line Islands Time' }
]

export default timezones
