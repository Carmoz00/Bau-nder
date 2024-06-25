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

    const userDogs = app.getUserDogs(session.id_user);

    if (userDogs.length === 0) {
      alert("Non hai cani da utilizzare per inviare una richiesta di match");
      return;
    }

    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");

    userDogs.forEach((userDog) => {
      const dogItem = document.createElement("div");
      dogItem.classList.add("dropdown-item");

      dogItem.innerHTML = `
        <img src="${userDog.immagine}" alt="${userDog.nome}" class="dropdown-dog-image"/>
        <span>${userDog.nome}</span>
      `;

      dogItem.addEventListener("click", () => {
        const user1Id = session.id_user;
        const dog1Id = userDog.id_dog;
        const user2Id = dog.ownerId;
        const dog2Id = dog.id_dog;

        const message = app.matchRequest(user1Id, dog1Id, user2Id, dog2Id);
        alert(message);
        dropdownMenu.remove();
      });

      dropdownMenu.appendChild(dogItem);
    });

    document.body.appendChild(dropdownMenu);

    const rect = inviaRichiestaButton.getBoundingClientRect();
    dropdownMenu.style.left = `${rect.left}px`;
    dropdownMenu.style.top = `${rect.bottom}px`;
    dropdownMenu.style.width = `${rect.width}px`;
  });
});
