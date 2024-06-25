import { app } from "../../app.js";

document.addEventListener("DOMContentLoaded", () => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (!session) {
    alert("Devi essere loggato per vedere le richieste ricevute");
    window.location.href = "../login/index.html";
    return;
  }

  const requestsReceived = app.getRequestsReceived(session.id_user);

  const requestsReceivedList = document.getElementById(
    "requests-received-list"
  );

  if (requestsReceived.length === 0) {
    requestsReceivedList.innerHTML = "<p>Non ci sono richieste ricevute.</p>";
  } else {
    const table = document.createElement("table");
    table.classList.add("requests-table");

    table.innerHTML = `
      <thead>
        <tr>
          <th>Username Richiedente</th>
          <th>Nome del Cane</th>
          <th>Foto del Cane</th>
          <th>Stato</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    const tbody = table.querySelector("tbody");

    requestsReceived.forEach((request, index) => {
      if (!request.userId || !request.dogId) {
        console.warn(`Richiesta ${index} ha ID undefined`, request);
        return;
      }

      const user = app.getUserInfo(request.userId);
      const dog = app.getDogInfo(request.dogId);

      if (!user || !dog) {
        console.warn(
          `Utente o cane non trovati per la richiesta ${index}`,
          request
        );
        return;
      }

      const tr = document.createElement("tr");
      tr.classList.add("request-row");
      tr.innerHTML = `
        <td>${user.username}</td>
        <td>${dog.nome}</td>
        <td><img src="${dog.immagine}" alt="${
        dog.nome
      }" class="thumbnail"/></td>
        <td class="status">${request.status || "in attesa..."}</td>
      `;

      tr.addEventListener("click", () => {
        localStorage.setItem("selectedRequestId", request.dogId);
        window.location.href = "../profiloCaneRichiesta/index.html";
      });

      tbody.appendChild(tr);
    });

    requestsReceivedList.appendChild(table);
  }

  const homePageButton = document.getElementById("logo");
  homePageButton.addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });
});
