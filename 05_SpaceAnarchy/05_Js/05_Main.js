// Nom de la salle
let nomSalle = document.querySelector("#nom-salle");
nomSalle.innerHTML = "Space Anarchy";

// Save/restore Time
function sauvegarder(){
    localStorage.setItem("tempsGlobal",temps);
}
function recharger() {
    if (localStorage.getItem("tempsGlobal")){
        temps = parseInt(localStorage.getItem("tempsGlobal"));
        console.log(temps);
        bar.set(temps);
    }

}

// Chrono Global
let bar = new ldBar("#chrono");


let tempsEcoule = setInterval(decrementation, 60000); // decrementation toutes les minutes
// let temps = 100; // on part de 100% de temps restant
function decrementation(){
    if (temps<1){ // si on est a 0 => on arrete le compteur: game over
        clearInterval(tempsEcoule);
        console.log("titre");
        titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>On aurait pu croire en ton potentiel mais apparement non...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
        setTimeout (function () {
            document.location.href = "../index.html"
        }, 5000);
    }
    else{
        let pourcentageTemps = 100/60; // sinon on decrementate de 1.66% <=> 1 min sur 60min (en %)
        temps -= pourcentageTemps;
        bar.set(temps)
    }
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
        console.log("titre");
        titrePopDiv.innerHTML = "Perdu ! "; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>Le monde compte sur toi ! Reprends-toi !</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (vie == 1) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
        console.log("titre");
        titrePopDiv.innerHTML = "Perdu ! "; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>C’est ta dernière chance, ne la rate pas !</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (vie == 0) {
        togglevisi(heart1, "none");
        togglevisi(heart2, "none");
        togglevisi(heart3, "none");
    }
}

// FONCTION REGLES
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


// FONCTION FLECHE
let fleche = document.querySelector(".fleche");
togglevisi(fleche, "none");


// DEFINITION DES let VARIABLES

// let variable pour checker si le bouton start a été cliqué ou non
let running = false;
// tableau de mémoire de l'ordinateur
let memoryArray = [];
// compteur tableau mémoire
let memoryArrayCounter = 0;
// tableau entrée utilisateur
let userArray = [];
// compteur tableau utilisateur
let userArrayCounter = 0;
// let variable de niveau
let levelCount = 1;
// permet de recuperer les differents elements du tableau ordinateur
let tempColor;
// setInterval permettant d'eclairer les boutons
let runMemory;
// let variable permettant de comparer les 2 tableaux
let matchingArrays = true;
// differents temps liés au niveaux de difficulté
let tempo;


// Creation d'une fonction objet "colorButton" qui associe à chaque bouton un id et un txt correspondant à la couleur
function colorButton(id, color) {
    this.id = id;
    this.color = color;
}

// Creation des 4 objets
let gre = new colorButton(1, "gre");
let red = new colorButton(2, "red");
let yel = new colorButton(3, "yel");
let blu = new colorButton(4, "blu");



//Effects when clicking the start button
$("#startButton").on("click", function () {
    // on change le background qui passe de jaune à vert
    $("#startButton").css("background", "green");
    // la let variable running vaut true
    running = true;
    // on vide le tableau utilisateur
    userArray = [];
    // on vide le tableau mémoire de l'ordinateur
    memoryArray = [];
    // on remet les compteur des tableaux à 0
    memoryArrayCounter = 0;
    userArrayCounter = 0;
    // on augmente l'opacité du texte (compteur)
    $("#displayText").css("opacity", "1");
    // on réinitialise le niveau à 1
    levelCount = 1;
    // on affiche "--" dans le compteur
    $("#displayText").html("--");
    // matchingArrays qui compare les tableau ordinateur/utilisateur vaut true
    matchingArrays = true;
    // on efface le timer runMemory qui lance la fonction playMemory
    clearInterval(runMemory);
    // on désactive la possibilté de cliquer sur les boutons
    $(".fourButton").css("pointer-events", "none");
    // on appelle newMemory pour ajouter une couleur au tableau de memoire de l'ordinateur
    newMemory();

    console.log(memoryArray);

    // setTimeOut appelle la fonction qui change la valeur de runMemory après 1 secondes (1000 sec)
    // runMemory appelle la fonction playMemory toutes les secondes pour montrer les couleurs qui doivent etre cliquées
    // runMemory est stoppé quand memoryArrayCounter == memoryArray.length pour éviter une boucle toutes les seconcdes
    setTimeout(function () {
        runMemory = setInterval(playMemory, 1000);
    }, 1000);

});

