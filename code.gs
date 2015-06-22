function Communauto_Gmail_Calendar(){
  
  var searchStr = "label:unread label:Communauto";
  var threads = GmailApp.search(searchStr);

  for (var i = 0; i < threads.length; i++) {  
    var message = threads[i].getMessages()[0];
    var subject = message.getSubject();
    var body = message.getPlainBody();
    var result = "";
    //Parse body to get data 
      
    tmp = body.match(/hicule:\s*([A-Za-z0-9\s]+)(\r?\n)/);
    var vehicule = tmp[1];
    
    tmp = body.match(/numéro\s*([A-Za-z0-9]+)/);
    var rezId = tmp[1];
    
    tmp = body.match(/but:\s*([A-Za-z0-9:\s]+)(\r?\n)/);
    var rezStartText = tmp[1];
    
    
    tmp = body.match(/fin:\s*([A-Za-z0-9:\s]+)(\r?\n)/);
    var rezStopText = tmp[1];
        
    tmp = body.match(/nom\):\s([0-9]*)/);
    var rezStation = tmp[1];
    var location = getStationLocation(rezStation).toString();
    
    var rezName = "Communauto : " + vehicule;
    
    
    
    //Parse subject to get operation 
    if (subject.search("MODIFICATION") >= 0){      
      result = modifyEvent(rezId, rezName, localeToDate(rezStartText), localeToDate(rezStopText), body, location);
    } else {
      if (subject.search("ANNULATION") >= 0){
        result = removeEvent(rezId, localeToDate(rezStartText), localeToDate(rezStopText));
      } else {
        result = addEvent(rezId, rezName, localeToDate(rezStartText), localeToDate(rezStopText), body, location);
        }
      }
    
    if (result == "success"){
      message.markRead();
    } else {
      // send message with error
     }
  }   
}

function addEvent(eventId, eventSubject, eventStart, eventStop, eventDescription, eventLocation){
  var event = CalendarApp.createEvent(eventSubject, eventStart, eventStop, {description:eventDescription, location:eventLocation});
  event.removeAllReminders();
  event.addPopupReminder(15);
  return "success";
}

function modifyEvent(eventId, eventSubject, eventStart, eventStop, eventDescription, eventLocation){
  var event = CalendarApp.getDefaultCalendar().getEvents(eventStart, eventStop, {search: "Communauto"});
  event[0].setTime(eventStart, eventStop);
  event[0].setDescription(eventDescription);
  event[0].setTitle(eventSubject);
  event[0].setLocation(eventLocation);
  return "success";
}

function removeEvent(eventId, eventStart, eventStop){
  var event = CalendarApp.getDefaultCalendar().getEvents(eventStart, eventStop,{search: "Communauto"});
  event[0].deleteEvent();
  return "success";
}

function localeToDate(locale) {
  tmp = locale.match(/([A-Za-z0-9]*)\s([0-9]*)\s([A-Za-z0-9]*)\s([0-9]*)\s([0-9]*):([0-9]*):([0-9]*)/);
  mois = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  month = mois.indexOf(tmp[3]);
  formattedDate = new Date(tmp[4],month,tmp[2],tmp[5],tmp[6],tmp[7])
  return formattedDate;
}

