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

  updateDog(id, updatedDog) {
    this.dogs = this.dogs.map((dog) => {
      if (dog.id_dog === id) {
        return { ...dog, ...updatedDog };
      }
      return dog;
    });
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
