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
      const requestDiv = document.createElement("div");
      requestDiv.classList.add("div-request");

      // Contenuto della richiesta
      requestDiv.innerHTML = `
        <div class="request-info">Richiesta inviata a utente ID: ${request.userId} per cane ID: ${request.dogId}</div>
      `;

      requestsSentListContainer.appendChild(requestDiv);
    });
  }
});
