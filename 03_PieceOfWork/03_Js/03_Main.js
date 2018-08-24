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
    if (puzzleFacile == true && puzzleMoyen == true && puzzleDifficile == false){
        puzzleDifficile = true;
        // Apparition bouton salle suivant + local storage temps !
    }
    if (puzzleFacile == true && puzzleMoyen == false && puzzleDifficile == false){
        puzzleMoyen = true;
        img.src = imgArray[2]; // image Niveau 3 du puzzle
        PUZZLE_DIFFICULTY = 5; // Difficulté Niveau 3 du Puzzle
    }
    if (puzzleFacile == false && puzzleMoyen == false && puzzleDifficile == false){
        puzzleFacile = true;
        img.src = imgArray[1]; // image Niveau 2 du puzzle
        PUZZLE_DIFFICULTY = 4; // Difficulté du Niveau 2 du puzzle
    }
    initPuzzle();
}