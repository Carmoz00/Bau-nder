import { ModelDog } from "../models/Dog.js";
class ControllerDogs {
  constructor() {
    this.dogs = JSON.parse(localStorage.getItem("dogs")) || [];
  }

  saveDogs() {
    localStorage.setItem("dogs", JSON.stringify(this.dogs));
  }

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
    this.dogs.push(dog);
    this.saveDogs();
  }

  getDogById(id) {
    return this.dogs.find((dog) => dog.id_dog === id);
  }

  read(id) {
    const dog = this.dogs.find((d) => d.id_dog === id);
    return dog || null;
  }

  updateSesso(old_sesso, new_sesso) {
    this.dogs = this.dogs.map((dog) => {
      if (dog.sesso === old_sesso) return { ...dog, sesso: new_sesso };
      return dog;
    });
    this.saveDogs();
  }

  updateEta(old_eta, new_eta) {
    this.dogs = this.dogs.map((dog) => {
      if (dog.eta === old_eta) return { ...dog, eta: new_eta };
      return dog;
    });
    this.saveDogs();
  }

  updateNome(old_nome, new_nome) {
    this.dogs = this.dogs.map((dog) => {
      if (dog.nome === old_nome) return { ...dog, nome: new_nome };
      return dog;
    });
    this.saveDogs();
  }

  updateRazza(old_razza, new_razza) {
    this.dogs = this.dogs.map((dog) => {
      if (dog.razza === old_razza) return { ...dog, razza: new_razza };
      return dog;
    });
    this.saveDogs();
  }

  updatePedigree(old_pedigree, new_pedigree) {
    this.dogs = this.dogs.map((dog) => {
      if (dog.pedigree === old_pedigree)
        return { ...dog, pedigree: new_pedigree };
      return dog;
    });
    this.saveDogs();
  }

  updateLuogo(old_luogo, new_luogo) {
    this.dogs = this.dogs.map((dog) => {
      if (dog.luogo === old_luogo) return { ...dog, luogo: new_luogo };
      return dog;
    });
    this.saveDogs();
  }

  updateDescrizione(old_descrizione, new_descrizione) {
    this.dogs = this.dogs.map((dog) => {
      if (dog.descrizione === old_descrizione)
        return { ...dog, descrizione: new_descrizione };
      return dog;
    });
    this.saveDogs();
  }

  delete(id) {
    const initialLength = this.dogs.length;
    this.dogs = this.dogs.filter((d) => d.id_dog !== id);
    if (this.dogs.length < initialLength) {
      this.saveDogs();
      return `Dog with ID ${id} has been deleted.`;
    } else {
      return `Dog with ID ${id} not found.`;
    }
  }

  getdogs() {
    return this.dogs;
  }

  filterDogs(filters) {
    return this.dogs.filter((dog) => {
      return Object.keys(filters).every((key) => {
        if (filters[key] !== undefined) {
          return dog[key] === filters[key];
        }
        return true;
      });
    });
  }
}

export { ControllerDogs };
