
let instuctions = document.querySelector(".popup-container");
let startButtun = document.querySelector("#start-btn");
let customContainer = document.querySelector(".container-custom");

// adding functionalities to the instructions container
startButtun.addEventListener("click", () =>{
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
})