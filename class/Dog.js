const ModelDogs = require("../models/Dog.js");
import { ModelDog } from "../models/Dog.js";
class ControllerDogs {
  #dogs = [];
  create(sesso, eta, nome, razza, pedigree, luogo, descrizione, immagine) {
    const dog = new ModelDog(
      sesso,
      eta,
      nome,
      razza,
      pedigree,
      luogo,
      descrizione,
      immagine
    );
    this.#dogs.push(dog);
  }
  read(id) {
    const dog = this.#dogs.find((d) => d.id_dog === id);
    if (dog) {
      return dog;
    } else {
      return dog;
    }
  }
  updateSesso(old_sesso, new_sesso) {
    this.#dogs = this.#dogs.map((dog) => {
      if (dog.sesso === old_sesso) return { ...dog, sesso: new_sesso };
      return dog;
    });
  }

  updateEta(old_eta, new_eta) {
    this.#dogs = this.#dogs.map((dog) => {
      if (dog.eta === old_eta) return { ...dog, eta: new_eta };
      return dog;
    });
  }

  updateNome(old_nome, new_nome) {
    this.#dogs = this.#dogs.map((dog) => {
      if (dog.nome === old_nome) return { ...dog, nome: new_nome };
      return dog;
    });
  }

  updateRazza(old_razza, new_razza) {
    this.#dogs = this.#dogs.map((dog) => {
      if (dog.razza === old_razza) return { ...dog, razza: new_razza };
      return dog;
    });
  }

  updatePedigree(old_pedigree, new_pedigree) {
    this.#dogs = this.#dogs.map((dog) => {
      if (dog.pedigree === old_pedigree)
        return { ...dog, pedigree: new_pedigree };
      return dog;
    });
  }

  updateLuogo(old_luogo, new_luogo) {
    this.#dogs = this.#dogs.map((dog) => {
      if (dog.luogo === old_luogo) return { ...dog, luogo: new_luogo };
      return dog;
    });
  }

  updateDescrizione(old_descrizione, new_descrizione) {
    this.#dogs = this.#dogs.map((dog) => {
      if (dog.descrizione === old_descrizione)
        return { ...dog, descrizione: new_descrizione };
      return dog;
    });
  }

  delete(id) {
    const initialLength = this.#dogs.length;
    this.#dogs = this.#dogs.filter((d) => d.id_dog !== id);
    if (this.#dogs.length < initialLength) {
      return `Dog with ID ${id} has been deleted.`;
    } else {
      return `Dog with ID ${id} not found.`;
    }
  }

  getdogs() {
    return this.#dogs;
  }
  /* showDogsFilterPedigree() {
    return this.#dogs.filter((d) => d.pedigree === true);
  }

  
  showDogsFilterLuogo(luogo) {
    return this.#dogs.filter((d) => d.luogo === luogo);
  }

  
  showDogsFilterSesso(sesso) {
    return this.#dogs.filter((d) => d.sesso === sesso);
  }


  showDogsFilterEta(eta) {
    return this.#dogs.filter((d) => d.eta === eta);
  }

  showDogsFilterRazza(razza) {
    return this.#dogs.filter((d) => d.razza === razza);
  }
  */
}

export { ControllerDogs };
