import ModelDog from "../models/Dog.js";

class ControllerDogs {
  constructor() {
    this.dogs = JSON.parse(localStorage.getItem("dogs")) || [];
  }

  saveDogs() {
    localStorage.setItem("dogs", JSON.stringify(this.dogs));
  }

  loadDogs() {
    this.dogs = JSON.parse(localStorage.getItem("dogs")) || [];
  }

  create(
    sesso,
    eta,
    nome,
    razza,
    pedigree,
    luogo,
    descrizione,
    immagine,
    ownerId
  ) {
    const dog = new ModelDog(
      sesso,
      eta,
      nome,
      razza,
      pedigree,
      luogo,
      descrizione,
      immagine,
      ownerId
    );
    this.dogs.push(dog);
    this.saveDogs();
    return dog.id_dog;
  }

  getDogById(id) {
    return this.dogs.find((dog) => dog.id_dog.toString() === id.toString());
  }

  getDogsByUserId(userId) {
    return this.dogs.filter((dog) => dog.ownerId === userId);
  }

  updateDog(
    id,
    sesso,
    eta,
    nome,
    razza,
    pedigree,
    luogo,
    descrizione,
    immagine
  ) {
    this.dogs = this.dogs.map((dog) => {
      if (dog.id_dog === id) {
        return {
          ...dog,
          sesso: sesso !== undefined ? sesso : dog.sesso,
          eta: eta !== undefined ? eta : dog.eta,
          nome: nome !== undefined ? nome : dog.nome,
          razza: razza !== undefined ? razza : dog.razza,
          pedigree: pedigree !== undefined ? pedigree : dog.pedigree,
          luogo: luogo !== undefined ? luogo : dog.luogo,
          descrizione:
            descrizione !== undefined ? descrizione : dog.descrizione,
          immagine: immagine !== undefined ? immagine : dog.immagine,
        };
      }
      return dog;
    });
    this.saveDogs();
  }

  deleteDog(id) {
    this.dogs = this.dogs.filter((dog) => dog.id_dog !== id);
    this.saveDogs();
  }

  getDogs() {
    return this.dogs;
  }
}

export default ControllerDogs;
