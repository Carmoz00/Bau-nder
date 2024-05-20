class App {
  constructor() {
    this.#users = new ControllerUsers();
    this.#dogs = new ControllerDogs();
    this.#userReviews = new ControllerDogUser();
    this.#user = null;
  }

  signup(username, password, email) {
    this.users.create(username, password, email);
  }

  login(username, password) {
    this.#user = this.users.get(username, password);
  }

  logout() {
    this.#user = null;
  }
}
