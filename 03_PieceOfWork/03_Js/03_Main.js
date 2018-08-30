// Nom de la salle
let nomSalle = document.querySelector("#nom-salle");
nomSalle.innerHTML = "Piece Of Work";

// A piece of work JS
let PUZZLE_DIFFICULTY = 3; // A MODIFIER UNE FOIS QUE ÇA MARCHE
const PUZZLE_HOVER_TINT = '#009900';

let puzzle/* = document.querySelector('#puzzle')*/; // canvas
let stage; // canvas context

let img; // image du puzzle
let pieces; // pièces du puzzle
let puzzleWidth; // Largeur du puzzle
let puzzleHeight; // hauteur du puzzle
let pieceWidth; // largeur d'une pièce
let pieceHeight; // hauteur d'une pièce
let currentPiece;
let currentDropPiece;

let mouse;

let puzzleFacile = false;
let puzzleMoyen = false;
let puzzleDifficile = false;

let deplacements = 10;
let vie = 3;

let affichage_compteur = document.querySelector(".compteur");
affichage_compteur.innerHTML = deplacements;

// Objet images pour le puzzle
function ImgPuzzle(index, imgURL) {
    this.index = index;
    this.imgURL = imgURL;
}

// images qui seront utilisées dans le puzzle
let Franky1 = new ImgPuzzle(1, "03_Img/03_franky01.png");
let Franky2 = new ImgPuzzle(2, "03_Img/03_franky02.png");
let Franky3 = new ImgPuzzle(3, "03_Img/03_franky03.png");
let Franky4 = new ImgPuzzle(4, "03_Img/03_franky04.png");
let Franky5 = new ImgPuzzle(5, "03_Img/03_franky05.png");
let Franky6 = new ImgPuzzle(6, "03_Img/03_franky06.png");
let Franky7 = new ImgPuzzle(7, "03_Img/03_franky07.png");
let Franky8 = new ImgPuzzle(8, "03_Img/03_franky08.png");
let Franky9 = new ImgPuzzle(9, "03_Img/03_franky09.png");
let Franky10 = new ImgPuzzle(10, "03_Img/03_franky10.png");

// Tableau des images sur lequel on effectura le random
let imgArray = [
    Franky1.imgURL,
    Franky2.imgURL,
    Franky3.imgURL,
    Franky4.imgURL,
    Franky5.imgURL,
    Franky6.imgURL,
    Franky7.imgURL,
    Franky8.imgURL,
    Franky9.imgURL,
    Franky10.imgURL
];

// Mélange les url du tableau
function shuffle(index) {
    // if this.piochee == 0
    for (let i = index.length; i; i--) {
        let nbH = Math.floor(Math.random() * i);
        [index[i - 1], index[nbH]] = [index[nbH], index[i - 1]];
        // this.piochee = 1;
    }
    // console.log(index);
}

// FONCTIONS DU PUZZLE

// création du canvas
function init() {
    shuffle(imgArray);
    img = new Image();
    img.addEventListener('load',onImage,false);
    img.src = imgArray[0];
}

// Configuartion Canvas
function setCanvas(){
    puzzle = document.getElementById('puzzle');
    stage = puzzle.getContext('2d');
    puzzle.width = puzzleWidth;
    puzzle.height = puzzleHeight;
}

// Division images
function onImage(e){
    pieceWidth = Math.floor(img.width / PUZZLE_DIFFICULTY);
    pieceHeight = Math.floor(img.height / PUZZLE_DIFFICULTY);
    puzzleWidth = pieceWidth * PUZZLE_DIFFICULTY;
    puzzleHeight = pieceHeight * PUZZLE_DIFFICULTY;
    setCanvas();
    initPuzzle();
}

// Construction ou initialisation puzzle
function initPuzzle(){
    pieces = [];
    mouse = {x:0,y:0};
    currentPiece = null;
    currentDropPiece = null;
    stage.drawImage(img, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);
    createTitle("Double-Clic pour éclater l'image en puzzle");
    buildPieces();
}

// à comprendre mais il me semble qu'il s'agit de la séparation visuelle des pièces
function createTitle(msg){
    stage.fillStyle = "#000000";
    stage.globalAlpha = .4;
    stage.fillRect(100,puzzleHeight - 40,puzzleWidth - 200,40);
    stage.fillStyle = "#FFFFFF";
    stage.globalAlpha = 1;
    stage.textAlign = "center";
    stage.textBaseline = "middle";
    stage.font = "20px Arial";
    stage.fillText(msg,puzzleWidth / 2,puzzleHeight - 20);
}