//Effects when clicking colored buttons

// [id*='button'] selectionne tous les elements id qui contiennent "button"
$("div[id*='button']").on("click", function () {
    // si le jeu est allumé (power) et que start a été cliqué (running)
    if (running) {
        // event.which == 1 <=> clic de la souris
        if (event.which == 1) {
            // on recucupe le son lié au bouton sur lequel on vient de cliquer dans le html (this.id<=> buttonColor)
            // la methode get(0).play permet de jouer l'06_Audio selectionné
            // cloneNode() permet de rejouer le son si necessaire
            $("#sound" + this.id).get(0).cloneNode().play();
            console.log("id " + this.id);
            // on rentre dans le tableau utilisateur Gre, Blu, Red ou Yel (this.id <=> buttonColor et on retire "button" (slice(6,9)))
            userArray.push(this.id.slice(6, 9));
            console.log("2 " + userArray);

            // on incrémente le compteur lié au tableau utilisateur
            userArrayCounter++;

            // on parcours le tableau de l'utisateur
            for (let i = 0; i < userArray.length; i++) {
                // si il ya une diff entre le tableau de l'utilisateur et celui de l'ordinateur
                if (memoryArray[i] != userArray[i]) {
                    // matchingArrays vaut false
                    matchingArrays = false;
                }
            }

            // si les tableaux utuilisateur/ordinateur sont differnts
            if (!matchingArrays) {
                // affichage "!!" dans le cmpteur
                $("#displayText").html("!!");
                // son d'erreur
                $("#soundbuttonWrong").get(0).play();
                // on vide le tableau utilisateur
                userArray = [];
                // on remet les compteurs à 0
                memoryArrayCounter = 0;
                userArrayCounter = 0;
                // on change la let variable matchingArray qui vaut true
                matchingArrays = true;
                // on enleve la possibilité de cliquer sur les boutons
                $(".fourButton").css("pointer-events", "none");
                // on vide le tableau de memoire de l'ordinateur
                memoryArray = [];
                // on remet le niveau à 1
                levelCount = 1;
                // on rappelle la fonction permettant de remplir à nouveau le tableau de l'ordinateur
                newMemory();
                console.log(memoryArray);
                // tous les boutons s'allument
                lightLoose();
                // on lance le setTimeout
                //  setTimeout(function () {
                //      runMemory = setInterval(playMemory, tempo);
                //     }, 1000);


                // decrementation de la vie
                vie--;
                decrementation_vie();
                // retour salle 1 si vie=0
                if (vie==0) {
                    console.log("titre");
                    titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
                    console.log("regles");
                    pPopDiv.innerHTML = "<p id='p-div'>On aurait pu croire en ton potentiel mais apparement non...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
                    togglevisi(popDiv, "");
                    fadeIn(popDiv,5);
                    setTimeout (function () {
                        document.location.href = "../index.html"
                    }, 5000);
                }
            }

            else {
                // si les compteurs des tableaux sont égaux
                if (userArrayCounter == memoryArrayCounter) {
                    console.log("Comparaison des deux tableaux");
                    // et que matchingArrays vaut true
                    if (matchingArrays) {
                        console.log("Les tableaux sont les mêmes");
                        // et que le niveau =3
                        if (levelCount == 3) {
                            // on appel la fonction win
                            win();
                        }
                        // sinon (si level<20)
                        else {
                            // on vide le tableau utilisateur
                            userArray = [];
                            // on remet les compteur a 0
                            memoryArrayCounter = 0;
                            userArrayCounter = 0;
                            // on augmente le niveau
                            levelCount++;
                            console.log("Passage au niveau suivant");
                            console.log("Niveau n° " + levelCount);
                            // on rappelle newMemory pour remplir à nouveau le tableau de l'ordinateur
                            newMemory();

                            // en fonction du niveau de difficulté, on diminue le temps lié a la fonctipon setTimeout qui permet d'afficher les couleurs de moins en moins lgtps'
                            switch (levelCount) {
                                case 1:
                                    tempo = 1000;
                                    break;
                                case 2:
                                    tempo = 500;
                                    break;
                                case 3:
                                    tempo = 300;
                                    break;
                                // case 4:
                                //     tempo = 1000;
                                //     break;
                                // case 5:
                                //     tempo = 700;
                                //     break;
                                // case 9:
                                //     tempo = 500;
                                //     break;
                                // case 13:
                                //     tempo = 300;
                                //     break;
                            }
                            // on rappelle la fonction setTimeout qui permet de visualiser les boutons sur lesquels on doit cliquer
                            setTimeout(function () {
                                runMemory = setInterval(playMemory, tempo);
                            }, 1000);
                            // on empeche la possibilité de cliquer sur les boutons
                            $(".fourButton").css("pointer-events", "none");
                        }
                    }
                }
            }
        }
    }
});

