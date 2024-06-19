const isLogged = !!localStorage.getItem("user");

if (!isLogged) window.location.href = "../login";
else {
}
