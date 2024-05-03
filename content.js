function loadParams(arr, paramstr) {
  if (paramstr == null) paramstr = window.location.search.substring(1);

  var parms = paramstr.split("&");

  for (var i = 0; i < parms.length; i++) {
    var pos = parms[i].indexOf("=");
    if (pos > 0) {
      var key = parms[i].substring(0, pos);
      var val = parms[i].substring(pos + 1);
      arr[key] = decodeURIComponent(val);
    }
  }
}

function updateSimBriefValue(name, value) {
  var orig = document.getElementById(name);
  if (orig) {
    orig.value = value;
  }
}

function triggerChange(name, evname) {
  var orig = document.getElementById(name);
  if (orig) {
    var event = new Event(evname || "blur");
    orig.dispatchEvent(event);
  }
}

function getAssignmentText(row, index) {
  if (index > row.childNodes.length - 1) return "";
  return row.childNodes[index].innerText.trim();
}

(function () {
  var aircraftImages = {
    "Aermacchi - Lockheed AL-60": "",
    "Aero Design AC500C": "",
    "Aero Design AC680S": "",
    "Aero Vodochody L-39": "",
    "Aeronca Champion": "",
    "Agusta A109": "",
    "Agusta Westland AW139": "",
    "Airbus A320":
      "https://flight.wiki.gg/images/thumb/a/ab/FS2020-Aircraft-Airbus_A320-Fenix.png/300px-FS2020-Aircraft-Airbus_A320-Fenix.png",
    "Airbus A320 (MSFS)":
      "https://flight.wiki.gg/images/thumb/6/6e/FS2020-Aircraft-Airbus_A320neo.jpg/599px-FS2020-Aircraft-Airbus_A320neo.jpg",
    "Airbus A321":
      "https://flight.wiki.gg/images/thumb/7/79/XP11-Aircraft-Airbus_A320-FlightFactor.jpg/300px-XP11-Aircraft-Airbus_A320-FlightFactor.jpg",
    "Airbus H135 HPG": "",
    "Airbus Helicopters H130 (EC130 B4 XP)": "",
    "Airbus Helicopters H145": "",
    "Airbus Helicopters H145 (HPG)": "",
    "Airbus Helicopters H160": "",
    "Aircreation 582SL": "",
    "Airspeed AS-57 Ambassador": "",
    "Alenia C-27J Spartan": "",
    "Alenia C-27J Spartan (IRIS)": "",
    "American Champion Scout": "",
    "Antonov An-14": "",
    "Antonov AN-2": "",
    "Antonov An-24": "",
    "Antonov An-26 Curl": "",
    "Antonov An-28": "",
    "Antonov An-32": "",
    "ATR 42-500": "",
    "ATR 72-500": "",
    "Auster J/1 Autocrat": "",
    "Australia GAF N22 Nomad": "",
    "Aviat A-1 Husky": "",
    "Aviat Pitts Special (MSFS)":
      "https://flight.wiki.gg/images/thumb/8/88/FS2020-Aircraft-Pitts_Special_S2S_Aerobatic-Asobo.png/600px-FS2020-Aircraft-Pitts_Special_S2S_Aerobatic-Asobo.png",
    "Avro Anson MK-1": "",
    "Avro Lancaster": "",
    "BAC Jet Provost T5": "",
    "BAe 146-100 (Avro RJ70)": "",
    "BAe Jetstream 32": "",
    "BAe Jetstream 41": "",
    "Basler BT-67": "",
    "Beagle B 206 Basset": "",
    "Beechcraft 17": "",
    "Beechcraft 18": "",
    "Beechcraft 1900C": "",
    "Beechcraft 1900C Freighter": "",
    "Beechcraft 1900D": "",
    "Beechcraft Baron 58":
      "https://flight.wiki.gg/images/thumb/7/7d/FS2020-Aircraft-Beechcraft_Baron_G58-Asobo.png/300px-FS2020-Aircraft-Beechcraft_Baron_G58-Asobo.png",
    "Beechcraft Baron 58 - Turbo/tip tanks":
      "https://flight.wiki.gg/images/thumb/7/7d/FS2020-Aircraft-Beechcraft_Baron_G58-Asobo.png/300px-FS2020-Aircraft-Beechcraft_Baron_G58-Asobo.png",
    "Beechcraft Baron 58 RTW":
      "https://flight.wiki.gg/images/thumb/7/7d/FS2020-Aircraft-Beechcraft_Baron_G58-Asobo.png/300px-FS2020-Aircraft-Beechcraft_Baron_G58-Asobo.png",
    "Beechcraft Bonanza A36":
      "https://flight.wiki.gg/images/thumb/5/57/FS2020-Aircraft-Beechcraft_Bonanza_G36-Asobo.jpg/300px-FS2020-Aircraft-Beechcraft_Bonanza_G36-Asobo.jpg",
    "Beechcraft Bonanza A36 Waiz RTW":
      "https://flight.wiki.gg/images/thumb/5/57/FS2020-Aircraft-Beechcraft_Bonanza_G36-Asobo.jpg/300px-FS2020-Aircraft-Beechcraft_Bonanza_G36-Asobo.jpg",
    "Beechcraft Bonanza F33":
      "https://flight.wiki.gg/images/thumb/5/57/FS2020-Aircraft-Beechcraft_Bonanza_G36-Asobo.jpg/300px-FS2020-Aircraft-Beechcraft_Bonanza_G36-Asobo.jpg",
    "Beechcraft Bonanza V35":
      "https://flight.wiki.gg/images/thumb/5/57/FS2020-Aircraft-Beechcraft_Bonanza_G36-Asobo.jpg/300px-FS2020-Aircraft-Beechcraft_Bonanza_G36-Asobo.jpg",
    "Beechcraft Debonair": "",
    "Beechcraft Duchess 76": "",
    "Beechcraft Duke B60": "",
    "Beechcraft King Air 200":
      "https://flight.wiki.gg/images/thumb/e/ee/FS2020-Aircraft-Beechcraft_C90_King_Air-Big_Tire.jpeg/300px-FS2020-Aircraft-Beechcraft_C90_King_Air-Big_Tire.jpeg",
    "Beechcraft King Air 300":
      "https://flight.wiki.gg/images/thumb/e/ee/FS2020-Aircraft-Beechcraft_C90_King_Air-Big_Tire.jpeg/300px-FS2020-Aircraft-Beechcraft_C90_King_Air-Big_Tire.jpeg",
    "Beechcraft King Air 350":
      "https://flight.wiki.gg/images/thumb/1/1f/XP11-Aircraft-Beechcraft_King_Air_350-Airfoillabs.webp/600px-XP11-Aircraft-Beechcraft_King_Air_350-Airfoillabs.webp.png",
    "Beechcraft King Air C90":
      "https://flight.wiki.gg/images/thumb/e/ee/FS2020-Aircraft-Beechcraft_C90_King_Air-Big_Tire.jpeg/300px-FS2020-Aircraft-Beechcraft_C90_King_Air-Big_Tire.jpeg",
    "Beechcraft Queen Air": "",
    "Beechcraft Queen Air 80S": "",
    "Beechcraft Royal Turbine Duke B60": "",
    "Beechcraft T-34 Mentor": "",
    "Beechcraft Twin Bonanza 50": "",
    "Bell 205A-1/UH-1C": "",
    "Bell 206B":
      "https://flight.wiki.gg/images/thumb/7/79/RL-Aircraft-Bell_206_JetRanger.jpg/300px-RL-Aircraft-Bell_206_JetRanger.jpg",
    "Bell 206L RTW N3911Z": "",
    "Bell 212": "",
    "Bell 407": "",
    "Bell 407 (Nemeth)": "",
    "Bell 412": "",
    "Bell 429": "",
    "Bell 430": "",
    "Bell 430 RTW N430Q": "",
    "Bell 47G-2":
      "https://flight.wiki.gg/images/thumb/2/2c/FS2004-Aircraft-Bell_47-Jean-Marie_Mermaz.jpg/300px-FS2004-Aircraft-Bell_47-Jean-Marie_Mermaz.jpg",
    "Bell UH-1H Huey": "",
    "Bellanca 260": "",
    "Beriev BE-103": "",
    "Boeing 221A Monomail": "",
    "Boeing 247D": "",
    "Boeing 247D W42": "",
    "Boeing 377": "",
    "Boeing 727-100/200": "",
    "Boeing 737-800":
      "https://flight.wiki.gg/images/thumb/d/d1/XP11-Aircraft-Boeing_737-800-Laminar_Research.jpg/300px-XP11-Aircraft-Boeing_737-800-Laminar_Research.jpg",
    "Boeing 747-400":
      "https://flight.wiki.gg/images/thumb/e/e7/FS2020-Aircraft-Boeing_747-8_Intercontinental-Asobo.jpg/600px-FS2020-Aircraft-Boeing_747-8_Intercontinental-Asobo.jpg",
    "Boeing B-17G": "",
    "Boeing B314 Clipper": "",
    "Boeing Model 40B-4": "",
    "Boeing Stearman": "",
    "Boeing Vertol CH-46D Sea Knight (BV107)": "",
    "Boeing Vertol CH-47 Chinook": "",
    "Bombardier Challenger 300": "",
    "Bombardier Challenger 650":
      "https://flight.wiki.gg/images/thumb/4/4d/RL_~_Aircraft_~_Bombardier_Challenger_650.jpg/300px-RL_~_Aircraft_~_Bombardier_Challenger_650.jpg",
    "Bombardier CL-415": "",
    "Bombardier CRJ-200ER": "",
    "Bombardier CRJ700-ER": "",
    "Bombardier Dash-8 Q400": "",
    "Bombardier Lear 60": "",
    "Bristol Britannia 300": "",
    "Bristol Mark 32 Superfreighter": "",
    "Britten Norman BN-2A Mk3-3 Trislander": "",
    "Britten-Norman BN-2B Islander": "",
    "Bucker Jungmann 131": "",
    "CASA CN235": "",
    "Cessna 140": "",
    "Cessna 152 Aerobat":
      "https://flight.wiki.gg/images/thumb/2/2c/FS2020-Aircraft-Cessna_152_Aerobat-Asobo.png/300px-FS2020-Aircraft-Cessna_152_Aerobat-Asobo.png",
    "Cessna 162 Skycatcher": "",
    "Cessna 172 Skyhawk":
      "https://flight.wiki.gg/images/thumb/3/35/FS2020-Aircraft-Cessna_172_Skyhawk-Asobo.jpg/300px-FS2020-Aircraft-Cessna_172_Skyhawk-Asobo.jpg",
    "Cessna 177 Cardinal": "",
    "Cessna 177RG Cardinal": "",
    "Cessna 182 Skylane": "",
    "Cessna 182 Spirit of Columbus": "",
    "Cessna 185 Skywagon": "",
    "Cessna 195": "",
    "Cessna 206 Stationair": "",
    "Cessna 207 Stationair 8": "",
    "Cessna 208 Caravan":
      "https://flight.wiki.gg/images/thumb/8/8a/FS2020-Aircraft-Cessna_Caravan_208_B_Grand_Caravan_EX-Asobo.png/300px-FS2020-Aircraft-Cessna_Caravan_208_B_Grand_Caravan_EX-Asobo.png",
    "Cessna 210 Centurion": "",
    "Cessna 310":
      "https://flight.wiki.gg/images/thumb/9/9e/RL-Aircraft-Cessna_310.jpg/300px-RL-Aircraft-Cessna_310.jpg",
    "Cessna 310R (Milviz MSFS)":
      "https://flight.wiki.gg/images/thumb/d/d5/FS2020-Aircraft-Cessna_310-Milviz.jpg/300px-FS2020-Aircraft-Cessna_310-Milviz.jpg",
    "Cessna 337 Skymaster": "",
    "Cessna 340A": "",
    "Cessna 404 Titan": "",
    "Cessna 414A Chancellor": "",
    "Cessna 421 Golden Eagle": "",
    "Cessna 441 Conquest II": "",
    "Cessna Citation CJ1":
      "https://flight.wiki.gg/images/thumb/0/04/FSX-Aircraft-Cessna_CitationJet_CJ2-Carenado.jpg/300px-FSX-Aircraft-Cessna_CitationJet_CJ2-Carenado.jpg",
    "Cessna Citation CJ4 (MSFS)":
      "https://flight.wiki.gg/images/thumb/5/5c/XP11-Aircraft-Cessna_CitationJet_CJ4-Netavio.jpg/299px-XP11-Aircraft-Cessna_CitationJet_CJ4-Netavio.jpg",
    "Cessna Citation II":
      "https://flight.wiki.gg/images/thumb/5/5b/XP10-Aircraft-Cessna_CitationJet_CJ1-Queen_Emeraldas.jpg/300px-XP10-Aircraft-Cessna_CitationJet_CJ1-Queen_Emeraldas.jpg",
    "Cessna Citation Longitude":
      "https://flight.wiki.gg/images/thumb/5/5c/FS2020-Aircraft-Cessna_Citation_Longitude-Asobo.jpg/300px-FS2020-Aircraft-Cessna_Citation_Longitude-Asobo.jpg",
    "Cessna Citation X":
      "https://flight.wiki.gg/images/thumb/7/77/XP11-Aircraft-Cessna_Citation_X-Hibernvs_%26_Jrollon.jpeg/300px-XP11-Aircraft-Cessna_Citation_X-Hibernvs_%26_Jrollon.jpeg",
    "Cessna Citation XLS+": "",
    "Cessna L-19/O-1 Birddog": "",
    "Cessna Mustang": "",
    "Cessna Soloy Mk1/MkII U206 Turbo": "",
    "Cessna T-50 Bobcat": "",
    "Cessna T303 Crusader": "",
    "Cessna/Reims F-406 Caravan II": "",
    "Cirrus SR20": "",
    "Cirrus SR22 G2":
      "https://flight.wiki.gg/images/thumb/8/85/FS2020-Aircraft-Cirrus_SR22-Asobo.jpg/300px-FS2020-Aircraft-Cirrus_SR22-Asobo.jpg",
    "Cirrus Vision SF50":
      "https://flight.wiki.gg/images/thumb/0/09/RL-Aircraft-Cirrus_Vision_SF50.jpg/300px-RL-Aircraft-Cirrus_Vision_SF50.jpg",
    "Columbia 400": "",
    "Commander 112": "",
    "Commander 115": "",
    "Consolidated C-87 Liberator Express": "",
    "Consolidated PBY5 Catalina": "",
    "Convair 340/440": "",
    "Convair 580": "",
    "Cub Crafters XCub (MSFS)":
      "https://flight.wiki.gg/images/thumb/7/7e/XP11-Aircraft-CubCrafters_XCub-XFlight.jpg/600px-XP11-Aircraft-CubCrafters_XCub-XFlight.jpg",
    "Curtiss C46": "",
    "Curtiss JN-4 Jenny":
      "https://flight.wiki.gg/images/thumb/9/94/RL_~_Aircraft_~_Curtiss_JN-4_Jenny.jpg/300px-RL_~_Aircraft_~_Curtiss_JN-4_Jenny.jpg",
    "Curtiss P-40C (A2A)": "",
    "Curtiss Robertson Robin J-1": "",
    "Dassault Falcon 50": "",
    "Dassault Falcon 7X": "",
    "DeHavilland Beaver (Thranda XP)": "",
    "DeHavilland Cirrus II Moth (Mary Bailey)": "",
    "DeHavilland Dash 7": "",
    "DeHavilland Dash 8 100/200":
      "https://flight.wiki.gg/images/thumb/9/95/FS2004-Aircraft-de_Havilland_Canada_Dash_8-Virtualcol.jpg/300px-FS2004-Aircraft-de_Havilland_Canada_Dash_8-Virtualcol.jpg",
    "DeHavilland Dash 8 Q300":
      "https://flight.wiki.gg/images/thumb/9/95/FS2004-Aircraft-de_Havilland_Canada_Dash_8-Virtualcol.jpg/300px-FS2004-Aircraft-de_Havilland_Canada_Dash_8-Virtualcol.jpg",
    "DeHavilland DH 89 Dragon Rapide": "",
    "DeHavilland DH-82 Tiger Moth": "",
    "DeHavilland DH104 Dove": "",
    "DeHavilland DH114 Heron": "",
    "DeHavilland DH80A Puss Moth": "",
    "DeHavilland DHC-1 Chipmunk": "",
    "DeHavilland DHC-2 Beaver": "",
    "DeHavilland DHC-2 Beaver (Thranda XP)": "",
    "DeHavilland DHC-2 Turbo Beaver": "",
    "DeHavilland DHC-3 Otter": "",
    "DeHavilland DHC-3-T Turbo Otter": "",
    "DeHavilland DHC-3T Turbo Otter (Milviz)": "",
    "DeHavilland DHC-4 Caribou": "",
    "DeHavilland DHC-5 Buffalo": "",
    "DeHavilland DHC-6 300 Twin Otter (Aerosoft Extended)": "",
    "DeHavilland DHC-6 Twin Otter": "",
    "Diamond DA-50RG (Aerobask)": "",
    "Diamond DA20 Katana":
      "https://flight.wiki.gg/images/thumb/2/21/FS2020-Aircraft-Diamond_DV20-Asobo.jpg/300px-FS2020-Aircraft-Diamond_DV20-Asobo.jpg",
    "Diamond DA40D DiamondStar":
      "https://flight.wiki.gg/images/thumb/a/a7/FS2020-Aircraft-Diamond_DA40_NG-Asobo.jpg/600px-FS2020-Aircraft-Diamond_DA40_NG-Asobo.jpg",
    "Diamond DA42 Twin Star": "",
    "Diamond DA62":
      "https://flight.wiki.gg/images/thumb/4/4e/FS2020-Aircraft-Diamond_DA62-Asobo.png/300px-FS2020-Aircraft-Diamond_DA62-Asobo.png",
    "Dornier 228": "",
    "Dornier 328": "",
    "Dornier Do-27 A4": "",
    "Dornier Do-27 B1": "",
    "Dornier Do-28 A/B": "",
    "Douglas A-26": "",
    "Douglas C117D": "",
    "Douglas DC-2": "",
    "Douglas DC-2 (FSX)": "",
    "Douglas DC-3":
      "https://flight.wiki.gg/images/thumb/e/ec/RL_~_Aircraft_~_Douglas_DC-3.jpg/300px-RL_~_Aircraft_~_Douglas_DC-3.jpg",
    "Douglas DC-4": "",
    "Douglas DC-6":
      "https://flight.wiki.gg/images/thumb/7/75/FS2020-Aircraft-Douglas_DC-6-PMDG-1.jpg/300px-FS2020-Aircraft-Douglas_DC-6-PMDG-1.jpg",
    "Douglas DC-6B":
      "https://flight.wiki.gg/images/thumb/7/75/FS2020-Aircraft-Douglas_DC-6-PMDG-1.jpg/300px-FS2020-Aircraft-Douglas_DC-6-PMDG-1.jpg",
    "Douglas DC-6B (PMDG)":
      "https://flight.wiki.gg/images/thumb/7/75/FS2020-Aircraft-Douglas_DC-6-PMDG-1.jpg/300px-FS2020-Aircraft-Douglas_DC-6-PMDG-1.jpg",
    "Douglas DC-7B": "",
    "Douglas DC-7C": "",
    "Douglas DC-8 (10-40)": "",
    "Eclipse 500": "",
    "Embraer 110": "",
    "Embraer 120": "",
    "Embraer ERJ-135LR": "",
    "Embraer ERJ-145LR": "",
    "Embraer Legacy 600": "",
    "Embraer Phenom 100": "",
    "Embraer Phenom 300": "",
    "ERCO Ercoupe 415-C": "",
    "Eurocopter AS-332 Super Puma": "",
    "Eurocopter AS-350 Ecureuil": "",
    "Eurocopter AS365": "",
    "Eurocopter BK117": "",
    "Eurocopter Colibri EC 120": "",
    "Eurocopter EC-135": "",
    "Fairchild 24R": "",
    "Fairchild C-119 (AH)": "",
    "Fairchild C119": "",
    "Fairchild C123": "",
    "Fairchild Metro III": "",
    "Fairchild PT19/26 Cornell": "",
    "Fokker 50": "",
    "Fokker F.VIIb/3m": "",
    "Fokker F.VIIb/3m Smith Pacific": "",
    "Fokker F27-500 Friendship": "",
    "Ford Tri-Motor": "",
    "Found Bush Hawk": "",
    "Gippsland GA8 Airvan": "",
    "Globe Swift": "",
    "Grumman G-21 Goose":
      "https://flight.wiki.gg/images/thumb/e/e5/FS2020_~_Aircraft_~_Grumman_G-21A_Goose_~_OzWookiee_%28Big_Radials%29.webp/300px-FS2020_~_Aircraft_~_Grumman_G-21A_Goose_~_OzWookiee_%28Big_Radials%29.webp.png",
    "Grumman G-44 Widgeon": "",
    "Grumman G-73 Mallard": "",
    "Grumman G-73T Turbo Mallard": "",
    "Grumman HU-16B Albatross": "",
    "Grumman S2/C1": "",
    "Grumman Tiger": "",
    "Grumman Turbo Goose": "",
    "Gulfstream Twin Commander 690B (Carenado)": "",
    "Hawker 850XP": "",
    "Hawker Siddeley HS-748": "",
    "Helio Super Courier H-295/U-10b": "",
    "Honda HA-420 HondaJet":
      "https://flight.wiki.gg/images/thumb/0/04/XP11-Aircraft-Honda_HA-420_HondaJet-Zotac_Innovations.png/300px-XP11-Aircraft-Honda_HA-420_HondaJet-Zotac_Innovations.png",
    "Howard DGA-15": "",
    "Howard Aero 500": "",
    "Hughes 269": "",
    "Hughes/McDonnell Douglas MD500E": "",
    "Ilyushin Il-14": "",
    "Ilyushin Il-18D": "",
    "Junkers Ju-52": "",
    "Junkers W33 EW Flight": "",
    "Junkers W33/34": "",
    "Kazan Helicopter Plant Mi-17-1V-GA": "",
    "Kitfox Series 5 STi": "",
    "Lake Renegade": "",
    "Lancair Evolution":
      "https://flight.wiki.gg/images/thumb/1/16/RL_~_Aircraft_~_Lancair_Evolution.jpg/600px-RL_~_Aircraft_~_Lancair_Evolution.jpg",
    "Lancair IV-P": "",
    "Lancair Legacy": "",
    "Lear 45":
      "https://flight.wiki.gg/images/thumb/7/7d/RL_~_Aircraft_~_Learjet_35.jpg/300px-RL_~_Aircraft_~_Learjet_35.jpg",
    "Learjet 24B":
      "https://flight.wiki.gg/images/thumb/7/7d/RL_~_Aircraft_~_Learjet_35.jpg/300px-RL_~_Aircraft_~_Learjet_35.jpg",
    "Learjet 24B - Tip Tanks":
      "https://flight.wiki.gg/images/thumb/7/7d/RL_~_Aircraft_~_Learjet_35.jpg/300px-RL_~_Aircraft_~_Learjet_35.jpg",
    "Learjet 35A":
      "https://flight.wiki.gg/images/thumb/7/7d/RL_~_Aircraft_~_Learjet_35.jpg/300px-RL_~_Aircraft_~_Learjet_35.jpg",
    "Learjet 35A (FSW)":
      "https://flight.wiki.gg/images/thumb/7/7d/RL_~_Aircraft_~_Learjet_35.jpg/300px-RL_~_Aircraft_~_Learjet_35.jpg",
    "LearJet LJ25D": "",
    "Let L 410 UVP-E": "",
    "Let L 410 UVP-T": "",
    "Liberty XL2": "",
    "Lockheed C-130 (Capt Sim)":
      "https://flight.wiki.gg/images/thumb/2/2c/RL_~_Aircraft_~_Lockheed_C-130_Hercules.jpg/300px-RL_~_Aircraft_~_Lockheed_C-130_Hercules.jpg",
    "Lockheed C-130 (Generic)":
      "https://flight.wiki.gg/images/thumb/2/2c/RL_~_Aircraft_~_Lockheed_C-130_Hercules.jpg/300px-RL_~_Aircraft_~_Lockheed_C-130_Hercules.jpg",
    "Lockheed Constellation": "",
    "Lockheed L049 (A2A)": "",
    "Lockheed L10A Electra": "",
    "Lockheed L10E Amelia Special": "",
    "Lockheed Lodestar": "",
    "Lockheed P-38 Lightning": "",
    "Lockheed P-3C (L-188)": "",
    "Lockheed Vega": "",
    "Luscombe 8A": "",
    "Luscombe Phantom 145": "",
    "Martin 404": "",
    "Maule M-7": "",
    "McDonnell Douglas DC-10-30F": "",
    "Messerschmitt Bf 108 B": "",
    "Meyers 200D": "",
    "Mil Mi-2": "",
    "Mitsubishi MU-2B": "",
    "Mooney M20 Bravo": "",
    "Mooney M20 Juliet": "",
    "Morane-Saulnier MS-760": "",
    "Mudry CAP 10 (MSFS)": "",
    "NAMC YS-11": "",
    "New Standard D25A": "",
    "Noorduyn Norseman": "",
    "North American B-25": "",
    "North American P-51D Mustang": "",
    "North American T-28 Trojan": "",
    "North American T-39 Sabreliner":
      "https://flight.wiki.gg/images/thumb/1/17/P3D-Aircraft-North_American_Sabreliner-Aeroplane_Heaven.jpg/300px-P3D-Aircraft-North_American_Sabreliner-Aeroplane_Heaven.jpg",
    "North American T-6G Texan": "",
    "Pacific P-750 XSTOL": "",
    "Pacific Aerospace 750XL": "",
    "Partenavia P68B": "",
    "Piaggio 166 Albatross": "",
    "Piaggio 180 Avanti": "",
    "Piaggio P-149D": "",
    "Pilatus PC-12": "",
    "Pilatus PC-6 Porter": "",
    "Piper J-3 Cub": "",
    "Piper PA-12 Super Cruiser RTW": "",
    "Piper PA-18 Super Cub":
      "https://flight.wiki.gg/images/thumb/4/44/RL-Aircraft-Piper_PA-18_Super_Cub.jpg/600px-RL-Aircraft-Piper_PA-18_Super_Cub.jpg",
    "Piper PA-20 Pacer": "",
    "Piper PA-22 Super Pacer": "",
    "Piper PA-22 Tri-Pacer": "",
    "Piper PA-23 Apache": "",
    "Piper PA-23 Aztec": "",
    "Piper PA-24 Comanche": "",
    "Piper PA-24 Comanche (A2A)": "",
    "Piper PA-28 Archer": "",
    "Piper PA-28 Arrow": "",
    "Piper PA-28 Cherokee 180":
      "https://flight.wiki.gg/images/thumb/f/fc/FS2020-Aircraft-Piper_PA-28-201T_Turbo_Arrow_III-IV-Just_Flight.jpg/300px-FS2020-Aircraft-Piper_PA-28-201T_Turbo_Arrow_III-IV-Just_Flight.jpg",
    "Piper PA-28 Dakota": "",
    "Piper PA-28 Warrior": "",
    "Piper PA-30 Twin Comanche": "",
    "Piper PA-31 Navajo": "",
    "Piper PA-31T Cheyenne II": "",
    "Piper PA-31T1 Cheyenne I/IA": "",
    "Piper PA-31T2 Cheyenne IIXL": "",
    "Piper PA-32 Cherokee Six/ Saratoga": "",
    "Piper PA-32 Saratoga TC": "",
    "Piper PA-34 Seneca":
      "https://flight.wiki.gg/images/thumb/8/86/FS2020-Aircraft-Piper_PA-34-220T_Seneca_V-Carenado.jpg/300px-FS2020-Aircraft-Piper_PA-34-220T_Seneca_V-Carenado.jpg",
    "Piper PA-38 Tomahawk": "",
    "Piper PA-42-1000 Cheyenne 400": "",
    "Piper PA-44 Seminole": "",
    "Piper PA-46 Meridian":
      "https://flight.wiki.gg/images/thumb/a/a9/XP11-Aircraft-Piper_PA-46-500TP_Malibu_Meridian-Carenado.jpg/300px-XP11-Aircraft-Piper_PA-46-500TP_Malibu_Meridian-Carenado.jpg",
    "Piper PA-60 Aerostar": "",
    "Progressive Aerodyne SeaRey RTW": "",
    "PZL Wilga": "",
    "PZL-104M Wilga 2000 (Thranda XP)": "",
    "Quest Kodiak":
      "https://flight.wiki.gg/images/thumb/4/40/XP11-Aircraft-Quest_Kodiak_100-Thranda.jpg/300px-XP11-Aircraft-Quest_Kodiak_100-Thranda.jpg",
    "Rans S-7 Courier": "",
    "Raytheon Beechjet / Hawker": "",
    "Raytheon Premier1": "",
    "Republic Seabee": "",
    "Robin DR400":
      "https://flight.wiki.gg/images/thumb/5/50/FS2020-Aircraft-Robin_DR400-100_Cadet-Asobo.jpg/600px-FS2020-Aircraft-Robin_DR400-100_Cadet-Asobo.jpg",
    "Robin DR400-100 Cadet (MSFS)":
      "https://flight.wiki.gg/images/thumb/5/50/FS2020-Aircraft-Robin_DR400-100_Cadet-Asobo.jpg/600px-FS2020-Aircraft-Robin_DR400-100_Cadet-Asobo.jpg",
    "Robin HR200": "",
    "Robin/Apex DR221": "",
    "Robinson R22":
      "https://flight.wiki.gg/images/thumb/3/32/FSX-Aircraft-Robinson_R22-Steven_Frost.jpg/600px-FSX-Aircraft-Robinson_R22-Steven_Frost.jpg",
    "Robinson R44": "",
    "Robinson R44 Raven II": "",
    "Robinson R66 Turbine": "",
    "Rockwell Commander 114": "",
    "Rockwell Twin Commander 690B": "",
    "Rutan Long EZ RTW": "",
    "Ryan L-17 Navion": "",
    "Saab 2000": "",
    "Saab 340B": "",
    "SAAB Scandia 90": "",
    "Savage Cub (MSFS)": "",
    "Scottish Aviation Twin Pioneer": "",
    "Short SD3-30": "",
    "Shorts SD3-60": "",
    "Shorts Skyvan": "",
    "SIAI-Marchetti S.205 18/R": "",
    "SIAI-Marchetti SF260": "",
    "SIAI-Marchetti SM.1019A": "",
    "Sikorsky S-43": "",
    "Sikorsky S-55": "",
    "Sikorsky S-76":
      "https://flight.wiki.gg/images/thumb/1/18/RL_~_Aircraft_~_Sikorsky_S-76.jpg/599px-RL_~_Aircraft_~_Sikorsky_S-76.jpg",
    "Sikorsky S-92A Cougar": "",
    "Sikorsky UH-60 Blackhawk": "",
    "Socata TB-10 Tobago": "",
    "Socata TB21GT Trinidad": "",
    "Socata TBM 700": "",
    "Socata TBM 850": "",
    "Socata TBM 930 (MSFS)":
      "https://flight.wiki.gg/images/thumb/7/73/RL-Aircraft-SOCATA_TBM_900.jpg/300px-RL-Aircraft-SOCATA_TBM_900.jpg",
    "Spartan 7W Executive": "",
    "Stinson 108": "",
    "Stinson L-5B Sentinel":
      "https://flight.wiki.gg/images/thumb/5/5f/RL_~_Aircraft_~_Stinson_L-5_Sentinel.jpg/599px-RL_~_Aircraft_~_Stinson_L-5_Sentinel.jpg",
    "Stinson Reliant": "",
    "Supermarine Spitfire": "",
    "Supermarine Walrus MK 1": "",
    "Tecnam P2006T": "",
    "Tecnam P2012 Traveller": "",
    "Tecnam P92 Echo": "",
    "Travel Air Mystery Ship 613": "",
    "Tupolev Tu-124": "",
    "Van's RV-10":
      "https://flight.wiki.gg/images/thumb/5/5e/RL_~_Aircraft_~_Van%27s_Aircraft_RV-10.jpg/599px-RL_~_Aircraft_~_Van%27s_Aircraft_RV-10.jpg",
    "Vans RV-7/7A": "",
    "Vickers Viscount": "",
    "Waco Classic YMF": "",
    "Westland Seaking": "",
    "Yakovlev Yak-12A": "",
    "Yakovlev Yak-18T": "",
    "Yakovlev Yak-40": "",
    "Zenair CH 801": "",
    "Zepplin NT": "",
    "Zlin Z-43":
      "https://flight.wiki.gg/images/thumb/8/8c/FS2020-Aircraft-Zlin_Savage_Cub-Asobo.jpg/600px-FS2020-Aircraft-Zlin_Savage_Cub-Asobo.jpg",
  };

  var path = window.location.href.toLowerCase().split("/");
  var page = path[path.length - 1];

  if (page.indexOf("airport.jsp") === 0) {
    var icao = document.querySelector(".airportInfo h1").innerText;
    var imgs = document.querySelectorAll("img");
    imgs.forEach(function (img) {
      if ((img.src || "").indexOf("fscharts.gif") !== -1) {
        img.src =
          "https://navigraph.com/assets/images/navigraph_logo_inverted.svg";
        img.classList.add("img-navigraph");
        img.parentElement.href = "https://charts.navigraph.com/airport/" + icao;
      }
      if ((img.src || "").indexOf("gcmap.com") !== -1) {
        var iframe = document.createElement("iframe");
        iframe.src =
          "https://maps.google.com/maps?q=" +
          icao +
          "+Airport&t=&z=13&ie=UTF8&iwloc=&output=embed";
        iframe.width = "230px";
        iframe.height = "230px";
        iframe.style.border = "none";
        img.parentNode.appendChild(iframe);
        img.remove();
      }
      var aircraft = document.querySelectorAll(".aircraftTable tbody tr");
      aircraft.forEach(function (ac) {
        var actext = ac.childNodes[3].innerText;
        ac.childNodes[3].innerHTML =
          "<div class='ac-img' " +
          (aircraftImages[actext]
            ? "style='background-image:url(\"" +
              aircraftImages[actext] +
              "\");'"
            : "") +
          "></div> " +
          actext;
      });
    });
  } else if (page.indexOf("myflight.jsp") === 0) {
    var actions = document.querySelector(".assignments-actions");

    var assignments = document.querySelectorAll(
      ".myflight-assignments--ready .assignmentTable tbody tr"
    );
    var orig = "";
    var dest = "";
    var regelement = document.querySelector(".myflight-aircraft--model a");
    var reg = regelement ? regelement.innerText : "";
    var aircraftelement = document.querySelector(
      ".myflight-aircraft--model h3"
    );
    var pax = 0;
    var cargo = 0;

    var airframes = {
      "Aermacchi - Lockheed AL-60": "AL60",
      "Aero Design AC500C": "AC50",
      "Aero Design AC680S": "AC680",
      "Aero Vodochody L-39": "L39C",
      "Aeronca Champion": "A11A",
      "Agusta A109": "A109",
      "Agusta Westland AW139": "AW139",
      "Airbus A320": "A320",
      "Airbus A320 (MSFS)": "A320",
      "Airbus A321": "A321",
      "Airbus H135 HPG": "H135",
      "Airbus Helicopters H130 (EC130 B4 XP)": "H130",
      "Airbus Helicopters H145": "H145",
      "Airbus Helicopters H145 (HPG)": "H145",
      "Airbus Helicopters H160": "H160",
      "Aircreation 582SL": "A582",
      "Airspeed AS-57 Ambassador": "AS57",
      "Alenia C-27J Spartan": "C27J",
      "Alenia C-27J Spartan (IRIS)": "C27J",
      "American Champion Scout": "",
      "Antonov An-14": "AN14",
      "Antonov AN-2": "AN2",
      "Antonov An-24": "AN24",
      "Antonov An-26 Curl": "AN26",
      "Antonov An-28": "AN28",
      "Antonov An-32": "AN38",
      "ATR 42-500": "",
      "ATR 72-500": "",
      "Auster J/1 Autocrat": "",
      "Australia GAF N22 Nomad": "",
      "Aviat A-1 Husky": "",
      "Aviat Pitts Special (MSFS)": "",
      "Avro Anson MK-1": "",
      "Avro Lancaster": "",
      "BAC Jet Provost T5": "",
      "BAe 146-100 (Avro RJ70)": "",
      "BAe Jetstream 32": "",
      "BAe Jetstream 41": "",
      "Basler BT-67": "",
      "Beagle B 206 Basset": "",
      "Beechcraft 17": "",
      "Beechcraft 18": "",
      "Beechcraft 1900C": "",
      "Beechcraft 1900C Freighter": "",
      "Beechcraft 1900D": "",
      "Beechcraft Baron 58": "",
      "Beechcraft Baron 58 - Turbo/tip tanks": "",
      "Beechcraft Baron 58 RTW": "",
      "Beechcraft Bonanza A36": "",
      "Beechcraft Bonanza A36 Waiz RTW": "",
      "Beechcraft Bonanza F33": "",
      "Beechcraft Bonanza V35": "",
      "Beechcraft Debonair": "",
      "Beechcraft Duchess 76": "",
      "Beechcraft Duke B60": "",
      "Beechcraft King Air 200": "BE20",
      "Beechcraft King Air 300": "",
      "Beechcraft King Air 350": "",
      "Beechcraft King Air C90": "",
      "Beechcraft Queen Air": "",
      "Beechcraft Queen Air 80S": "",
      "Beechcraft Royal Turbine Duke B60": "",
      "Beechcraft T-34 Mentor": "",
      "Beechcraft Twin Bonanza 50": "",
      "Bell 205A-1/UH-1C": "",
      "Bell 206B": "",
      "Bell 206L RTW N3911Z": "",
      "Bell 212": "",
      "Bell 407": "",
      "Bell 407 (Nemeth)": "",
      "Bell 412": "",
      "Bell 429": "",
      "Bell 430": "",
      "Bell 430 RTW N430Q": "",
      "Bell 47G-2": "",
      "Bell UH-1H Huey": "",
      "Bellanca 260": "",
      "Beriev BE-103": "",
      "Boeing 221A Monomail": "",
      "Boeing 247D": "",
      "Boeing 247D W42": "",
      "Boeing 377": "",
      "Boeing 727-100/200": "B721",
      "Boeing 737-800": "B738",
      "Boeing 747-400": "B744",
      "Boeing B-17G": "",
      "Boeing B314 Clipper": "",
      "Boeing Model 40B-4": "",
      "Boeing Stearman": "",
      "Boeing Vertol CH-46D Sea Knight (BV107)": "",
      "Boeing Vertol CH-47 Chinook": "",
      "Bombardier Challenger 300": "",
      "Bombardier Challenger 650": "",
      "Bombardier CL-415": "",
      "Bombardier CRJ-200ER": "",
      "Bombardier CRJ700-ER": "",
      "Bombardier Dash-8 Q400": "",
      "Bombardier Lear 60": "",
      "Bristol Britannia 300": "",
      "Bristol Mark 32 Superfreighter": "",
      "Britten Norman BN-2A Mk3-3 Trislander": "",
      "Britten-Norman BN-2B Islander": "",
      "Bucker Jungmann 131": "",
      "CASA CN235": "",
      "Cessna 140": "",
      "Cessna 152 Aerobat": "",
      "Cessna 162 Skycatcher": "",
      "Cessna 172 Skyhawk": "C172",
      "Cessna 177 Cardinal": "",
      "Cessna 177RG Cardinal": "",
      "Cessna 182 Skylane": "",
      "Cessna 182 Spirit of Columbus": "",
      "Cessna 185 Skywagon": "",
      "Cessna 195": "",
      "Cessna 206 Stationair": "",
      "Cessna 207 Stationair 8": "",
      "Cessna 208 Caravan": "C208",
      "Cessna 210 Centurion": "",
      "Cessna 310": "C310",
      "Cessna 310R (Milviz MSFS)": "C310",
      "Cessna 337 Skymaster": "C337",
      "Cessna 340A": "",
      "Cessna 404 Titan": "",
      "Cessna 414A Chancellor": "C414",
      "Cessna 421 Golden Eagle": "",
      "Cessna 441 Conquest II": "",
      "Cessna Citation CJ1": "C25A",
      "Cessna Citation CJ4 (MSFS)": "C25C",
      "Cessna Citation II": "C550",
      "Cessna Citation Longitude": "C700",
      "Cessna Citation X": "C750",
      "Cessna Citation XLS+": "",
      "Cessna L-19/O-1 Birddog": "",
      "Cessna Mustang": "",
      "Cessna Soloy Mk1/MkII U206 Turbo": "",
      "Cessna T-50 Bobcat": "",
      "Cessna T303 Crusader": "",
      "Cessna/Reims F-406 Caravan II": "",
      "Cirrus SR20": "",
      "Cirrus SR22 G2": "SR22",
      "Cirrus Vision SF50": "SF50",
      "Columbia 400": "",
      "Commander 112": "",
      "Commander 115": "",
      "Consolidated C-87 Liberator Express": "",
      "Consolidated PBY5 Catalina": "",
      "Convair 340/440": "",
      "Convair 580": "",
      "Cub Crafters XCub (MSFS)": "",
      "Curtiss C46": "",
      "Curtiss JN-4 Jenny": "",
      "Curtiss P-40C (A2A)": "",
      "Curtiss Robertson Robin J-1": "",
      "Dassault Falcon 50": "",
      "Dassault Falcon 7X": "",
      "DeHavilland Beaver (Thranda XP)": "",
      "DeHavilland Cirrus II Moth (Mary Bailey)": "",
      "DeHavilland Dash 7": "",
      "DeHavilland Dash 8 100/200": "",
      "DeHavilland Dash 8 Q300": "",
      "DeHavilland DH 89 Dragon Rapide": "",
      "DeHavilland DH-82 Tiger Moth": "",
      "DeHavilland DH104 Dove": "",
      "DeHavilland DH114 Heron": "",
      "DeHavilland DH80A Puss Moth": "",
      "DeHavilland DHC-1 Chipmunk": "",
      "DeHavilland DHC-2 Beaver": "",
      "DeHavilland DHC-2 Beaver (Thranda XP)": "",
      "DeHavilland DHC-2 Turbo Beaver": "",
      "DeHavilland DHC-3 Otter": "",
      "DeHavilland DHC-3-T Turbo Otter": "",
      "DeHavilland DHC-3T Turbo Otter (Milviz)": "",
      "DeHavilland DHC-4 Caribou": "",
      "DeHavilland DHC-5 Buffalo": "",
      "DeHavilland DHC-6 300 Twin Otter (Aerosoft Extended)": "",
      "DeHavilland DHC-6 Twin Otter": "",
      "Diamond DA-50RG (Aerobask)": "",
      "Diamond DA20 Katana": "",
      "Diamond DA40D DiamondStar": "",
      "Diamond DA42 Twin Star": "",
      "Diamond DA62": "",
      "Dornier 228": "",
      "Dornier 328": "",
      "Dornier Do-27 A4": "",
      "Dornier Do-27 B1": "",
      "Dornier Do-28 A/B": "",
      "Douglas A-26": "",
      "Douglas C117D": "",
      "Douglas DC-2": "",
      "Douglas DC-2 (FSX)": "",
      "Douglas DC-3": "",
      "Douglas DC-4": "",
      "Douglas DC-6": "",
      "Douglas DC-6B": "",
      "Douglas DC-6B (PMDG)": "",
      "Douglas DC-7B": "",
      "Douglas DC-7C": "",
      "Douglas DC-8 (10-40)": "",
      "Eclipse 500": "",
      "Embraer 110": "",
      "Embraer 120": "",
      "Embraer ERJ-135LR": "",
      "Embraer ERJ-145LR": "",
      "Embraer Legacy 600": "",
      "Embraer Phenom 100": "",
      "Embraer Phenom 300": "",
      "ERCO Ercoupe 415-C": "",
      "Eurocopter AS-332 Super Puma": "",
      "Eurocopter AS-350 Ecureuil": "",
      "Eurocopter AS365": "",
      "Eurocopter BK117": "",
      "Eurocopter Colibri EC 120": "",
      "Eurocopter EC-135": "",
      "Fairchild 24R": "",
      "Fairchild C-119 (AH)": "",
      "Fairchild C119": "",
      "Fairchild C123": "",
      "Fairchild Metro III": "",
      "Fairchild PT19/26 Cornell": "",
      "Fokker 50": "",
      "Fokker F.VIIb/3m": "",
      "Fokker F.VIIb/3m Smith Pacific": "",
      "Fokker F27-500 Friendship": "",
      "Ford Tri-Motor": "",
      "Found Bush Hawk": "",
      "Gippsland GA8 Airvan": "",
      "Globe Swift": "",
      "Grumman G-21 Goose": "",
      "Grumman G-44 Widgeon": "",
      "Grumman G-73 Mallard": "",
      "Grumman G-73T Turbo Mallard": "",
      "Grumman HU-16B Albatross": "",
      "Grumman S2/C1": "",
      "Grumman Tiger": "",
      "Grumman Turbo Goose": "",
      "Gulfstream Twin Commander 690B (Carenado)": "",
      "Hawker 850XP": "",
      "Hawker Siddeley HS-748": "",
      "Helio Super Courier H-295/U-10b": "",
      "Honda HA-420 HondaJet": "",
      "Howard DGA-15": "",
      "Howard Aero 500": "",
      "Hughes 269": "",
      "Hughes/McDonnell Douglas MD500E": "",
      "Ilyushin Il-14": "",
      "Ilyushin Il-18D": "",
      "Junkers Ju-52": "",
      "Junkers W33 EW Flight": "",
      "Junkers W33/34": "",
      "Kazan Helicopter Plant Mi-17-1V-GA": "",
      "Kitfox Series 5 STi": "",
      "Lake Renegade": "",
      "Lancair Evolution": "",
      "Lancair IV-P": "",
      "Lancair Legacy": "",
      "Lear 45": "",
      "Learjet 24B": "",
      "Learjet 24B - Tip Tanks": "",
      "Learjet 35A": "",
      "Learjet 35A (FSW)": "",
      "LearJet LJ25D": "",
      "Let L 410 UVP-E": "",
      "Let L 410 UVP-T": "",
      "Liberty XL2": "",
      "Lockheed C-130 (Capt Sim)": "",
      "Lockheed C-130 (Generic)": "",
      "Lockheed Constellation": "",
      "Lockheed L049 (A2A)": "",
      "Lockheed L10A Electra": "",
      "Lockheed L10E Amelia Special": "",
      "Lockheed Lodestar": "",
      "Lockheed P-38 Lightning": "",
      "Lockheed P-3C (L-188)": "",
      "Lockheed Vega": "",
      "Luscombe 8A": "",
      "Luscombe Phantom 145": "",
      "Martin 404": "",
      "Maule M-7": "",
      "McDonnell Douglas DC-10-30F": "",
      "Messerschmitt Bf 108 B": "",
      "Meyers 200D": "",
      "Mil Mi-2": "",
      "Mitsubishi MU-2B": "",
      "Mooney M20 Bravo": "",
      "Mooney M20 Juliet": "",
      "Morane-Saulnier MS-760": "",
      "Mudry CAP 10 (MSFS)": "",
      "NAMC YS-11": "",
      "New Standard D25A": "",
      "Noorduyn Norseman": "",
      "North American B-25": "",
      "North American P-51D Mustang": "",
      "North American T-28 Trojan": "",
      "North American T-39 Sabreliner": "",
      "North American T-6G Texan": "",
      "Pacific P-750 XSTOL": "",
      "Pacific Aerospace 750XL": "",
      "Partenavia P68B": "",
      "Piaggio 166 Albatross": "",
      "Piaggio 180 Avanti": "",
      "Piaggio P-149D": "",
      "Pilatus PC-12": "",
      "Pilatus PC-6 Porter": "",
      "Piper J-3 Cub": "",
      "Piper PA-12 Super Cruiser RTW": "",
      "Piper PA-18 Super Cub": "",
      "Piper PA-20 Pacer": "",
      "Piper PA-22 Super Pacer": "",
      "Piper PA-22 Tri-Pacer": "",
      "Piper PA-23 Apache": "",
      "Piper PA-23 Aztec": "",
      "Piper PA-24 Comanche": "",
      "Piper PA-24 Comanche (A2A)": "",
      "Piper PA-28 Archer": "",
      "Piper PA-28 Arrow": "",
      "Piper PA-28 Cherokee 180": "",
      "Piper PA-28 Dakota": "",
      "Piper PA-28 Warrior": "",
      "Piper PA-30 Twin Comanche": "",
      "Piper PA-31 Navajo": "",
      "Piper PA-31T Cheyenne II": "",
      "Piper PA-31T1 Cheyenne I/IA": "",
      "Piper PA-31T2 Cheyenne IIXL": "",
      "Piper PA-32 Cherokee Six/ Saratoga": "",
      "Piper PA-32 Saratoga TC": "",
      "Piper PA-34 Seneca": "",
      "Piper PA-38 Tomahawk": "",
      "Piper PA-42-1000 Cheyenne 400": "",
      "Piper PA-44 Seminole": "",
      "Piper PA-46 Meridian": "",
      "Piper PA-60 Aerostar": "",
      "Progressive Aerodyne SeaRey RTW": "",
      "PZL Wilga": "",
      "PZL-104M Wilga 2000 (Thranda XP)": "",
      "Quest Kodiak": "",
      "Rans S-7 Courier": "",
      "Raytheon Beechjet / Hawker": "",
      "Raytheon Premier1": "",
      "Republic Seabee": "",
      "Robin DR400": "",
      "Robin DR400-100 Cadet (MSFS)": "",
      "Robin HR200": "",
      "Robin/Apex DR221": "",
      "Robinson R22": "",
      "Robinson R44": "",
      "Robinson R44 Raven II": "",
      "Robinson R66 Turbine": "",
      "Rockwell Commander 114": "",
      "Rockwell Twin Commander 690B": "",
      "Rutan Long EZ RTW": "",
      "Ryan L-17 Navion": "",
      "Saab 2000": "",
      "Saab 340B": "",
      "SAAB Scandia 90": "",
      "Savage Cub (MSFS)": "",
      "Scottish Aviation Twin Pioneer": "",
      "Short SD3-30": "",
      "Shorts SD3-60": "",
      "Shorts Skyvan": "",
      "SIAI-Marchetti S.205 18/R": "",
      "SIAI-Marchetti SF260": "",
      "SIAI-Marchetti SM.1019A": "",
      "Sikorsky S-43": "",
      "Sikorsky S-55": "",
      "Sikorsky S-76": "",
      "Sikorsky S-92A Cougar": "",
      "Sikorsky UH-60 Blackhawk": "",
      "Socata TB-10 Tobago": "",
      "Socata TB21GT Trinidad": "",
      "Socata TBM 700": "",
      "Socata TBM 850": "",
      "Socata TBM 930 (MSFS)": "",
      "Spartan 7W Executive": "",
      "Stinson 108": "",
      "Stinson L-5B Sentinel": "",
      "Stinson Reliant": "",
      "Supermarine Spitfire": "",
      "Supermarine Walrus MK 1": "",
      "Tecnam P2006T": "",
      "Tecnam P2012 Traveller": "",
      "Tecnam P92 Echo": "",
      "Travel Air Mystery Ship 613": "",
      "Tupolev Tu-124": "",
      "Van's RV-10": "",
      "Vans RV-7/7A": "",
      "Vickers Viscount": "",
      "Waco Classic YMF": "",
      "Westland Seaking": "",
      "Yakovlev Yak-12A": "",
      "Yakovlev Yak-18T": "",
      "Yakovlev Yak-40": "",
      "Zenair CH 801": "",
      "Zepplin NT": "",
      "Zlin Z-43": "",
    };

    var basetype = aircraftelement ? airframes[aircraftelement.innerText] : "";

    assignments.forEach(function (assignment) {
      orig = getAssignmentText(assignment, 7);
      dest = getAssignmentText(assignment, 9);
      var passengers = getAssignmentText(assignment, 15);
      if (passengers.indexOf("kg") !== passengers.length - 2) {
        pax += +passengers.split(" ")[0];
      } else {
        var cargoarr = passengers.split(" ");
        cargo = +cargoarr[cargoarr.length - 1].replace("kg", "");
      }
    });

    var params = [];
    params.push("orig=" + orig);
    params.push("dest=" + dest);
    params.push("reg=" + reg);
    params.push("basetype=" + basetype);
    params.push("pax=" + pax);
    params.push("cargo=" + cargo);

    var btn = document.createElement("a");
    btn.href = "https://dispatch.simbrief.com/options/new?" + params.join("&");
    btn.target = "_blank";
    btn.innerHTML =
      "<img src='https://dispatch.simbrief.com/img/logo-papers.749a29af39b0.png' width='15px' /> SimBrief Dispatch";
    btn.classList.add("btn-simbrief");
    actions.appendChild(btn);
  } else if (page.indexOf("aircraftforsale.jsp") === 0) {
    var btns = document.querySelectorAll("button");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTimeout(function () {
          var aircraft = document.querySelectorAll(".aircraftTable tbody tr");
          aircraft.forEach(function (ac) {
            var actext = ac.childNodes[3].innerText;
            ac.childNodes[3].innerHTML =
              "<div class='ac-img' " +
              (aircraftImages[actext]
                ? "style='background-image:url(\"" +
                  aircraftImages[actext] +
                  "\");'"
                : "") +
              "></div> " +
              actext;
          });
        }, 3000);
      });
    });
  } else if (
    page.indexOf("new") === 0 &&
    path.indexOf("dispatch.simbrief.com") !== -1
  ) {
    var params = [];
    loadParams(params);
    setTimeout(function () {
      updateSimBriefValue("pounds", 0);
      updateSimBriefValue("orig", params.orig || "");
      updateSimBriefValue("dest", params.dest || "");
      triggerChange("dest");
      updateSimBriefValue("basetype", params.basetype || "");
      triggerChange("basetype", "change");
      updateSimBriefValue("reg", params.reg || "");
      updateSimBriefValue("callsign", (params.reg || "").replace("-", ""));
      triggerChange("reg");
      updateSimBriefValue("pax", params.pax || "");
      triggerChange("pax");
      updateSimBriefValue("cargo", params.cargo || "");
      triggerChange("cargo");
      var aframes = document.getElementById("type");
      if (aframes.childNodes.length > 2) {
        setTimeout(function () {
          updateSimBriefValue("type", aframes.childNodes[2].value);
          triggerChange("type", "change");
          updateSimBriefValue("reg", params.reg || "");
        }, 2000);
      }
    }, 5000);
  }
})();
