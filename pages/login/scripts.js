const isLogged = !!localStorage.getItem("user");

if (isLogged) window.location.href = "./pages/home";
else {
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
}
