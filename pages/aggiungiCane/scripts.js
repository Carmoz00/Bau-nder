const isLogged = !!localStorage.getItem("user");

if (!isLogged) window.location.href = "../login";
else {
  const homePageButton = document.getElementById("logo");

  homePageButton.addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });
}
