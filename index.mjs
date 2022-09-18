
let instuctions = document.querySelector(".popup-container");
let startButtun = document.querySelector("#start-btn");
let playGameButton = document.querySelector("#play-game-btn");
let customContainer = document.querySelector(".container-custom");

// adding functionalities to the instructions container
startButtun.addEventListener("click", () =>{
    startGame();
})

// adding functionalities to the instructions container
playGameButton.addEventListener("click", () =>{
    startGame();
})

function startGame(){
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
}