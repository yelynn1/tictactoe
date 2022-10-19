
let instuctions = document.querySelector(".popup-container");
let startButtun = document.querySelector("#start-btn");
let customContainer = document.querySelector(".container-custom");
let nav_playlink = document.querySelector('#play')

// adding functionalities to the instructions container
startButtun.addEventListener("click", () =>{
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
})

nav_playlink.addEventListener('click',()=>{
    instuctions.style.display = "none";
    customContainer.style.display = "flex";
})