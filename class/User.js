import { ModelUser } from "../models/User.js";
class ControllerUsers {
  constructor() {
    this.#loadUsersFromLocalStorage();
  }

  #users = [];
  #saveUsersToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(this.#users));
  }

  #loadUsersFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      this.#users = users.map(
        (user) => new ModelUser(user.username, user.password, user.email)
      );
    }
  }

  create(username, password, email) {
    const user = new ModelUser(username, password, email);
    this.#users.push(user);
    this.#saveUsersToLocalStorage();
  }

  findByEmail(email) {
    return this.#users.find((user) => user.email === email);
  }

  isValidUsername(username) {
    return !this.#users.some((user) => user.username === username);
  }

  authenticate(email, password) {
    const user = this.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  updateUsername(old_username, new_username) {
    this.#users = this.#users.map(function (user) {
      if (user.username === old_username)
        return { ...user, username: new_username };
      return { ...user };
    });
  }

  updatePassword(old_password, new_password) {
    this.#users = this.#users.map(function (user) {
      if (user.password === old_password)
        return { ...user, password: new_password };
      return { ...user };
    });
  }

  delete(id_user) {
    const userFound = this.#users.filter(function (user) {
      if (user.id_user === id_user) return true;
      return false;
    });
  }

  get(username, password) {
    const userFound = this.#users.find(function (user) {
      if (user.username === username && user.password === password) return true;
      return false;
    });
    return userFound;
  }

  IsValidUsername(username) {
    const userFound = this.#users.find(function (user) {
      if (user.username === username) return true;
      return false;
    });
    return !userFound;
  }
}

export { ControllerUsers };
