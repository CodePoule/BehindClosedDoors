let cpt = 10;
let aff_phrase = document.querySelector(".affiche_phrases"); //affichage phrase
let bouton_validation = document.querySelector("#bouton_valider");
let cptHtml = document.querySelector(".hit");
let lost = document.querySelector(".lost");
// let popDiv = document.querySelector("#pop-div");
// let titrePopDiv = document.querySelector(".titre-pop-div");
// let pPopDiv = document.querySelector("#paragraph-pop-div");
let vie = 3;

// Nom de la salle
let nomSalle = document.querySelector("#nom-salle");
nomSalle.innerHTML = "Question Mark";

// DIV POP UP
let popDiv = document.querySelector("#pop-div");
let titrePopDiv = document.querySelector(".titre-pop-div");
let pPopDiv = document.querySelector("#paragraph-pop-div");
let closeDiv = document.querySelector(".fermer-div");

// Pop Div caché au départ
togglevisi(popDiv, 'none');

// ----- INITIALISATION DES QUESTIONS -----

// Definition de l'objet Question via un constructeur

function Question(index, affirmation, bonne_reponse) {
    this.index = index;
    this.affirmation = affirmation;
    this.bonne_reponse = bonne_reponse;
}

// Creation des variables qui vont contenir une instance (grace au mot-cle new) de l'objet Question afin de
// pouvoir utiliser cet objet. En resume, liste des questions de 1 a 20.

let q1 = new Question(1, 'L’acide de l’estomac est si puissant qu’il peut trouer un morceau de bois.', 'vrai');
let q2 = new Question(2, 'La muraille de Chine est visible à l’œil nu à partir de la Lune.', 'faux');
let q3 = new Question(3, 'Le ciel est bleu parce que la lumière bleue est reflétée par les océans.', 'faux');
let q4 = new Question(4, 'Le dromadaire peut boire 100 litres d’eau d’un coup.', 'vrai');
let q5 = new Question(5, 'La Lune va finir par tomber sur la Terre à cause de la gravité.', 'faux');
let q6 = new Question(6, 'Il y a environ 100 000 km (60 000 mi) de vaisseaux sanguins dans le corps humain.', 'faux');
let q7 = new Question(7, 'Les chauves-souris vampires sont un mythe.', 'faux');
let q8 = new Question(8, 'Il y a plus d’étoiles dans l’univers que de grains de sable sur Terre.', 'vrai');
let q9 = new Question(9, 'L’air expulsé lors d’un éternuement peut voyager entre 16 et 50 km/h (10 et 30 mi/h).', 'vrai');
let q10 = new Question(10, 'La couleur rouge rend les taureaux agressifs.', 'faux');
let q11 = new Question(11, 'Les éclairs ne frappent jamais deux fois au même endroit.', 'faux');
let q12 = new Question(12, 'La superficie de la Russie est plus grande que celle de Pluton.', 'vrai');
let q13 = new Question(13, 'L’estomac met plusieurs années à digérer une gomme à mâcher.', 'faux');
let q14 = new Question(14, 'À notre naissance, notre cerveau possède déjà tous ses neurones.', 'faux');
let q15 = new Question(15, 'C’est le père hippocampe qui porte les bébés.', 'vrai');
let q16 = new Question(16, 'Le stress est la principale cause des ulcères d’estomac.', 'faux');
let q17 = new Question(17, 'Les humains n’utilisent que 10 % de leur cerveau.', 'faux');
let q18 = new Question(18, 'L’homme descend du chimpanzé.', 'faux');
let q19 = new Question(19, 'Le sens de rotation de l’eau lorsqu’on vide un lavabo dépend de l’hémisphère où l’on se trouve.', 'faux');
let q20 = new Question(20, 'L’ordinateur du module lunaire Eagle avait une mémoire vive (RAM) de seulement 4 kilobits.', 'vrai');


// ----- TIRAGE D'UNE QUESTION AU HASARD -----

// Parcourir l'index de manière aléatoire grace à la fonction shuffle

function shuffle(index) {
    for (let i = index.length; i; i--) {
        let nbH = Math.floor(Math.random() * i);
        [index[i - 1], index[nbH]] = [index[nbH], index[i - 1]];
    }
}

