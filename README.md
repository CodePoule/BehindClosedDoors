# BehindClosedDoors

Digital Escape Game Product. 
Done in Scrum with a Sprint of two weeks . 

                                                   *** Scrum Team of six people *** 
 
 # Concept of the Game
 
 Behind Closed Doors is an escape game in Javascript where the player will have to solve enigmas and mysteries to unlock rooms and progress deeper in the game. The concept of the game is to bring to the User an experience that will be enlightning and different from your everyday escape game. The six rooms all have their own concept from the early memories of your childhood to the more dark adult world we all fear. 
             Be careful though! for amongst the many secrets another one is hiding. 
 
 # Rules of the Game
 
60 min chrono. 
3 lifes. 
La vie se reset à chaque nouvelle salle. 
1 erreur lors de la resolution des enigmes = une perte de vie. Lorque toutes les vies ont été consommées = retour salle 1.
le chrono est global. si chrono = 0 alors Game Over. 
le passage d'une salle à l'autre ne s'effectue que lorsque l'enigme de la salle a été résolue. 
Chaque fois qu'une salle est complétée un item est attribué, vous devez récolter un total de 6 items pour completer le jeu.

    _rules room 1: Children's Memories

Pour finir cette salle, tu as besoin de résoudre ces calculs sur trois niveaux de difficulté.

    _rules room 2: Question Mark

Pour finir cette salle, tu devras répondre à 10 questions. Attention, tu dois cependant répondre correctement à 8 questions. 

    _rules room 3: Piece of Work

Pour finir cette salle, tu devras completer correctement un puzzle, il y a trois niveaux de difficulté . Attention ! tu as un nombre de déplacements limités (à definir). 

    _rules room 4: Passenger in the Dark

Boo! te voilà passager dans un train à destination inconnue. Pour t'en sortir il te faudra répondre à une énigme. Soit attentif aux indices apparaissant au long du voyage. 

    _rules room 5: Space Anarchy!
    
Accident ! ! ! Lors d'un voyage dans la station spatiale l'Intelligence Artificielle a prit le contrôle. Vite! Tu devras trouver la bonne combinaison de couleur afin de pouvoir t'échapper et retourner sur la Terre! 

    _rules room 6: The Last of Computers
    
De retour sur la Terre ! mais il semblerait que tu as voyagé dans le temps à un siècle inquiétant. Pour t'échapper de là tu dois retrouver la bonne combinaison et la rentrer dans le dernier ordinateur ayant survecu à l'apocalypse. Sois rapide ! car le compte à rebours à commencé. 

    _rules Secret Room: The Court

MUAHAHAHAHAHAHA ! ! ! ! Tu as été dupé, regarde autour de toi dans l'espoir de trouver un moyen de sortir. Tes souvenirs peuvent t'aider.


                                          *** Structure of the Game *** 

# Homepage

- details:
button Start (link to game) / About (games rules) / Team <p> team introduction 
 h1 -> game's title 
 div -> including the About / Team content.
Jquery 
css flexbox 
  
number of points: 3


# Template

- details
div -> display Fibonnacci sequence / animation when number appears in room
div -> toggle sideway , blinking icon (animation) => rules are displayed
no animation on icon once clicked. 
3 hearts => pictures , vanishing everytime one (1) life is removed
0 life => return to Room 1. 
Button Arrow => link to next room : function in JS, appearing once the room's enigma is solved. 
Chrono : progress bar (( to see https://loading.io/progress/ )) 
local storage to keep chrono data on every room (to prevent chrono refresh upon changing room)
pop up victory / loss 
adds fake item each time the room's enigma is solved (function Fibo)

number of points: 8

# Room 1: Children's memories (Marcy)

- details
function Random
4 variables / pictures
1 variable = image + random value

flex container div
input to insert resultat <- keypress to enter only numbers
4th result => checking's function, function Level of diffuclty => Valider Button
last level displays arrow for next room

fill victory/loss pop up's text content.

number of points: 3

# Room 2: Question Mark (Shéra)

- details
10 questions : True or False answers / radio buttons
if answer : true -> next question appears
if 10th question : true => arrow for next level appears

Array of object : 
 - question
 - answer
 = List of 20 questions chosen randomly
 
Counter of remaining questions. 

fill text in pop up victory/loss

number of points: 3
  

# Room 3: Piece of Work (Jean)

- details
(add website's link for the puzzle)
div container puzzle
Array of pictures with a random on it 
number of moves limited. function js decrement linked to the Life function

fill text for victory/loss pop up

number of points: 3

# Room 4: Passenger in the Dark (Céline)

- details
video bg fullscreen 
includes hints of the Enigma at given points during the video. (images of 'monsters' included inside the video)
-> pop ups appearing when the monster does too. Video pauses ( around 5s ) 
input to have the user enter the Enigma's answer. 
if condition : answer entered = answer
if answer : false = loss of 1 life
if only 1 life remaining => pop up of one hint to help
button Valider appearing at the end of the video.

number of points: 5 

# Room 5: Space Anarchy (Marie)

- details
(add more details later)
function random [o , 3 ]
Empty Array that get filled by the Random function (Sequence Array)
Loop For to fill the Sequence Array

Colors or Images(à choisir): lights on/off => in an Array 
Compairing function between Arrays user / Sequence
-> event click: when user click on color -> fills user Array

function to control colors lights on/off
-> Set Time Out on Sequence Array to control on/off lights state.

-> include in Victory Pop up: "Attention! la prochaine salle à un temps limité etc..." 

number of points: 8
(refinement planned later)

# Room 6: The Last of Computers (Cass)

- details
input to allow the user to enter the last number of the Fake Items Sequence.
animation on the Sequence going from top of the screen to the computer's container in the middle of the screen.
keypress sur F5 & Ctrl R -> pop up to tell the user NOT to cheat
Big countdown (LCD way) (around 60s)
if countdown = 0 -> return to Room 1 
if correct number guessed => blue screen on little computer + fade to black in fullscreen and goes to Secret room

fade to black depending of the chrono. if time = 0 -> black screen

number of points: 3
 
# Secret Room (Owl Squad)

-details
cursor in magnifier glass
6 True Items placed over paintings of each former rooms. Hidden (display: none) 
-> hover on the paintings that reveal the items
on click on items IN the right order = item vanishes from the painting and appears on the central painting
if wrong order :
- only 1 life on this room: return room 1
- 0 life remaining: pop up Game Over
if victory => pop up video fullscreen of an open door 
animation on heart : beating heart + audio bpm 

number of points: 5 
