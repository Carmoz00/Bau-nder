import ControllerUsers from "./class/User.js";
import ControllerDogs from "./class/Dogs.js";
import ControllerDogUser from "./class/DogUser.js";

class App {
  #users = new ControllerUsers();
  #dogs = new ControllerDogs();
  #userReviews;
  #session;

  signup(username, password, email) {
    //const test = this.#users.isValidUsername(this.#users.username);
    //if (test === true) {
    this.#users.create(username, password, email);
    /*} else {
      console.log("nome in uso");
    }*/
  }

  login(username, password) {
    while (true) {
      this.#session = this.#users.get(username, password);
      if (
        this.#session.username === username &&
        this.#session.password === password
      ) {
        console.log("Login effettuato correttamente");
        break;
      } else {
        console.log("Credenziali errate");
      }
    }
  }

  logout() {
    this.#session = null;

    console.log("Logout effettuato correttamente");
  }

  showdogs() {
    this.#dogs.getdogs();
  }

  filterdogs() {
    temp_dogs = [...this.#dogs];
    if (pedigree == true) {
      temp_dogs = temp_dogs.filter((dog) => dog.pedigree === pedigree);
    }
    if (luogo == true) {
      temp_dogs = temp_dogs.filter((dog) => dog.luogo === luogo);
    }
    if (sesso == true) {
      temp_dogs = temp_dogs.filter((dog) => dog.sesso === sesso);
    }
    if (razza == true) {
      temp_dogs = temp_dogs.filter((dog) => dog.razza === razza);
    }
    if (eta == true) {
      temp_dogs = temp_dogs.filter((dog) => dog.eta === eta);
    }
  }
}

/* constructor() {
    this.#users = new ControllerUsers();
    this.#dogs = new ControllerDogs();
    this.#userReviews = new ControllerDogUser();
    this.#user = null;
  }*/
