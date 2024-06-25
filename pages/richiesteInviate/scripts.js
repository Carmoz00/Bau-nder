import { app } from "../../app.js";

document.addEventListener("DOMContentLoaded", () => {
  const requestsSentListContainer =
    document.getElementById("requests-sent-list");

  // Carica le richieste inviate
  const userId = app.session.id_user;
  const requestsSent = app.getRequestsSent(userId);

  // Pulisci il contenitore delle richieste
  requestsSentListContainer.innerHTML = "";

  if (requestsSent.length === 0) {
    requestsSentListContainer.innerHTML =
      "<p>Non ci sono richieste inviate.</p>";
  } else {
    requestsSent.forEach((request) => {
      const dog = app.getDogInfo(request.dogId);
      if (!dog) {
        console.error(`Cane non trovato per l'ID: ${request.dogId}`);
        return;
      }

      const requestDiv = document.createElement("div");
      requestDiv.classList.add("div-request");

      requestDiv.innerHTML = `
        <div class="request-info">
          <img src="${dog.immagine}" alt="${dog.nome}" class="dog-thumbnail" />
          <div class="dog-details">
            <p>Nome: ${dog.nome}</p>
            <p>Razza: ${dog.razza}</p>
          </div>
        </div>
      `;

      requestDiv.addEventListener("click", () => {
        localStorage.setItem("selectedDogId", request.dogId);
        window.location.href = "../profiloCane/index.html";
      });

      requestsSentListContainer.appendChild(requestDiv);
    });
  }
});

const homePageButton = document.getElementById("logo");
homePageButton.addEventListener("click", () => {
  window.location.href = "../homePage/index.html";
});