//Randomly selects a number for each level count and
//Adds it to the memoryArray.  Numbers correspond to
//colors depending on the color's object.id

function newMemory() {
    function buttonColor(){
        let temp = Math.floor((Math.random() * 4) + 1);

        if (temp == 1) {
            memoryArray.push("Gre");
            console.log("green");
        }
        if (temp == 2) {
            memoryArray.push("Red");
            console.log("red");
        }
        if (temp == 3) {
            memoryArray.push("Yel");
            console.log("yellow");
        }
        if (temp == 4) {
            memoryArray.push("Blu");
            console.log("blue");
        }
    }

    // variable compteur pour compter le nombre de combi a ajouter a chq niveau
    let i;

    if (levelCount == 1) {
        for (i = 1; i <= 3; i++) { // ajoute 3 valeurs aleatoires dans le tableau
            console.log("niveau 1");
            // console.log("temp est égale à :" + temp);
            buttonColor();
        }
        console.log(memoryArray);
    }

    if (levelCount == 2) {
        for (i = 1; i <= 2; i++) { // ajoute 2 valeurs dns le tableau
            console.log("niveau 2");
            // console.log("temp est égale à :" + temp);
            buttonColor();
        }
        console.log(memoryArray);
    }

    if (levelCount == 3) { // ajoute 2 valeurs dns le tableau
        for (i = 1; i <= 2; i++) {
            console.log("niveau 3");
            // console.log("temp est égale à :" + temp);
            buttonColor();
        }
        console.log(memoryArray);
    }
}



// Fonction playMemory liée au setTimeout (runMemory)
// cette fonction permet en gros de changer la couleur et les sons des boutons liés au tableau de mémoire de k'ordinateur
function playMemory() {
    // affichage du niveau de difficuté
    $("#displayText").html(levelCount);
    // tempColor recupere l'entrée du tableau de mémoire de l'ordinateur (Gre, Red, Yel, Blu) ayant comme indice memoryArrayCounter
    // comme une boucle for d'indice (i)
    tempColor = memoryArray[memoryArrayCounter];
    // on concatene "#soundbutton" et la valeur de tempColor pour récuperer le son correspondant dans le fichier html
    // ca joue un son different pour chque bouton
    // la methode get(0).play permet de jouer l'06_Audio selectionné
    // cloneNode() permet de rejouer le son si necessaire
    $("#soundbutton" + tempColor).get(0).cloneNode().play();

    // on concatene "#button" et la valeur de tempColor et on ajoute le resulat à la classe "activated" pour augmenter l'opacité de la classe dans le css
    $("#button" + tempColor).addClass("activated");
    // on utilise setTimeout pour retirer le resultat de la conatenation de la classe "activated" au bout de 250msec afin d'éteindre le bouton
    setTimeout(function () {
        $("#button" + tempColor).removeClass("activated");
    }, 250);
    // on incrémente memoryArrayCounter (il correspond au nombre de valeurs présentes dans le tableau memoryArray)
    memoryArrayCounter++;

    // pour "arreter la boucle" quand memoryArrayCounter correspond à la longeur du tableau memoryArray
    if (memoryArrayCounter == memoryArray.length) {
        // on stoppe runMemory (qui permet d'appeler la fonction playMemory un certain nombre de fois) => on arrete le timer (les boutons ne s'allument plus)
        clearInterval(runMemory);
        // on permet d'avoir un evenement sur la souris => on peut cliquer si le memoryArrayCounter est = à la taille du tableau de memoire de l'ordinateur
        $(".fourButton").css("pointer-events", "auto");
    }
}

