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
function togglevisi (item,State){
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
item_salle1.addEventListener("mouseover",function (){
    togglevisi(image_item_salle1, "")
});
item_salle2.addEventListener("mouseover",function (){
    togglevisi(image_item_salle2, "")
});
item_salle3.addEventListener("mouseover",function (){
    togglevisi(image_item_salle3, "")
});
item_salle4.addEventListener("mouseover",function (){
    togglevisi(image_item_salle4, "")
});
item_salle5.addEventListener("mouseover",function (){
    togglevisi(image_item_salle5, "")
});
item_salle6.addEventListener("mouseover",function (){
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
            if ( event.target.nodeName !== "IMG" ) {
                compteurOrdre ++;
                ev.target.appendChild(document.getElementById(data));}
            console.log("la vie est de : " + vie);
            console.log("compteur : "+ compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle2" || data == "image_item_salle3" || data == "image_item_salle4" || data == "image_item_salle5" || data == "image_item_salle6") {
            vie --;
            console.log("la vie est de : " + vie);
        }
    }

    if (compteurOrdre == 2) {
        if (data == "image_item_salle2") {
            if ( event.target.nodeName !== "IMG" ) {
                compteurOrdre ++;
                ev.target.appendChild(document.getElementById(data));}
            console.log("la vie est de : " + vie);
            console.log("compteur : "+ compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle1" || data == "image_item_salle3" || data == "image_item_salle4" || data == "image_item_salle5" || data == "image_item_salle6") {
            vie --;
            console.log("la vie est de : " + vie);
        }
    }

    if (compteurOrdre == 3) {
        if (data == "image_item_salle3") {
            if ( event.target.nodeName !== "IMG" ) {
                compteurOrdre ++;
                ev.target.appendChild(document.getElementById(data));}
            console.log("la vie est de : " + vie);
            console.log("compteur : "+ compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle1" || data == "image_item_salle2" || data == "image_item_salle4" || data == "image_item_salle5" || data == "image_item_salle6") {
            vie --;
            console.log("la vie est de : " + vie);
        }
    }

    if (compteurOrdre == 4) {
        if (data == "image_item_salle4" ) {
            if ( event.target.nodeName !== "IMG" ) {
                compteurOrdre ++;
                ev.target.appendChild(document.getElementById(data));}
            console.log("la vie est de : " + vie);
            console.log("compteur : "+ compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle1" || data == "image_item_salle2" || data == "image_item_salle3" || data == "image_item_salle5" || data == "image_item_salle6") {
            vie --;
            console.log("la vie est de : " + vie);
        }
    }

    if (compteurOrdre == 5) {
        if (data == "image_item_salle5") {
            if ( event.target.nodeName !== "IMG" ) {
                compteurOrdre ++;
                ev.target.appendChild(document.getElementById(data));}
            console.log("la vie est de : " + vie);
            console.log("compteur : "+ compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle1" || data == "image_item_salle2" || data == "image_item_salle3" || data == "image_item_salle4" || data == "image_item_salle6") {
            vie --;
            console.log("la vie est de : " + vie);
        }
    }

    if (compteurOrdre == 6) {
        if (data == "image_item_salle6") {
            if ( event.target.nodeName !== "IMG" ) {
                compteurOrdre ++;
                ev.target.appendChild(document.getElementById(data));}
            console.log("la vie est de : " + vie);
            console.log("compteur : "+ compteurOrdre);
            data = "";
        }
        if (data == "image_item_salle1" || data == "image_item_salle2" || data == "image_item_salle3" || data == "image_item_salle4" || data == "image_item_salle5") {
            vie --;
            console.log("la vie est de : " + vie);
        }
    }

    if (vie == 0) {
        console.log("la vie est égale à 0");
        togglevisi(coeur_battement, "none");
    }
}
//FIN SCRIPT DRAG AND DROP



