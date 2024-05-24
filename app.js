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
    this.#session = this.#users.get(username, password);
  }

  logout() {
    this.#session = null;
  }
}

/* constructor() {
    this.#users = new ControllerUsers();
    this.#dogs = new ControllerDogs();
    this.#userReviews = new ControllerDogUser();
    this.#user = null;
  }*/
