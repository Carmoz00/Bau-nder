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

  const inviaRichiestaButton = document.getElementById("button-inviaRichiesta");
  inviaRichiestaButton.addEventListener("click", () => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      alert("Devi essere loggato per inviare una richiesta di match");
      window.location.href = "../login/index.html";
      return;
    }

    const user1Id = session.id_user;
    const dog1Id = dog.id_dog;
    const user2Id = dog.ownerId;
    const dog2Id = dog.id_dog;

    console.log(`Utente loggato ID: ${user1Id}`);
    console.log(`Cane ID: ${dog1Id}, Proprietario ID: ${user2Id}`);

    const message = app.matchRequest(user1Id, dog1Id, user2Id, dog2Id);
    alert(message);
  });
});
