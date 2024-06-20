import { app } from "../../app.js";

const isLogged = !!localStorage.getItem("user");

if (!isLogged) window.location.href = "../login";
else {
  const homePageButton = document.getElementById("logo");
  const logoutButton = document.getElementById("button-logout");
  const profiloUserButton = document.getElementById("button-profiloUser");
  const addDogForm = document.getElementById("add-dog-form");
  const filterDogsForm = document.getElementById("filter-dogs-form");
  const showDogsButton = document.getElementById("show-dogs-button");

  homePageButton.addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });

  logoutButton.addEventListener("click", () => {
    //app.logout();

    const message = app.logout();

    alert(message);
    localStorage.removeItem("user");
    window.location.href = "../../";
  });

  profiloUserButton.addEventListener("click", () => {
    window.location.href = "../profiloUser/index.html";
  });

  addDogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addDogForm);
    const sesso = formData.get("sesso");
    const eta = formData.get("eta");
    const nome = formData.get("nome");
    const razza = formData.get("razza");
    const pedigree = formData.get("pedigree");
    const luogo = formData.get("luogo");
    const descrizione = formData.get("descrizione");
    const immagine = formData.get("immagine");
    app.createDogForUser(
      app.session.id_user,
      sesso,
      eta,
      nome,
      razza,
      pedigree,
      luogo,
      descrizione,
      immagine
    );
    alert("Cane aggiunto con successo");
  });

  filterDogsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(filterDogsForm);
    const sesso = formData.get("sesso");
    const eta = formData.get("eta");
    const razza = formData.get("razza");
    const pedigree = formData.get("pedigree");
    const luogo = formData.get("luogo");
    app.filterDogs(sesso, eta, razza, pedigree, luogo);
  });

  showDogsButton.addEventListener("click", () => {
    app.showDogs();
  });
}
