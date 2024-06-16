import { App } from "./src/app.js";

const app = new App();

document.addEventListener("DOMContentLoaded", () => {
  const signupSection = document.getElementById("signup-section");
  const loginSection = document.getElementById("login-section");
  const profileSection = document.getElementById("profile-section");

  const signupLink = document.getElementById("signup-link");
  const loginLink = document.getElementById("login-link");
  const profileLink = document.getElementById("profile-link");
  const logoutLink = document.getElementById("logout-link");

  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  signupLink.addEventListener("click", () => {
    signupSection.style.display = "block";
    loginSection.style.display = "none";
    profileSection.style.display = "none";
  });

  loginLink.addEventListener("click", () => {
    signupSection.style.display = "none";
    loginSection.style.display = "block";
    profileSection.style.display = "none";
  });

  profileLink.addEventListener("click", () => {
    signupSection.style.display = "none";
    loginSection.style.display = "none";
    profileSection.style.display = "block";
    displayUserDogs();
  });

  logoutLink.addEventListener("click", () => {
    app.logout();
    signupSection.style.display = "none";
    loginSection.style.display = "block";
    profileSection.style.display = "none";
  });

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const email = document.getElementById("signup-email").value;
    const phone = document.getElementById("signup-phone").value;
    app.users.createUser(username, password, email, phone);
    alert("Sign up successful!");
    signupForm.reset();
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    if (app.login(username, password)) {
      alert("Login successful!");
      loginForm.reset();
      profileLink.click();
    } else {
      alert("Invalid credentials!");
    }
  });

  function displayUserDogs() {
    const user = app.currentUser;
    const dogsList = document.getElementById("dogs-list");
    dogsList.innerHTML = "";

    if (user) {
      const dogs = app.getUserDogs(user.id_user);
      dogs.forEach((dog) => {
        const dogDiv = document.createElement("div");
        dogDiv.textContent = `${dog.nome} - ${dog.razza} (${dog.eta} anni)`;
        dogsList.appendChild(dogDiv);
      });
    }
  }
});
