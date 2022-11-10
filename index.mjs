
let instuctions = document.querySelector(".popup-container");
let Player1Buttun = document.querySelector(".player1-btn");
let Player2Buttun = document.querySelector(".player2-btn");
let customContainer = document.querySelector(".container-custom");

// adding functionalities to the instructions container
Player1Buttun.addEventListener("click", () =>{
    singlePlayer();
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
})
Player2Buttun.addEventListener("click", () =>{
    twoPlayer();
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
})
