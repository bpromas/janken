let modal = document.getElementById("difficulty-modal");

let btnStart = document.getElementById("start-game");

let janSpan = document.getElementById("jan");
let janTSpan = document.getElementById("jan-t");
let kenSpan = document.getElementById("ken");
let kenTSpan = document.getElementById("ken-t");
let ponSpan = document.getElementById("pon");
let ponTSpan = document.getElementById("pon-t");

let ponTime = randomIntFromInterval(4500, 7000);

let reactionTimeRequired = 1500; //Defaults to 1.5 seconds

let gameHasStarted = false;
let opponentHasThrown = false;
let playerHasThrown = false;

btnStart.onclick = function(e){
    gameHasStarted = true;
    let rps = randomIntFromInterval(1, 3) //1 = rock; 2 = paper; 3 = scissors;
    btnStart.style.display = "none";
    setTimeout(function(){janSpan.style.display="inline"; janTSpan.style.display="inline"}, 1500);
    setTimeout(function(){kenSpan.style.display="inline"; kenTSpan.style.display="inline"}, 3000);
    setTimeout(function(){ponSpan.style.display="inline"; ponTSpan.style.display="inline"; opponentThrow(rps);}, ponTime);
}

document.addEventListener('keydown', (event) => {
    let gestureText = document.querySelector(".player-side .gesture-text");
    let gestureIcon = document.querySelector(".player-side .gesture-icon img");

    if(gameHasStarted && !playerHasThrown){
        switch (event.code) {
            case "KeyA":
                gestureText.innerHTML = "Rock!";
                gestureIcon.src = "img/player-rock.svg";
                playerHasThrown = true; 
                break;
            case "KeyS":
                gestureText.innerHTML = "Paper!";
                gestureIcon.src = "img/player-paper.svg";
                playerHasThrown = true; 
                break;
            case "KeyD":
                gestureText.innerHTML = "Scissors!";
                gestureIcon.src = "img/player-scissors.svg";
                playerHasThrown = true; 
                break;    
            default:
                break;
        }
    }
  }, false);


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function setDiff(buttonId){
    switch (buttonId) {
        case "diff-easy":
            reactionTimeRequired = 1500;
            break;
        case "diff-medium":
            reactionTimeRequired = 750;
            break;
        case "diff-hard":
            reactionTimeRequired = 350;
            break;    
    }
    console.log(`reaction time required set to ${reactionTimeRequired}ms`);
    modal.style.display = "none";
    btnStart.style.display = "block";
}

function opponentThrow(rps){
    let gestureText = document.querySelector(".opponent-side .gesture-text");
    let gestureIcon = document.querySelector(".opponent-side .gesture-icon img");
    
    switch (rps) {
        case 1:
            gestureText.innerHTML = "Rock!";
            gestureIcon.src = "img/opponent-rock.svg"
            break;

        case 2:
            gestureText.innerHTML = "Paper!";
            gestureIcon.src = "img/opponent-paper.svg"
            break;

        case 3:
            gestureText.innerHTML = "Scissor!";
            gestureIcon.src = "img/opponent-scissors.svg"
            break;
    
        default:
            break;
    }
    
    opponentHasThrown = true;
  }