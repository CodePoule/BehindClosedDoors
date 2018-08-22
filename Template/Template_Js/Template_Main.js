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

// FONCTION VIE
function togglevisi (item,State){
    item.style.display = State;
}

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
decrementation_vie();
// retour salle 1 si vie=0
if (vie==0) {
    setTimeout (function () {document.location.href = "http://localhost:63342/BehindClosedDoors-celinehubertcoutant-patch-1/01_ChildrensMemories/01_Index.html?_ijt=b3mpmg87e33011009urs6s9g97"
    }, 3000);
}
// !!!!! A INSERER LORS DE LA GAGNE

// apparition de la fleche salle suivante
togglevisi(fleche, "");