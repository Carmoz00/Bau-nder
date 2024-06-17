import { App } from "./src/app.js";

const app = new App();

document.addEventListener("DOMContentLoaded", () => {
  const signupSection = document.getElementById("signup-section");
  const loginSection = document.getElementById("login-section");
  const addDogSection = document.getElementById("add-dog-section");
  const dogsListSection = document.getElementById("dogs-list-section");
  const profileLink = document.getElementById("profile-link");
  const logoutLink = document.getElementById("logout-link");

  const signupLink = document.getElementById("signup-link");
  const loginLink = document.getElementById("login-link");

  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const addDogForm = document.getElementById("add-dog-form");

  if (signupSection && loginSection) {
    signupSection.classList.add("active");
    signupLink.addEventListener("click", () => {
      signupSection.classList.add("active");
      loginSection.classList.remove("active");
    });

    loginLink.addEventListener("click", () => {
      signupSection.classList.remove("active");
      loginSection.classList.add("active");
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
        window.location.href = "home.html";
      } else {
        alert("Invalid credentials!");
      }
    });
  }

  if (addDogSection && dogsListSection) {
    addDogSection.classList.add("active");
    dogsListSection.classList.add("active");

    addDogForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("dog-name").value;
      const breed = document.getElementById("dog-breed").value;
      const age = document.getElementById("dog-age").value;
      const gender = document.getElementById("dog-gender").value;
      const pedigree = document.getElementById("dog-pedigree").checked;
      const location = document.getElementById("dog-location").value;
      const description = document.getElementById("dog-description").value;
      app.dogs.addDog(
        name,
        breed,
        age,
        gender,
        pedigree,
        location,
        description
      );
      displayDogs();
      addDogForm.reset();
    });

    function displayDogs() {
      const dogs = app.dogs.getDogs();
      dogsListSection.innerHTML = "";
      dogs.forEach((dog) => {
        const dogDiv = document.createElement("div");
        dogDiv.textContent = `${dog.nome} - ${dog.razza} (${dog.eta} anni)`;
        dogsListSection.appendChild(dogDiv);
      });
    }

    displayDogs();
  }

  profileLink.addEventListener("click", () => {
    // Implement profile view logic
  });

  logoutLink.addEventListener("click", () => {
    app.logout();
    window.location.href = "Baunder-initialPage.html";
  });
});
