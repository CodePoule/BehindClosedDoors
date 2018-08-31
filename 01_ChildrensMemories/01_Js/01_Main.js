//JS CHILDREN MEMORIES
// Nom de la salle
let nomSalle = document.querySelector("#nom-salle");
nomSalle.innerHTML = "Childrens Memories";

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}


// FONCTION VIE
function togglevisi(item, State) {
    item.style.display = State;
}

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
        titrePopDiv.innerHTML = "PERDU!"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>Tu perds une vie et tu recommences!</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv, 5);
    }
    if (vie == 1) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
        console.log("titre");
        titrePopDiv.innerHTML = "PERDU"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>Tu perds une vie et tu recommences!</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv, 5);
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
        fadeIn(popDiv, 5);
        setTimeout(function () {
            document.location.href = "../index.html" // Retour page accueil
        }, 5000);
    }


}


// FONCTION FLECHE
let fleche = document.querySelector(".fleche");
togglevisi(fleche, "none");


let compteurNiveau = 1;

// localStorage.setItem("VieEnregistree", 3);
let vie=3;

let childrensplay = document.querySelector(".childrensplay");

//fonction relative aux images qui s'affichent avec leurs valeurs correspondantes
function ItemPop(valeur, urlImg, altImg) {
    this.valeur = valeur;
    this.urlImg = urlImg;
    this.altImg = altImg;
}

//variables d'images avec leurs valeurs correspondantes
let yoda = new ItemPop(getRandomInt(0, 10), '01_Img/01_yoda.png', 'image yoda');
let sonic = new ItemPop(getRandomInt(5, 15), '01_Img/01_sonic.png', 'image sonic');
let wallE = new ItemPop(getRandomInt(10, 20), '01_Img/01_wallE.png', 'image wall-e');