// construction des pièces du puzzle
function buildPieces(){
    let piece;
    let xPos = 0;
    let yPos = 0;
    for(let i = 0;i < PUZZLE_DIFFICULTY * PUZZLE_DIFFICULTY;i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        pieces.push(piece);
        xPos += pieceWidth;
        if(xPos >= puzzleWidth){
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    document.ondblclick  = shufflePuzzle;
    // document.onmousedown = shufflePuzzle;
}

// Mélange des pièces du puzzle
function shufflePuzzle(){
    pieces = shuffleArray(pieces); // cf ligne 110
    stage.clearRect(0,0,puzzleWidth,puzzleHeight);
    let piece;
    let xPos = 0;
    let yPos = 0;
    for(let i = 0;i < pieces.length;i++){
        piece = pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
        stage.strokeRect(xPos, yPos, pieceWidth,pieceHeight);
        xPos += pieceWidth;
        if(xPos >= puzzleWidth){
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    document.ondblclick  = onPuzzleClick;
    // document.onmousedown = onPuzzleClick;
}

// application du mélange sur TOUTES pièces du puzzle
function shuffleArray(o){
    for (let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// Selection pièce du puzzle
function onPuzzleClick(e){
    if(e.layerX || e.layerX == 0){
        mouse.x = e.layerX - puzzle.offsetLeft;
        mouse.y = e.layerY - puzzle.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        mouse.x = e.offsetX - puzzle.offsetLeft;
        mouse.y = e.offsetY - puzzle.offsetTop;
    }
    currentPiece = checkPieceClicked();
    if(currentPiece != null){
        stage.clearRect(currentPiece.xPos,currentPiece.yPos,pieceWidth,pieceHeight);
        stage.save();
        stage.globalAlpha = .9;
        stage.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
        stage.restore();
        document.onmousemove = updatePuzzle;
        document.onmouseup = pieceDropped;
        console.log("selection pièce");
        deplacements --;
        affichage_compteur.innerHTML = deplacements;
        console.log("nombre de déplacements : " + deplacements);
        decrementation_vie();
        console.log("la vie est de " + vie);
    }
}

// Verification de la pièce selectionée
function checkPieceClicked(){
    let piece;
    for(let i = 0;i < pieces.length;i++){
        piece = pieces[i];
        if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
}

// Mise à jour du puzzle lorsque la pièce est selectionnée
// Seleection de la pièce et accorche pièce sur souris => DRAG
function updatePuzzle(e){
    currentDropPiece = null;
    if(e.layerX || e.layerX == 0){
        mouse.x = e.layerX - puzzle.offsetLeft;
        mouse.y = e.layerY - puzzle.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        mouse.x = e.offsetX - puzzle.offsetLeft;
        mouse.y = e.offsetY - puzzle.offsetTop;
    }
    stage.clearRect(0,0,puzzleWidth,puzzleHeight);
    let piece;
    for(let i = 0;i < pieces.length;i++){
        piece = pieces[i];
        if(piece == currentPiece){
            continue;
        }
        stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        stage.strokeRect(piece.xPos, piece.yPos, pieceWidth,pieceHeight);
        if(currentDropPiece == null){
            if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight)){
                //NOT OVER
            }
            else{
                currentDropPiece = piece;
                stage.save();
                stage.globalAlpha = .4;
                stage.fillStyle = PUZZLE_HOVER_TINT;
                stage.fillRect(currentDropPiece.xPos,currentDropPiece.yPos,pieceWidth, pieceHeight);
                stage.restore();
            }
        }
    }
    stage.save();
    stage.globalAlpha = .6;
    stage.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
    stage.restore();
    stage.strokeRect( mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth,pieceHeight);
}

// Relachement de la pièce à l'endroit ou l'on lache la souris => DROP
function pieceDropped(e){
    document.onmousemove = null;
    document.onmouseup = null;
    if(currentDropPiece != null){
        let tmp = {xPos:currentPiece.xPos,yPos:currentPiece.yPos};
        currentPiece.xPos = currentDropPiece.xPos;
        currentPiece.yPos = currentDropPiece.yPos;
        currentDropPiece.xPos = tmp.xPos;
        currentDropPiece.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
}

// reset puzzle et vérification victoire
function resetPuzzleAndCheckWin(){
    stage.clearRect(0,0,puzzleWidth,puzzleHeight);
    let gameWin = true;
    let piece;
    for(let i = 0;i < pieces.length;i++){
        piece = pieces[i];
        stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        stage.strokeRect(piece.xPos, piece.yPos, pieceWidth,pieceHeight);
        if(piece.xPos != piece.sx || piece.yPos != piece.sy){
            gameWin = false;
        }
    }
    if(gameWin){
        setTimeout(gameOver,500);
    }
}

// fin puzzle et reinitialisation
function gameOver(){
    document.ondblclick  = null;
    // document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    if (puzzleFacile == true && puzzleMoyen == true && puzzleDifficile == false){
        puzzleDifficile = true;
        togglevisi(fleche, "");
        console.log("titre");
        titrePopDiv.innerHTML = "Bravo! "; // TITRE DE LA POP UP
        console.log("regles");
        // passage à la salle suivante
        pPopDiv.innerHTML = "<p id='p-div'>Tu peux maintenant passer à la salle suivante.</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (puzzleFacile == true && puzzleMoyen == false && puzzleDifficile == false){
        puzzleMoyen = true;
        img.src = imgArray[2]; // image Niveau 3 du puzzle
        PUZZLE_DIFFICULTY = 5; // Difficulté Niveau 3 du Puzzle
        console.log("passage niveau 3");
        deplacements = 30;
        affichage_compteur.innerHTML = deplacements;
        console.log("nombre de déplacements au passage au niveau 3 : " + deplacements);
        console.log("titre");
        titrePopDiv.innerHTML = "Bravo !"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>Tu passe au dernier niveau ! <br> Tu as droit à 30 déplacements</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);
    }
    if (puzzleFacile == false && puzzleMoyen == false && puzzleDifficile == false){
        puzzleFacile = true;
        img.src = imgArray[1]; // image Niveau 2 du puzzle
        PUZZLE_DIFFICULTY = 4; // Difficulté du Niveau 2 du puzzle
        console.log("passage niveau 2");
        deplacements = 15;
        affichage_compteur.innerHTML = deplacements;
        console.log("nombre de déplacements au passage au niveau 2 : " + deplacements);
        console.log("titre");
        titrePopDiv.innerHTML = "Bravo !"; // TITRE DE LA POP UP
        console.log("regles");
        pPopDiv.innerHTML = "<p id='p-div'>Tu passes au niveau 2 ! <br> Tu as droit à 15 déplacements</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
        togglevisi(popDiv, "");
        fadeIn(popDiv,5);

    }
    initPuzzle();
}


//fonction decrementation vie et déplacements
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

function decrementation_vie() {
    if (deplacements <= 0) {
        vie --;
        console.log("la vie est de : ");
        console.log(vie);
        console.log("le nombre de déplacements est de : ");
        console.log(deplacements);

        if (vie == 2) {
            togglevisi(heart1, "none");
            console.log("boucle vie 2");
            console.log("titre");
            titrePopDiv.innerHTML = "Perdu !"; // TITRE DE LA POP UP
            console.log("regles");
            pPopDiv.innerHTML = "<p id='p-div'>J'ai confiance en toi, essais encore...\n</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
            togglevisi(popDiv, "");
            fadeIn(popDiv,5);
            if (puzzleFacile == false) {
                console.log("puzzleFacile false");
                deplacements = 10;
                affichage_compteur.innerHTML = deplacements;
                console.log("le nombre de déplacements est de : "+ deplacements);
            }
            if (puzzleFacile == true) {
                console.log("puzzleFacile true");
                deplacements = 15;
                affichage_compteur.innerHTML = deplacements;
                console.log("le nombre de déplacements est de : "+ deplacements);
            }
            if (puzzleMoyen == true) {
                console.log("puzzleMoyen true");
                deplacements = 30;
                affichage_compteur.innerHTML = deplacements;
                console.log("le nombre de déplacements est de : "+ deplacements);
            }
        }
        if (vie == 1) {
            togglevisi(heart1, "none");
            togglevisi(heart2, "none");
            console.log("boucle vie 1");
            titrePopDiv.innerHTML = "Perdu !"; // TITRE DE LA POP UP
            console.log("regles");
            pPopDiv.innerHTML = "<p id='p-div'>C’est ta dernière chance, ne la rate pas !\n</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
            togglevisi(popDiv, "");
            fadeIn(popDiv,5);
            if (puzzleFacile == false) {
                console.log("puzzleFacile false");
                deplacements = 10;
                affichage_compteur.innerHTML = deplacements;
                console.log("le nombre de déplacements est de : "+ deplacements);
            }
            if (puzzleFacile == true) {
                console.log("puzzleFacile true");
                deplacements = 15;
                affichage_compteur.innerHTML = deplacements;
                console.log("le nombre de déplacements est de : "+ deplacements);
            }
            if (puzzleMoyen == true) {
                console.log("puzzleMoyen true");
                deplacements = 30;
                affichage_compteur.innerHTML = deplacements;
                console.log("le nombre de déplacements est de : "+ deplacements);
            }
        }
        if (vie == 0) {
            togglevisi(heart1, "none");
            togglevisi(heart2, "none");
            togglevisi(heart3, "none");
            console.log("boucle vie 3");
            console.log("titre");
            titrePopDiv.innerHTML = "Game Over !"; // TITRE DE LA POP UP
            console.log("regles");
            pPopDiv.innerHTML = "<p id='p-div'>On aurait pu croire en ton potentiel mais apparement non...</p>"; // CONTENU / PARAGRAPHE DE LA POP UP
            togglevisi(popDiv, "");
            fadeIn(popDiv,5);
            setTimeout (function () {document.location.href = "../index.html" // Retour page accueil
            }, 5000);
        }
    }
}

//FONCTION FLECHE
let fleche = document.querySelector(".fleche");
togglevisi(fleche, "none");

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

// Event lors de la victoire sur chaque page
fleche.addEventListener("click", function () {
    sauvegarder();
    document.location.href = pageSuivante; // variable à redéfinir sur chaque page pour aller à la page suivante : chaine de charctère/lien relatif
});

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