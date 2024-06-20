import { app } from "../../app.js";

const isLogged = !!localStorage.getItem("user");

if (!isLogged) {
  window.location.href = "../login";
} else {
  const homePageButton = document.getElementById("logo");
  homePageButton.addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });

  const aggiungiCaneButton = document.getElementById("button-aggiungiCane");
  aggiungiCaneButton.addEventListener("click", () => {
    window.location.href = "../aggiungiCane/index.html";
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id_user;

  const dogsListContainer = document.createElement("div");
  dogsListContainer.id = "dogs-list";
  document.body.appendChild(dogsListContainer);

  const displayUserDogs = () => {
    const userDogs = app.getUserDogs(userId);
    dogsListContainer.innerHTML = ""; // Pulire il contenitore prima di aggiungere nuovi elementi

    if (userDogs.length === 0) {
      dogsListContainer.innerHTML =
        "<p>Sembra che non hai ancora inserito nessun cane. Aggiungi il tuo cane ora!</p>";
    } else {
      userDogs.forEach((dog) => {
        const dogDiv = document.createElement("div");
        dogDiv.classList.add("dog-item");
        dogDiv.innerHTML = `
          <h3>${dog.nome}</h3>
          <p>Razza: ${dog.razza}</p>
          <p>Età: ${dog.eta}</p>
          <p>Sesso: ${dog.sesso}</p>
          <p>Pedigree: ${dog.pedigree ? "Sì" : "No"}</p>
          <p>Luogo: ${dog.luogo}</p>
          <p>Descrizione: ${dog.descrizione}</p>
          <img src="${dog.immagine}" alt="${dog.nome}" class="dog-image"/>
        `;
        dogsListContainer.appendChild(dogDiv);
      });
    }
  };

  document.addEventListener("DOMContentLoaded", displayUserDogs);
}
