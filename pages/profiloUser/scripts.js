const isLogged = !!localStorage.getItem("user");

if (!isLogged) window.location.href = "../login";
else {
  const homePageButton = document.getElementById("logo");

  const modificaProfiloButton = document.getElementById(
    "modificaProfiloButton"
  );
  const listaCaniPersonaleButton = document.getElementById(
    "listaCaniPersonaleButton"
  );

  const RichiesteInviateButton = document.getElementById(
    "RichiesteInviateButton"
  );
  const richiesteRicevuteButton = document.getElementById(
    "richiesteRicevuteButton"
  );

  const listaMatchButton = document.getElementById("listaMatchButton");

  homePageButton.addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });

  listaCaniPersonaleButton.addEventListener("click", () => {
    window.location.href = "../listaCani/index.html";
  });

  modificaProfiloButton.addEventListener("click", () => {
    window.location.href = "../modificaProfilo/index.html";
  });

  listaMatchButton.addEventListener("click", () => {
    window.location.href = "../myMatches/index.html";
  });

  RichiesteInviateButton.addEventListener("click", () => {
    window.location.href = "../richiesteInviate/index.html";
  });

  richiesteRicevuteButton.addEventListener("click", () => {
    window.location.href = "../richiesteRicevute/index.html";
  });
}
