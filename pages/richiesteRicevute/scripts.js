import { app } from "../../app.js";

document.addEventListener("DOMContentLoaded", () => {
  const requestsReceivedListContainer = document.getElementById(
    "requests-received-list"
  );

  // Carica le richieste ricevute
  const userId = app.session.id_user;
  const requestsReceived = app.getRequestsReceived(userId);

  // Pulisci il contenitore delle richieste
  requestsReceivedListContainer.innerHTML = "";

  if (requestsReceived.length === 0) {
    requestsReceivedListContainer.innerHTML =
      "<p>Non ci sono richieste ricevute.</p>";
  } else {
    requestsReceived.forEach((request) => {
      const requestDiv = document.createElement("div");
      requestDiv.classList.add("div-request");

      // Contenuto della richiesta
      requestDiv.innerHTML = `
        <div class="request-info">Richiesta da utente ID: ${request.userId} per cane ID: ${request.dogId}</div>
        <button class="accept-button">Accetta</button>
        <button class="reject-button">Rifiuta</button>
      `;

      // Aggiungi evento per accettare la richiesta
      requestDiv
        .querySelector(".accept-button")
        .addEventListener("click", () => {
          const message = app.acceptMatch(userId, request.userId);
          alert(message);
          window.location.reload();
        });

      requestsReceivedListContainer.appendChild(requestDiv);
    });
  }
});
