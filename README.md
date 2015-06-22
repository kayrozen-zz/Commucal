# Commucal

Google script that parses emails received in gmail from communauto and make an event in calendar.

Prerequisite:

- Add filter in gmail that adds a "Communauto" Label to all e-mails from:(noreply@communauto.com) and string "Voici les informations relatives à votre réservation numéro"

Installation:

- Be sure your filter above works.
- Copy/paste code.gs in a new empty script in Google Scripts.
- Set up Trigger to run script every 10 minutes

If operation is a success, it will mark email as read. 

_Version 1.0_

- if modifying or cancelling, it will change event according so.
- Works with emails in french only at this time. 
