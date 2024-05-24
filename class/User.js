const ModelUser = require("../models/Dog.js");

class ControllerUsers {
  #users = [];

  create(username, password, email) {
    const user = new ModelUser(username, password, email);
    this.users.push(user);
  }
  read(id_user) {}

  updateUsername(old_username, new_username) {
    this.#users = this.users.map(function (user) {
      if (user.username === old_username)
        return { ...user, username: new_username };
      return { ...user };
    });
  }

  updatePassword(old_password, new_password) {
    this.#users = this.users.map(function (user) {
      if (user.password === old_password)
        return { ...user, password: new_password };
      return { ...user };
    });
  }

  delete(id_user) {
    const userFound = this.users.filter(function (user) {
      if (user.id_user === id_user) return true;
      return false;
    });
  }

  get(username, password) {
    const userFound = this.users.find(function (user) {
      if (user.username === username && user.password === password) return true;
      return false;
    });
    return userFound;
  }
}
