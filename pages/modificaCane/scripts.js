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

    const updates = {
      nome: formData.get("nome") || undefined,
      sesso: formData.get("sesso") || undefined,
      eta: formData.get("eta") || undefined,
      razza: formData.get("razza") || undefined,
      pedigree: formData.get("pedigree") === "Sì" ? true : undefined,
      luogo: formData.get("luogo") || undefined,
      descrizione: formData.get("descrizione") || undefined,
    };

    const immagine = formData.get("immagine");

    if (immagine && immagine.size > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        updates.immagine = e.target.result;
        app.updateDog(dogId, updates);
        alert("Profilo cane aggiornato con successo!");
        window.location.href = "../homePage/index.html";
      };
      reader.readAsDataURL(immagine);
    } else {
      app.updateDog(dogId, updates);
      alert("Profilo cane aggiornato con successo!");
      window.location.href = "../homePage/index.html";
    }
  });
}
