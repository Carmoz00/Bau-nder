import { app } from "../../app.js";

const isLogged = !!localStorage.getItem("user");

if (isLogged) {
  window.location.href = "../homePage/index.html";
} else {
  const loginButton = document.getElementById("button-login");
  const emailInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const message = app.login(email, password);

    alert(message);
    if (app.session) {
      const user = { id_user: app.session.userId, email: email };
      localStorage.setItem("user", JSON.stringify(user));

      window.location.href = "../homePage/index.html";
    }
  });
}
