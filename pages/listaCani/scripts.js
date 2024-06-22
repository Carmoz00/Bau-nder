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

  const dogsListContainer = document.getElementById("dogs-list");

  const displayUserDogs = () => {
    const userDogs = app.getUserDogs(userId);
    dogsListContainer.innerHTML = ""; // Pulire il contenitore prima di aggiungere nuovi elementi

    if (userDogs.length === 0) {
      dogsListContainer.innerHTML =
        "<p>Sembra che non hai ancora inserito nessun cane. Aggiungi il tuo cane ora!</p>";
    } else {
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      thead.innerHTML = `
        <tr>
          <th>Foto</th>
          <th>Nome</th>
          <th>Razza</th>
          <th>Età</th>
          <th>Sesso</th>
          <th>Pedigree</th>
          <th>Luogo</th>
          <th>Descrizione</th>
        </tr>
      `;

      userDogs.forEach((dog) => {
        const row = document.createElement("tr");
        row.dataset.id_dog = dog.id; // Associa l'ID del cane alla riga

        row.innerHTML = `
          <td><img src="${dog.immagine}" alt="${
          dog.nome
        }" class="dog-image"/></td>
          <td>${dog.nome}</td>
          <td>${dog.razza}</td>
          <td>${dog.eta}</td>
          <td>${dog.sesso}</td>
          <td>${dog.pedigree ? "Sì" : "No"}</td>
          <td>${dog.luogo}</td>
          <td>${dog.descrizione}</td>
        `;

        row.addEventListener("click", () => {
          localStorage.setItem("selectedDogId", dog.id_dog);
          window.location.href = "../profiloCanePersonale/index.html";
        });

        tbody.appendChild(row);
      });

      table.appendChild(thead);
      table.appendChild(tbody);
      dogsListContainer.appendChild(table);
    }
  };

  document.addEventListener("DOMContentLoaded", displayUserDogs);
}
