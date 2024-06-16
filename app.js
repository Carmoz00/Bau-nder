import ControllerUsers from "./class/User.js";
import ControllerDogs from "./class/Dogs.js";
import ControllerDogUser from "./class/DogUser.js";

class App {
  #users = new ControllerUsers();
  #dogs = new ControllerDogs();
  #userReviews;
  #session = null;

  temp_dogs = [];

  signup(username, password, email) {
    if (this.#users.findByEmail(email)) {
      console.log("Email già in uso");
      return;
    }
    this.#users.create(username, password, email);
    console.log("Registrazione completata con successo");
  }

  login(email, password) {
    const user = this.#users.authenticate(email, password);
    if (user) {
      this.#session = user;
      console.log("Login effettuato correttamente");
    } else {
      console.log("Email o password errati");
    }
  }

  logout() {
    this.#session = null;
    console.log("Logout effettuato correttamente");
  }

  showdogs() {
    console.log(this.#dogs.getdogs());
  }

  filterdogs(sesso, eta, razza, pedigree, luogo) {
    const filters = { sesso, eta, razza, pedigree, luogo };
    this.temp_dogs = this.#dogs.filterDogs(filters);
    console.log(this.temp_dogs);
  }
}

/* 
  match (id_user, id_dog) {
      listaMatch.push({id_user, id_dog});

      console.log("Match inviato");

  }

  dog1.match(id_user, id_dog);

  
  constructor() {
    this.#users = new ControllerUsers();
    this.#dogs = new ControllerDogs();
    this.#userReviews = new ControllerDogUser();
    this.#user = null;

  }
  
  */
