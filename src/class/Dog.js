import { ModelDog } from "../models/Dog.js";
class ControllerDogs {
  constructor() {
    this.dogs = JSON.parse(localStorage.getItem("dogs")) || [];
  }

  saveDogs() {
    localStorage.setItem("dogs", JSON.stringify(this.dogs));
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
    return this.dogs.find((dog) => dog.id_dog === id);
  }

  getDogsByUserId(userId) {
    return this.dogs.filter((dog) => dog.ownerId === userId);
  }

  updateDog(id, updates) {
    this.dogs = this.dogs.map((dog) => {
      if (dog.id_dog === id) {
        return { ...dog, ...updates };
      }
      return dog;
    });
    this.saveDogs();
  }

  delete(id) {
    const initialLength = this.dogs.length;
    this.dogs = this.dogs.filter((d) => d.id_dog !== id);
    this.saveDogs();
    if (this.dogs.length < initialLength) {
      return `Dog with ID ${id} has been deleted.`;
    } else {
      return `Dog with ID ${id} not found.`;
    }
  }

  getDogs() {
    return this.dogs;
  }
}

export { ControllerDogs };