//fonction générant un nombre aléatoire pour chacune des images
function getRandomInt(min, max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//Fonction du jeu niveau 1
function lvl1() {

    yoda.valeur = getRandomInt(0, 10);
    sonic.valeur = getRandomInt(5, 15);
    wallE.valeur = getRandomInt(10, 20);
    console.log("yoda = "+ yoda.valeur);
    console.log("sonic = "+ sonic.valeur);
    console.log("wallE = "+ wallE.valeur);

    // vie = localStorage.getItem("VieEnregistree");
    // decrementation_vie();


    //variables de calcul
    let calc1 = yoda.valeur * 3;
    let calc2 = yoda.valeur * 2 + sonic.valeur;
    let calc3 = yoda.valeur + sonic.valeur + wallE.valeur;
    console.log("niveau 1 : " + wallE.valeur);

    //affichage des éléments dans la page html
    childrensplay.innerHTML = "<Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + yoda.urlImg + " '> = " + calc1 + "</br>" +
        "<Img id='redim' src=' " + yoda.urlImg + " '>" + " + <Img id='redim' src=' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + sonic.urlImg + " '> = " + calc2 + "</br>" +
        "<Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + sonic.urlImg + " '>" + " + <Img id ='redim' src =' " + wallE.urlImg + " '> = " + calc3 + "<br>" +
        "<Img id ='redim' src =' " + wallE.urlImg + " '> = <input type='number' id='res1'> ? <button type='button' class='valider'>Valider</button>";

    let boutonValider = document.querySelector(".valider");//valider


    resultatlv1 = calc3 - yoda.valeur - sonic.valeur;


    //variable permettant de récupérer la réponse saisie par l'utilisateur
    let saisie1Utilisateur = document.querySelector("#res1");

    //enregistrement de la réponse via le bouton valider et fonction permettant de comparer la réponse saisie au résultat
    boutonValider.addEventListener("click", function e() {

        if (saisie1Utilisateur.value == resultatlv1 && compteurNiveau == 1) {
            compteurNiveau++;
            console.log(compteurNiveau);
            console.log("verif niveau 1");
            console.log("titre");
            titrePopDiv.innerHTML = "Bravo!"; // TITRE DE LA POP UP
            console.log("regles");
            pPopDiv.innerHTML = "<p id='p-div'>Tu passes au niveau suivant!!</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
            togglevisi(popDiv, "");
            fadeIn(popDiv, 5);
            document.onload = lvl2();

        }
        else if (saisie1Utilisateur.value !== resultatlv1 && compteurNiveau == 1) {
            // decrementation de la vie
            vie--;
            console.log(vie);
            // localStorage.setItem("VieEnregistree", vie);
            // sauvegarder();
            // window.location.reload();
            console.log("vie: " + vie);
            // vie = localStorage.getItem("VieEnregistree");
            // recharger();
            // decrementation()
            decrementation_vie();

            document.onload = lvl1();
        }

    })

}

//Fonction du jeu niveau 2
function lvl2() {
    // vie = localStorage.getItem("VieEnregistree");
    // decrementation_vie();


    yoda.valeur = getRandomInt(0, 10);
    sonic.valeur = getRandomInt(5, 15);
    wallE.valeur = getRandomInt(10, 20);

    console.log("yoda = "+ yoda.valeur);
    console.log("sonic = "+ sonic.valeur);
    console.log("wallE = "+ wallE.valeur);

    //variables de calcul
    let calc4 = yoda.valeur * 3;
    let calc5 = yoda.valeur * 2 + sonic.valeur;
    let calc6 = yoda.valeur + sonic.valeur - wallE.valeur;
    let calc7 = yoda.valeur + (sonic.valeur * wallE.valeur);
    console.log("niveau 2 : " + calc7);

    //affichage des éléments dans la page html
    childrensplay.innerHTML = "<Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + yoda.urlImg + " '> = " + calc4 + "</br>" +
        "<Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + sonic.urlImg + " '> = " + calc5 + "</br>" +
        "<Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + sonic.urlImg + " '> " + " - <Img id ='redim' src =' " + wallE.urlImg + " '> = " + calc6 + "</br>" +
        "<Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + sonic.urlImg + " '>" + " x <Img id ='redim' src ='" + wallE.urlImg + " '> = " + " <input type='number' id='res2'>" +
        "<button type='button' class='valider'>Valider</button>";

    let boutonValider = document.querySelector(".valider");//valider


    //variable permettant de récupérer la réponse saisie par l'utilisateur
    let resultatlv2 = calc7;

    //variable permettant de récupérer la réponse saisie par l'utilisateur
    let saisie2Utilisateur = document.querySelector("#res2");

    boutonValider.addEventListener("click", function e() {
        if (saisie2Utilisateur.value == resultatlv2 && compteurNiveau == 2) {
            compteurNiveau++;
            console.log(compteurNiveau);
            console.log("verif niveau 2");
            console.log("titre");
            titrePopDiv.innerHTML = "Bravo!"; // TITRE DE LA POP UP
            console.log("regles");
            pPopDiv.innerHTML = "<p id='p-div'>Tu passes au niveau suivant!!</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
            togglevisi(popDiv, "");
            fadeIn(popDiv, 5);
            document.onload = lvl3();
        }
        else if (saisie2Utilisateur.value !== resultatlv2 && compteurNiveau == 2) {
            // decrementation de la vie
            vie--;
            console.log(vie);
            // localStorage.setItem("VieEnregistree", vie);
            // sauvegarder();
            // window.location.reload();
            console.log("vie: " + vie);
            // vie = localStorage.getItem("VieEnregistree");
            // recharger();
            // decrementation();
            decrementation_vie();
            compteurNiveau = 1;
            document.onload = lvl1();


        }

    })
}

function lvl3() {
    yoda.valeur = getRandomInt(0, 10);
    sonic.valeur = getRandomInt(5, 15);
    wallE.valeur = getRandomInt(10, 20);
    let valeurSonicbis = sonic.valeur*2;
    let sonicbis = new ItemPop(valeurSonicbis, '01_Img/01_sonicbis.png', 'image sonicbis');

    console.log("yoda = "+ yoda.valeur);
    console.log("sonic = "+ sonic.valeur);
    console.log("sonicbis = "+ sonicbis.valeur);
    console.log("wallE = "+ wallE.valeur);

    let calc8 = yoda.valeur * 3;
    let calc9 = yoda.valeur * 2 + sonicbis.valeur;
    let calc10 = yoda.valeur + sonicbis.valeur - wallE.valeur;
    let calc11 = sonic.valeur + (yoda.valeur * wallE.valeur);
    console.log(calc11);

    //affichage des éléments dans la page html
    childrensplay.innerHTML = "<Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + yoda.urlImg + " '> = " + calc8 + "</br>" +
        "<Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + sonicbis.urlImg + " '> = " + calc9 + "</br>" +
        "<Img id ='redim' src =' " + yoda.urlImg + " '>" + " + <Img id ='redim' src =' " + sonicbis.urlImg + " '> " + " - <Img id ='redim' src =' " + wallE.urlImg + " '> = " + calc10 + "</br>" +
        "<Img id ='redim' src =' " + sonic.urlImg + " '>" + " + <Img id ='redim' src =' " + yoda.urlImg + " '>" + " x <Img id ='redim' src ='" + wallE.urlImg + " '> = " + " <input type='number' id='res3'>" +
        "<button type='button' class='valider'>Valider</button>";

    let boutonValider = document.querySelector(".valider");//valider

    //variable permettant de récupérer la réponse saisie par l'utilisateur
    let resultatlv3 = calc11;

    //variable permettant de récupérer la réponse saisie par l'utilisateur
    let saisie3Utilisateur = document.querySelector("#res3");


    boutonValider.addEventListener("click", function e() {
        if (saisie3Utilisateur.value == resultatlv3 && compteurNiveau == 3) {
            // apparition de la fleche salle suivante
            togglevisi(fleche, "");
            console.log("titre");
            titrePopDiv.innerHTML = "Enigme Résolue"; // TITRE DE LA POP UP
            console.log("regles");
            pPopDiv.innerHTML = "<p id='p-div'>Facile comme 1 2 3! La salle suivante t’attends ! </p>"; // CONTENU / PARAGRAPHE DE LA POP UP
            togglevisi(popDiv, "");
            fadeIn(popDiv, 5);
            //document.onload = ();
        }
        else if (saisie3Utilisateur.value !== resultatlv3 && compteurNiveau == 3) {
            // decrementation de la vie
            vie--;
            console.log(vie);
            // localStorage.setItem("VieEnregistree", vie);
            // sauvegarder();
            // window.location.reload();
            console.log("vie: " + vie);
            // vie = localStorage.getItem("VieEnregistree");
            // recharger();
            // decrementation();
            decrementation_vie();
            compteurNiveau = 1;
            document.onload = lvl1();

        }
    })
}

// Event lors de la victoire sur chaque page
fleche.addEventListener("click", function () {
    sauvegarder();
    document.location.href = "../02_QuestionMark/02_Index_v3.html"; // variable à redéfinir sur chaque page pour aller à la page suivante : chaine de charctère/lien relatif
});

// Chrono Global
let bar = new ldBar("#chrono");

// Save/restore Time à appeler quand victoire sur salle pour que fleche page suivante apparaisse
function sauvegarder() {
    localStorage.setItem("tempsGlobal", temps);
}

function recharger() {
    if (localStorage.getItem("tempsGlobal")) {
        temps = parseInt(localStorage.getItem("tempsGlobal"));
        console.log(temps);
        setInterval(decrementation, 60000);
    }

}

let tempsEcoule = setInterval(decrementation,  60000); // decrementation toutes les minutes
let temps = 100; // on part de 100% de temps restant
function decrementation() {
    if (temps < 1) { // si on est a 0 => on arrete le compteur: game over
        clearInterval(tempsEcoule);
        console.log("titre");
        titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>On aurait pu croire en ton potentiel mais apparement non...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv, 5);
        setTimeout(function () {
            document.location.href = "../index.html" // Retour page accueil
        }, 5000);
    }
    else {
        let pourcentageTemps = 100 / 60; // sinon on decrementate de 1.66% <=> 1 min sur 60min (en %)
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
function fadeIn(item, dureeApparition) { // dureeApparition est en ms soit 1000 ms = 1 seconde
    let i = 0;
    let k = window.setInterval(function () {
        if (i >= 100) {
            clearInterval(k);
        } else {
            item.style.opacity = i / 100;
            i++;
        }
    }, dureeApparition);
}

// Fonction de disparition graduelle -> hide()
function fadeOut(item, dureeDisparition) { // dureeDisparition est en ms soit 1000 ms = 1 seconde
    let i = 100;
    let k = window.setInterval(function () {
        if (i <= 0) {
            clearInterval(k);
        } else {
            item.style.opacity = i / 100;
            i--;
        }
    }, dureeDisparition);
}

// Bouton [X] de fermeture de la pop - A copier tel quel
closeDiv.addEventListener("click", function () {
    fadeOut(popDiv, 10);
    console.log("pop out");
    setTimeout(function () {
        togglevisi(popDiv, "none");
        console.log("pop out 2")
    }, 1000)
});


document.onload = lvl1();
//document.onload = lvl2();
//document.onload = lvl3();