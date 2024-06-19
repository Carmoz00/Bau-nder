const isLogged = !!localStorage.getItem("user");

if (isLogged) window.location.href = "./pages/home";
else {
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
}
