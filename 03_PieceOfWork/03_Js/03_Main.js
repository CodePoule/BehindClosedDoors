// A piece of work JS
const PUZZLE_DIFFICULTY = 4; // A MODIFIER UNE FOIS QUE ÇA MARCHE
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

// création du canvas
function init() {
    img = new Image();
    img.addEventListener('load',onImage,false);
    img.src = "03_Img/03_franky01.png";
}

// Configuartion Canvas
function setCanvas(){
    puzzle = document.getElementById('puzzle');
    stage = puzzle.getContext('2d');
    puzzle.width = puzzleWidth;
    puzzle.height = puzzleHeight;
    puzzle.style.border = "1px solid black"; // à retirer à la fin
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
    createTitle("Cliquez pour éclater l'image en puzzle");
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
    document.onmousedown = shufflePuzzle;
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
    document.onmousedown = onPuzzleClick;
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
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    initPuzzle();
}

// Variables à peut être IMPORT EXPORT
let popDiv = document.querySelector("#pop-div");
let titrePopDiv = document.querySelector(".titre-pop-div");
let pPopDiv = document.querySelector("#paragraph-pop-div");
let closeDiv = document.querySelector(".fermer-div");

// A DEPLACER EN IMPORT EXPORT v

// fonction alternance display
function toggle(item, State) {
    item.style.display = State;
}

// Opacité initiale de la pop
popDiv.style.opacity = "0";

// Pop Div caché au départ
toggle(popDiv, 'none');

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

// A DEPLACER EN IMPORT EXPORT ^}