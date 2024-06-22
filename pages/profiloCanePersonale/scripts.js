import { app } from "../../app.js";

document.addEventListener("DOMContentLoaded", () => {
  const selectedDogId = localStorage.getItem("selectedDogId");
  if (!selectedDogId) {
    alert("ID cane non trovato");
    window.location.href = "../listaCani/index.html";
    return;
  }

  const dog = app.getDogInfo(selectedDogId);

  if (!dog) {
    alert(selectedDogId);
    alert("Cane non trovato");
    window.location.href = "../listaCani/index.html";
    return;
  }

  const dogProfileContainer = document.getElementById("dog-profile");

  dogProfileContainer.innerHTML = `
        <div class="dog-info-container">
        <h3>${dog.nome}</h3>
        <p>Razza: ${dog.razza}</p>
        <p>Età: ${dog.eta}</p>
        <p>Sesso: ${dog.sesso}</p>
        <p>Pedigree: ${dog.pedigree ? "Sì" : "No"}</p>
        <p>Luogo: ${dog.luogo}</p>
        <p>Descrizione: ${dog.descrizione}</p>
        </div>
        <div class="dog-image-container">
        <img src="${dog.immagine}" alt="${dog.nome}" class="dog-image-large"/>
        </div>
    `;

  const homePageButton = document.getElementById("logo");
  homePageButton.addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });

  const modificaProfiloButton = document.getElementById(
    "button-modificaProfilo"
  );
  modificaProfiloButton.addEventListener("click", () => {
    window.location.href = "../modificaCane/index.html";
  });

  const eliminaProfiloButton = document.getElementById("button-eliminaProfilo");
  eliminaProfiloButton.addEventListener("click", () => {
    // Implementa la logica per eliminare il profilo del cane
    alert("Funzionalità di eliminazione in sviluppo");
  });
});
