
let instuctions = document.querySelector(".popup-container");
let startButton = document.querySelector("#start-btn");
let startButton2 = document.querySelector("#start-btn-2");
let customContainer = document.querySelector(".container-custom");

// adding functionalities to the instructions container
startButton.addEventListener("click", () =>{
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
})
startButton2.addEventListener("click", () =>{
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
})