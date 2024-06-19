import { app } from "../../app.js";

const isLogged = !!localStorage.getItem("user");

if (isLogged) {
  window.location.href = "../homePage/index.html";
} else {
  const signupButton = document.getElementById("signup-button");
  const usernameInput = document.getElementById("signup-username");
  const passwordInput = document.getElementById("signup-password");
  const emailInput = document.getElementById("signup-email");
  const phoneInput = document.getElementById("signup-phone");

  signupButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;

    const message = app.signup(username, password, email, phone);
    alert(message);
    window.location.href = "../login/index.html";
  });
}
