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
    
    
    var rezName = "Communauto : " + vehicule;
    //var rezName = subject;
    
    //Parse subject to get operation 
    if (subject.search("MODIFICATION") >= 0){      
      result = modifyEvent(rezId, rezName, localeToDate(rezStartText),  localeToDate(rezStopText), body);
    } else {
      if (subject.search("ANNULATION") >= 0){
        result = removeEvent(rezId, localeToDate(rezStartText),  localeToDate(rezStopText));
      } else {
        result = addEvent(rezId, rezName, localeToDate(rezStartText),  localeToDate(rezStopText), body);
        }
      }
    
    if (result == "success"){
      message.markRead();
    } else {
      // send message with error
     }
  }   
}

function addEvent(eventId, eventSubject, eventStart, eventStop, eventDescription){
  var event = CalendarApp.createEvent(eventSubject, eventStart, eventStop, {description:eventDescription});
  event.removeAllReminders();
  event.addPopupReminder(15);
  return "success";
}

function modifyEvent(eventId, eventSubject, eventStart, eventStop, eventDescription){
  var event = CalendarApp.getDefaultCalendar().getEvents(eventStart, eventStop, {search: "Communauto"});
  event[0].setTime(eventStart, eventStop);
  event[0].setDescription(eventDescription);
  event[0].setTitle(eventSubject);
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

