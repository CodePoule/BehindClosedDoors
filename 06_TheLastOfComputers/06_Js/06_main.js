
let vie = 3;

//variables audio
let blueScreenScreamOfDeath = document.querySelector('.bsod');

// Nom de la salle
let nomSalle = document.querySelector("#nom-salle");
nomSalle.innerHTML = "The Last of Computers";

// sidenav
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}


// compte à rebourd: déclaration des valeurs minutes et secondes
function getTimeRemaining(endtime) {
    let totalTime = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((totalTime / 1000) % 60);
    let minutes = Math.floor((totalTime / 1000 / 60) % 60);

    return {
        'total': totalTime,
        'minutes': minutes,
        'seconds': seconds
    };
}
//initialisation du compte à rebourd
function initializeClock(id, endtime) {
    let clock = document.getElementById(id);
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');


    function updateClock() {
        let totalTime = getTimeRemaining(endtime);

        minutesSpan.innerHTML = ('0' + totalTime.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + totalTime.seconds).slice(-2);
//quand compteur atteint 0 alors affiche message + retour à salle 1 (lien à ajouter)
        if (totalTime.total <= 0) {
            clearInterval(timeinterval);
            titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
            pPopDiv.innerHTML = "<p id='p-div'>On aurait pu croire en ton potentiel mais apparement non...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
            togglevisi(popDiv, "");
            fadeIn(popDiv,5);
            setTimeout (function () {document.location.href = "../01_ChildrensMemories/01_Index.html" // Retour page 01
            }, 5000);
        }
    }

    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
}
//réinitialisation
let deadline = new Date(Date.parse(new Date()) + 60 * 1000);
initializeClock('clockdiv', deadline);


// Display None/""
function togglevisi (item,State){
    item.style.display = State;
}

// FONCTION VIE
let heart1 = document.querySelector("#heart1");
let heart2 = document.querySelector("#heart2");
let heart3 = document.querySelector("#heart3");

togglevisi(heart1, "");
togglevisi(heart2, "");
togglevisi(heart3, "");



function decrementation_vie() {
    if (vie == 2) {
        togglevisi(heart1, "none");
        console.log("titre");
        titrePopDiv.innerHTML = "Raté!"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>Oh oho! c'est pas ça, essaye encore</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (vie == 1) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
        console.log("titre");
        titrePopDiv.innerHTML = "Encore Perdu! "; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>Plus qu'une seule chance de sortir vivant d'ici :)</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (vie == 0) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
        togglevisi(heart3, "none");
        console.log("titre");
        titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>On aurait pu croire en ton potentiel mais apparement non...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
        setTimeout (function () {document.location.href = "../index.html" // Retour page accueil
        }, 5000);
    }
}

// Chrono Global
let bar = new ldBar("#chrono");

// Save/restore Time à appeler quand victoire sur salle pour que fleche page suivante apparaisse
function sauvegarder(){
    localStorage.setItem("tempsGlobal",temps);
}
function recharger() {
    if (localStorage.getItem("tempsGlobal")){
        temps = parseInt(localStorage.getItem("tempsGlobal"));
        console.log(temps);
        setInterval(decrementation, 60000);
    }

}

let tempsEcoule = setInterval(decrementation, 60000); // decrementation toutes les minutes
// let temps = 100; // on part de 100% de temps restant
function decrementation(){
    if (temps<1){ // si on est a 0 => on arrete le compteur: game over
        clearInterval(tempsEcoule);
        console.log("titre");
        titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>On aurait pu croire en ton potentiel mais apparement non...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
        setTimeout (function () {document.location.href = "../index.html" // Retour page accueil
        }, 5000);
    }
    else{
        let pourcentageTemps = 100/60; // sinon on decrementate de 1.66% <=> 1 min sur 60min (en %)
        temps -= pourcentageTemps;
        bar.set(temps)
    }
}

// DIV POP UP
let popDiv = document.querySelector("#pop-div");
let titrePopDiv = document.querySelector(".titre-pop-div");
let pPopDiv = document.querySelector("#paragraph-pop-div");
let closeDiv = document.querySelector(".fermer-div");
let popDivBlueScreen = document.querySelector("#pop-div-blueImg");

// Opacité initiale de la pop
popDiv.style.opacity = "0";
popDivBlueScreen.style.opacity = "0";

// Pop Div caché au départ
togglevisi(popDiv, 'none');
togglevisi(popDivBlueScreen, 'none');

// Fonction d'apparition graduelle -> show()
function fadeIn(item,dureeApparition) { // dureeApparition est en ms soit 1000 ms = 1 seconde
    let i = 0;
    let k = window.setInterval(function() {
        if (i >= 100) {
            clearInterval(k);
        } else {
            item.style.opacity = i/100;
            i++;
        }
    }, dureeApparition);
}

// Fonction de disparition graduelle -> hide()
function fadeOut(item,dureeDisparition) { // dureeDisparition est en ms soit 1000 ms = 1 seconde
    let i = 100;
    let k = window.setInterval(function() {
        if (i <= 0) {
            clearInterval(k);
        } else {
            item.style.opacity = i/100;
            i--;
        }
    }, dureeDisparition);
}

// Bouton [X] de fermeture de la pop - A copier tel quel
closeDiv.addEventListener("click", function (){
    fadeOut(popDiv, 10);
    console.log("pop out");
    setTimeout(function (){
        togglevisi(popDiv, "none");
        console.log("pop out 2")
    }, 1000)
});

// FONCTION CONDITION VERIF IF 13 + POP UP ECRAN BLEU
let btnValider = document.querySelector('.fibBtn');
let inputNumber = document.querySelector('#inputFibOk');

function fakeVictory(){
    console.log(inputNumber.value);
    if (inputNumber.value == 13){
        // POP UP ecran bleu
        console.log("lol at u");
        togglevisi(popDivBlueScreen, "");
        blueScreenScreamOfDeath.play();
        fadeIn(popDivBlueScreen,5);
        setTimeout (function () {document.location.href = "../07_TheCourt/07_Index.html" // Retour page 07
        }, 7000);
        sauvegarder();
    }
    else{
        vie --;
        decrementation_vie();
        console.log("booooo");
    }
}

btnValider.addEventListener("click", fakeVictory);
document.onload=recharger(), decrementation();

