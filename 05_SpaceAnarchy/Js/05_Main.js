// DEFINITION DES let varIABLES

// let variable pour déterminer si le jeu est éteint ou allumé
let power = "off";
// let variable pour le choix du mode: si erreur => retour au debut du jeu
let strict = "off";
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

// Lorsque l'on clique sur le switch on/off
$("#powerSwitch").on("click", function () {
    // au depart power == "off"
    if (power == "off") { // on allume le jeu
        // on rend visible le bouton "On" (carré bleu positionné à gauche)
        $("#buttonOn").css("visibility", "visible");
        // on rend invisible le bouton "Off" (carré bleu positionné à droite)
        $("#buttonOff").css("visibility", "hidden");
        // on augmente l'opacité du texte (compteur)
        $("#displayText").css("opacity", "1");
        // la let variable power vaiut 'on'
        power = "on";
    }
    // si le jeu est sur on, alors au clic:
    else if (power == "on") { // on éteint le jeu
        // on rend invisible le bouton on
        $("#buttonOn").css("visibility", "hidden");
        // et on rend visible le bouton off
        $("#buttonOff").css("visibility", "visible");
        // on diminue l'opacité du compteur
        $("#displayText").css("opacity", "0.3");
        // on reinitialise les let variables power et strict sur "off"
        power = "off";
        strict = "off";
        // le bouton strict redevient jaune (il est vert s'il est coché)
        $("#strictButton").css("background", "yellow");
        // on retire le "check" du bouton strict
        $("#strictButton").removeClass("fa fa-check");
        // la let variable 'running' est remise sur "false" (elle est true quand on a cliqué sur le bouton start)
        running = false;
        // le bouton start est remis en rouge (il est vert lorsqu'il est activé au clic)
        $("#startButton").css("background", "red");
        // le tableau de mémoire est vidé
        memoryArray = [];
        // le tableau des entrées de l'utilisateur est vidé
        userArray = [];
        // le niveau est réinitialisé à 1
        levelCount = 1;
        // affichage '--' dans le compteur
        $("#displayText").html("--");
        // le compteur du tableau de mémoire est remis à 0
        memoryArrayCounter = 0;
        // le compteur du tableau des entrées utilisateur est remis à 0
        userArrayCounter = 0;
        // la let variable permettant de comparer les 2 tableaux vaut 'true'
        matchingArrays = true;
        // efface le timer lié à runMemory (setTimeout)
        clearInterval(runMemory);
        // on ne permet plus d'avoir d'evenement sur la souris => on ne peut plus cliquer sur les couleurs (il ne se passe rien)
        $(".fourButton").css("pointer-events", "none");
    }
});

//Visual changes when clicking the strict button
$("#strictButton").on("click", function () {
    // on peut cliquer sur le bouton strict uniquement si le jeu est allumé (power=='on') et que l'on a pas encore cliqué sur start (running==false)
    if (power == "on" && running == false) {

        // au clic, si la case n'avait pas été cliquée
        if (strict == "off") {
            // on change la couleur du background qui passe de jaune à vert
            $("#strictButton").css("background", "green");
            // la case est cochée
            $("#strictButton").addClass("fa fa-check");
            // la let variable strict vaut "on"
            strict = "on";
        }
        // sinon
        else if (strict == "on") {
            // on change la couleur du background qui passe de vert à jaune
            $("#strictButton").css("background", "yellow");
            // la case est décochée
            $("#strictButton").removeClass("fa fa-check");
            // la let variable strict vaut "off"
            strict = "off";
        }
    }
});

//Effects when clicking the start button
$("#startButton").on("click", function () {
    // si le jeu est allumé
    if (power == "on") {
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
        // on appel newMemory pour ajouter une couleur au tableau de memoire de l'ordinateur
        newMemory();

        console.log(memoryArray);

        // setTimeOut appelle la fonction qui change la valeur de runMemory après 1 secondes (1000 sec)
        // runMemory appelle la fonction playMemory toutes les secondes pour montrer les couleurs qui doivent etre cliquées
        // runMemory est stoppé quand memoryArrayCounter == memoryArray.length pour éviter une boucle toutes les seconcdes
        setTimeout(function () {
            runMemory = setInterval(playMemory, 1000);
        }, 1000);
    }
});