// Creation d'un tableau pour stocker et tester si on a déjà eu le meme chiffre

let myArray = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20];

// Parcourir le tableau pour générer 10 nombres aléatoires parmi les 20 questions totales

shuffle(myArray);
//let myArray2 = new Array(0,0,0,0,0,0,0,0,0,0); -> Pas besoin de créer un deuxième tableau
aff_phrase.innerHTML = myArray[cpt].affirmation;
console.log(myArray[cpt]);

function nouvelle_question (aff_phrase, myArray) {
    //myArray2[i]=myArray[i] -> Pas besoin du deuxième tableau
    console.log(myArray[cpt]); // -> pour afficher dans la console l'affirmation correspondant au
    // numéro d'index tiré, tout en décrémentant les questions une par une.
    console.log(cpt);

    //fonction if pour comparer les réponses au moment où on clique sur le bouton valider
    if (cpt > 0) {
        if ((document.getElementById("button_false").checked && myArray[cpt].bonne_reponse === 'faux') || (document.getElementById("button_true").checked && myArray[cpt].bonne_reponse === 'vrai')) {
            console.log('bonne réponse');
            cpt --;
            console.log(cpt);
            // alert('Bravo, bonne réponse !')
            titrePopDiv.innerHTML = "Bonne réponse"; // TITRE DE LA POP UP
            console.log("regles");
            pPopDiv.innerHTML = "<p id='p-div'>Bravo ! Tu passes à la question suivante !</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
            togglevisi(popDiv, "");
            fadeIn(popDiv,5);
        }
        else {
            vie--;
            decrementation_vie();
            console.log('mince, mauvaise réponse !');
            cpt --;
            console.log(cpt);
            // alert('Mince, mauvaise réponse !')
        }
    }
    if(cpt === 0) {
        lost.innerHTML = "Plus de questions !";
        titrePopDiv.innerHTML = "Voici le titre des règles du jeu !";
    }

    if (cpt===0 && vie>0){
// apparition de la fleche salle suivante et pop up victoire
        togglevisi(fleche, "");
        console.log("titre");
        titrePopDiv.innerHTML = "Enigme Résolue!"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>Bravo! Tu peux maintenant passer à la salle suivante.</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }



    aff_phrase.innerHTML = myArray[cpt].affirmation;
    lost.innerHTML = "Vous avez " + cpt + " questions restante(s).";

}

bouton_validation.addEventListener("click", function() {nouvelle_question(aff_phrase, myArray)});

// regles du jeu

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


function decrementation_vie() {
    if (vie === 2) {
        togglevisi(heart1, "none");
        console.log("titre");
        titrePopDiv.innerHTML = "Perdu ! "; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>J'ai confiance en toi, ne me deçois pas...\n</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (vie === 1) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
        console.log("titre");
        titrePopDiv.innerHTML = "Perdu ! "; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>C’est ta dernière chance, ne la rate pas !\n</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (vie === 0) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
        togglevisi(heart3, "none");
        console.log("titre");
        titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
        pPopDiv.innerHTML = "<p id='p-div'>On aurait pu croire en ton potentiel mais apparement non...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
        setTimeout (function () {document.location.href = "../index.html" // Retour page accueil
        }, 5000);
    }
}
// FONCTION FLECHE
let fleche = document.querySelector(".fleche");
togglevisi(fleche, "none");

// Event lors de la victoire sur chaque page
fleche.addEventListener("click", function () {
    sauvegarder();
    document.location.href = pageSuivante; // variable à redéfinir sur chaque page pour aller à la page suivante : chaine de charctère/lien relatif
});

// Chrono Global
let bar = new ldBar("#chrono");

// Save/restore Time à appeler quand victoire sur salle pour que fleche page suivante apparaisse


let tempsEcoule = setInterval(decrementation, 60000); // decrementation toutes les minutes
let temps = 100; // on part de 100% de temps restant
function decrementation(){
    if (temps<1){ // si on est a 0 => on arrete le compteur: game over
        clearInterval(tempsEcoule);
        console.log("titre");
        titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
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


// Opacité initiale de la pop
popDiv.style.opacity = "0";

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



