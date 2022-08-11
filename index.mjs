let instuctions = document.querySelector(".popup-container");
let startButtun = document.querySelector("#start-btn");
let customContainer = document.querySelector(".container-custom");

startButtun.addEventListener("click", () =>{
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
})