//Effects when clicking colored buttons

// [id*='button'] selectionne tous les elements id qui contiennent "button"
$("div[id*='button']").on("click", function () {
    // si le jeu est allumé (power) et que start a été cliqué (running)
    if (power == "on" && running) {
        // event.which == 1 <=> clic de la souris
        if (event.which == 1) {
            // on recucupe le son lié au bouton sur lequel on vient de cliquer dans le html (this.id<=> buttonColor)
            // la methode get(0).play permet de jouer l'audio selectionné
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

                // SI LE MODE STRICT EST ACTIVE
                if (strict == "on") {
                    // on vide le tableau de memoire de l'ordinateur
                    memoryArray = [];
                    // on remet le niveau à 1
                    levelCount = 1;
                    // on rappel la fonction permettant de remplir à nouveau le tableau de l'ordinateur
                    newMemory();
                    console.log(memoryArray);
                    // on lance le setTimeout
                    setTimeout(function () {
                        runMemory = setInterval(playMemory, tempo);
                    }, 1000);
                }
                // SI LE MODE STRICT EST DESACTIVE
                // on relance simplement le setTimeout
                else {
                    setTimeout(function () {
                        runMemory = setInterval(playMemory, tempo);
                    }, 1000);
                }
            }
            else {
                // si les compteurs des tableaux sont égaux
                if (userArrayCounter == memoryArrayCounter) {
                    // et que matchingArrays vaut true
                    if (matchingArrays) {
                        // et que le niveau =20
                        if (levelCount == 20) {
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
                            // on rappel newMemory pour remplir à nouveau le tableau de l'ordinateur
                            newMemory();
                            // on augmente le niveau
                            levelCount++;

                            // en fonction du niveau de difficulté, on diminue le temps lié a la fonctipon setTimeout qui permet d'afficher les couleurs de moins en moins lgtps'
                            switch (levelCount) {
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                    tempo = 1000;
                                    break;
                                case 5:
                                    tempo = 700;
                                    break;
                                case 9:
                                    tempo = 500;
                                    break;
                                case 13:
                                    tempo = 300;
                                    break;
                            }
                            // on rappel la fonction setTimeout qui permet de visualiser les boutons sur lesquels on doit cliquer
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
    // renvoie le plus grand nombre entier d'un nombre aléatoire*4 +1 => le resultat de temp peut let ier entre 1 et 4
    let temp = Math.floor((Math.random() * 4) + 1);
    // en fonction du resulat de temp
    switch (temp) {
        // si temp == 1
        case 1:
            // on entre "Gre" dans le tableau de mémoire de l'ordinateur
            memoryArray.push("Gre");
            break;
        // si temp == 2
        case 2:
            // on entre "Red" dans le tableau de mémoire de l'ordinateur
            memoryArray.push("Red");
            break;
        // si temp == 3
        case 3:
            // on entre "Yel" dans le tableau de mémoire de l'ordinateur
            memoryArray.push("Yel");
            break;
        // si temp == 4
        case 4:
            // on entre "Blue" dans le tableau de mémoire de l'ordinateur
            memoryArray.push("Blu");
            break;
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
    // la methode get(0).play permet de jouer l'audio selectionné
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

    // on rappel la fonction setTimeout
    setTimeout(function () {
        // reinitialisation des tableaux et des compteurs
        userArray = [];
        memoryArray = [];
        memoryArrayCounter = 0;
        userArrayCounter = 0;
        // retour au niveau 1
        levelCount = 1;
        // afficchage de "--" dans le compteur
        $("#displayText").html("--");
        // reinitialisation de matchingArray
        matchingArrays = true;
        // reinitialisation du timer
        clearInterval(runMemory);
        // desactivation des clics possibles
        $(".fourButton").css("pointer-events", "none");
        // appel de la fonction newMemory et setTimeout pour démarrer un nouveau jeu
        newMemory();
        console.log(memoryArray);
        setTimeout(function () {
            runMemory = setInterval(playMemory, 1000);
        }, 1000);
    }, 3000);
}