function win() {
    // on affiche WIN dans le compteur
    $("#displayText").html("WIN");
    light();
    // POP UP Victoire
    console.log("titre");
    titrePopDiv.innerHTML = "Bravo !"; // TITRE DE LA POP UP
    console.log("regles");
    pPopDiv.innerHTML = "<p id='p-div'>Tu peux maintenant passer à la salle suivante.</p>" +
        "<p id='p-div'>Un détail important! La salle suivante comporte un compte à rebours. Prépare toi !</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
    togglevisi(popDiv, "");
    fadeIn(popDiv,5);
    // apparition de la fleche salle suivante
    togglevisi(fleche, "");
}

// a ajouter au template
fleche.addEventListener("click", function () {
    sauvegarder();
    document.location.href = "../06_TheLastOfComputers/06_Index.html";
});

function lightLoose () {
    $("#displayText").html("--");
    $("#startButton").css("background", "red");
    light();
}

function light(){
    // on passe le bouton green dans la classe activated pour qu'il s'eclaire
    $("#buttonGre").addClass("activated");
    // on remove puis ajoute chaque bouton dans la classe "activated" pour qu'ils clignotent l'un après l'autre
    setTimeout(function () {
        $("#buttonGre").removeClass("activated");
    }, 250);
    setTimeout(function () {
        $("#buttonRed").addClass("activated");
    }, 250);
    setTimeout(function () {
        $("#buttonRed").removeClass("activated");
    }, 500);
    setTimeout(function () {
        $("#buttonYel").addClass("activated");
    }, 500);
    setTimeout(function () {
        $("#buttonYel").removeClass("activated");
    }, 750);
    setTimeout(function () {
        $("#buttonBlu").addClass("activated");
    }, 750);
    setTimeout(function () {
        $("#buttonBlu").removeClass("activated");
    }, 1000);

    // tous les boutons passent dans la classe activated pendant 1sec250 pour qu'ils sallument en mm tps puis s'eteignent
    setTimeout(function () {
        $("#buttonGre").addClass("activated");
    }, 1250);
    setTimeout(function () {
        $("#buttonRed").addClass("activated");
    }, 1250);
    setTimeout(function () {
        $("#buttonYel").addClass("activated");
    }, 1250);
    setTimeout(function () {
        $("#buttonBlu").addClass("activated");
    }, 1250);
    setTimeout(function () {
        $("#buttonGre").removeClass("activated");
    }, 1500);
    setTimeout(function () {
        $("#buttonRed").removeClass("activated");
    }, 1500);
    setTimeout(function () {
        $("#buttonYel").removeClass("activated");
    }, 1500);
    setTimeout(function () {
        $("#buttonBlu").removeClass("activated");
    }, 1500);

    // tous les boutons passent dans la classe activated pendant 1750ms pour qu'ils sallument en mm tps puis s'eteignent
    setTimeout(function () {
        $("#buttonGre").addClass("activated");
    }, 1750);
    setTimeout(function () {
        $("#buttonRed").addClass("activated");
    }, 1750);
    setTimeout(function () {
        $("#buttonYel").addClass("activated");
    }, 1750);
    setTimeout(function () {
        $("#buttonBlu").addClass("activated");
    }, 1750);
    setTimeout(function () {
        $("#buttonGre").removeClass("activated");
    }, 2000);
    setTimeout(function () {
        $("#buttonRed").removeClass("activated");
    }, 2000);
    setTimeout(function () {
        $("#buttonYel").removeClass("activated");
    }, 2000);
    setTimeout(function () {
        $("#buttonBlu").removeClass("activated");
    }, 2000);
}

// DIV POP // DIV POP UP
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

// Bouton [X] de fermeture de la pop - A copier tel quel
closeDiv.addEventListener("click", function (){
    fadeOut(popDiv, 10);
    console.log("pop out");
    setTimeout(function (){
        togglevisi(popDiv, "none");
        console.log("pop out 2")
    }, 1000)
});

document.onload=recharger(), decrementation();