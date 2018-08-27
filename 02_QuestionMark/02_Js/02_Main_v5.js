let cpt = 10;
let aff_phrase = document.querySelector(".affiche_phrases"); //affichage phrase
let bouton_validation = document.querySelector("#bouton_valider");


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
    if (cpt > 1) {
        if ((document.getElementById("button_false").checked && myArray[cpt].bonne_reponse === 'faux') || (document.getElementById("button_true").checked && myArray[cpt].bonne_reponse === 'vrai')) {
            console.log('bien joué');
            cpt --;
            console.log(cpt);
            alert('Bravo, bien joué !')
        }
        else {
            console.log('mince, tu as perdu !');
            cpt --;
            console.log(cpt);
            alert('Mince, tu as perdu !')
        }
    }
    aff_phrase.innerHTML = myArray[cpt].affirmation;
}

bouton_validation.addEventListener("click", function() {nouvelle_question(aff_phrase, myArray)});


