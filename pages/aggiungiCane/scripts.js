import { app } from "../../app.js";

const isLogged = !!localStorage.getItem("user");

if (!isLogged) {
  window.location.href = "../login";
} else {
  const homePageButton = document.getElementById("logo");
  homePageButton.addEventListener("click", () => {
    window.location.href = "../homePage/index.html";
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id_user;
  alert(userId);
  const form = document.getElementById("add-dog-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const nome = formData.get("nome");
    const sesso = formData.get("sesso");
    const eta = formData.get("eta");
    const razza = formData.get("razza");
    const pedigree = formData.get("pedigree") === "Sì";
    const luogo = formData.get("luogo");
    const descrizione = formData.get("descrizione");
    const immagine = formData.get("immagine");

    const reader = new FileReader();
    reader.onload = function (e) {
      const immagineData = e.target.result;
      app.createDogForUser(
        userId,
        sesso,
        eta,
        nome,
        razza,
        pedigree,
        luogo,
        descrizione,
        immagineData
      );
      alert("Profilo cane aggiunto con successo!");
      window.location.href = "../homePage/index.html";
    };

    reader.readAsDataURL(immagine);
  });
}
