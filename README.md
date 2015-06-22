# Commucal

Google script that parses reservation emails received in gmail from communauto and make/modify/removes an event in calendar.

Prerequisite:

- Add filter in gmail that adds a "Communauto" Label to all e-mails with these rules:
  - from:(noreply@communauto.com) 
  - string in text : "Voici les informations relatives à votre réservation numéro"

Installation:

- Be sure your filter above works.
- Copy/paste code.gs in a new empty script in Google Scripts. ( https://script.google.com )
- Set up Trigger to run script every 10 minutes. ( http://www.quora.com/How-can-I-periodically-run-a-Google-Script-on-a-Spreadsheet )

If operation is a success, it will mark email as read. 

_Version 1.0_

- if modifying or cancelling, it will change event according so.
- Adds a 15 minutes before reminder popup.
- Works with emails in french only at this time. 


_TODO_

- Get station location and retreive long, lat from http://monstyledeville.net/ to put in location field of calendar event.

