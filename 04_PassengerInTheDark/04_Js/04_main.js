let btnValidation = document.querySelector("#bouton_valider"); // Bouton valider
let repInput =  document.querySelector("#ghostAnswer"); // input champ texte
let divForm = document.querySelector("#flex-formulaire");
let popDiv = document.querySelector("#pop-div"); // Div Pop up
let titrePopDiv = document.querySelector(".titre-pop-div"); // Div titre de la pop up
let pPopDiv = document.querySelector("#paragraph-pop-div"); // paragraphe de la pop up
let closeDiv = document.querySelector(".fermer-div"); // bouton [X] de la pop up
let suitefibo = document.querySelector("#just-fibo");

// Nom de la salle
let nomSalle = document.querySelector("#nom-salle");
nomSalle.innerHTML = "Passenger in the Dark";

// fonction alternance display
function togglevisi(item, State) {
    item.style.display = State;
}

// Masquage du formulaire de saisie réponse
// togglevisi(divForm, "none");

// Opacité initiale de la pop
// divForm.style.opacity = "0";

// Objets réponses associées au url des vidéos ainsi que des titres et des textes de la div popup qui convient
function ReponsesCharades (rep, urlVideo, titrePop, textePop){
    this.rep = rep;
    this.urlVideo = urlVideo;
}



// définitions des objets et des réponses à définir
let cerbi = new ReponsesCharades("cerbere", "04_Video/04_Bg1.mp4");
let anubis = new ReponsesCharades("anubis", "04_Video/04_Bg2.mp4");
let time = new ReponsesCharades("temps", "04_Video/04_Bg3.mp4");

// Fonction Play Pause
let video = document.querySelector("#background");

function pauseVid() {
    video.pause();
}

// Fonction de vérificatiopn du input du train fantome salle 04
function verifInputGost() {
    // alert(repInput.value);
    console.log(repInput.value);
    if(repInput.value.toUpperCase() != cerbi.rep.toUpperCase()
        && repInput.value.toUpperCase() !=  anubis.rep.toUpperCase()
        && repInput.value.toUpperCase() != time.rep.toUpperCase()
        && repInput.value.toUpperCase() != "")  {
        console.log('Mauvaise réponse');
        // Pop up loser
        console.log("titre");
        titrePopDiv.innerHTML = "Raté !";
        console.log("regles");
        pPopDiv.innerHTML = "<p class='p-pop'>Oh ! Bouh ! T'es Nul !</p>";
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
        vie--;
        decrementation_vie();
    }
    if (repInput.value == ""){
        console.log('faut rentrer du texte non de dieu !'); // vie--;
        // pop up rentrez du texte
        console.log("titre");
        titrePopDiv.innerHTML = "Non ! Non ! Et non!";
        console.log("regles");
        pPopDiv.innerHTML = "<p class='p-pop'>Si tu écris rien ça peut pas marcher m'enfin !</p>";
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
        vie--;
        decrementation_vie();
    }
    if(repInput.value.toUpperCase() == cerbi.rep.toUpperCase()){
        console.log("lalalallalalal j'ai trouvé");
        // pop up cerbere ok
        console.log("titre");
        titrePopDiv.innerHTML = "Enigme Résolue!";
        console.log("regles");
        pPopDiv.innerHTML = "<p class='p-pop'>Bravo! La réponse est bien "+ repInput.value +"</p><p class='p-pop'>Tu peux maintenant passer à la salle suivante.</p>";
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
        togglevisi(divForm, "");
        fadeIn(suitefibo, 5);
        togglevisi(fleche, "");
    }

    if(repInput.value.toUpperCase() == anubis.rep.toUpperCase()){
        console.log("chouette j'ai trouvé");
        // pop up anubis ok
        console.log("titre");
        titrePopDiv.innerHTML = "Enigme Résolue!";
        console.log("regles");
        pPopDiv.innerHTML = "<p class='p-pop'>Bravo! La réponse est bien "+ repInput.value +"</p><p class='p-pop'>Tu peux maintenant passer à la salle suivante.</p>";
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
        fadeIn(suitefibo, 5);
        togglevisi(fleche, "");
    }

    if(repInput.value.toUpperCase() == time.rep.toUpperCase()){
        console.log("trop bien j'ai trouvé");
        // pop up temps ok
        console.log("titre");
        titrePopDiv.innerHTML = "Enigme Résolue!";
        console.log("regles");
        pPopDiv.innerHTML = "<p class='p-pop'>Bravo! La réponse est bien "+ repInput.value +"</p><p class='p-pop'>Tu peux maintenant passer à la salle suivante.</p>";
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
        fadeIn(suitefibo, 5);
        togglevisi(fleche, "");
    }
}

// si on a le tedmps appliquer le code sur touche enter (keycode 13)
btnValidation.addEventListener("click", verifInputGost);

// Tableau des images sur lequel on effectura le random
let videoArray = [
    cerbi.urlVideo,
    anubis.urlVideo,
    time.urlVideo
];

// Mélange les url du tableau
function shuffle(index) {
    for (let i = index.length; i; i--) {
        let nbH = Math.floor(Math.random() * i);
        [index[i - 1], index[nbH]] = [index[nbH], index[i - 1]];
    }
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

closeDiv.addEventListener("click", function (){
    fadeOut(popDiv, 10);
    setTimeout(function (){
        togglevisi(popDiv, "none");
        console.log("pop out")
    }, 1000);
    // flèche
});

// intégration vidéo

function videoOnLoad(){
    shuffle(videoArray);
    video.innerHTML = "<source src='"+ videoArray[1] +"'>";
    setTimeout(function () {
        fadeOut(suitefibo, 10)
    }, 15000);
    setTimeout(function () {
        fadeIn(divForm,5);
        pauseVid();
    }, 173700)
    //SetTimeOut()
}

// Appel de la fonction de vérification
repInput.addEventListener('keypress', function(e) {
    let supportedKey = ["é", "è", "ê", "ë", "à", "â", "ä", "ù", "û", "ü", "ï"];

    console.log(e.key);

    if(supportedKey.includes(e.key)) {
        e.preventDefault()
    }

    if(e.keyCode == 13){
        e.preventDefault();
        verifInputGost();
    }

});

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
        console.log("regles");
        pPopDiv.innerHTML += "<p class='p-pop'>Essaie encore il te reste 2 essais ...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (vie == 1) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
        console.log("titre");
        console.log("regles");
        pPopDiv.innerHTML += "<p class='p-pop'>Tu n'essaies pas beaucoup dis donc !<br>C'est ta dernière chance !</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
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

// decrementation_vie();
// retour salle 1 si vie=0
if (vie==0) {
    console.log("titre");
    titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
    console.log("regles");
    pPopDiv.innerHTML = "<p id='p-pop'>On aurait pu croire en ton potentiel mais apparement non...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
    togglevisi(popDiv, "");
    fadeIn(popDiv,5);
    setTimeout (function () {document.location.href = "../index.html" // Retour page accueil
    }, 5000);
}


// Event lors de la victoire sur chaque page
fleche.addEventListener("click", function () {
    sauvegarder();
    document.location.href = "../05_SpaceAnarchy/05_Index.html"; // variable à redéfinir sur chaque page pour aller à la page suivante : chaine de charctère/lien relatif
});

// Chrono Global
let bar = new ldBar("#chrono");

let temps = 100;

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

document.onload = videoOnLoad(), recharger(), decrementation(), video.play();