import { app } from "../../app.js";

const isLogged = !!localStorage.getItem("user");

if (!isLogged) {
  window.location.href = "../login";
} else {
  const saveButton = document.getElementById("save-button");
  const user = JSON.parse(localStorage.getItem("user"));

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const logoInput = document.getElementById("logo");

  if (user) {
    usernameInput.value = user.username || "";
    emailInput.value = user.email || "";
    phoneInput.value = user.phone || "";
  }

  saveButton.addEventListener("click", (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;

    const message = app.updateProfile({ username, email, phone });
    alert(message);

    const updatedUser = JSON.parse(localStorage.getItem("user"));
    updatedUser.username = username;
    updatedUser.email = email;
    updatedUser.phone = phone;
    localStorage.setItem("user", JSON.stringify(updatedUser));
  });

  logoInput.addEventListener("click", (event) => {
    event.preventDefault();

    window.location.href = "../homePage/index.html";
  });
}
