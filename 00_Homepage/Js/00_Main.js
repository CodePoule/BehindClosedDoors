// Variables
let popDiv = document.querySelector("#pop-div"); // à déplacer en import export
let titrePopDiv = document.querySelector(".titre-pop-div"); // à déplacer en import export
let pPopDiv = document.querySelector("#paragraph-pop-div"); // à déplacer en import export
let btnRules = document.querySelector("#btn-rules");
let btnOwlSquad = document.querySelector("#bouton-team");
let closeDiv = document.querySelector(".fermer-div"); // à déplacer en import export
let flexContainer = document.querySelector("#flex-container");
let videoBackground = document.querySelector("#background");

// Opacité initiale
flexContainer.style.opacity = "0";
videoBackground.style.opacity = "0";

// Fonction d'apparition graduelle pour départ page
function fadeOnLoad(item1,item2) {
    let i = 0;
    let k = window.setInterval(function() {
        if (i >= 100) {
            clearInterval(k);
        } else {
            item1.style.opacity = i/100;
            item2.style.opacity = i/100;
            i++;
        }
    }, 10);
}

// A DEPLACER EN IMPORT EXPORT v

// fonction alternance display
function togglevisi(item, State) {
    item.style.display = State;
}

// Opacité initiale de la pop
popDiv.style.opacity = "0";

// Pop Div caché au départ
togglevisi(popDiv, 'none');

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

// A DEPLACER EN IMPORT EXPORT ^

// Event Listeners
btnRules.addEventListener("click", function (){
    console.log("titre");
    titrePopDiv.innerHTML = "Voici le titre des règles du jeu !";
    console.log("regles");
    pPopDiv.innerHTML = "Ici nous mettons les règles du jeu quand elles seront écrites !";
    togglevisi(popDiv, "");
    fadeIn(popDiv,5);
});

btnOwlSquad.addEventListener("click", function (){
    console.log("titre Team");
    titrePopDiv.innerHTML = "Voici Owl'Squad !";
    pPopDiv.innerHTML = "Ici nous mettons la description de la team/squad quad ça sera défini ^^ !";
    togglevisi(popDiv, "");
    fadeIn(popDiv,5);
});

closeDiv.addEventListener("click", function (){
    fadeOut(popDiv, 10);
    console.log("pop out");
    setTimeout(function (){
        togglevisi(popDiv, "none");
        console.log("pop out 2")
    }, 1000)
});

// Fonctions lorsque la page est chargée
document.onload = fadeOnLoad(flexContainer,videoBackground);