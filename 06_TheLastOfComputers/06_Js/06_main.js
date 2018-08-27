// sidenav
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


// compte à rebourd: déclaration des valeurs minutes et secondes
function getTimeRemaining(endtime) {
    let totalTime = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((totalTime / 1000) % 60);
    let minutes = Math.floor((totalTime / 1000 / 60) % 60);

    return {
        'total': totalTime,
        'minutes': minutes,
        'seconds': seconds
    };
}
//initialisation du compte à rebourd
function initializeClock(id, endtime) {
    let clock = document.getElementById(id);
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');


    function updateClock() {
        let totalTime = getTimeRemaining(endtime);

        minutesSpan.innerHTML = ('0' + totalTime.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + totalTime.seconds).slice(-2);
//quand compteur atteint 0 alors affiche message + retour à salle 1 (lien à ajouter)
        if (totalTime.total <= 0) {
            clearInterval(timeinterval);
            document.getElementById("clockdiv").innerHTML = "Game Over Bitch";
            //passage salle 07
            setTimeout (function () {
                document.location.href = "../07_TheCourt/07_Index.html"
            }, 3000);
        }
    }

    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
}
//réinitialisation
let deadline = new Date(Date.parse(new Date()) + 60 * 1000);
initializeClock('clockdiv', deadline);


//retour salle 01 (lien à rajouter dans la condition)
// setTimeout (function () {
//     document.location.href = "../01_ChildrensMemories/01_Index.html"
// }, 2000);