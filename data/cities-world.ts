/**
 * Голем избор на градови низ светот (латиница) — престолнини и поголеми центри.
 * Целосна листа на сите населби на Земјата не е практична во еден dropdown;
 * ова покрива најчестите меѓународни локации.
 */
const LINES = `
Kabul
Tirana
Algiers
Andorra la Vella
Luanda
Buenos Aires
Yerevan
Canberra
Vienna
Baku
Nassau
Manama
Dhaka
Bridgetown
Minsk
Brussels
Belmopan
Porto-Novo
Thimphu
Sucre
La Paz
Sarajevo
Gaborone
Brasilia
Bandar Seri Begawan
Sofia
Ouagadougou
Bujumbura
Phnom Penh
Yaounde
Ottawa
Praia
Bangui
N'Djamena
Santiago
Beijing
Bogota
Moroni
Kinshasa
Brazzaville
San Jose
Zagreb
Havana
Nicosia
Prague
Copenhagen
Djibouti
Roseau
Santo Domingo
Quito
Cairo
San Salvador
Malabo
Asmara
Tallinn
Mbabane
Addis Ababa
Suva
Helsinki
Paris
Libreville
Banjul
Tbilisi
Berlin
Accra
Athens
St. George's
Guatemala City
Conakry
Bissau
Georgetown
Port-au-Prince
Tegucigalpa
Budapest
Reykjavik
New Delhi
Jakarta
Tehran
Baghdad
Dublin
Jerusalem
Rome
Kingston
Tokyo
Amman
Astana
Nairobi
Seoul
Pristina
Kuwait City
Bishkek
Vientiane
Riga
Beirut
Maseru
Monrovia
Tripoli
Vaduz
Vilnius
Luxembourg City
Antananarivo
Lilongwe
Kuala Lumpur
Male
Bamako
Valletta
Majuro
Nouakchott
Port Louis
Mexico City
Chisinau
Monaco
Ulaanbaatar
Podgorica
Rabat
Maputo
Windhoek
Kathmandu
Wellington
Managua
Niamey
Abuja
Pyongyang
Oslo
Muscat
Islamabad
Ngerulmud
Panama City
Port Moresby
Asuncion
Lima
Manila
Warsaw
Lisbon
Doha
Bucharest
Moscow
Kigali
Basseterre
Castries
Kingstown
Apia
San Marino
Sao Tome
Riyadh
Dakar
Belgrade
Victoria
Freetown
Singapore
Bratislava
Ljubljana
Honiara
Mogadishu
Pretoria
Cape Town
Juba
Madrid
Colombo
Khartoum
Paramaribo
Stockholm
Bern
Damascus
Taipei
Dushanbe
Dodoma
Bangkok
Lome
Nuku'alofa
Tunis
Ankara
Ashgabat
Funafuti
Kampala
Kyiv
Abu Dhabi
London
Washington D.C.
Montevideo
Tashkent
Port Vila
Hanoi
Sana'a
Lusaka
Harare
Skopje
New York
Los Angeles
Chicago
Houston
Phoenix
Philadelphia
San Antonio
San Diego
Dallas
San Jose
Austin
Jacksonville
Fort Worth
Columbus
Charlotte
San Francisco
Indianapolis
Seattle
Denver
Boston
Nashville
Detroit
Portland
Las Vegas
Baltimore
Atlanta
Miami
Toronto
Vancouver
Montreal
Calgary
Edmonton
Winnipeg
Quebec City
Hamilton
Manchester
Birmingham
Leeds
Glasgow
Liverpool
Bristol
Edinburgh
Cardiff
Belfast
Cork
Galway
Rotterdam
Amsterdam
The Hague
Eindhoven
Munich
Frankfurt
Hamburg
Cologne
Stuttgart
Dusseldorf
Leipzig
Dresden
Nuremberg
Barcelona
Valencia
Seville
Zaragoza
Malaga
Bilbao
Murcia
Porto
Milan
Naples
Turin
Palermo
Genoa
Bologna
Florence
Venice
Zurich
Geneva
Basel
Lausanne
Graz
Linz
Salzburg
Brussels
Antwerp
Ghent
Charleroi
Lyon
Marseille
Toulouse
Nice
Nantes
Strasbourg
Bordeaux
Lille
Aarhus
Odense
Gothenburg
Malmo
Bergen
Trondheim
Krakow
Wroclaw
Poznan
Gdansk
Szczecin
Lodz
Brno
Ostrava
Debrecen
Szeged
Thessaloniki
Patras
Cluj-Napoca
Timisoara
Iasi
Plovdiv
Varna
Novi Sad
Maribor
Banja Luka
Niksic
Durres
Istanbul
Izmir
Bursa
Antalya
Adana
Gaziantep
Konya
Saint Petersburg
Novosibirsk
Yekaterinburg
Kazan
Kharkiv
Odesa
Dnipro
Lviv
Dubai
Jeddah
Mecca
Tel Aviv
Mashhad
Isfahan
Basra
Erbil
Karachi
Lahore
Mumbai
Bangalore
Chennai
Hyderabad
Kolkata
Pune
Ahmedabad
Surabaya
Bandung
Medan
Chiang Mai
Phuket
Ho Chi Minh City
Da Nang
Cebu
Davao
Quezon City
Yokohama
Osaka
Nagoya
Sapporo
Fukuoka
Kobe
Kyoto
Busan
Daegu
Kaohsiung
Taichung
Hong Kong
Macau
Shanghai
Guangzhou
Shenzhen
Chengdu
Chongqing
Wuhan
Xi'an
Hangzhou
Nanjing
Tianjin
Qingdao
Shenyang
Harbin
Almaty
Samarkand
Sydney
Melbourne
Brisbane
Perth
Adelaide
Auckland
Christchurch
Alexandria
Casablanca
Mombasa
Dar es Salaam
Ibadan
Douala
Johannesburg
Durban
Port Elizabeth
Santa Cruz
Cochabamba
Cordoba
Rosario
Mendoza
Valparaiso
Cusco
Arequipa
Medellin
Cali
Cartagena
Barranquilla
Maracaibo
Guayaquil
Sao Paulo
Rio de Janeiro
Belo Horizonte
Salvador
Fortaleza
Curitiba
Recife
Porto Alegre
Manaus
Belem
Punta Cana
Guadalajara
Monterrey
Puebla
Tijuana
Leon
Merida
Queretaro
Chihuahua
Halifax
Victoria BC
Kelowna
Longueuil
Laval
`.trim().split("\n");

export const WORLD_CITIES: string[] = [
  ...new Set(LINES.map((s) => s.trim()).filter(Boolean)),
].sort((a, b) => a.localeCompare(b));
