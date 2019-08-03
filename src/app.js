const secWelcome=document.getElementById("welcome-section")
const buttonStart=document.getElementById("button-house")
const personalInfo= document.getElementById("personal-info");


const seccPersoInfo= () =>{
    personalInfo.classList.remove("desaparecer");
    secWelcome.classList.add("desaparecer")
}

buttonStart.addEventListener("click", seccPersoInfo);