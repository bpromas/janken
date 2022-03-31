let modal = document.getElementById("difficulty-modal");
let btnEasy = document.getElementById("diff-easy");
let btnMedium = document.getElementById("diff-medium");
let btnHard = document.getElementById("diff-hard");

let reactionTimeRequired = 1500; //Defaults to 1.5 seconds

btnEasy.onclick = function(e){
    reactionTimeRequired = 1500;
    console.log(`reaction time required set to ${reactionTimeRequired}ms`);
    modal.style.display = "none";
}

btnMedium.onclick = function(e){
    reactionTimeRequired = 750;
    console.log(`reaction time required set to ${reactionTimeRequired}ms`);
    modal.style.display = "none";
}

btnHard.onclick = function(e){
    reactionTimeRequired = 350;
    console.log(`reaction time required set to ${reactionTimeRequired}ms`);
    modal.style.display = "none";
}