import { app } from "../../app.js";

document.addEventListener("DOMContentLoaded", () => {
  const selectedRequestId = localStorage.getItem("selectedRequestId");
  const session = JSON.parse(localStorage.getItem("session"));

  if (!selectedRequestId || !session) {
    alert("Richiesta o sessione non trovata");
    window.location.href = "../richiesteRicevute/index.html";
    return;
  }

  const requests = app.getRequestsReceived(session.id_user);
  const request = requests.find(
    (req) => req.dogId === parseFloat(selectedRequestId)
  );

  if (!request) {
    alert("Richiesta non trovata");
    window.location.href = "../richiesteRicevute/index.html";
    return;
  }

  const dog = app.getDogInfo(request.dogId);
  const user = app.getUserInfo(request.userId);

  if (!dog || !user) {
    alert("Informazioni del cane o dell'utente non trovate");
    window.location.href = "../richiesteRicevute/index.html";
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

  const userContactsContainer = document.getElementById("user-contacts");

  document.getElementById("accept-button").addEventListener("click", () => {
    app.acceptMatch(session.id_user, request.userId);
    userContactsContainer.innerHTML = `
      <h1>RICHIESTA ACCETTATA</h1>
      <h3>${user.username}</h3>
      <h3>Contatti dell'utente:</h3>
      <p>Email: ${user.email}</p>
      <p>Telefono: ${user.phone}</p>
    `;
    userContactsContainer.classList.remove("hidden");

    // Aggiorna lo stato della richiesta
    updateRequestStatus(session.id_user, request.userId, "accettata");
  });

  document.getElementById("reject-button").addEventListener("click", () => {
    updateRequestStatus(session.id_user, request.userId, "rifiutata");
    alert("Richiesta rifiutata");
    userContactsContainer.innerHTML = `
      <h1>RICHIESTA RIFIUTATA</h1>
    `;
    window.location.href = "../richiesteRicevute/index.html";
  });
  const homePageButton = document.getElementById("logo");
  homePageButton.addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });
});

function updateRequestStatus(ownerId, userId, status) {
  const user = app.getUserInfo(ownerId);
  if (user) {
    const request = user.richiesteRicevute.find((req) => req.userId === userId);
    if (request) {
      request.status = status;
      app.users.saveUsers();
    }
  }
}
