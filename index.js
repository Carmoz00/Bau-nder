// impostare true nel login
const isLogged = !!localStorage.getItem("user");

if (isLogged) window.location.href = "./pages/homePage";
else {
}
