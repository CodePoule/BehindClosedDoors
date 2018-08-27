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
    }
    if (vie == 1) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
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
    setTimeout (function () {document.location.href = "http://localhost:63342/BehindClosedDoors-celinehubertcoutant-patch-1/01_ChildrensMemories/01_Index.html?_ijt=b3mpmg87e33011009urs6s9g97"
    }, 3000);
}
// !!!!! A INSERER LORS DE LA GAGNE

// apparition de la fleche salle suivante
togglevisi(fleche, "");

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
        setTimeout (function () {
            document.location.href = "../../index.html"
        }, 500);
    }
    else{
        let pourcentageTemps = 100/60; // sinon on decrementate de 1.66% <=> 1 min sur 60min (en %)
        temps -= pourcentageTemps;
        bar.set(temps)
    }
}

document.onload = setInterval(decrementation, 60000);