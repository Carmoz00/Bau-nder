import { app } from "../../app.js";

document.addEventListener("DOMContentLoaded", () => {
  const dogsListContainer = document.getElementById("dogs-list");

  // Carica i cani dal localStorage
  const dogs = JSON.parse(localStorage.getItem("dogs")) || [];

  // Pulisci il contenitore dei cani
  dogsListContainer.innerHTML = "";

  if (dogs.length === 0) {
    dogsListContainer.innerHTML = "<p>Non ci sono cani disponibili.</p>";
  } else {
    dogs.forEach((dog) => {
      const dogProfileDiv = document.createElement("div");
      dogProfileDiv.classList.add("div-dog-profile");

      // Contenuto del profilo del cane
      dogProfileDiv.innerHTML = `
        <img class="dog-profile-pic" src="${dog.immagine}" alt="${dog.nome}" />
        <div class="dog-name">${dog.nome}</div>
        <div class="city">Città : ${dog.luogo}</div>
      `;

      // Aggiungi evento di clic per reindirizzare alla pagina del profilo cane personale
      dogProfileDiv.addEventListener("click", () => {
        localStorage.setItem("selectedDogId", dog.id_dog);
        window.location.href = "../profiloCane/index.html";
      });

      dogsListContainer.appendChild(dogProfileDiv);
    });
  }

  // Logout
  const logoutButton = document.getElementById("button-logout");
  logoutButton.addEventListener("click", () => {
    const message = app.logout();
    alert(message);
    localStorage.removeItem("user");
    window.location.href = "../../";
  });

  // Navigazione al profilo utente
  const profiloUserButton = document.getElementById("button-profiloUser");
  profiloUserButton.addEventListener("click", () => {
    window.location.href = "../profiloUser/index.html";
  });

  // Navigazione alla home page
  const homePageButton = document.getElementById("logo");
  homePageButton.addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });
});
