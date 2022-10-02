
let instuctions = document.querySelector(".popup-container");
let startButtun = document.querySelector("#start-btn");
let startButtun2 = document.querySelector("#start-btn2");
let customContainer = document.querySelector(".container-custom");

// adding functionalities to the instructions container
startButtun.addEventListener("click", () =>{
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
})
startButtun2.addEventListener("click", () =>{
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
})