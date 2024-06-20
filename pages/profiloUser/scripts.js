const isLogged = !!localStorage.getItem("user");

if (!isLogged) window.location.href = "../login";
else {
  const homePageButton = document.getElementById("logo");
  const listaCaniPersonaleButton = document.getElementById(
    "listaCaniPersonaleButton"
  );

  homePageButton.addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });

  listaCaniPersonaleButton.addEventListener("click", () => {
    window.location.href = "../listaCani/index.html";
  });
}
