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
    btn.innerHTML = "<img src='https://dispatch.simbrief.com/img/logo-papers.749a29af39b0.png' width='15px' /> SimBrief Dispatch";
    btn.classList.add("btn-simbrief");
    actions.appendChild(btn);
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
    }, 5000);
  }
})();
