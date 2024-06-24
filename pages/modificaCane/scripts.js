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

  const urlParams = new URLSearchParams(window.location.search);
  const dogId = localStorage.getItem("selectedDogId");
  alert(dogId);
  const form = document.getElementById("edit-dog-form");

  // Carica i dati del cane
  const dog = app.getDogInfo(dogId);

  if (dog) {
    document.getElementById("nome").value = dog.nome;
    document.getElementById("sesso").value = dog.sesso;
    document.getElementById("eta").value = dog.eta;
    document.getElementById("razza").value = dog.razza;
    document.getElementById("pedigree").value = dog.pedigree ? "Sì" : "No";
    document.getElementById("luogo").value = dog.luogo;
    document.getElementById("descrizione").value = dog.descrizione;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const nome = formData.get("nome") || undefined;
    const sesso = formData.get("sesso") || undefined;
    const eta = formData.get("eta") || undefined;
    const razza = formData.get("razza") || undefined;
    const pedigree = formData.get("pedigree") === "Sì" ? true : undefined;
    const luogo = formData.get("luogo") || undefined;
    const descrizione = formData.get("descrizione") || undefined;
    const immagine = formData.get("immagine");

    // alert(dogId);
    // alert(sesso);
    // alert(eta);
    // alert(nome);
    // alert(razza);
    // alert(pedigree);
    // alert(luogo);
    // alert(descrizione);

    if (immagine && immagine.size > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const immagineBase64 = e.target.result;
        app.updateDog(
          dogId,
          sesso,
          eta,
          nome,
          razza,
          pedigree,
          luogo,
          descrizione,
          immagineBase64
        );

        alert("Profilo cane aggiornato con successo!");
        window.location.href = "../listaCani/index.html";
      };
      reader.readAsDataURL(immagine);
    } else {
      app.updateDog(
        dogId,
        sesso,
        eta,
        nome,
        razza,
        pedigree,
        luogo,
        descrizione
      );

      alert("Profilo cane aggiornato con successo!");
      window.location.href = "../listaCani/index.html";
    }
    app.saveDogs();
    alert(app.getDogInfo(dogId).eta);
  });
}
