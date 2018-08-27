//JS CHILDREN MEMORIES

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


let compteurNiveau = 1;
let boutonValider = document.querySelector(".valider");//valider
let childrensplay = document.querySelector(".childrensplay");

//fonction relative aux images qui s'affichent avec leurs valeurs correspondantes
function ItemPop(valeur, urlImg, altImg) {
    this.valeur=valeur;
    this.urlImg=urlImg;
    this.altImg = altImg;
}

//variables d'images avec leurs valeurs correspondantes
let yoda = new ItemPop(getRandomInt(0,10),'01_Img/01_yoda.png', 'image yoda');
let sonic = new ItemPop(getRandomInt(5,15),'01_Img/01_sonic.png', 'image sonic');
let sonicbis = new ItemPop(sonic.valeur*2,'01_Img/01_sonicbis.png', 'image sonicbis');
let wallE = new ItemPop(getRandomInt(10,20),'01_Img/01_wallE.png', 'image wall-e');

//fonction générant un nombre aléatoire pour chacune des images
function getRandomInt(min,max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//Fonction du jeu niveau 1
function lvl1() {

    //variables de calcul
        let calc1 = yoda.valeur * 3;
        let calc2 = yoda.valeur * 2 + sonic.valeur;
        let calc3 = yoda.valeur + sonic.valeur + wallE.valeur;
        //console.log("niveau 1 : " + wallE.valeur);

    //affichage des éléments dans la page html
        childrensplay.innerHTML = "<img src=' " + yoda.urlImg + " '>" + " + <img src=' " + yoda.urlImg + " '>" + " + <img src=' " + yoda.urlImg + " '> = " + calc1 + "</br>" +
            "<img src=' " + yoda.urlImg + " '>" + " + <img src=' " + yoda.urlImg + " '>" + " + <img src=' " + sonic.urlImg + " '> = " + calc2 + "</br>" +
            "<img src=' " + yoda.urlImg + " '>" + " + <img src=' " + sonic.urlImg + " '>" + " + <img src=' " + wallE.urlImg + " '> = " + calc3 + "<br>" +
            "<img src=' " + wallE.urlImg + " '> = <input type='text' id='res1'> ?";


        resultatlv1 = calc3 - yoda.valeur - sonic.valeur;

        //variable permettant de récupérer la réponse saisie par l'utilisateur
        let saisie1Utilisateur = document.querySelector("#res1");

        //enregistrement de la réponse via le bouton valider et fonction permettant de comparer la réponse saisie au résultat
        boutonValider.addEventListener("click", function e() {

            if (saisie1Utilisateur.value == resultatlv1 && compteurNiveau == 1) {
                compteurNiveau ++;
                console.log(compteurNiveau);
                console.log("verif niveau 1");
                alert("1 Bien joué tu passes au niveau suivant!");
                document.onload = lvl2();
                //
            }
            else if (saisie1Utilisateur.value !== resultatlv1 && compteurNiveau == 1) {
                // decrementation de la vie
                vie--;
                console.log(vie);
                decrementation_vie();
                alert("1 Tu perds une vie et tu recommences!");
                window.location.reload();

            }

        })

}

//Fonction du jeu niveau 2
function lvl2() {


        yoda.valeur = getRandomInt(0, 10);
        sonic.valeur = getRandomInt(5, 15);
        wallE.valeur = getRandomInt(10, 20);

        //variables de calcul
        let calc4 = yoda.valeur * 3;
        let calc5 = yoda.valeur * 2 + sonic.valeur;
        let calc6 = yoda.valeur + sonic.valeur - wallE.valeur;
        let calc7 = sonic.valeur + (yoda.valeur * wallE.valeur);
        //console.log("niveau 2 : " + calc7);

        //affichage des éléments dans la page html
        childrensplay.innerHTML = "<img src=' " + yoda.urlImg + " '>" + " + <img src=' " + yoda.urlImg + " '>" + " + <img src=' " + yoda.urlImg + " '> = " + calc4 + "</br>" +
            "<img src=' " + yoda.urlImg + " '>" + " + <img src=' " + yoda.urlImg + " '>" + " + <img src=' " + sonic.urlImg + " '> = " + calc5 + "</br>" +
            "<img src=' " + yoda.urlImg + " '>" + " + <img src=' " + sonic.urlImg + " '> " + " - <img src=' " + wallE.urlImg + " '> = " + calc6 + "</br>" +
            "<img src=' " + yoda.urlImg + " '>" + " + <img src=' " + sonic.urlImg + " '>" + " x <img src='" + wallE.urlImg + " '> = " + " <input type='text' id='res2'>";


        //variable permettant de récupérer la réponse saisie par l'utilisateur
        let resultatlv2 = calc7;

        //variable permettant de récupérer la réponse saisie par l'utilisateur
        let saisie2Utilisateur = document.querySelector("#res2");

        boutonValider.addEventListener("click", function e() {
            if (saisie2Utilisateur.value == resultatlv2 && compteurNiveau == 2) {
                compteurNiveau ++;
                console.log(compteurNiveau);
                console.log("verif niveau 2");
                alert("2 Bien joué tu passes au niveau suivant!");
                document.onload = lvl3();
            }
            else if (saisie2Utilisateur.value !== resultatlv2 && compteurNiveau == 2) {
                // decrementation de la vie
                vie--;
                console.log(vie);
                decrementation_vie();
                alert("2 Tu perds une vie et tu recommences!");
                window.location.reload();

            }

        })
}

function lvl3() {


        yoda.valeur = getRandomInt(0, 10);
        sonic.valeur = getRandomInt(5, 15);
        wallE.valeur = getRandomInt(10, 20);

        let calc8 = yoda.valeur * 3;
        let calc9 = yoda.valeur * 2 + sonicbis.valeur;
        let calc10 = yoda.valeur + sonicbis.valeur - wallE.valeur;
        let calc11 = sonic.valeur + (yoda.valeur * wallE.valeur);
        //console.log(calc11);

        //affichage des éléments dans la page html
        childrensplay.innerHTML = "<img src=' " + yoda.urlImg + " '>" + " + <img src=' " + yoda.urlImg + " '>" + " + <img src=' " + yoda.urlImg + " '> = " + calc8 + "</br>" +
            "<img src=' " + yoda.urlImg + " '>" + " + <img src=' " + yoda.urlImg + " '>" + " + <img src=' " + sonicbis.urlImg + " '> = " + calc9 + "</br>" +
            "<img src=' " + yoda.urlImg + " '>" + " + <img src=' " + sonicbis.urlImg + " '> " + " - <img src=' " + wallE.urlImg + " '> = " + calc10 + "</br>" +
            "<img src=' " + sonic.urlImg + " '>" + " + <img src=' " + yoda.urlImg + " '>" + " x <img src='" + wallE.urlImg + " '> = " + " <input type='text' id='res3'>";

        //variable permettant de récupérer la réponse saisie par l'utilisateur
        let resultatlv3 = calc11;

        //variable permettant de récupérer la réponse saisie par l'utilisateur
        let saisie3Utilisateur = document.querySelector("#res3");


        boutonValider.addEventListener("click", function e() {
            if (saisie3Utilisateur.value == resultatlv3 && compteurNiveau == 3) {
                // apparition de la fleche salle suivante
                togglevisi(fleche, "");
                alert("3 Bien joué tu passes à la salle suivante!");
                //document.onload = ();
            }
            else if (saisie3Utilisateur.value !== resultatlv3 && compteurNiveau == 3){
                // decrementation de la vie
                vie--;
                console.log(vie);
                decrementation_vie();
                alert("3 Tu perds une vie et tu recommences!");
                window.location.reload();

            }
        })
}


//retour page d'accueil
            if (vie==0) {
             setTimeout (function () {document.location.href = ""
                 }, 3000);
}

document.onload = lvl1();
//document.onload = lvl2();
//document.onload = lvl3();