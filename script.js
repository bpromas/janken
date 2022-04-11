let modal = document.getElementById("difficulty-modal");
let resultModal = document.getElementById("result-modal");
let resultMessage = document.querySelector("#result-modal h1");

let btnStart = document.getElementById("start-game");
let btnReset = document.getElementById("reset-game");

let janSpan = document.getElementById("jan");
let janTSpan = document.getElementById("jan-t");
let kenSpan = document.getElementById("ken");
let kenTSpan = document.getElementById("ken-t");
let ponSpan = document.getElementById("pon");
let ponTSpan = document.getElementById("pon-t");

let ponTime = randomIntFromInterval(4500, 7000);

let reactionTimeDiv = document.getElementById("reaction-time");
let reactionTimeRequired = 1500; //Defaults to 1.5 seconds
let reactionStart;
let reactionTime;


let playerGestureText = document.querySelector(".player-side .gesture-text");
let playerGestureIcon = document.querySelector(".player-side .gesture-icon img");

let opponentGestureText = document.querySelector(".opponent-side .gesture-text");
let opponentGestureIcon = document.querySelector(".opponent-side .gesture-icon img");

let gameHasStarted = false;
let opponentHasThrown = false;
let playerHasThrown = false;
let opponentGesture;
let playerGesture;

btnStart.onclick = function(e){
    gameHasStarted = true;
    let rps = randomIntFromInterval(1, 3) //1 = rock; 2 = paper; 3 = scissors;
    btnStart.style.display = "none";
    setTimeout(function(){janSpan.style.display="inline"; janTSpan.style.display="inline"}, 1500);
    setTimeout(function(){kenSpan.style.display="inline"; kenTSpan.style.display="inline"}, 3000);
    setTimeout(function(){ponSpan.style.display="inline"; ponTSpan.style.display="inline"; opponentThrow(rps);}, ponTime);
}

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "KeyA":
            throwGesture(1);
            break;
        case "KeyS":
            throwGesture(2);
            break;
        case "KeyD":
            throwGesture(3);
            break;    
        default:
            break;
    }
}, false);

function throwGesture(rps){
    if(gameHasStarted && !playerHasThrown){
        playerGesture = rps;
        switch (rps) {
            case 1:
                playerGestureText.innerHTML = "Rock!";
                playerGestureIcon.src = "img/player-rock.svg";
                break;
            case 2:
                playerGestureText.innerHTML = "Paper!";
                playerGestureIcon.src = "img/player-paper.svg";
                break;
            case 3:
                playerGestureText.innerHTML = "Scissors!";
                playerGestureIcon.src = "img/player-scissors.svg";
                break;        
            default:
                break;
        }
        playerHasThrown = true; 
        reactionTime = reactionStart === undefined ? 0 : Date.now() - reactionStart;
        reactionTimeDiv.innerHTML = `${reactionTime}ms`
        showResult();
    }

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function setDiff(buttonId){
    switch (buttonId) {
        case "diff-easy":
            reactionTimeRequired = 3000;
            break;
        case "diff-medium":
            reactionTimeRequired = 1500;
            break;
        case "diff-hard":
            reactionTimeRequired = 750;
            break;    
    }
    modal.style.display = "none";
    btnStart.style.display = "block";
}

function opponentThrow(rps){
    
    switch (rps) {
        case 1:
            opponentGestureText.innerHTML = "Rock!";
            opponentGestureIcon.src = "img/opponent-rock.svg"
            break;

        case 2:
            opponentGestureText.innerHTML = "Paper!";
            opponentGestureIcon.src = "img/opponent-paper.svg"
            break;

        case 3:
            opponentGestureText.innerHTML = "Scissor!";
            opponentGestureIcon.src = "img/opponent-scissors.svg"
            break;
    
        default:
            break;
    }
    
    opponentHasThrown = true;
    opponentGesture = rps;
    reactionStart = Date.now();

    btnReset.style.display = "block"; // Game can be safely reset after this point
}

function showResult(){
    if(playerHasThrown && !opponentHasThrown){
        resultMessage.innerHTML = "Too early!";
    } else if(reactionTime > reactionTimeRequired){
        resultMessage.innerHTML = "Too late!";
    } else if(playerGesture === opponentGesture){
        resultMessage.innerHTML = "It's a draw!";
    } else if(playerWon()){
        resultMessage.innerHTML = "You won!";
    } else {
        resultMessage.innerHTML = "You lose!";
    }
    resultModal.style.display = "block";
}

function playerWon(){
    return (
        (playerGesture === 1 && opponentGesture === 3) || //rock beats scissors
        (playerGesture === 2 && opponentGesture === 1) || //paper beats rock
        (playerGesture === 3 && opponentGesture === 2)    //scissors beats paper
    )
}

function resetGame(){
    gameHasStarted = false;
    opponentHasThrown = false;
    playerHasThrown = false;
    opponentGesture = undefined;
    playerGesture = undefined;
    reactionStart = undefined;
    reactionTime = undefined;

    btnStart.style.display = "block";
    janSpan.style.display="none"; janTSpan.style.display="none"
    kenSpan.style.display="none"; kenTSpan.style.display="none"
    ponSpan.style.display="none"; ponTSpan.style.display="none"

    reactionTimeDiv.innerHTML = "";

    playerGestureText.innerHTML = "";
    playerGestureIcon.src = ""
    opponentGestureText.innerHTML = "";
    opponentGestureIcon.src = ""

    resultMessage.innerHTML = "";
    resultModal.style.display = "none";
    btnReset.style.display = "none";
}