function getStationLocation(tmp) {
  
  //Data from http://monstyledeville.net/xml.php?id=2 - xml to json obj made on : 22/06/2015
  var json = { "Station": [
                {
                    "_StationID": "127",
                    "_StationNo": "001",
                    "_Sector": "9. St-Jean-Baptiste",
                    "_Zone": "0",
                    "_Longitude": "-71.2253",
                    "_Latitude": "46.8096",
                    "__cdata": "Sutherland"
                },
                {
                    "_StationID": "128",
                    "_StationNo": "002",
                    "_Sector": "9. St-Jean-Baptiste",
                    "_Zone": "0",
                    "_Longitude": "-71.22066",
                    "_Latitude": "46.81212",
                    "__cdata": "Olivier-Robitaille"
                },
                {
                    "_StationID": "129",
                    "_StationNo": "003",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.23298",
                    "_Latitude": "46.80535",
                    "__cdata": "des Franciscains"
                },
                {
                    "_StationID": "130",
                    "_StationNo": "004",
                    "_Sector": "1. Limoilou",
                    "_Zone": "0",
                    "_Longitude": "-71.2305",
                    "_Latitude": "46.8269",
                    "__cdata": "11e Rue"
                },
                {
                    "_StationID": "131",
                    "_StationNo": "005",
                    "_Sector": "9. St-Jean-Baptiste",
                    "_Zone": "0",
                    "_Longitude": "-71.2194",
                    "_Latitude": "46.81172",
                    "__cdata": "Ste-Geneviève"
                },
                {
                    "_StationID": "132",
                    "_StationNo": "006",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.23007",
                    "_Latitude": "46.80622",
                    "__cdata": "Lucien-Borne"
                },
                {
                    "_StationID": "133",
                    "_StationNo": "007",
                    "_Sector": "10. Vieux-Québec",
                    "_Zone": "0",
                    "_Longitude": "-71.21232",
                    "_Latitude": "46.81113",
                    "__cdata": "de l'Esplanade"
                },
                {
                    "_StationID": "136",
                    "_StationNo": "010",
                    "_Sector": "7. St-Sauveur",
                    "_Zone": "0",
                    "_Longitude": "-71.2362",
                    "_Latitude": "46.80782",
                    "__cdata": "St-Germain"
                },
                {
                    "_StationID": "137",
                    "_StationNo": "011",
                    "_Sector": "7. St-Sauveur",
                    "_Zone": "0",
                    "_Longitude": "-71.2375",
                    "_Latitude": "46.8124",
                    "__cdata": "St-Vallier"
                },
                {
                    "_StationID": "140",
                    "_StationNo": "014",
                    "_Sector": "4. St-Sacrement",
                    "_Zone": "0",
                    "_Longitude": "-71.2442",
                    "_Latitude": "46.79489",
                    "__cdata": "Collège St-Charles-Garnier"
                },
                {
                    "_StationID": "141",
                    "_StationNo": "015",
                    "_Sector": "1. Limoilou",
                    "_Zone": "0",
                    "_Longitude": "-71.2293",
                    "_Latitude": "46.8319",
                    "__cdata": "Ferland"
                },
                {
                    "_StationID": "142",
                    "_StationNo": "016",
                    "_Sector": "2. St-Pascal",
                    "_Zone": "0",
                    "_Longitude": "-71.2221",
                    "_Latitude": "46.837",
                    "__cdata": "de la Ronde"
                },
                {
                    "_StationID": "143",
                    "_StationNo": "017",
                    "_Sector": "10. Vieux-Québec",
                    "_Zone": "0",
                    "_Longitude": "-71.211",
                    "_Latitude": "46.81807",
                    "__cdata": "Marché du Vieux-Port"
                },
                {
                    "_StationID": "145",
                    "_StationNo": "019",
                    "_Sector": "5. Sillery",
                    "_Zone": "0",
                    "_Longitude": "-71.2469",
                    "_Latitude": "46.7895",
                    "__cdata": "Holland et Laurier"
                },
                {
                    "_StationID": "146",
                    "_StationNo": "020",
                    "_Sector": "8. St-Roch",
                    "_Zone": "0",
                    "_Longitude": "-71.22283",
                    "_Latitude": "46.8178",
                    "__cdata": "Du Pont"
                },
                {
                    "_StationID": "147",
                    "_StationNo": "021",
                    "_Sector": "5. Sillery",
                    "_Zone": "0",
                    "_Longitude": "-71.2514",
                    "_Latitude": "46.7857",
                    "__cdata": "William et Laurier"
                },
                {
                    "_StationID": "148",
                    "_StationNo": "022",
                    "_Sector": "5. Sillery",
                    "_Zone": "0",
                    "_Longitude": "-71.24778",
                    "_Latitude": "46.7825",
                    "__cdata": "Bergerville"
                },
                {
                    "_StationID": "149",
                    "_StationNo": "023",
                    "_Sector": "1. Limoilou",
                    "_Zone": "0",
                    "_Longitude": "-71.2266",
                    "_Latitude": "46.82217",
                    "__cdata": "4e Rue"
                },
                {
                    "_StationID": "152",
                    "_StationNo": "026",
                    "_Sector": "10. Vieux-Québec",
                    "_Zone": "0",
                    "_Longitude": "-71.21229",
                    "_Latitude": "46.81362",
                    "__cdata": "Ste-Angèle"
                },
                {
                    "_StationID": "153",
                    "_StationNo": "027",
                    "_Sector": "8. St-Roch",
                    "_Zone": "0",
                    "_Longitude": "-71.22671",
                    "_Latitude": "46.81182",
                    "__cdata": "Dorchester"
                },
                {
                    "_StationID": "222",
                    "_StationNo": "028",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.2368",
                    "_Latitude": "46.7999",
                    "__cdata": "Église St-Martyrs"
                },
                {
                    "_StationID": "225",
                    "_StationNo": "030",
                    "_Sector": "1. Limoilou",
                    "_Zone": "0",
                    "_Longitude": "-71.24315",
                    "_Latitude": "46.8394",
                    "__cdata": "Église St-Albert-le-Grand"
                },
                {
                    "_StationID": "236",
                    "_StationNo": "035",
                    "_Sector": "9. St-Jean-Baptiste",
                    "_Zone": "0",
                    "_Longitude": "-71.22531",
                    "_Latitude": "46.81051",
                    "__cdata": "Lavigueur"
                },
                {
                    "_StationID": "246",
                    "_StationNo": "036",
                    "_Sector": "1. Limoilou",
                    "_Zone": "0",
                    "_Longitude": "-71.2414",
                    "_Latitude": "46.83325",
                    "__cdata": "Patro Roc-Amadour"
                },
                {
                    "_StationID": "257",
                    "_StationNo": "038",
                    "_Sector": "9. St-Jean-Baptiste",
                    "_Zone": "0",
                    "_Longitude": "-71.2272",
                    "_Latitude": "46.8061",
                    "__cdata": "Salaberry et Lockwell"
                },
                {
                    "_StationID": "258",
                    "_StationNo": "039",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.2966",
                    "_Latitude": "46.7721",
                    "__cdata": "Roland-Beaudin et de l'Église"
                },
                {
                    "_StationID": "271",
                    "_StationNo": "041",
                    "_Sector": "7. St-Sauveur",
                    "_Zone": "0",
                    "_Longitude": "-71.24326",
                    "_Latitude": "46.80855",
                    "__cdata": "Aqueduc et Dollard"
                },
                {
                    "_StationID": "272",
                    "_StationNo": "042",
                    "_Sector": "8. St-Roch",
                    "_Zone": "0",
                    "_Longitude": "-71.2244",
                    "_Latitude": "46.8165",
                    "__cdata": "275 du Parvis"
                },
                {
                    "_StationID": "286",
                    "_StationNo": "044",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.2296",
                    "_Latitude": "46.80292",
                    "__cdata": "des Érables et René-Lévesque"
                },
                {
                    "_StationID": "312",
                    "_StationNo": "045",
                    "_Sector": "10. Vieux-Québec",
                    "_Zone": "0",
                    "_Longitude": "-71.2012",
                    "_Latitude": "46.81396",
                    "__cdata": "Dalhousie"
                },
                {
                    "_StationID": "321",
                    "_StationNo": "046",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.232961",
                    "_Latitude": "46.801231",
                    "__cdata": "Casot"
                },
                {
                    "_StationID": "325",
                    "_StationNo": "047",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.271",
                    "_Latitude": "46.791",
                    "__cdata": "Boivin et Myrand"
                },
                {
                    "_StationID": "331",
                    "_StationNo": "048",
                    "_Sector": "4. St-Sacrement",
                    "_Zone": "0",
                    "_Longitude": "-71.2519",
                    "_Latitude": "46.7944",
                    "__cdata": "Holland et Barrin"
                },
                {
                    "_StationID": "341",
                    "_StationNo": "050",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.222",
                    "_Latitude": "46.8025",
                    "__cdata": "Galipeault"
                },
                {
                    "_StationID": "342",
                    "_StationNo": "049",
                    "_Sector": "11. Lévis",
                    "_Zone": "0",
                    "_Longitude": "-71.182999",
                    "_Latitude": "46.805321",
                    "__cdata": "St-Louis et Dorimène-Desjardins"
                },
                {
                    "_StationID": "347",
                    "_StationNo": "051",
                    "_Sector": "8. St-Roch",
                    "_Zone": "0",
                    "_Longitude": "-71.228487",
                    "_Latitude": "46.809416",
                    "__cdata": "Arago et Jérôme"
                },
                {
                    "_StationID": "348",
                    "_StationNo": "052",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.268736",
                    "_Latitude": "46.779946",
                    "__cdata": "Résidences de l'Université"
                },
                {
                    "_StationID": "349",
                    "_StationNo": "053",
                    "_Sector": "2. Beauport",
                    "_Zone": "0",
                    "_Longitude": "-71.216",
                    "_Latitude": "46.8463",
                    "__cdata": "d'Estimauville et de la Canardière"
                },
                {
                    "_StationID": "374",
                    "_StationNo": "055",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.333822",
                    "_Latitude": "46.761311",
                    "__cdata": "Campanile et Laudance"
                },
                {
                    "_StationID": "375",
                    "_StationNo": "056",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.2345",
                    "_Latitude": "46.7955",
                    "__cdata": "Jardins Mérici"
                },
                {
                    "_StationID": "384",
                    "_StationNo": "059",
                    "_Sector": "8. St-Roch",
                    "_Zone": "0",
                    "_Longitude": "-71.231044",
                    "_Latitude": "46.815136",
                    "__cdata": "Caron et Lalemant"
                },
                {
                    "_StationID": "397",
                    "_StationNo": "057",
                    "_Sector": "1. Duberger",
                    "_Zone": "0",
                    "_Longitude": "-71.303234",
                    "_Latitude": "46.81271",
                    "__cdata": "De Monaco et Lemieux"
                },
                {
                    "_StationID": "399",
                    "_StationNo": "062",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.288543",
                    "_Latitude": "46.783421",
                    "__cdata": "Halles Ste-Foy"
                },
                {
                    "_StationID": "400",
                    "_StationNo": "061",
                    "_Sector": "1. Charlesbourg",
                    "_Zone": "0",
                    "_Longitude": "-71.253072",
                    "_Latitude": "46.846565",
                    "__cdata": "1ère Avenue et 49ème Rue"
                },
                {
                    "_StationID": "403",
                    "_StationNo": "063",
                    "_Sector": "10. Vieux-Québec",
                    "_Zone": "0",
                    "_Longitude": "-71.215018",
                    "_Latitude": "46.816851",
                    "__cdata": "Jean-Lesage et Saint-Paul"
                },
                {
                    "_StationID": "404",
                    "_StationNo": "064",
                    "_Sector": "1. Charlesbourg",
                    "_Zone": "0",
                    "_Longitude": "-71.261716",
                    "_Latitude": "46.861974",
                    "__cdata": "3e Avenue et 77e Rue"
                },
                {
                    "_StationID": "407",
                    "_StationNo": "066",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.244698",
                    "_Latitude": "46.798738",
                    "__cdata": "Sainte-Foy et Cardinal-Bégin"
                },
                {
                    "_StationID": "408",
                    "_StationNo": "067",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.310399",
                    "_Latitude": "46.767456",
                    "__cdata": "Des Quatre-Bourgeois et Duchesneau"
                },
                {
                    "_StationID": "410",
                    "_StationNo": "069",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.239057",
                    "_Latitude": "46.796599",
                    "__cdata": "René-Lévesque et Belvédère"
                },
                {
                    "_StationID": "414",
                    "_StationNo": "070",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.330131",
                    "_Latitude": "46.766646",
                    "__cdata": "Sainte-Foy et Pie-XII"
                },
                {
                    "_StationID": "415",
                    "_StationNo": "071",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.268063",
                    "_Latitude": "46.787832",
                    "__cdata": "Paradis et Louis-Jolliet"
                },
                {
                    "_StationID": "416",
                    "_StationNo": "072",
                    "_Sector": "8. St-Roch",
                    "_Zone": "0",
                    "_Longitude": "-71.222354",
                    "_Latitude": "46.816314",
                    "__cdata": "De La Salle et de la Chapelle"
                },
                {
                    "_StationID": "439",
                    "_StationNo": "073",
                    "_Sector": "7. St-Sauveur",
                    "_Zone": "0",
                    "_Longitude": "-71.24048",
                    "_Latitude": "46.805907",
                    "__cdata": "Hermine et Montmagny"
                },
                {
                    "_StationID": "443",
                    "_StationNo": "074",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.22718",
                    "_Latitude": "46.800784",
                    "__cdata": "Saunders et Des Érables"
                },
                {
                    "_StationID": "444",
                    "_StationNo": "075",
                    "_Sector": "9. St-Jean-Baptiste",
                    "_Zone": "0",
                    "_Longitude": "-71.220831",
                    "_Latitude": "46.810107",
                    "__cdata": "D'Aiguillon et Sainte-Marie"
                },
                {
                    "_StationID": "466",
                    "_StationNo": "076",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.312697",
                    "_Latitude": "46.774993",
                    "__cdata": "Sainte-Foy et De Mézy"
                },
                {
                    "_StationID": "495",
                    "_StationNo": "077",
                    "_Sector": "1. Vanier",
                    "_Zone": "0",
                    "_Longitude": "-71.257568",
                    "_Latitude": "46.815371",
                    "__cdata": "Bélanger et Chabot"
                },
                {
                    "_StationID": "527",
                    "_StationNo": "078",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.229183",
                    "_Latitude": "46.799832",
                    "__cdata": "Du Parc et Grande Allée"
                },
                {
                    "_StationID": "569",
                    "_StationNo": "080",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.288314",
                    "_Latitude": "46.766974",
                    "__cdata": "Laurier et de l'Église"
                },
                {
                    "_StationID": "570",
                    "_StationNo": "081",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.280606",
                    "_Latitude": "46.787477",
                    "__cdata": "Chapdelaine et Nérée-Tremblay"
                },
                {
                    "_StationID": "571",
                    "_StationNo": "082",
                    "_Sector": "7. St-Sauveur",
                    "_Zone": "0",
                    "_Longitude": "-71.234717",
                    "_Latitude": "46.812198",
                    "__cdata": "D'Argenson et Saint-Ambroise"
                },
                {
                    "_StationID": "579",
                    "_StationNo": "083",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.302831",
                    "_Latitude": "46.779801",
                    "__cdata": "Chanoine-Scott et Ste-Foy"
                },
                {
                    "_StationID": "584",
                    "_StationNo": "085",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.298033",
                    "_Latitude": "46.754368",
                    "__cdata": "Gare de Sainte-Foy"
                },
                {
                    "_StationID": "592",
                    "_StationNo": "086",
                    "_Sector": "9. St-Jean-Baptiste",
                    "_Zone": "0",
                    "_Longitude": "-71.219024",
                    "_Latitude": "46.809021",
                    "__cdata": "De la Chevrotière et René-Lévesque"
                },
                {
                    "_StationID": "593",
                    "_StationNo": "087",
                    "_Sector": "2. Beauport",
                    "_Zone": "0",
                    "_Longitude": "-71.208584",
                    "_Latitude": "46.853245",
                    "__cdata": "Saint-Rédempteur et Loyola"
                },
                {
                    "_StationID": "637",
                    "_StationNo": "089",
                    "_Sector": "10. Vieux-Québec",
                    "_Zone": "0",
                    "_Longitude": "-71.213795",
                    "_Latitude": "46.811859",
                    "__cdata": "Place D’Youville (Électrique)"
                },
                {
                    "_StationID": "638",
                    "_StationNo": "088",
                    "_Sector": "10. Vieux-Québec",
                    "_Zone": "0",
                    "_Longitude": "-71.20855",
                    "_Latitude": "46.813815",
                    "__cdata": "Hôtel de Ville de Québec (Électrique)"
                },
                {
                    "_StationID": "639",
                    "_StationNo": "090",
                    "_Sector": "8. St-Roch",
                    "_Zone": "0",
                    "_Longitude": "-71.22388",
                    "_Latitude": "46.812862",
                    "__cdata": "De la Couronne et Sainte-Hélène (Électrique)"
                },
                {
                    "_StationID": "649",
                    "_StationNo": "092",
                    "_Sector": "11. Lévis",
                    "_Zone": "0",
                    "_Longitude": "-71.170274",
                    "_Latitude": "46.801068",
                    "__cdata": "De la Rive-Sud et Alphonse-Desjardins"
                },
                {
                    "_StationID": "660",
                    "_StationNo": "094",
                    "_Sector": "6. Montcalm",
                    "_Zone": "0",
                    "_Longitude": "-71.224192",
                    "_Latitude": "46.801561",
                    "__cdata": "Grande Allée et Cartier"
                },
                {
                    "_StationID": "688",
                    "_StationNo": "095",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.26891",
                    "_Latitude": "46.779848",
                    "__cdata": "Résidences de l'Université (Électrique)"
                },
                {
                    "_StationID": "802",
                    "_StationNo": "096",
                    "_Sector": "1. Limoilou",
                    "_Zone": "0",
                    "_Longitude": "-71.235817",
                    "_Latitude": "46.83135",
                    "__cdata": "18e Rue et Cardinal-Villeneuve"
                },
                {
                    "_StationID": "809",
                    "_StationNo": "097",
                    "_Sector": "3. Ste-Foy",
                    "_Zone": "0",
                    "_Longitude": "-71.26636",
                    "_Latitude": "46.794524",
                    "__cdata": "Louis-Jetté et Baillairgé"
                },
                {
                    "_StationID": "881",
                    "_StationNo": "098",
                    "_Sector": "1. Limoilou",
                    "_Zone": "0",
                    "_Longitude": "-71.239498",
                    "_Latitude": "46.825829",
                    "__cdata": "De L'Espinay et de Guyenne"
                },
                {
                    "_StationID": "931",
                    "_StationNo": "099",
                    "_Sector": "7. St-Sauveur",
                    "_Zone": "0",
                    "_Longitude": "-71.239283",
                    "_Latitude": "46.81117",
                    "__cdata": "Saint-Vallier et Bayard"
                }
            ]
      };


  for (var i = 0; i < json.Station.length; i++) {  
    var station = json.Station[i]._StationNo
    if (station == tmp){
      var statLong = json.Station[i]._Longitude
      var statLat = json.Station[i]._Latitude
    } 
  }

  return [statLat,statLong];

}
