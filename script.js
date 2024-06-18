import App from "./src/app.js";

const app = new App();

document.addEventListener("DOMContentLoaded", () => {
  const signupSection = document.getElementById("signup-section");
  const loginSection = document.getElementById("login-section");
  const addDogSection = document.getElementById("add-dog-section");
  const dogsSection = document.getElementById("dogs-section");

  // Registrazione
  const signupForm = document.getElementById("signup-form");
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(signupForm);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = app.signup(username, password, email, phone);
    alert(message);
  });

  // Login
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (event) => {
    alert("ciao");
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const message = app.login(email, password);
    alert(message);
    if (app.session) {
      signupSection.style.display = "none";
      loginSection.style.display = "none";
      addDogSection.style.display = "block";
      dogsSection.style.display = "block";
    }
  });

  // Logout
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    app.logout();
    signupSection.style.display = "block";
    loginSection.style.display = "block";
    addDogSection.style.display = "none";
    dogsSection.style.display = "none";
  });

  // Aggiunta Cane
  const addDogForm = document.getElementById("add-dog-form");
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

  // Filtrare cani
  const filterDogsForm = document.getElementById("filter-dogs-form");
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

  // Visualizzare tutti i cani
  const showDogsButton = document.getElementById("show-dogs-button");
  showDogsButton.addEventListener("click", () => {
    app.showDogs();
  });
});
