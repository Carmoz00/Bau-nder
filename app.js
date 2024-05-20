class App {
  constructor() {
    this.#users = new ControllerUsers();
    this.#dogs = new ControllerDogs();
    this.#userReviews = new ControllerDogUser();
    this.#user = null;
  }

  signup(username, password, email) {
    const isValidUsername = this.users.isValidUsername(users.username);
    if (isValidUsername === true) {
      this.users.create(username, password, email);
    } else {
      console.log("nome in uso");
    }
  }

  login(username, password) {
    this.#user = this.users.get(username, password);
  }

  logout() {
    this.#user = null;
  }
}
