
// Nom de la salle
let nomSalle = document.querySelector("#nom-salle");
nomSalle.innerHTML = "The Court";

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

//DECLARATION VARIABLES
let compteurOrdre = 1;
let vie = 1;

let image_item_salle1 = document.querySelector("#image_item_salle1");
let item_salle1 = document.querySelector(".item_salle1");

let image_item_salle2 = document.querySelector("#image_item_salle2");
let item_salle2 = document.querySelector(".item_salle2");

let image_item_salle3 = document.querySelector("#image_item_salle3");
let item_salle3 = document.querySelector(".item_salle3");

let image_item_salle4 = document.querySelector("#image_item_salle4");
let item_salle4 = document.querySelector(".item_salle4");

let image_item_salle5 = document.querySelector("#image_item_salle5");
let item_salle5 = document.querySelector(".item_salle5");

let image_item_salle6 = document.querySelector("#image_item_salle6");
let item_salle6 = document.querySelector(".item_salle6");

let coeur_battement = document.querySelector("#coeur_battement");

//FONCTION TOGGLEVISI
function togglevisi(item, State) {
    item.style.display = State;
}

//Au chargement de la page les items sont cachés
togglevisi(image_item_salle1, "none");
togglevisi(image_item_salle2, "none");
togglevisi(image_item_salle3, "none");
togglevisi(image_item_salle4, "none");
togglevisi(image_item_salle5, "none");
togglevisi(image_item_salle6, "none");
togglevisi(coeur_battement, "");

//Lorsque le curseur passent sur les items, ils apparaissent
item_salle1.addEventListener("mouseover", function (e) {
    togglevisi(image_item_salle1, "");
});

item_salle2.addEventListener("mouseover", function () {
    togglevisi(image_item_salle2, "")
});
item_salle3.addEventListener("mouseover", function () {
    togglevisi(image_item_salle3, "")
});
item_salle4.addEventListener("mouseover", function () {
    togglevisi(image_item_salle4, "")
});
item_salle5.addEventListener("mouseover", function () {
    togglevisi(image_item_salle5, "")
});
item_salle6.addEventListener("mouseover", function () {
    togglevisi(image_item_salle6, "")
});

//DEBUT SCRIPT DRAG AND DROP
function allowDrop(ev) {
    ev.preventDefault();
    console.log("fonction ALLOWDROP");
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("fonction DRAG");
    console.log(ev.target.id);
}


function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    console.log("data : " + data);

    // FONCTIONS IF : POUR INSERER LES ITEMS DANS L'ORDRE
    if (compteurOrdre == 1) {
        if (data == "image_item_salle1") {
            if (event.target.nodeName !== "IMG") {
                compteurOrdre++;
                ev.target.appendChild(document.getElementById(data));
            }
            console.log("la vie est de : " + vie);
            console.log("compteur : " + compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle2" || data == "image_item_salle3" || data == "image_item_salle4" || data == "image_item_salle5" || data == "image_item_salle6") {
            vie--;
            console.log("la vie est de : " + vie);
        }
    }

    if (compteurOrdre == 2) {
        if (data == "image_item_salle2") {
            if (event.target.nodeName !== "IMG") {
                compteurOrdre++;
                ev.target.appendChild(document.getElementById(data));
            }
            console.log("la vie est de : " + vie);
            console.log("compteur : " + compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle1" || data == "image_item_salle3" || data == "image_item_salle4" || data == "image_item_salle5" || data == "image_item_salle6") {
            vie--;
            console.log("la vie est de : " + vie);
        }
    }

    if (compteurOrdre == 3) {
        if (data == "image_item_salle3") {
            if (event.target.nodeName !== "IMG") {
                compteurOrdre++;
                ev.target.appendChild(document.getElementById(data));
            }
            console.log("la vie est de : " + vie);
            console.log("compteur : " + compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle1" || data == "image_item_salle2" || data == "image_item_salle4" || data == "image_item_salle5" || data == "image_item_salle6") {
            vie--;
            console.log("la vie est de : " + vie);
        }
    }

    if (compteurOrdre == 4) {
        if (data == "image_item_salle4") {
            if (event.target.nodeName !== "IMG") {
                compteurOrdre++;
                ev.target.appendChild(document.getElementById(data));
            }
            console.log("la vie est de : " + vie);
            console.log("compteur : " + compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle1" || data == "image_item_salle2" || data == "image_item_salle3" || data == "image_item_salle5" || data == "image_item_salle6") {
            vie--;
            console.log("la vie est de : " + vie);
        }
    }

    if (compteurOrdre == 5) {
        if (data == "image_item_salle5") {
            if (event.target.nodeName !== "IMG") {
                compteurOrdre++;
                ev.target.appendChild(document.getElementById(data));
            }
            console.log("la vie est de : " + vie);
            console.log("compteur : " + compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle1" || data == "image_item_salle2" || data == "image_item_salle3" || data == "image_item_salle4" || data == "image_item_salle6") {
            vie--;
            console.log("la vie est de : " + vie);
        }
    }

    if (compteurOrdre == 6) {
        if (data == "image_item_salle6") {
            if (event.target.nodeName !== "IMG") {
                compteurOrdre++;
                ev.target.appendChild(document.getElementById(data));
            }
            console.log("la vie est de : " + vie);
            console.log("compteur : " + compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle1" || data == "image_item_salle2" || data == "image_item_salle3" || data == "image_item_salle4" || data == "image_item_salle5") {
            vie--;
            console.log("la vie est de : " + vie);
        }
    }

    if (vie == 0) {
        console.log("la vie est égale à 0");
        togglevisi(coeur_battement, "none");

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

//FIN SCRIPT DRAG AND DROP

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

let tempsEcoule = setInterval(decrementation, 60000); // decrementation toutes les minutes
// let temps = 100; // on part de 100% de temps restant
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

document.onload=recharger(), decrementation();