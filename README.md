# Commucal

_Français plus bas_

Google script that parses unread Communauto reservation emails received in gmail and make/modify/removes an event in Calendar.

Prerequisite:

- Add filter in gmail that adds a "Communauto" Label to all e-mails with these rules:
  - from:(noreply@communauto.com) 
  - string in text : "Voici les informations relatives à votre réservation numéro"

Installation:

- Be sure your filter above works.
- Copy/paste code.gs in a new empty script in Google Scripts. ( https://script.google.com )
- Set up Trigger to run script every 10 minutes. ( http://www.quora.com/How-can-I-periodically-run-a-Google-Script-on-a-Spreadsheet )

If operation is a success, it will mark email as read. 

_Version 1.1_
- Added station GPS coordinates in event 

_Version 1.0_

- If modifying or cancelling, it will change event according so.
- Adds a 15 minutes before reminder popup.
- Works with emails in french only at this time. 

_TODO_

- Add english support in email parsing

--------------------------

Français 

Script de Google qui analyse les e-mails non lus de réservation de Communauto reçus dans Gmail pour créer / modifier / supprimer un événement dans le calendrier .

Préalable:

- Ajouter un filtre dans Gmail qui ajoute une étiquette "Communauto" à tous les e-mails avec ces règles :
  - de: ( noreply@communauto.com )
  - Chaîne dans le texte : "Voici les informations relatives à votre réservation numéro"

Installation :

- Soyez sûr que votre filtre au-dessus fonctionne .
- Copier / coller le fichier Code.gs dans un nouveau script vide dans les scripts de Google. ( https://script.google.com )
- Mettre en place un déclencheur pour exécuter le script toutes les 10 minutes . ( http://www.quora.com/How-can-I-periodically-run-a-Google-Script-on-a-Spreadsheet )

Si l'opération est un succès , il va marquer l'email comme lu.

_Version 1.1_
- Ajout des coordonées GPS de la station dans le champ location de l'événement.

_version 1.0_

- S'il y a modification ou annulation , il va modifier / annuler l'événement.
- Ajoute un message de rappel 15 minutes avant.
- Fonctionne avec les courriels en français seulement à ce moment.

_à faire_

- Support de la langue anglaise dans la récupération des données de l'email
