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

let vie = 3;

function decrementation_vie() {
    if (vie == 2) {
        togglevisi(heart1, "none");
        console.log("titre");
        titrePopDiv.innerHTML = "Voici le titre des règles du jeu !"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>Ici nous mettons les règles du jeu quand elles seront écrites !</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (vie == 1) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
        console.log("titre");
        titrePopDiv.innerHTML = "Voici le titre des règles du jeu !"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>Ici nous mettons les règles du jeu quand elles seront écrites !</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (vie == 0) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
        togglevisi(heart3, "none");
    }
}

// FONCTION FLECHE
let fleche = document.querySelector(".fleche");
togglevisi(fleche, "none");


// !!!! A INSERER LORS DE LA PERTE
// decrementation de la vie
vie--;
// decrementation_vie();
// retour salle 1 si vie=0
if (vie==0) {
    console.log("titre");
    titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
    console.log("regles");
    pPopDiv.innerHTML = "<p id='p-div'>On aurait pu croire en ton potentiel mais apparement non...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
    togglevisi(popDiv, "");
    fadeIn(popDiv,5);
    setTimeout (function () {document.location.href = "../index.html" // Retour page accueil
    }, 5000);
}
// !!!!! A INSERER LORS DE LA GAGNE

// apparition de la fleche salle suivante et pop up victoire
togglevisi(fleche, "");
console.log("titre");
titrePopDiv.innerHTML = "Titre de victoire de la salle"; // TITRE DE LA POP UP
console.log("regles");
pPopDiv.innerHTML = "<p id='p-div'>texte de victoire de la salle</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
togglevisi(popDiv, "");
fadeIn(popDiv,5);

// Event lors de la victoire sur chaque page
fleche.addEventListener("click", function () {
    sauvegarder();
    document.location.href = pageSuivante; // variable à redéfinir sur chaque page pour aller à la page suivante : chaine de charctère/lien relatif
});

//document.onload = recharger(); // A inserer sur chaque fichier js à partir de la salle 2 !!!



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
let temps = 100; // on part de 100% de temps restant
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

// A inserer dans pop up
    console.log("titre");
    titrePopDiv.innerHTML = "Voici le titre des règles du jeu !"; // TITRE DE LA POP UP
    console.log("regles");
    pPopDiv.innerHTML = "<p id='p-div'>Ici nous mettons les règles du jeu quand elles seront écrites !</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
    togglevisi(popDiv, "");
    fadeIn(popDiv,5);


// Bouton [X] de fermeture de la pop - A copier tel quel
closeDiv.addEventListener("click", function (){
    fadeOut(popDiv, 10);
    console.log("pop out");
    setTimeout(function (){
        togglevisi(popDiv, "none");
        console.log("pop out 2")
    }, 1000)
});